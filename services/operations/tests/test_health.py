import sqlite3
import unittest
from unittest.mock import patch
from services.operations.health import HealthJobs, probe, bounded_probe


class HealthTests(unittest.TestCase):
    def setUp(self):
        self.db = sqlite3.connect(':memory:')
        self.now = 2000000000
        self.jobs = HealthJobs(self.db, clock=lambda: self.now)
        self.jobs.register('demo-v1', 'https://example.com/game', featured=True)

    def tearDown(self):
        self.db.close()

    def test_reachability_never_implies_interactive_success(self):
        rows = self.jobs.run(fetch=lambda _: 'reachable')
        self.assertEqual(rows[0]['category'], 'reachable')
        status = self.jobs.status()[0]
        self.assertEqual(status['interactive']['status'], 'unchecked')
        self.assertIsNone(status['interactive']['observedAt'])
        self.assertEqual(status['interactive']['proposedCadenceSeconds'], 604800)
        self.assertEqual(self.jobs.run(fetch=lambda _: self.fail('Daily check ran twice')), [])

    def test_failure_categories_and_backoff(self):
        for i, category in enumerate(('broken_url', 'redirect_review', 'rate_limited', 'network_failure')):
            self.now += 8 * 86400
            result = self.jobs.run(fetch=lambda _, c=category: c)
            self.assertEqual(result[0]['category'], category)
        self.jobs.register('another-demo', 'https://example.com/another')
        self.assertEqual(self.jobs.run(fetch=lambda _: self.fail('Host backoff ignored')), [])
        self.assertEqual(self.db.execute('SELECT COUNT(*) FROM health_observations').fetchone()[0], 4)

    def test_new_demo_revision_preserves_history(self):
        self.jobs.run(fetch=lambda _: 'reachable')
        with self.assertRaises(ValueError):
            self.jobs.register('demo-v1', 'https://example.org/new')
        self.jobs.register('demo-v2', 'https://example.org/new')
        self.assertEqual(self.jobs.status()[0]['reachability']['category'], 'reachable')
        self.assertIsNone(self.jobs.status()[1]['reachability'])

    def test_private_dns_never_opens_connection(self):
        answer = [(2, 1, 6, '', ('127.0.0.1', 443))]
        with patch('services.operations.health.socket.getaddrinfo', return_value=answer), patch('services.operations.health.PinnedHTTPS') as connection:
            self.assertEqual(probe('https://example.com/demo'), 'unsafe_destination')
            connection.assert_not_called()

    def test_host_budget_and_invalid_worker_result(self):
        self.jobs.register('second-demo', 'https://example.com/two')
        rows = self.jobs.run(fetch=lambda _: {'secret': 'not persisted'})
        self.assertEqual(len(rows), 1)

    def test_real_bounded_worker_rejects_unsafe_url_and_exits(self):
        import multiprocessing
        before = {p.pid for p in multiprocessing.active_children()}
        self.assertEqual(bounded_probe('http://127.0.0.1/private'), 'unsafe_destination')
        self.assertEqual({p.pid for p in multiprocessing.active_children()}, before)

    def test_active_lease_prevents_duplicate_worker_and_crash_lease_expires(self):
        def worker(url):
            self.assertEqual(self.jobs.run(fetch=lambda _: self.fail('Concurrent duplicate')), [])
            return 'reachable'
        self.jobs.run(fetch=worker)
        self.assertEqual(self.db.execute('SELECT COUNT(*) FROM health_leases').fetchone()[0], 0)
        self.jobs.register('other-host', 'https://example.org/demo')
        with self.db:
            self.db.execute('INSERT INTO health_leases VALUES(?,?)', ('other-host', self.now + 60))
        self.assertEqual(self.jobs.run(fetch=lambda _: self.fail('Live lease ignored')), [])
        self.now += 61
        self.assertEqual(self.jobs.run(fetch=lambda _: 'reachable')[0]['target'], 'other-host')

    def test_cancellation_stops_before_network_and_preserves_observations(self):
        self.assertEqual(self.jobs.run(fetch=lambda _: self.fail('Cancelled request ran'), cancelled=lambda: True), [])
        self.assertEqual(self.jobs.status()[0]['reachability'], None)
