"""Synthetic shape/semantic rejection fixtures, not measured performance evidence."""
import copy
import hashlib
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest
ROOT=Path(__file__).resolve().parents[2]
spec=importlib.util.spec_from_file_location('review_evidence',ROOT/'HeadStart-Starter-Package/headstart-plugin/scripts/review_evidence.py')
review=importlib.util.module_from_spec(spec);spec.loader.exec_module(review)

class ReviewEvidenceTests(unittest.TestCase):
    def setUp(self):
        self.temp=tempfile.TemporaryDirectory();self.addCleanup(self.temp.cleanup);self.root=Path(self.temp.name)
        self.profile={key:'synthetic-test' for key in review.PROFILE};self.profile.update(browser_version=None,resolution={'width':1,'height':1})
        self.raw={'version':1,'source_commit':'a'*40,'target_commit':'b'*40,'profile':self.profile,'metrics':[{'metric':'fixture-mean','unit':'ms','samples':[0,2]}]}
        self.record={'schema_version':'0.2','entity_type':'benchmark_run','id':'synthetic','version':'1','data':{'source_commit':'a'*40,'target_commit':'b'*40,**self.profile,'raw_results':{'path':'raw.json','source_commit':'a'*40,'origin':'executed_test','claim_type':'measured','digest':''},'measurements':[{'metric':'fixture-mean','unit':'ms','value':1}]}}
        self.write_raw()
    def write_raw(self):
        raw=json.dumps(self.raw,sort_keys=True).encode();(self.root/'raw.json').write_bytes(raw);self.record['data']['raw_results']['digest']=hashlib.sha256(raw).hexdigest()
    def test_supported_mean_and_same_profile(self):
        self.assertEqual(review.validate(self.record,self.root),self.profile)
        self.assertTrue(review.compare(self.record,self.record,self.root,'b'*40,'b'*40)['compatible'])
    def test_missing_or_tampered_evidence_rejected(self):
        (self.root/'raw.json').write_text('{}')
        with self.assertRaisesRegex(ValueError,'digest'):review.validate(self.record,self.root)
        (self.root/'raw.json').unlink()
        with self.assertRaisesRegex(ValueError,'missing'):review.validate(self.record,self.root)
    def test_unmeasured_and_made_up_mean_rejected(self):
        self.record['data']['raw_results']['claim_type']='inspected'
        with self.assertRaisesRegex(ValueError,'Unmeasured'):review.validate(self.record,self.root)
        self.record['data']['raw_results']['claim_type']='measured';self.record['data']['measurements'][0]['value']=120
        with self.assertRaisesRegex(ValueError,'mean'):review.validate(self.record,self.root)
    def test_invalid_samples_and_profiles_rejected(self):
        for samples in [[],[True],[float('nan')],[-1],[None]]:
            self.raw['metrics'][0]['samples']=samples;self.write_raw()
            with self.assertRaises(ValueError):review.validate(self.record,self.root)
        self.raw['metrics'][0]['samples']=[0,2];self.raw['profile']=copy.deepcopy(self.profile);self.raw['profile']['resolution']['width']=True;self.write_raw()
        with self.assertRaisesRegex(ValueError,'profile'):review.validate(self.record,self.root)
    def test_mismatched_profiles_or_expected_states_rejected(self):
        other=copy.deepcopy(self.record);other['data']['settings']='different-quality'
        with self.assertRaisesRegex(ValueError,'profile'):review.compare(self.record,other,self.root)
        with self.assertRaisesRegex(ValueError,'baseline'):review.compare(self.record,self.record,self.root,'c'*40,'b'*40)
        with self.assertRaisesRegex(ValueError,'changed'):review.compare(self.record,self.record,self.root,'b'*40,'c'*40)
    def test_paths_and_symlinks_rejected(self):
        for path in ['../secret','/tmp/secret','a\\b','file:secret','a%2fb']:
            self.record['data']['raw_results']['path']=path
            with self.assertRaises(ValueError):review.validate(self.record,self.root)
        (self.root/'link.json').symlink_to(self.root/'raw.json');self.record['data']['raw_results']['path']='link.json'
        with self.assertRaisesRegex(ValueError,'symlink'):review.validate(self.record,self.root)
    def test_stale_raw_state_rejected(self):
        self.raw['target_commit']='c'*40;self.write_raw()
        with self.assertRaisesRegex(ValueError,'stale'):review.validate(self.record,self.root)
