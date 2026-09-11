import json
import sqlite3
import unittest
from unittest.mock import Mock
from services.operations.changes import SourceChanges
from services.submissions.store import Queue


class ChangeTests(unittest.TestCase):
    def setUp(self):
        self.db = sqlite3.connect(':memory:')
        self.changes = SourceChanges(self.db)
        self.queue = Queue(self.db)
        self.old = {'sourceCommit': 'a' * 40, 'sourceDigest': 'b' * 64, 'licenseDigest': 'c' * 64}
        self.new = dict(self.old, sourceCommit='d' * 40, licenseDigest='e' * 64)

    def tearDown(self):
        self.db.close()

    def test_change_candidate_never_inherits_tested_evidence(self):
        self.assertIsNone(self.changes.observe('https://github.com/example/game', self.old, self.old))
        identity = self.changes.observe('https://github.com/example/game', self.old, self.new)
        self.assertEqual(identity, self.changes.observe('https://github.com/example/game', self.old, self.new))
        row = json.loads(self.db.execute('SELECT payload FROM source_change_candidates').fetchone()[0])
        self.assertEqual(row['previous'], self.old)
        self.assertEqual(row['candidate'], self.new)
        self.assertEqual(row['status'], 'candidate')
        self.assertEqual(row['rights'], 'review_required')
        self.assertIsNone(row['verification'])
        with self.assertRaises(sqlite3.IntegrityError):
            self.db.execute("UPDATE source_change_candidates SET payload='{}'")
        self.db.rollback()
        self.assertEqual(self.changes.dispatch(self.queue)[0]['status'], 'delivered')
        self.assertEqual(len(self.queue.all()), 1)

    def test_crash_after_queue_submit_recovers_without_duplicate(self):
        identity = self.changes.observe('https://github.com/example/game', self.old, self.new)
        self.changes.dispatch(self.queue)
        with self.db:
            self.db.execute("UPDATE source_change_outbox SET status='pending',queue_id=NULL WHERE id=?", (identity,))
        self.changes.dispatch(self.queue)
        self.assertEqual(len(self.queue.all()), 1)

    def test_bounded_retry_exhaustion_and_manual_retry(self):
        identity = self.changes.observe('https://github.com/example/game', self.old, self.new)
        unavailable = Mock()
        unavailable.all.side_effect = OSError('private connection detail')
        for _ in range(3):
            self.assertEqual(self.changes.dispatch(unavailable)[0]['status'], 'retry_required')
        self.assertEqual(self.changes.dispatch(unavailable), [])
        self.assertEqual(self.changes.retry(identity), 1)
        self.assertEqual(self.changes.dispatch(self.queue)[0]['status'], 'delivered')
        stored = list(self.db.execute('SELECT * FROM source_change_outbox'))
        self.assertNotIn('private connection detail', json.dumps(stored))

    def test_two_real_connections_claim_only_one_dispatch(self):
        import tempfile
        import threading
        from pathlib import Path
        from concurrent.futures import ThreadPoolExecutor
        with tempfile.TemporaryDirectory() as folder:
            path=Path(folder)/'queue.db'
            first=sqlite3.connect(path,check_same_thread=False);second=sqlite3.connect(path,check_same_thread=False)
            a,b=SourceChanges(first),SourceChanges(second);qa,qb=Queue(first),Queue(second)
            a.observe('https://github.com/example/game',self.old,self.new)
            entered=threading.Event();release=threading.Event();original=qa.all
            def paused():
                entered.set();self.assertTrue(release.wait(5));return original()
            qa.all=paused
            try:
                with ThreadPoolExecutor(max_workers=2) as pool:
                    pending=pool.submit(a.dispatch,qa)
                    self.assertTrue(entered.wait(5))
                    self.assertEqual(b.dispatch(qb),[])
                    release.set();self.assertEqual(pending.result(timeout=5)[0]['status'],'delivered')
                self.assertEqual(len(qb.all()),1)
            finally:release.set();first.close();second.close()
