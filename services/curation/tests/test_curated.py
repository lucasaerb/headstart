import copy
import json
from pathlib import Path
import tempfile
import unittest
from services.catalog import CatalogStore
from services.catalog.seed import seed_reviewed_tile
from services.curation.seed import seed_curated_capabilities,source_maps,ROOT,SOURCE,sha,closure

class CurationTests(unittest.TestCase):
 def test_all_thirty_source_maps_gates_and_repeat_import(self):
  with tempfile.TemporaryDirectory() as t:
   s=CatalogStore(Path(t)/'db',Path(t)/'blobs')
   try:
    seed_reviewed_tile(s);seed_curated_capabilities(s);before=s.export();seed_curated_capabilities(s);self.assertEqual(before,s.export())
    components=[r for r in s.records() if r['entity_type']=='component_version']
    self.assertEqual(30,len(components));self.assertTrue(all(r['data']['readiness']=='source_reviewed' for r in components))
    maps=source_maps();self.assertGreaterEqual(len({m['category'] for m in maps}),6)
    for m in maps:
     self.assertTrue(m['symbols']);self.assertTrue(m['proposed_validation']);self.assertEqual(sorted(f['path'] for f in m['files']),closure(m['source_path']))
     for f in m['files']:
      self.assertEqual(f['digest'],sha((SOURCE/f['path']).read_bytes()));self.assertGreater(f['line_end'],f['line_start'])
    for row in components:
     d=row['data'];self.assertTrue(set(d['scope']['required_files']).issubset(d['rights']['scope']))
     for e in d['evidence']:self.assertTrue(s.get_blob(e['digest']))
    invalid=copy.deepcopy(components[0]);invalid['version']='invalid';invalid['data']['readiness']='integration_tested'
    with self.assertRaises(ValueError):s.put_record(invalid)
    self.assertFalse(any('water2' in r['id'] for r in components))
   finally:s.close()
 def test_manifest_is_frozen_and_source_pin_matches_evidence(self):
  manifest=json.loads((ROOT/'reviewed-source-maps.json').read_text());self.assertEqual(manifest['capabilities'],source_maps())
  self.assertEqual(29,len(manifest['capabilities']))
  for p,d in manifest['shared_digests'].items():self.assertEqual(d,sha((SOURCE/p).read_bytes()))
