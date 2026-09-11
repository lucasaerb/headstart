import json
import shutil
import sqlite3
import tempfile
import unittest
from pathlib import Path
from services.operations.events import EventStore, REVIEW_RECEIPT, REVIEW_DOCUMENT, RETENTION_SECONDS

ROOT = Path(__file__).resolve().parents[3]
BUNDLE = 'docs/reviews/reference-integrations/final-0.7'


class ReviewedEventTests(unittest.TestCase):
    def setUp(self):
        self.db = sqlite3.connect(':memory:')
        self.now = 2000000000
        self.store = EventStore(self.db, enabled=True, clock=lambda: self.now)

    def tearDown(self):
        self.db.close()

    def copied_bundle(self, root):
        shutil.copytree(ROOT / BUNDLE, root / BUNDLE)
        for relative in (REVIEW_RECEIPT, REVIEW_DOCUMENT):
            path = root / relative
            path.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(ROOT / relative, path)

    def test_actual_accepted_ten_are_deduplicated_and_not_user_adoption(self):
        self.assertEqual(self.store.ingest_reviewed_references(ROOT, authorized=True),
                         {'status': 'recorded', 'inserted': 10})
        self.assertEqual(self.store.ingest_reviewed_references(ROOT, authorized=True)['status'], 'duplicate')
        metrics = self.store.counts()
        self.assertEqual(metrics['verifiedReuse'], 10)
        self.assertEqual(metrics['verifiedReuseScope'], 'reviewed_reference_integrations_not_user_adoption')
        self.assertEqual(metrics['events']['reuse_self_reported'], 0)
        rows = list(self.db.execute('SELECT * FROM reviewed_reference_reuse'))
        self.assertEqual(len(rows), 10)
        self.assertTrue(all(len(row[0]) == 64 and len(row[1]) == 64 and isinstance(row[2], int) for row in rows))
        for private_field in ('target', '/tmp/', 'sourceFiles', 'brief', 'reuse_mcp'):
            self.assertNotIn(private_field, json.dumps(rows))

    def test_explicit_local_activation_and_retention(self):
        with self.assertRaises(ValueError):
            self.store.ingest_reviewed_references(ROOT)
        self.assertIsNone(self.store.counts()['verifiedReuse'])
        self.store.enabled = False
        self.assertEqual(self.store.ingest_reviewed_references('/missing', authorized=True)['status'], 'disabled')
        self.store.enabled = True
        self.store.ingest_reviewed_references(ROOT, authorized=True)
        self.now += RETENTION_SECONDS
        self.assertEqual(self.store.counts()['verifiedReuse'], 0)

    def test_self_authored_review_and_changed_bound_artifacts_rejected_atomically(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            self.copied_bundle(root)
            relatives = [REVIEW_DOCUMENT, REVIEW_RECEIPT] + [BUNDLE + '/simplexnoise/' + name for name in
                ('plan.json', 'validation.json', 'execution-attestation.json',
                 'evidence/integrated-1280,800.log', 'evidence/integrated-390,844.png')]
            for relative in relatives:
                path = root / relative
                original = path.read_bytes()
                path.write_bytes(b'{}' if relative.endswith('.json') else b'self-authored replacement')
                with self.assertRaises(ValueError):
                    self.store.ingest_reviewed_references(root, authorized=True)
                self.assertEqual(self.db.execute('SELECT COUNT(*) FROM reviewed_reference_reuse').fetchone()[0], 0)
                self.assertIsNone(self.store.counts()['verifiedReuse'])
                path.write_bytes(original)

    def test_missing_symlink_and_oversized_capture_fail_closed(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            self.copied_bundle(root)
            path = root / BUNDLE / 'simplexnoise/evidence/integrated-390,844.png'
            path.unlink()
            with self.assertRaises(ValueError):
                self.store.ingest_reviewed_references(root, authorized=True)
            secret = root / 'private.txt'
            secret.write_text('Do not ingest private target data')
            path.symlink_to(secret)
            with self.assertRaises(ValueError):
                self.store.ingest_reviewed_references(root, authorized=True)
            path.unlink()
            path.write_bytes(b'x' * 5000001)
            with self.assertRaises(ValueError):
                self.store.ingest_reviewed_references(root, authorized=True)
            self.assertEqual(self.db.execute('SELECT COUNT(*) FROM reviewed_reference_reuse').fetchone()[0], 0)


if __name__ == '__main__':
    unittest.main()
