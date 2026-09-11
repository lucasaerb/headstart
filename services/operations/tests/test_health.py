import sqlite3
import unittest
from unittest.mock import patch
from services.operations.health import HealthJobs, probe


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
