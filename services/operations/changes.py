"""Immutable source-change candidates and retry-safe local review outbox."""
import hashlib
import json
import re
import time
from services.submissions.store import safe_url


def digest(value):
    return hashlib.sha256(json.dumps(value, sort_keys=True, separators=(',', ':')).encode()).hexdigest()


def snapshot(value):
    if not isinstance(value, dict) or set(value) != {'sourceCommit', 'sourceDigest', 'licenseDigest'}:
        raise ValueError('Expected pinned source and license digests')
    for key, width in (('sourceCommit', 40), ('sourceDigest', 64), ('licenseDigest', 64)):
        if not isinstance(value[key], str) or not re.fullmatch('[a-f0-9]{' + str(width) + '}', value[key]):
            raise ValueError('Invalid snapshot digest')
    return value


class SourceChanges:
    def __init__(self, db, *, clock=time.time):
        self.db, self.clock = db, clock
        db.executescript('''
            CREATE TABLE IF NOT EXISTS source_change_candidates (
                id TEXT PRIMARY KEY, payload TEXT NOT NULL);
            CREATE TRIGGER IF NOT EXISTS source_candidates_no_update BEFORE UPDATE ON source_change_candidates
                BEGIN SELECT RAISE(ABORT,'Source-change candidates are immutable'); END;
            CREATE TRIGGER IF NOT EXISTS source_candidates_no_delete BEFORE DELETE ON source_change_candidates
                BEGIN SELECT RAISE(ABORT,'Source-change candidates are immutable'); END;
            CREATE TABLE IF NOT EXISTS source_change_outbox (
                id TEXT PRIMARY KEY, queue_id TEXT, attempts INTEGER NOT NULL DEFAULT 0,
                status TEXT NOT NULL DEFAULT 'pending');
        ''')
        columns={r[1] for r in db.execute('PRAGMA table_info(source_change_outbox)')}
        if 'lease_until' not in columns:db.execute('ALTER TABLE source_change_outbox ADD COLUMN lease_until INTEGER NOT NULL DEFAULT 0')
        db.commit()

    def observe(self, repository, old, new):
        repository = safe_url(repository, True)
        old, new = snapshot(old), snapshot(new)
        if old == new:
            return None
        identity = digest({'repository': repository, 'previous': old, 'candidate': new})
        candidate = {'schemaVersion': 'headstart-source-change-1', 'id': identity,
                     'repository': repository, 'previous': old, 'candidate': new,
                     'status': 'candidate', 'readiness': 'suggested',
                     'rights': 'review_required', 'verification': None,
                     'changed': [key for key in old if old[key] != new[key]],
                     'observedAt': int(self.clock())}
        with self.db:
            self.db.execute('INSERT OR IGNORE INTO source_change_candidates VALUES(?,?)',
                            (identity, json.dumps(candidate, sort_keys=True)))
            self.db.execute('INSERT OR IGNORE INTO source_change_outbox(id) VALUES(?)', (identity,))
        return identity

    def dispatch(self, queue, *, limit=10):
        if type(limit) is not int or not 1 <= limit <= 25:
            raise ValueError('Invalid dispatch limit')
        output = []
        rows = self.db.execute("SELECT id,attempts FROM source_change_outbox WHERE status='pending' OR (status='processing' AND lease_until<=?) ORDER BY id LIMIT ?", (int(self.clock()),limit,)).fetchall()
        for identity, attempts in rows:
            with self.db:
                self.db.execute('BEGIN IMMEDIATE')
                claimed=self.db.execute("UPDATE source_change_outbox SET status='processing',lease_until=? WHERE id=? AND (status='pending' OR (status='processing' AND lease_until<=?))",(int(self.clock())+60,identity,int(self.clock()))).rowcount
            if not claimed:continue
            candidate = json.loads(self.db.execute('SELECT payload FROM source_change_candidates WHERE id=?', (identity,)).fetchone()[0])
            description = 'Source-change candidate ' + identity + '. Review pinned source and license changes before publication; prior tested evidence does not transfer.'
            # Curator-only queue lookup also recovers a crash after submit but before acknowledgment.
            try:
                existing = next((row for row in queue.all() if row['kind'] == 'correction' and row['proposal'].get('repository') == candidate['repository'] and row['proposal']['description'] == description), None)
                queue_id = existing['id'] if existing else queue.submit({'repository': candidate['repository'], 'description': description}, kind='correction')['id']
            except Exception:
                with self.db:
                    self.db.execute('UPDATE source_change_outbox SET attempts=?,status=?,lease_until=0 WHERE id=?', (attempts + 1, 'failed' if attempts + 1 >= 3 else 'pending', identity))
                output.append({'id': identity, 'status': 'retry_required'})
                continue
            with self.db:
                self.db.execute("UPDATE source_change_outbox SET queue_id=?,status='delivered',lease_until=0 WHERE id=?", (queue_id, identity))
            output.append({'id': identity, 'status': 'delivered', 'queueId': queue_id})
        return output

    def retry(self, identity):
        with self.db:
            return self.db.execute("UPDATE source_change_outbox SET attempts=0,status='pending' WHERE id=? AND status='failed'", (identity,)).rowcount
