"""Transactional local catalog. Raw research never enters the published view."""
import hashlib
import json
import re
import sqlite3
from contextlib import contextmanager
from pathlib import Path, PurePosixPath
from urllib.parse import urlsplit


def encode(value):
    return json.dumps(value, sort_keys=True, separators=(',', ':'), ensure_ascii=False)


def safe_path(value):
    p = PurePosixPath(value)
    if not value or p.is_absolute() or '..' in p.parts or '\\' in value or '\x00' in value:
        raise ValueError('Unsafe relative path')
    return p


class CatalogStore:
    def __init__(self, database, evidence_root):
        self.database = Path(database)
        self.database.parent.mkdir(parents=True, exist_ok=True)
        self.evidence_root = Path(evidence_root).resolve()
        self.evidence_root.mkdir(parents=True, exist_ok=True)
        self.db = sqlite3.connect(self.database)
        self.db.row_factory = sqlite3.Row
        self.db.execute('PRAGMA foreign_keys=ON')
        # Public reads must not attempt schema writes while a catalog refresh is
        # staging its next version. Check the complete existing schema first;
        # interrupted/older initialization still goes through the repair below.
        required = {('table', name) for name in (
            'migrations', 'research', 'research_history', 'records',
            'tombstones', 'observations', 'blobs',
        )} | {('trigger', name) for name in (
            'immutable_records_update', 'immutable_records_delete',
            'immutable_history_update', 'immutable_history_delete',
        )}
        existing = {(row['type'], row['name']) for row in self.db.execute(
            "SELECT type,name FROM sqlite_master WHERE type IN ('table','trigger')"
        )}
        if required <= existing and self.db.execute(
            'SELECT 1 FROM migrations WHERE version=1'
        ).fetchone():
            return
        self.db.executescript('''
        CREATE TABLE IF NOT EXISTS migrations(version INTEGER PRIMARY KEY);
        INSERT OR IGNORE INTO migrations VALUES(1);
        CREATE TABLE IF NOT EXISTS research(identity TEXT PRIMARY KEY, record_id TEXT NOT NULL, payload TEXT NOT NULL, provenance TEXT NOT NULL);
        CREATE TABLE IF NOT EXISTS research_history(identity TEXT NOT NULL, digest TEXT NOT NULL, payload TEXT NOT NULL, provenance TEXT NOT NULL, PRIMARY KEY(identity,digest));
        CREATE TABLE IF NOT EXISTS records(entity TEXT NOT NULL, id TEXT NOT NULL, version TEXT NOT NULL, payload TEXT NOT NULL, PRIMARY KEY(entity,id,version));
        CREATE TABLE IF NOT EXISTS tombstones(entity TEXT NOT NULL,id TEXT NOT NULL,reason TEXT NOT NULL,removed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,PRIMARY KEY(entity,id));
        CREATE TABLE IF NOT EXISTS observations(id INTEGER PRIMARY KEY, project_id TEXT NOT NULL, observed_at TEXT NOT NULL,payload TEXT NOT NULL);
        CREATE TABLE IF NOT EXISTS blobs(digest TEXT PRIMARY KEY,display_approved INTEGER NOT NULL DEFAULT 0,rights_evidence TEXT);
        CREATE TRIGGER IF NOT EXISTS immutable_records_update BEFORE UPDATE ON records BEGIN SELECT RAISE(ABORT,'Records are immutable'); END;
        CREATE TRIGGER IF NOT EXISTS immutable_records_delete BEFORE DELETE ON records BEGIN SELECT RAISE(ABORT,'Use tombstone'); END;
        CREATE TRIGGER IF NOT EXISTS immutable_history_update BEFORE UPDATE ON research_history BEGIN SELECT RAISE(ABORT,'Research history is immutable'); END;
        CREATE TRIGGER IF NOT EXISTS immutable_history_delete BEFORE DELETE ON research_history BEGIN SELECT RAISE(ABORT,'Research history is immutable'); END;
        ''')
        self.db.commit()

    def close(self):
        self.db.close()

    @contextmanager
    def transaction(self):
        self.db.execute('SAVEPOINT catalog_write')
        try:
            yield self
        except Exception:
            self.db.execute('ROLLBACK TO catalog_write')
            self.db.execute('RELEASE catalog_write')
            raise
        else:
            self.db.execute('RELEASE catalog_write')

    def import_research(self, path):
        path = Path(path)
        raw = path.read_bytes()
        document = json.loads(raw)
        rows = document['records'] if isinstance(document, dict) else document
        provenance = encode({'path': path.name, 'sha256': hashlib.sha256(raw).hexdigest()})
        identities = set()
        with self.transaction():
            for row in rows:
                url = urlsplit(row['repo_url'])
                if url.scheme != 'https' or not url.hostname:
                    raise ValueError('Research repository must use HTTPS')
                subproject = row.get('subproject_path', '')
                if subproject:
                    safe_path(subproject)
                provider_id = row.get('source', {}).get('provider_id')
                identity = encode([url.hostname.lower(), str(provider_id) if provider_id is not None else url.path.rstrip('/').lower(), subproject])
                if identity in identities:
                    raise ValueError('Duplicate provider/subproject in import')
                identities.add(identity)
                payload = encode(row)
                digest = hashlib.sha256(payload.encode()).hexdigest()
                self.db.execute('INSERT OR IGNORE INTO research_history VALUES(?,?,?,?)', (identity, digest, payload, provenance))
                self.db.execute('INSERT INTO research VALUES(?,?,?,?) ON CONFLICT(identity) DO UPDATE SET record_id=excluded.record_id,payload=excluded.payload,provenance=excluded.provenance', (identity,row['id'],payload,provenance))
        return len(identities)

    def research_records(self):
        return [dict(json.loads(row['payload']), eligibility='research_only') for row in self.db.execute('SELECT payload FROM research ORDER BY record_id')]

    def put_record(self, record):
        self.put_records([record])

    def put_records(self, records):
        """Validate and atomically insert a complete graph, including dependency cycles."""
        from contracts.validate import validate_bundle, _walk
        with self.transaction():
            existing = [json.loads(r['payload']) for r in self.db.execute('SELECT payload FROM records')]
            keyed = {(r['id'],r['version']):r for r in existing}
            incoming = set()
            for record in records:
                key = (record['id'],record['version'])
                if key in incoming:
                    raise ValueError('Duplicate incoming identity/version')
                incoming.add(key)
                if key in keyed and keyed[key] != record:
                    raise ValueError('Immutable record: create a new version')
                keyed[key] = record
            combined = list(keyed.values())
            validate_bundle(combined)
            kinds = {'project_id':'project', 'component_id':'component', 'demo_id':'demo'}
            for record in records:
                for node in _walk(record['data']):
                    for field, kind in kinds.items():
                        if field in node and not any(r['entity_type']==kind and r['id']==node[field] for r in combined):
                            raise ValueError('Unresolved '+field)
                    if 'path' in node and 'digest' in node and 'source_commit' in node:
                        safe_path(node['path'])
                        self.get_blob(node['digest'])
                verification = record['data'].get('verification')
                if verification is not None:
                    self._check_attestation(verification)
            for record in records:
                self.db.execute('INSERT OR IGNORE INTO records VALUES(?,?,?,?)', (record['entity_type'],record['id'],record['version'],encode(record)))

    def _check_attestation(self, verification):
        """An evidence label alone is not an execution result."""
        from datetime import datetime
        expected = {k:verification[k] for k in ('source_commit','target_commit','recipe_digest','scope_digest','recipe','target','result')}
        for reference in verification['evidence']:
            try:
                attestation = json.loads(self.get_blob(reference['digest']))
            except (UnicodeDecodeError, json.JSONDecodeError) as error:
                raise ValueError('Execution evidence must be structured attestation JSON') from error
            required = set(expected) | {'schema_version','runner','environment','executed_at','checks'}
            if not isinstance(attestation,dict) or set(attestation) != required or attestation['schema_version'] != 'headstart-execution-0.1':
                raise ValueError('Invalid execution attestation structure')
            if any(attestation[k] != v for k,v in expected.items()):
                raise ValueError('Execution attestation context mismatch')
            if not all(isinstance(attestation[k],str) and attestation[k].strip() for k in ('runner','environment','executed_at')):
                raise ValueError('Execution requires runner/environment/time')
            try:
                if datetime.fromisoformat(attestation['executed_at'].replace('Z','+00:00')).tzinfo is None:
                    raise ValueError('Execution timestamp requires timezone')
            except (ValueError,TypeError) as error:
                raise ValueError('Invalid execution timestamp') from error
            checks=attestation['checks']
            if not isinstance(checks,list) or len(checks)!=len(verification['checks']):
                raise ValueError('Execution checks do not match')
            for label,check in zip(verification['checks'],checks):
                if not isinstance(check,dict) or set(check)!={'name','result','log_digest'} or check['name']!=label or check['result']!='passed':
                    raise ValueError('Execution check missing or failed')
                if not self.get_blob(check['log_digest']):
                    raise ValueError('Execution log is empty')

    def records(self, published_only=True):
        live = [json.loads(row['payload']) for row in self.db.execute('SELECT r.payload FROM records r LEFT JOIN tombstones t ON r.entity=t.entity AND r.id=t.id WHERE t.id IS NULL ORDER BY r.entity,r.id,r.version')]
        if not published_only:
            return live
        live_projects = {r['id'] for r in live if r['entity_type']=='project'}
        parents = {(r['id'],r['version']) for r in live if r['entity_type']=='project_version' and r['data']['publication_state']=='published' and r['data']['project_id'] in live_projects}
        components = {r['id'] for r in live if r['entity_type']=='component' and r['data']['project_id'] in live_projects}
        output = []
        for record in live:
            data = record['data']
            if data.get('verification') is not None:
                try:
                    self._check_attestation(data['verification'])
                except (ValueError, OSError):
                    continue
            if record['entity_type']=='project_version' and (record['id'],record['version']) in parents:
                output.append(record)
            elif record['entity_type']=='component_version' and data['component_id'] in components and data['readiness']!='suggested':
                parent = data['project_version']
                if (parent['id'],parent['version']) in parents:
                    output.append(record)
        return output

    def tombstone(self, entity, record_id, reason):
        if not reason.strip():
            raise ValueError('Removal reason required')
        with self.transaction():
            if not self.db.execute('SELECT 1 FROM records WHERE entity=? AND id=?',(entity,record_id)).fetchone():
                raise ValueError('Unknown record')
            self.db.execute('INSERT OR IGNORE INTO tombstones(entity,id,reason) VALUES(?,?,?)',(entity,record_id,reason))

    def record_demo_check(self, project_id, observed_at, data):
        from datetime import datetime
        timestamp = datetime.fromisoformat(observed_at.replace('Z','+00:00'))
        if timestamp.tzinfo is None:
            raise ValueError('Timestamp must have timezone')
        with self.transaction():
            if not self.db.execute('SELECT 1 FROM records WHERE entity=? AND id=?',('project',project_id)).fetchone():
                raise ValueError('Unknown project')
            self.db.execute('INSERT INTO observations(project_id,observed_at,payload) VALUES(?,?,?)',(project_id,observed_at,encode(data)))

    def put_blob(self, data, expected_digest, display_rights=None):
        if not re.fullmatch('[0-9a-f]{64}', expected_digest) or hashlib.sha256(data).hexdigest() != expected_digest:
            raise ValueError('Digest mismatch')
        if display_rights is not None and (display_rights.get('status') != 'approved' or not display_rights.get('evidence') or not display_rights.get('reviewer')):
            raise ValueError('Display approval requires evidence and reviewer')
        dest = self.evidence_root / expected_digest
        if dest.is_symlink():
            raise ValueError('Unsafe blob path')
        if dest.exists():
            if hashlib.sha256(dest.read_bytes()).hexdigest() != expected_digest:
                raise ValueError('Tampered evidence')
        else:
            with dest.open('xb') as file:
                file.write(data)
        with self.transaction():
            self.db.execute('INSERT OR IGNORE INTO blobs VALUES(?,?,?)',(expected_digest,int(display_rights is not None),encode(display_rights)))
        return expected_digest

    def get_blob(self, digest, for_display=False):
        if not re.fullmatch('[0-9a-f]{64}',digest):
            raise ValueError('Invalid digest')
        row = self.db.execute('SELECT * FROM blobs WHERE digest=?',(digest,)).fetchone()
        if row is None or (for_display and not row['display_approved']):
            raise ValueError('Blob unavailable or display rights unresolved')
        path = self.evidence_root / digest
        if path.is_symlink() or path.resolve().parent != self.evidence_root:
            raise ValueError('Unsafe blob path')
        data = path.read_bytes()
        if hashlib.sha256(data).hexdigest() != digest:
            raise ValueError('Tampered evidence')
        return data

    def export(self):
        return {table:[dict(row) for row in self.db.execute('SELECT * FROM '+table)] for table in ('migrations','research','research_history','records','tombstones','observations','blobs')}

    def backup(self, target):
        if Path(target).resolve() == self.database.resolve():
            raise ValueError('Backup must use another file')
        destination = sqlite3.connect(target)
        try:
            self.db.backup(destination)
        finally:
            destination.close()
