"""Optional local aggregate telemetry. No arbitrary event properties are persisted."""
import hashlib
import hmac
import re
import secrets
import time

EVENTS = frozenset({
    'search', 'detail', 'demo', 'source', 'handoff', 'plugin_lookup',
    'first_plan', 'reuse_self_reported',
})
RETENTION_SECONDS = 30 * 86400


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
        ''')
        db.execute('INSERT OR IGNORE INTO operations_settings VALUES(?,?)',
                   ('telemetry_salt', secrets.token_hex(32)))
        self.salt = bytes.fromhex(db.execute(
            'SELECT value FROM operations_settings WHERE key=?',
            ('telemetry_salt',)).fetchone()[0])
        db.commit()

    def subject(self, deletion_token):
        return hmac.new(self.salt, token(deletion_token).encode(), hashlib.sha256).hexdigest()

    def collect(self, event, *, consent=False):
        if not self.enabled or consent is not True:
            return {'status': 'disabled'}
        if not isinstance(event, dict) or set(event) - {'eventId', 'deletionToken', 'type', 'catalogId'}:
            raise ValueError('Only minimal event fields are accepted')
        event_id = token(event.get('eventId'))
        subject = self.subject(event.get('deletionToken'))
        kind = event.get('type')
        if kind not in EVENTS:
            # Verified reuse has a separate reviewed-evidence boundary, not a client event.
            raise ValueError('Unsupported interaction event')
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
        return self.db.execute('DELETE FROM interaction_events WHERE observed_at<=?',
                               (now - RETENTION_SECONDS,)).rowcount

    def forget(self, deletion_token):
        with self.db:
            count = self.db.execute('DELETE FROM interaction_events WHERE subject=?',
                                    (self.subject(deletion_token),)).rowcount
        return count

    def counts(self):
        with self.db:
            self.prune()
        counts = {kind: 0 for kind in sorted(EVENTS)}
        counts.update(dict(self.db.execute(
            'SELECT kind,COUNT(*) FROM interaction_events GROUP BY kind')))
        return {'events': counts, 'verifiedReuse': None,
                'verifiedReuseStatus': 'reviewed_evidence_adapter_not_activated',
                'retentionDays': 30, 'collectionEnabled': self.enabled}
