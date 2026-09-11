"""Optional local aggregate telemetry. No arbitrary event properties are persisted."""
import hashlib
import hmac
import re
import secrets
import time
import json
from pathlib import Path

EVENTS = frozenset({
    'search', 'detail', 'demo', 'source', 'handoff', 'plugin_lookup',
    'first_plan', 'reuse_self_reported',
})
RETENTION_SECONDS = 30 * 86400
REVIEW_RECEIPT = 'docs/reviews/reuse-batches/evidence/reference-matrix-final/independent-receipt.json'
REVIEW_DOCUMENT = 'docs/reviews/reuse-batches/reference-matrix-final-review.md'
RECEIPT_DIGEST = '58a963337f4e50b20756cbfa8397b39a203ad48f07aa028683a16760ac3e4b0a'
REVIEW_DIGEST = 'bd69a7513ba507dca2b887a6052bfafdd84755ad567a5cd197a658b0fa93fbc2'
REFERENCE_ROWS = frozenset({'simplexnoise', 'improvednoise', 'capsule', 'obb',
    'roundedboxgeometry', 'parametricgeometry', 'boxlinegeometry',
    'vertexnormalshelper', 'convexgeometry', 'vertextangentshelper'})


def _digest(value):
    raw = value if isinstance(value, bytes) else json.dumps(
        value, sort_keys=True, separators=(',', ':'), ensure_ascii=False).encode()
    return hashlib.sha256(raw).hexdigest()


def _read(root, relative, limit=5000000):
    path = root / relative
    if any(p.is_symlink() for p in [path, *path.parents] if p == root or root in p.parents):
        raise ValueError('Review evidence must not use symlinks')
    if not path.is_file() or path.stat().st_size > limit:
        raise ValueError('Missing or oversized review evidence')
    with path.open('rb') as handle:
        raw = handle.read(limit + 1)
    if len(raw) > limit:
        raise ValueError('Oversized review evidence')
    return raw


def accepted_reference_keys(repository_root):
    """Pinned e937b30 acceptance only. This is not a client-authored receipt API."""
    root = Path(repository_root).resolve()
    receipt_raw = _read(root, REVIEW_RECEIPT, 100000)
    if _digest(receipt_raw) != RECEIPT_DIGEST or _digest(_read(root, REVIEW_DOCUMENT, 100000)) != REVIEW_DIGEST:
        raise ValueError('Unknown independent acceptance; reviewed adapter update required')
    receipt = json.loads(receipt_raw)
    if set(receipt) != REFERENCE_ROWS:
        raise ValueError('Incomplete accepted reference matrix')
    keys = []
    for row in sorted(REFERENCE_ROWS):
        prefix = 'docs/reviews/reference-integrations/final-0.7/' + row + '/'
        load = lambda name: json.loads(_read(root, prefix + name, 500000))
        plan, validation, attestation = load('plan.json'), load('validation.json'), load('execution-attestation.json')
        accepted = receipt[row]['author']
        if (_digest(validation) != accepted['validationDigest'] or
                _digest(attestation) != accepted['attestationDigest'] or
                plan['recipe']['digest'] != accepted['recipeDigest'] or
                _digest({k: v for k, v in plan.items() if k != 'planDigest'}) != plan['planDigest'] or
                plan['planDigest'] != validation['planDigest'] or
                validation['recipe'] != plan['recipe'] or validation['targetBase'] != plan['base'] or
                attestation['source_commit'] != plan['source']['revision'] or
                attestation['target_commit'] != plan['base']['head'] or
                attestation['recipe_digest'] != plan['recipe']['digest'] or
                validation['attestationDigest'] != _digest(attestation)):
            raise ValueError('Source target recipe or execution binding changed')
        phases = {phase + '-' + viewport: phase for phase in ('baseline', 'integrated')
                  for viewport in ('1280,800', '390,844')}
        expected_files = {key + '.' + ext for key in phases for ext in ('png', 'log')}
        if validation['result'] != 'PASS' or set(validation['results']) != set(phases) or set(validation['evidence']) != expected_files:
            raise ValueError('Incomplete successful runtime evidence')
        checks = []
        for key, phase in phases.items():
            report = validation['results'][key]['report']
            if report['result'] != 'PASS' or report['row'] != row or report['phase'] != phase:
                raise ValueError('Failed or mismatched runtime phase')
            checks.extend({'name': key + ': ' + label, 'result': 'passed',
                           'log_digest': validation['evidence'][key + '.log']} for label in report['checks'])
        if checks != attestation['checks']:
            raise ValueError('Attested checks differ from actual runtime evidence')
        for name in sorted(expected_files):
            if _digest(_read(root, prefix + 'evidence/' + name)) != validation['evidence'][name]:
                raise ValueError('Retained log or capture changed')
        keys.append(_digest({'acceptance': RECEIPT_DIGEST, 'row': row, 'attestation': accepted['attestationDigest']}))
    return keys


def token(value):
    if not isinstance(value, str) or not re.fullmatch('[a-f0-9]{64}', value):
        raise ValueError('Expected a random opaque token')
    return value


class EventStore:
    def __init__(self, db, *, enabled=False, catalog_ids=(), clock=time.time):
        self.db = db
        self.enabled = enabled is True
        self.catalog_ids = frozenset(catalog_ids)
        self.clock = clock
        db.executescript('''
            CREATE TABLE IF NOT EXISTS operations_settings (
                key TEXT PRIMARY KEY, value TEXT NOT NULL);
            CREATE TABLE IF NOT EXISTS interaction_events (
                event_id TEXT PRIMARY KEY, subject TEXT NOT NULL,
                kind TEXT NOT NULL, catalog_id TEXT, observed_at INTEGER NOT NULL);
            CREATE INDEX IF NOT EXISTS interaction_subject ON interaction_events(subject);
            CREATE INDEX IF NOT EXISTS interaction_time ON interaction_events(observed_at);
            CREATE TABLE IF NOT EXISTS reviewed_reference_reuse (
                evidence_key TEXT PRIMARY KEY, acceptance_digest TEXT NOT NULL,
                observed_at INTEGER NOT NULL);
        ''')
        db.execute('INSERT OR IGNORE INTO operations_settings VALUES(?,?)',
                   ('telemetry_salt', secrets.token_hex(32)))
        self.salt = bytes.fromhex(db.execute(
            'SELECT value FROM operations_settings WHERE key=?',
            ('telemetry_salt',)).fetchone()[0])
        db.commit()

    def subject(self, deletion_token):
        return hmac.new(self.salt, token(deletion_token).encode(), hashlib.sha256).hexdigest()

    def collect(self, event, *, consent=False, completed_action=False):
        if not self.enabled or consent is not True:
            return {'status': 'disabled'}
        if not isinstance(event, dict) or set(event) - {'eventId', 'deletionToken', 'type', 'catalogId'}:
            raise ValueError('Only minimal event fields are accepted')
        event_id = token(event.get('eventId'))
        subject = self.subject(event.get('deletionToken'))
        kind = event.get('type')
        if not isinstance(kind, str) or kind not in EVENTS:
            # Verified reuse has a separate reviewed-evidence boundary, not a client event.
            raise ValueError('Unsupported interaction event')
        if kind in ('plugin_lookup', 'first_plan') and completed_action is not True:
            raise ValueError('This metric requires an observed successful local action')
        catalog_id = event.get('catalogId')
        if catalog_id is not None and (not isinstance(catalog_id, str) or catalog_id not in self.catalog_ids):
            raise ValueError('Unknown public catalog ID')
        now = int(self.clock())
        with self.db:
            self.prune(now)
            old = self.db.execute(
                'SELECT subject,kind,catalog_id FROM interaction_events WHERE event_id=?',
                (event_id,)).fetchone()
            if old:
                if tuple(old) != (subject, kind, catalog_id):
                    raise ValueError('Event ID conflict')
                return {'status': 'duplicate'}
            self.db.execute('INSERT INTO interaction_events VALUES(?,?,?,?,?)',
                            (event_id, subject, kind, catalog_id, now))
        return {'status': 'recorded'}

    def prune(self, now=None):
        now = int(self.clock()) if now is None else now
        self.db.execute('DELETE FROM reviewed_reference_reuse WHERE observed_at<=?',
                        (now - RETENTION_SECONDS,))
        return self.db.execute('DELETE FROM interaction_events WHERE observed_at<=?',
                               (now - RETENTION_SECONDS,)).rowcount

    def forget(self, deletion_token):
        with self.db:
            count = self.db.execute('DELETE FROM interaction_events WHERE subject=?',
                                    (self.subject(deletion_token),)).rowcount
        return count

    def ingest_reviewed_references(self, repository_root, *, authorized=False):
        if not self.enabled:
            return {'status': 'disabled'}
        if authorized is not True:
            raise ValueError('Explicit local operator ingestion required')
        # Validate the entire batch before writing any aggregate. No source paths,
        # target IDs, captures, email, deletion token or raw attestations are stored.
        try:
            keys = accepted_reference_keys(repository_root)
        except (OSError, KeyError, TypeError) as error:
            raise ValueError('Malformed or unavailable reviewed evidence') from error
        with self.db:
            self.prune()
            before = self.db.total_changes
            self.db.executemany('INSERT OR IGNORE INTO reviewed_reference_reuse VALUES(?,?,?)',
                                [(key, RECEIPT_DIGEST, int(self.clock())) for key in keys])
            inserted = self.db.total_changes - before
            self.db.execute('INSERT OR REPLACE INTO operations_settings VALUES(?,?)',
                            ('reviewed_reference_adapter', RECEIPT_DIGEST))
        return {'status': 'recorded' if inserted else 'duplicate', 'inserted': inserted}

    def counts(self):
        with self.db:
            self.prune()
        counts = {kind: 0 for kind in sorted(EVENTS)}
        counts.update(dict(self.db.execute(
            'SELECT kind,COUNT(*) FROM interaction_events GROUP BY kind')))
        active = self.enabled and self.db.execute(
            'SELECT 1 FROM operations_settings WHERE key=? AND value=?',
            ('reviewed_reference_adapter', RECEIPT_DIGEST)).fetchone() is not None
        verified = self.db.execute('SELECT COUNT(*) FROM reviewed_reference_reuse WHERE acceptance_digest=?',
                                   (RECEIPT_DIGEST,)).fetchone()[0] if active else None
        return {'events': counts, 'verifiedReuse': verified,
                'verifiedReuseStatus': 'accepted_reference_evidence' if active else 'reviewed_evidence_adapter_not_activated',
                'verifiedReuseScope': 'reviewed_reference_integrations_not_user_adoption',
                'retentionDays': 30, 'collectionEnabled': self.enabled}
