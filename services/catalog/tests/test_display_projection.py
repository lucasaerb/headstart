import json
from pathlib import Path
import unittest
from services.catalog.display_projection import include_missing_references

ROOT=Path(__file__).resolve().parents[3]

class DisplayProjectionTest(unittest.TestCase):
    def test_all_research_ids_are_retained_without_unreviewed_images(self):
        research=json.loads((ROOT/'research/catalog/catalog.json').read_text())['records']
        source=(ROOT/'HeadStart-Starter-Package/site/dist/catalog.js').read_text()
        existing=json.loads(source.removeprefix('window.HEADSTART_CATALOG = ').strip().removesuffix(';'))
        combined=include_missing_references(existing,research)
        self.assertEqual({r['id'] for r in combined},{r['id'] for r in research})
        self.assertEqual(combined[:len(existing)],existing)
        for row in combined[len(existing):]:
            self.assertIsNone(row['preview'])
            self.assertIsNone(row['githubStars'])
            self.assertEqual(row['catalogStatus'],'research_only')
            self.assertEqual(row['readiness'],'review_required')
            self.assertEqual(row['rights']['scope_reuse_status'],'review_required')
        self.assertEqual(include_missing_references(combined,research),combined)
