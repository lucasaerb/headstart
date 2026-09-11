"""Bounded local public-URL reachability. This never runs game code."""
import ipaddress
import http.client
import hashlib
import json
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


def _probe_worker(connection, url):
    try:
        result = probe(url)
    except ValueError:
        result = 'unsafe_destination'
    except Exception:
        # Only a fixed category crosses the process boundary; no exception data.
        result = 'network_failure'
    try:
        connection.send(result)
    finally:
        connection.close()


def bounded_probe(url):
    """Bound DNS, TLS and HTTP together; terminate the disposable worker on timeout."""
    import multiprocessing
    context = multiprocessing.get_context('spawn')
    receiver, sender = context.Pipe(duplex=False)
    process = context.Process(target=_probe_worker, args=(sender, url), daemon=True)
    try:
        process.start()
        sender.close()
        if not receiver.poll(10):
            return 'network_failure'
        try:
            return receiver.recv()
        except EOFError:
            return 'network_failure'
    finally:
        if process.pid is not None:
            if process.is_alive():
                process.terminate()
            process.join(timeout=2)
            if process.is_alive():
                process.kill()
                process.join(timeout=2)
        receiver.close()
        sender.close()


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
            CREATE TABLE IF NOT EXISTS health_interactive_records (
                digest TEXT PRIMARY KEY, target TEXT NOT NULL, observed_at INTEGER NOT NULL, payload TEXT NOT NULL);
            CREATE TRIGGER IF NOT EXISTS health_interactive_no_update BEFORE UPDATE ON health_interactive_records BEGIN SELECT RAISE(ABORT,'Interactive evidence is immutable'); END;
            CREATE TRIGGER IF NOT EXISTS health_interactive_no_delete BEFORE DELETE ON health_interactive_records BEGIN SELECT RAISE(ABORT,'Interactive evidence is immutable'); END;
            CREATE TABLE IF NOT EXISTS health_leases (
                target TEXT PRIMARY KEY, expires_at INTEGER NOT NULL);
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

    def run(self, *, fetch=bounded_probe, limit=10, cancelled=lambda: False):
        if type(limit) is not int or not 1 <= limit <= 25:
            raise ValueError('Job limit must be between 1 and 25')
        now = int(self.clock())
        results, hosts = [], set()
        deadline = time.monotonic() + 30
        for target, url, featured in self.db.execute('SELECT id,url,featured FROM health_targets ORDER BY id').fetchall():
            if len(results) >= limit or time.monotonic() >= deadline or cancelled():
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
            with self.db:
                self.db.execute('BEGIN IMMEDIATE')
                # Recheck under the write lock: another worker may have claimed the host.
                current = self.db.execute('SELECT retry_at FROM health_hosts WHERE host=?', (host,)).fetchone()
                lease = self.db.execute('SELECT expires_at FROM health_leases WHERE target=?', (target,)).fetchone()
                if (current and current[0] > now) or (lease and lease[0] > now):
                    continue
                self.db.execute('INSERT INTO health_leases VALUES(?,?) ON CONFLICT(target) DO UPDATE SET expires_at=excluded.expires_at', (target, now + 60))
                self.db.execute('INSERT INTO health_hosts VALUES(?,?,?) ON CONFLICT(host) DO UPDATE SET retry_at=excluded.retry_at', (host, now + 60, blocked[1] if blocked else 0))
            hosts.add(host)
            try:
                category = fetch(url)
                if not isinstance(category, str) or category not in CATEGORIES - {'interactive_unchecked'}:
                    category = 'network_failure'
            except ValueError:
                category = 'unsafe_destination'
            except Exception:
                category = 'network_failure'
            with self.db:
                self.db.execute('DELETE FROM health_leases WHERE target=?', (target,))
                self.db.execute('INSERT INTO health_observations(target,kind,observed_at,category) VALUES(?,?,?,?)', (target, 'reachability', now, category))
                failures = 0 if category == 'reachable' else min((blocked[1] if blocked else 0) + 1, 8)
                delay = min(7 * 86400, 3600 * 2 ** failures) if failures else 60
                self.db.execute('INSERT INTO health_hosts VALUES(?,?,?) ON CONFLICT(host) DO UPDATE SET retry_at=excluded.retry_at,failures=excluded.failures', (host, now + delay, failures))
            results.append({'target': target, 'kind': 'reachability', 'observedAt': now, 'category': category})
        return results

    def record_interactive(self, target, plan, report):
        from .browser import validate_plan
        validate_plan(plan)
        row=self.db.execute('SELECT url FROM health_targets WHERE id=?',(target,)).fetchone()
        expected=hashlib.sha256(json.dumps(plan,sort_keys=True,separators=(',',':')).encode()).hexdigest()
        if not row or row[0]!=plan['url'] or not isinstance(report,dict) or report.get('schemaVersion')!='headstart-interactive-check-1' or report.get('planDigest')!=expected:
            raise ValueError('Interactive report does not match the registered target and probe')
        if report.get('category') not in ('interactive_passed','interactive_failed','navigation_only','worker_failed') or type(report.get('observedAt')) is not int:
            raise ValueError('Invalid interactive result')
        if report['category']=='interactive_passed' and (len(report.get('checks',[]))!=len(plan['steps'])+1 or not all(c.get('passed') is True for c in report['checks'])):
            raise ValueError('Interactive success requires every declared outcome')
        raw=json.dumps(report,sort_keys=True,separators=(',',':'))
        if len(raw)>100000:raise ValueError('Interactive report too large')
        identity=hashlib.sha256(raw.encode()).hexdigest()
        with self.db:self.db.execute('INSERT OR IGNORE INTO health_interactive_records VALUES(?,?,?,?)',(identity,target,report['observedAt'],raw))
        return identity

    def status(self):
        now = int(self.clock())
        output = []
        for target, url, featured in self.db.execute('SELECT id,url,featured FROM health_targets ORDER BY id'):
            row = self.db.execute("SELECT observed_at,category FROM health_observations WHERE target=? AND kind='reachability' ORDER BY id DESC LIMIT 1", (target,)).fetchone()
            actual=self.db.execute('SELECT digest,observed_at,payload FROM health_interactive_records WHERE target=? ORDER BY observed_at DESC LIMIT 1',(target,)).fetchone()
            interactive={'status':'unchecked','observedAt':None,'proposedCadenceSeconds':CADENCE['interactive'] if featured else None}
            if actual:
                report=json.loads(actual[2]);interactive.update(status=report['category'],observedAt=actual[1],evidenceDigest=actual[0],stale=now-actual[1]>=CADENCE['interactive'])
            output.append({'target': target, 'reachability': None if not row else {'observedAt': row[0], 'category': row[1], 'stale': now - row[0] >= CADENCE['reachability']}, 'interactive':interactive})
        return output
