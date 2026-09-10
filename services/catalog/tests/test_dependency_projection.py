import json
import tempfile
from pathlib import Path
import unittest
from unittest.mock import patch
from services.catalog.store import CatalogStore
from services.catalog.search import public_documents
from services.curation.seed import seed_curated_capabilities
from services.retrieval.engine import document_text

class DependencyProjectionTests(unittest.TestCase):
 def setUp(self):
  self.tmp=tempfile.TemporaryDirectory();root=Path(self.tmp.name);self.store=CatalogStore(root/'db',root/'evidence');seed_curated_capabilities(self.store)
 def tearDown(self):self.store.close();self.tmp.cleanup()
 def orbit(self):return next(r for r in public_documents(self.store) if r['id']=='three-orbitcontrols')
 def test_external_peer_constraints_are_public_metadata_not_installed_or_tested(self):
  row=self.orbit();dep=row['resolvedDependencies'][0]
  self.assertEqual('three',dep['package']);self.assertIn('0.186.0',dep['versionConstraint']);self.assertIsNone(dep['resolvedVersion']);self.assertFalse(dep['optional']);self.assertEqual('reference_only',row['compatibility'][0]['support']);self.assertIsNone(row['compatibility'][1]['version_range']);self.assertTrue(dep['sourceUrl'].endswith('/package.json'));self.assertEqual(row['data']['source_commit'],dep['sourceUrl'].split('/')[-2]);self.assertEqual(document_text(row),document_text({k:v for k,v in row.items() if k not in ['resolvedDependencies','compatibility']}))
 def test_deleted_dependency_stays_unknown_without_dangling_names(self):
  self.store.tombstone('dependency','three-orbitcontrols-engine-peer','test removal');dep=self.orbit()['resolvedDependencies'][0];self.assertEqual({'status':'unknown','kind':None,'optional':None},dep)
 def test_private_or_unpublished_target_metadata_cannot_leak(self):
  # Direct corrupted-ingest fixtures exercise the projection's defensive read boundary.
  for extra in [{'visibility':'private','external_package':'PRIVATE_PACKAGE'},{'to_version':{'id':'PRIVATE_TARGET','version':'1'},'external_package':'PRIVATE_PACKAGE'}]:
   live=self.store.records(False)
   edge=next(r for r in live if r['entity_type']=='dependency' and r['id']=='three-orbitcontrols-engine-peer');edge['data'].update(extra)
   original=self.store.records
   with patch.object(self.store,'records',side_effect=lambda published_only=True: original(True) if published_only else live):
    result=self.orbit()['resolvedDependencies'];self.assertEqual('unknown',result[0]['status']);self.assertNotIn('PRIVATE',json.dumps(result))
