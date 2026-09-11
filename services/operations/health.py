"""Bounded local public-URL reachability. This never runs game code."""
import ipaddress
import http.client
import socket
import time
from urllib.parse import urlsplit
from services.intake.pipeline import PinnedHTTPS
from services.submissions.store import safe_url

CADENCE = {'reachability': 86400, 'interactive': 7 * 86400}
CATEGORIES = {'reachable', 'redirect_review', 'broken_url', 'rate_limited',
              'access_denied', 'host_failure', 'network_failure', 'unsafe_destination',
              'interactive_unchecked'}


def probe(url):
    safe_url(url)
    parsed = urlsplit(url)
    addresses = {r[4][0] for r in socket.getaddrinfo(parsed.hostname, 443, type=socket.SOCK_STREAM)}
    if not addresses or any(not ipaddress.ip_address(address).is_global for address in addresses):
        return 'unsafe_destination'
    connection = PinnedHTTPS(parsed.hostname, sorted(addresses)[0])
    connection.timeout = 5
    try:
        connection.request('HEAD', parsed.path or '/', headers={'User-Agent': 'HeadStart-health/1', 'Accept-Encoding': 'identity'})
        status = connection.getresponse().status
        if 200 <= status < 300:
            return 'reachable'
        if 300 <= status < 400:
            # Do not follow or persist untrusted redirect destinations.
            return 'redirect_review'
        if status == 429:
            return 'rate_limited'
        if status in (401, 403):
            return 'access_denied'
        if status >= 500:
            return 'host_failure'
        return 'broken_url'
    finally:
        connection.close()


class HealthJobs:
    def __init__(self, db, *, clock=time.time):
        self.db, self.clock = db, clock
        db.executescript('''
            CREATE TABLE IF NOT EXISTS health_targets (
                id TEXT PRIMARY KEY, url TEXT NOT NULL, featured INTEGER NOT NULL);
            CREATE TABLE IF NOT EXISTS health_observations (
                id INTEGER PRIMARY KEY, target TEXT NOT NULL, kind TEXT NOT NULL,
                observed_at INTEGER NOT NULL, category TEXT NOT NULL);
            CREATE TRIGGER IF NOT EXISTS health_observations_no_update
                BEFORE UPDATE ON health_observations BEGIN SELECT RAISE(ABORT,'Health observations are immutable'); END;
            CREATE TRIGGER IF NOT EXISTS health_observations_no_delete
                BEFORE DELETE ON health_observations BEGIN SELECT RAISE(ABORT,'Health observations are immutable'); END;
            CREATE TABLE IF NOT EXISTS health_hosts (
                host TEXT PRIMARY KEY, retry_at INTEGER NOT NULL, failures INTEGER NOT NULL);
        ''')
        db.commit()

    def register(self, target_id, url, *, featured=False):
        import re
        if not isinstance(target_id, str) or not re.fullmatch('[a-z0-9][a-z0-9-]{0,159}', target_id):
            raise ValueError('Use a public catalog target ID')
        url = safe_url(url)
        with self.db:
            old = self.db.execute('SELECT url,featured FROM health_targets WHERE id=?', (target_id,)).fetchone()
            if old and tuple(old) != (url, int(featured is True)):
                raise ValueError('Changed demo needs a new target revision')
            self.db.execute('INSERT OR IGNORE INTO health_targets VALUES(?,?,?)', (target_id, url, int(featured is True)))

    def run(self, *, fetch=probe, limit=10):
        if type(limit) is not int or not 1 <= limit <= 25:
            raise ValueError('Job limit must be between 1 and 25')
        now = int(self.clock())
        results, hosts = [], set()
        for target, url, featured in self.db.execute('SELECT id,url,featured FROM health_targets ORDER BY id').fetchall():
            if len(results) >= limit:
                break
            host = urlsplit(url).hostname
            if host in hosts:
                continue  # One network request per host in a batch.
            blocked = self.db.execute('SELECT retry_at,failures FROM health_hosts WHERE host=?', (host,)).fetchone()
            if blocked and blocked[0] > now:
                continue
            latest = self.db.execute("SELECT MAX(observed_at) FROM health_observations WHERE target=? AND kind='reachability'", (target,)).fetchone()[0]
            if latest is not None and now - latest < CADENCE['reachability']:
                continue
            hosts.add(host)
            try:
                category = fetch(url)
                if not isinstance(category, str) or category not in CATEGORIES - {'interactive_unchecked'}:
                    category = 'network_failure'
            except ValueError:
                category = 'unsafe_destination'
            except (OSError, TimeoutError, http.client.HTTPException):
                category = 'network_failure'
            with self.db:
                self.db.execute('INSERT INTO health_observations(target,kind,observed_at,category) VALUES(?,?,?,?)', (target, 'reachability', now, category))
                failures = 0 if category == 'reachable' else min((blocked[1] if blocked else 0) + 1, 8)
                delay = min(7 * 86400, 3600 * 2 ** failures) if failures else 60
                self.db.execute('INSERT INTO health_hosts VALUES(?,?,?) ON CONFLICT(host) DO UPDATE SET retry_at=excluded.retry_at,failures=excluded.failures', (host, now + delay, failures))
            results.append({'target': target, 'kind': 'reachability', 'observedAt': now, 'category': category})
        return results

    def status(self):
        now = int(self.clock())
        output = []
        for target, url, featured in self.db.execute('SELECT id,url,featured FROM health_targets ORDER BY id'):
            row = self.db.execute("SELECT observed_at,category FROM health_observations WHERE target=? AND kind='reachability' ORDER BY id DESC LIMIT 1", (target,)).fetchone()
            output.append({'target': target, 'reachability': None if not row else {'observedAt': row[0], 'category': row[1], 'stale': now - row[0] >= CADENCE['reachability']}, 'interactive': {'status': 'unchecked', 'observedAt': None, 'proposedCadenceSeconds': CADENCE['interactive'] if featured else None}})
        return output
