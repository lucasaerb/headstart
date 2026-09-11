"""A real interrupted writer must not take the previous public catalog offline."""
from pathlib import Path
import selectors
import subprocess
import sys
import tempfile
import unittest

from services.catalog.api import serve
from services.catalog.seed import seed_reviewed_tile
from services.catalog.store import CatalogStore


class CatalogRecoveryTests(unittest.TestCase):
    def test_partial_schema_initialization_repairs_missing_guards(self):
        with tempfile.TemporaryDirectory(prefix='headstart-schema-repair-') as folder:
            root = Path(folder)
            store = CatalogStore(root / 'catalog.db', root / 'evidence')
            store.db.execute('DROP TRIGGER immutable_records_delete')
            store.db.commit()
            store.close()
            repaired = CatalogStore(root / 'catalog.db', root / 'evidence')
            try:
                self.assertIsNotNone(repaired.db.execute(
                    "SELECT 1 FROM sqlite_master WHERE type='trigger' AND name='immutable_records_delete'"
                ).fetchone())
            finally:
                repaired.close()

    def test_public_search_survives_inflight_and_crashed_rebuild(self):
        with tempfile.TemporaryDirectory(prefix='headstart-recovery-') as folder:
            root = Path(folder)
            database, evidence = root / 'catalog.db', root / 'evidence'
            store = CatalogStore(database, evidence)
            seed_reviewed_tile(store)
            store.close()
            key = b'controlled-recovery-test-key-00001'
            before = serve('/v1/search', database, evidence, key)
            # First-party worker stages a valid new immutable version inside an
            # outer transaction, then exits without cleanup to simulate a crash.
            worker = """
import os, sys
from services.catalog.store import CatalogStore
s=CatalogStore(sys.argv[1],sys.argv[2])
s.db.execute('BEGIN IMMEDIATE')
row=next(r for r in s.records() if r['entity_type']=='component_version')
row['version']='rebuild-candidate'
s.put_record(row)
print('staged',flush=True)
sys.stdin.read(1)
os._exit(23)
"""
            process = subprocess.Popen(
                [sys.executable, '-c', worker, str(database), str(evidence)],
                stdin=subprocess.PIPE, stdout=subprocess.PIPE,
                stderr=subprocess.PIPE, text=True,
            )
            try:
                with selectors.DefaultSelector() as ready:
                    ready.register(process.stdout, selectors.EVENT_READ)
                    self.assertTrue(ready.select(10), 'Rebuild worker did not stage')
                    self.assertEqual('staged', process.stdout.readline().strip())
                # Opens a NEW real API connection while the writer is alive.
                self.assertEqual(before, serve('/v1/search', database, evidence, key))
                process.stdin.write('x')
                process.stdin.flush()
                self.assertEqual(23, process.wait(timeout=10))
                self.assertEqual(before, serve('/v1/search', database, evidence, key))
                reopened = CatalogStore(database, evidence)
                try:
                    self.assertFalse(any(r['version'] == 'rebuild-candidate' for r in reopened.records(False)))
                    # A later valid rebuild can still commit normally.
                    row = next(r for r in reopened.records() if r['entity_type'] == 'component_version')
                    row['version'] = 'rebuild-complete'
                    reopened.put_record(row)
                finally:
                    reopened.close()
                after = serve('/v1/search', database, evidence, key)
                self.assertEqual(before['total'] + 1, after['total'])
            finally:
                if process.poll() is None:
                    process.kill()
                    process.wait(timeout=10)
                for stream in (process.stdin, process.stdout, process.stderr):
                    stream.close()
