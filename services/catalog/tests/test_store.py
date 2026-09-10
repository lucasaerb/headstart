import hashlib
import json
from pathlib import Path
import sqlite3
import tempfile
import unittest
from services.catalog import CatalogStore

ROOT=Path(__file__).resolve().parents[3]

class StoreTests(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory()
        self.root=Path(self.tmp.name)
        self.store=CatalogStore(self.root/'catalog.db',self.root/'evidence')
    def tearDown(self):
        self.store.close(); self.tmp.cleanup()
    def project(self):
        return {'schema_version':'0.2','entity_type':'project','id':'test-project','version':'1','data':{'title':'Synthetic test only','repository_url':'https://example.com/test'}}
    def version(self):
        raw=b'synthetic test evidence, never a published seed'
        digest=hashlib.sha256(raw).hexdigest()
        self.store.put_blob(raw,digest)
        evidence={'path':'LICENSE','digest':digest,'source_commit':'a'*40,'origin':'curator','claim_type':'inspected','reviewer':'test-only','observed_at':'2026-09-10T00:00:00Z','claim':'Synthetic test fixture'}
        return {'schema_version':'0.2','entity_type':'project_version','id':'test-source','version':'1','data':{'project_id':'test-project','source_commit':'a'*40,'publication_state':'published','rights':{'status':'scope_cleared','scope':['LICENSE'],'code_spdx':'MIT','asset_status':'excluded','notices':['Synthetic test notice'],'evidence':[evidence]},'evidence':[evidence]}}
    def test_gates_immutable_tombstones_and_demo_health(self):
        self.store.put_record(self.project())
        version=self.version()
        invalid=json.loads(json.dumps(version));invalid['data']['rights']['status']='unresolved'
        with self.assertRaises(ValueError):self.store.put_record(invalid)
        invalid=json.loads(json.dumps(version));invalid['data']['evidence'][0]['digest']='0'*64
        with self.assertRaises(ValueError):self.store.put_record(invalid)
        self.store.put_record(version)
        self.store.put_record(version)
        self.assertEqual(1,len(self.store.records()))
        self.store.record_demo_check('test-project','2026-09-10T00:00:00Z',{'reachable':False,'interactive':None})
        self.assertEqual(1,len(self.store.records()))
        changed=json.loads(json.dumps(version));changed['data']['rights']['notices']=['correction']
        with self.assertRaises(ValueError):self.store.put_record(changed)
        changed['version']='2';self.store.put_record(changed)
        with self.assertRaises(sqlite3.IntegrityError):self.store.db.execute('DELETE FROM records')
        self.store.db.rollback()
        self.store.tombstone('project_version','test-source','Removed; notices retained')
        self.assertEqual([],self.store.records())
        self.assertEqual(3,len(self.store.export()['records']))
    def test_unresolved_parent_rejected(self):
        with self.assertRaises(ValueError):self.store.put_record(self.version())

    def test_real_import_twice_and_noneligibility(self):
        source=ROOT/'research/catalog/catalog.json'
        self.store.import_research(source)
        first=self.store.export()
        self.store.import_research(source)
        self.assertEqual(first,self.store.export())
        self.assertGreater(len(self.store.research_records()),50)
        self.assertTrue(all(r['eligibility']=='research_only' for r in self.store.research_records()))
        self.assertEqual([],self.store.records())
    def test_duplicate_subprojects_rollback_whole_import(self):
        record=json.loads((ROOT/'research/catalog/catalog.json').read_text())['records'][0]
        source=self.root/'duplicate.json'; source.write_text(json.dumps([record,dict(record,id='other')]))
        with self.assertRaises(ValueError):self.store.import_research(source)
        self.assertEqual([],self.store.research_records())
        source.write_text(json.dumps([record,dict(record,id='other',subproject_path='samples/other')]))
        self.assertEqual(2,self.store.import_research(source))
    def test_history_preserves_pinned_revision_and_provenance(self):
        record=json.loads((ROOT/'research/catalog/catalog.json').read_text())['records'][0]
        source=self.root/'input.json'; source.write_text(json.dumps([record]))
        self.store.import_research(source)
        record['source']['commit']='a'*40
        source.write_text(json.dumps([record]));self.store.import_research(source)
        self.assertEqual(2,len(self.store.export()['research_history']))
        self.assertEqual(1,len(self.store.research_records()))
    def test_digest_display_rights_tamper_and_paths(self):
        data=b'real bytes';digest=hashlib.sha256(data).hexdigest()
        with self.assertRaises(ValueError):self.store.put_blob(data,'0'*64)
        self.store.put_blob(data,digest)
        self.assertEqual(data,self.store.get_blob(digest))
        with self.assertRaises(ValueError):self.store.get_blob(digest,for_display=True)
        for bad in ['../private', '/etc/passwd', 'f'*63]:
            with self.assertRaises(ValueError):self.store.get_blob(bad)
        (self.root/'evidence'/digest).write_bytes(b'changed')
        with self.assertRaises(ValueError):self.store.get_blob(digest)
    def test_approved_display_and_symlink_rejected(self):
        data=b'approved image';digest=hashlib.sha256(data).hexdigest()
        self.store.put_blob(data,digest,{'status':'approved','evidence':'review-1','reviewer':'test'})
        self.assertEqual(data,self.store.get_blob(digest,for_display=True))
        path=self.root/'evidence'/digest;path.unlink()
        target=self.root/'outside';target.write_bytes(data);path.symlink_to(target)
        with self.assertRaises(ValueError):self.store.get_blob(digest)
    def test_parent_tombstone_hides_source_versions(self):
        self.store.put_record(self.project());self.store.put_record(self.version())
        self.store.tombstone('project','test-project','withdrawn')
        self.assertEqual([],self.store.records())

    def test_real_scoped_seed_and_untested_promotion(self):
        from services.catalog.seed import seed_reviewed_tile
        records=seed_reviewed_tile(self.store)
        seed_reviewed_tile(self.store)
        self.assertEqual(2,len(self.store.records()))
        component=records[-1]
        component['version']='2';component['data']['readiness']='integration_tested'
        with self.assertRaises(ValueError):self.store.put_record(component)
        self.store.tombstone('component','2048-tile','withdrawn component')
        self.assertEqual(['project_version'],[r['entity_type'] for r in self.store.records()])

    def test_backup_restores_metadata(self):
        self.store.import_research(ROOT/'research/catalog/catalog.json')
        path=self.root/'backup.db';self.store.backup(path)
        other=CatalogStore(path,self.root/'evidence')
        try:self.assertEqual(self.store.export(),other.export())
        finally:other.close()
    def test_transaction_rollback(self):
        with self.assertRaises(RuntimeError):
            with self.store.transaction():
                self.store.import_research(ROOT/'research/catalog/catalog.json')
                raise RuntimeError('failure')
        self.assertEqual([],self.store.research_records())

if __name__=='__main__':unittest.main()
