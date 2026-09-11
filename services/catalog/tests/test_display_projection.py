import json
from pathlib import Path
import unittest
from services.catalog.display_projection import include_missing_references

ROOT=Path(__file__).resolve().parents[3]

class DisplayProjectionTest(unittest.TestCase):
    def test_pending_media_rows_are_not_restored_into_public_projection(self):
        research=json.loads((ROOT/'research/catalog/catalog.json').read_text())['records']
        source=(ROOT/'HeadStart-Starter-Package/site/dist/catalog.js').read_text()
        existing=json.loads(source.removeprefix('window.HEADSTART_CATALOG = ').strip().removesuffix(';'))
        combined=include_missing_references(existing,research)
        recent={r['id'] for r in json.loads((ROOT/'research/catalog/records/recent-vibe.json').read_text())}
        self.assertEqual(combined,existing)
        self.assertEqual(len(existing),41)
        self.assertTrue(recent <= {r['id'] for r in combined})
        self.assertEqual(len(research),41)
        self.assertEqual(include_missing_references(combined,research),combined)
