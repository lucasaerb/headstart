"""Restoration membership, metadata boundaries and actual retrieval behavior."""
import json
from pathlib import Path
import unittest
from services.catalog.search import search

ROOT=Path(__file__).resolve().parents[3]

class DisplayProjectionTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.rows=json.loads((ROOT/'HeadStart-Starter-Package/site/dist/catalog.js').read_text().removeprefix('window.HEADSTART_CATALOG = ').strip().removesuffix(';'))
        cls.expected=json.loads((ROOT/'docs/reviews/catalog-restoration/restoration-set.json').read_text())

    def test_exact_restored_set_and_preserved_original_order(self):
        ids=[r['id'] for r in self.rows]
        self.assertEqual(len(ids),92)
        self.assertEqual(ids[:41],self.expected['previous_ids'])
        self.assertEqual(set(ids[41:]),set(self.expected['restored_ids']))
        archived=json.loads((ROOT/'research/catalog/exclusions/excluded-records.json').read_text())['records']
        restored=json.loads((ROOT/'research/catalog/records/restored.json').read_text())
        self.assertEqual(restored,archived)
        by_id={r['id']:r for r in self.rows}
        for row in archived:
            self.assertEqual(by_id[row['id']]['rights'],row['rights'])
            self.assertEqual(by_id[row['id']]['commit'],row['source']['commit'])
            self.assertEqual(by_id[row['id']]['catalogStatus'],'local_research_preview')

    def test_pagination_default_order_filters_search_and_unknown_stars(self):
        seen=[];cursor=None
        while True:
            pairs=[('limit','12'),('retrieval','lexical')]+([('cursor',cursor)] if cursor else [])
            page=search(self.rows,pairs,b'test-secret',research=True)
            self.assertEqual(page['total'],92)
            self.assertTrue(all(r['eligibility']=='research_only' for r in page['items']))
            seen.extend(r['id'] for r in page['items']);cursor=page['nextCursor']
            if not cursor:break
        self.assertEqual(seen,[r['id'] for r in self.rows])
        native=search(self.rows,[('platform','native'),('limit','100')],b'test',research=True)
        self.assertIn('openrct2',{r['id'] for r in native['items']})
        self.assertTrue(all(r['platformKind']=='desktop' for r in native['items']))
        exact=search(self.rows,[('q','Mosswing'),('retrieval','lexical')],b'test',research=True)
        self.assertEqual(exact['items'][0]['id'],'astra-mosswing')
        stars=search(self.rows,[('sort','stars'),('limit','100')],b'test',research=True)['items']
        known=[r['githubStars'] for r in stars if r['githubStars'] is not None]
        self.assertEqual(known,sorted(known,reverse=True))
        self.assertTrue(all(r['githubStars'] is None for r in stars[len(known):]))
        self.assertTrue(any(r['preview'] is None for r in self.rows))
        self.assertTrue(any(r['sourceAvailability']=='no_public_source' for r in self.rows))

    def test_restored_public_media_scope_is_explicit(self):
        policy=json.loads((ROOT/'research/catalog/public-media-policy.json').read_text())
        by_id={r['id']:r for r in self.rows}
        self.assertEqual(sum(r['preview'] is not None for r in self.rows),52)
        for id in policy['withheld_record_ids']:
            self.assertIsNone(by_id[id]['preview'])
        for id in policy['restored_public_media_ids']:
            self.assertEqual(by_id[id]['preview']['rightsStatus'],'reviewed_for_catalog_display')
