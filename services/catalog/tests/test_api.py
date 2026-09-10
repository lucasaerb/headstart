import copy
import json
from pathlib import Path
import tempfile
import unittest
from services.catalog.store import CatalogStore
from services.catalog.seed import seed_reviewed_tile
from services.catalog.search import ApiError,search,public_documents
from services.catalog.api import serve

class SearchTests(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory(); self.root=Path(self.tmp.name)
        self.store=CatalogStore(self.root/'catalog.db',self.root/'evidence')
        seed_reviewed_tile(self.store)
        self.secret=b'test-only-signing-key-32-bytes-long'
    def tearDown(self):self.store.close();self.tmp.cleanup()
    def query(self,**kwargs):return search(public_documents(self.store),list(kwargs.items()),self.secret)
    def test_real_source_scope_exact_paths_repository_and_aliases(self):
        rows=self.query()['items'];self.assertEqual(2,len(rows));self.assertEqual({'2048'},set(r['projectId'] for r in rows))
        self.assertEqual(1,self.query(q='2048 tile state and serialization')['total'])
        self.assertEqual(2,self.query(q='https://github.com/gabrielecirulli/2048')['total'])
        self.assertEqual(1,self.query(q='js/tile.js')['total'])
        copied=copy.deepcopy(rows);copied[0]['aliases']=['exact test alias']
        self.assertEqual(1,search(copied,[('q','exact test alias')],self.secret)['total'])
    def test_hard_filters_never_relax_unknowns(self):
        self.assertEqual(1,self.query(runtime='JavaScript',rights='MIT',readiness='source_reviewed')['total'])
        for options in [dict(runtime='Unity'),dict(readiness='integration_tested'),dict(platform='browser'),dict(runtime='JavaScript',runtime_version='1.0'),dict(rights='GPL-3.0-only')]: self.assertEqual(0,self.query(**options)['total'])
        for row in self.query(runtime='JavaScript',type='component')['items']:
            self.assertEqual('component',row['type']);self.assertEqual('JavaScript',row['data']['compatibility'][0]['runtime'])
    def test_versions_have_distinct_keys_and_typo_is_lexical(self):
        record=next(r for r in self.store.records() if r['entity_type']=='component_version')
        record['version']='2';self.store.put_record(record)
        result=self.query(type='component');self.assertEqual(['1','2'],[r['version'] for r in result['items']])
        result=self.query(q='2048 tile state and serializtion')
        self.assertEqual(2,result['total']);self.assertIn('trigrams',result['items'][0]['matchReasons'][0])
    def test_runtime_and_tested_version_must_share_one_compatibility_row(self):
        # Isolated index fixture, not persisted or presented as tested source.
        row=next(r for r in public_documents(self.store) if r['type']=='component')
        row['data']['compatibility']=[
            {'runtime':'Unity','version_range':'2022','support':'reference_only'},
            {'runtime':'JavaScript','version_range':'1','support':'tested'},
            {'runtime':'Unity','version_range':'2023','support':'tested'},
            {'runtime':'Godot','version_range':None,'support':'tested'},
        ]
        for runtime,version,expected in [('Unity','1',0),('Unity','2022',0),('Unity','2023',1),('JavaScript','1',1),('JavaScript','2023',0),('Godot','1',0)]:
            with self.subTest(runtime=runtime,version=version):
                result=search([row],[('runtime',runtime),('runtime_version',version)],self.secret)
                self.assertEqual(expected,result['total'])
        self.assertEqual(1,search([row],[('runtime','Unity')],self.secret)['total'])
    def test_pagination_query_bound_tamper_stale_duplicate_version(self):
        first=self.query(limit='1');token=first['nextCursor'];self.assertTrue(token)
        second=self.query(limit='1',cursor=token);self.assertNotEqual(first['items'][0]['versionId'],second['items'][0]['versionId']);self.assertIsNone(second['nextCursor'])
        self.assertEqual(first,self.query(limit='1'))
        for cursor in ['garbage',token+'x']:
            with self.assertRaises(ApiError):self.query(limit='1',cursor=cursor)
        with self.assertRaises(ApiError):self.query(limit='2',cursor=token)
        self.store.tombstone('component','2048-tile','test removal')
        with self.assertRaises(ApiError) as caught:self.query(limit='1',cursor=token)
        self.assertEqual('STALE_CURSOR',caught.exception.body['error']['code'])
    def test_detail_only_eligible_parent_removal_and_tampered_evidence(self):
        args=dict(database=self.root/'catalog.db',evidence=self.root/'evidence',secret=self.secret)
        result=serve('/v1/components/2048-tile/versions/1',**args)
        self.assertEqual(['js/tile.js','LICENSE.txt'],result['item']['data']['scope']['required_files'])
        self.assertEqual([],result['item']['data']['dependencies'])
        self.store.tombstone('project','2048','test takedown')
        with self.assertRaises(ApiError) as caught:serve('/v1/components/2048-tile/versions/1',**args)
        self.assertEqual(404,caught.exception.status)
    def test_corrupt_blob_is_not_public(self):
        row=self.query()['items'][0];digest=row['data']['evidence'][0]['digest']
        (self.root/'evidence'/digest).write_bytes(b'corrupt')
        self.assertEqual(0,self.query()['total'])
    def test_invalid_queries(self):
        for options in [dict(limit='0'),dict(limit='1.5'),dict(q='x'*201),dict(runtime='made-up'),dict(unknown='x'),dict(runtime_version='1')]:
            with self.assertRaises(ApiError):self.query(**options)
        with self.assertRaises(ApiError):search([], [('q','a'),('q','b')],self.secret)
    def test_research_separate_with_existing_projection(self):
        text=(Path(__file__).resolve().parents[3]/'HeadStart-Starter-Package/site/dist/catalog.js').read_text()
        rows=json.loads(text[text.index('['):text.rindex(']')+1])
        result=search(rows,[('platform','browser'),('limit','100')],self.secret,True)
        self.assertTrue(result['items']);self.assertTrue(all(r['platformKind']=='browser' and r['eligibility']=='research_only' for r in result['items']))
        selected=search(rows,[('ids',rows[0]['id'])],self.secret,True)
        self.assertEqual([rows[0]['id']],[r['id'] for r in selected['items']])
        self.assertNotEqual(result['schemaVersion'],'headstart-catalog-api-1')

if __name__=='__main__':unittest.main()
