"""Synthetic execution fixtures only; no integration success is claimed."""
import copy
import hashlib
import json
import tempfile
from pathlib import Path
import unittest
from contracts.validate import scope_digest
from services.catalog import CatalogStore
from services.catalog.seed import seed_reviewed_tile

class AttestationTests(unittest.TestCase):
 def setUp(self):
  self.tmp=tempfile.TemporaryDirectory();p=Path(self.tmp.name);self.s=CatalogStore(p/'db',p/'evidence');self.base=seed_reviewed_tile(self.s)
 def tearDown(self):self.s.close();self.tmp.cleanup()
 def fixture(self):
  def env(kind,id,data):return dict(schema_version='0.2',entity_type=kind,id=id,version='1',data=data)
  ref=lambda r:dict(id=r['id'],version=r['version'])
  target=copy.deepcopy(self.base[1]);target['id']='target';target['data']['publication_state']='candidate'
  brief=env('game_brief','brief',dict(intent='test',runtime=None,runtime_version=None,platform=None,device=None,visual_references=[],camera=None,input=[],scope=None,budgets=[],preserved_systems=[],constraints=[]))
  recipe=env('recipe','recipe',dict(components=[ref(self.base[-1])],assets=[],brief=ref(brief),source_commit=target['data']['source_commit'],target_commit=target['data']['source_commit'],digest='a'*64,adapters=[],compatibility_assumptions=[],rights=copy.deepcopy(self.base[1]['data']['rights']),status='candidate',verification=None,rollback='discard test',limitations=[]))
  c=copy.deepcopy(self.base[-1]);c['version']='2';c['data']['readiness']='integration_tested'
  recipe['data']['components']=[ref(c)]
  v=dict(source_commit=c['data']['source_commit'],target_commit=target['data']['source_commit'],recipe_digest=recipe['data']['digest'],recipe=ref(recipe),target=ref(target),scope_digest=scope_digest(c['data']['scope']),result='passed',checks=['synthetic check'])
  evidence=copy.deepcopy(c['data']['evidence'][0]);evidence.update(origin='executed_test',claim_type='measured')
  log=b'synthetic check passed';ld=hashlib.sha256(log).hexdigest();self.s.put_blob(log,ld)
  att=dict(v,schema_version='headstart-execution-0.1',runner='test-only',environment='synthetic fixture',executed_at='2026-09-10T00:00:00Z',checks=[dict(name='synthetic check',result='passed',log_digest=ld)])
  raw=json.dumps(att).encode();digest=hashlib.sha256(raw).hexdigest();self.s.put_blob(raw,digest);evidence['digest']=digest
  v['evidence']=[evidence];c['data']['verification']=v
  return [target,brief,recipe,c]
 def test_matching_structured_execution_context(self):
  self.s.put_records(self.fixture())
  self.assertTrue(any(r['data'].get('readiness')=='integration_tested' for r in self.s.records()))
 def test_arbitrary_source_bytes_cannot_be_execution_attestation(self):
  rows=self.fixture();rows[-1]['data']['verification']['evidence'][0]['digest']=self.base[-1]['data']['evidence'][0]['digest']
  with self.assertRaises(ValueError):self.s.put_records(rows)
  self.assertEqual(4,len(self.s.records(False)))
 def test_changed_context_or_scope_rejected(self):
  for field in ('target_commit','recipe_digest','scope_digest'):
   rows=self.fixture();rows[-1]['data']['verification'][field]='f'*(40 if field=='target_commit' else 64)
   with self.assertRaises(ValueError):self.s.put_records(rows)
  rows=self.fixture();rows[-1]['data']['scope']['coupling_notes']=['changed']
  with self.assertRaises(ValueError):self.s.put_records(rows)
 def test_atomic_dependency_cycle_and_wrong_owner(self):
  c=copy.deepcopy(self.base[-1]);c['version']='2';c['data']['dependencies']=[dict(id='dep',version='1')]
  dep=dict(schema_version='0.2',entity_type='dependency',id='dep',version='1',data=dict(from_version=dict(id=c['id'],version='2'),to_version=dict(id=self.base[-1]['id'],version='1'),external_package=None,kind='requires',version_constraint=None,resolved_version=None,optional=False))
  with self.assertRaises(ValueError):self.s.put_record(c)
  self.s.put_records([c,dep]);self.assertEqual(6,len(self.s.records(False)))
  c=copy.deepcopy(c);c['version']='3'
  with self.assertRaises(ValueError):self.s.put_records([c])
 def test_recipe_cannot_borrow_other_component_version(self):
  rows=self.fixture();rows[-2]['data']['components'][0]['version']='1'
  with self.assertRaises(ValueError):self.s.put_records(rows)
 def test_tampered_attestation_and_missing_log_hide_tested_record(self):
  rows=self.fixture();self.s.put_records(rows)
  digest=rows[-1]['data']['verification']['evidence'][0]['digest']
  path=self.s.evidence_root/digest;raw=path.read_bytes();path.write_bytes(b'tampered')
  self.assertFalse(any(r['data'].get('readiness')=='integration_tested' for r in self.s.records()))
  path.write_bytes(raw);log=json.loads(raw)['checks'][0]['log_digest'];(self.s.evidence_root/log).unlink()
  self.assertFalse(any(r['data'].get('readiness')=='integration_tested' for r in self.s.records()))
 def test_cross_project_component_identity_rejected(self):
  rows=self.fixture();rows[-1]['data']['component_id']='other-component'
  other=copy.deepcopy(self.base[2]);other['id']='other-component';other['data']['project_id']='other-project'
  with self.assertRaises(ValueError):self.s.put_records([other]+rows)
