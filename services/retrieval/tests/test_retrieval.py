import copy
import json
import os
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch
from services.catalog.search import search,ApiError
from services.retrieval import engine,model

class RetrievalTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        payload=json.loads(Path('services/retrieval/evaluation/corpus.json').read_text())
        cls.documents=payload['documents'] if isinstance(payload,dict) else payload
    def query(self,pairs=(),mode='hybrid'):return search(self.documents,list(pairs),b'retrieval-test-key',retrieval_mode=mode)
    def test_missing_model_falls_back_to_same_lexical_results(self):
        baseline=self.query([('q','orbit')],mode='lexical')
        with tempfile.TemporaryDirectory() as folder,patch.dict(os.environ,{'HEADSTART_EMBEDDING_DIR':folder}):
            result=self.query([('q','orbit')]);self.assertEqual('lexical',result['retrieval']['mode']);self.assertIn(result['retrieval']['fallbackReason'],['local_model_missing','optional_model_dependencies_missing']);self.assertEqual(baseline['items'],result['items'])
    def test_corrupt_model_is_a_version_mismatch(self):
        if model.availability()=='optional_model_dependencies_missing':self.skipTest('Optional inference dependencies unavailable')
        with tempfile.TemporaryDirectory() as folder,patch.dict(os.environ,{'HEADSTART_EMBEDDING_DIR':folder}):
            Path(folder,'model.onnx').write_text('invalid');self.assertEqual('model_version_mismatch',model.availability())
    def test_intent_keeps_original_and_separates_style_from_compatibility(self):
        result=engine.interpret('low-poly city builder with orbit controls')
        self.assertEqual('low-poly city builder with orbit controls',result['originalQuery']);self.assertIn('low poly',result['style']);self.assertIn('construction progression',result['capabilities']);self.assertIn('never establishes',result['compatibility']);self.assertEqual([],engine.interpret(result['originalQuery'],False)['capabilities'])
    def test_projection_never_embeds_raw_source_or_private_fields(self):
        doc=copy.deepcopy(self.documents[0]);doc['privateSource']='PRIVATE_TOKEN_125';doc['data']['raw_capture']='PRIVATE_TOKEN_125';self.assertNotIn('PRIVATE_TOKEN_125',engine.document_text(doc))
    def test_all_semantics_stay_behind_hard_filters(self):
        for mode in ['hybrid','lexical']:
            for filters in [[('runtime','Unity')],[('readiness','integration_tested')],[('runtime','Three.js'),('runtime_version','0.186.0')],[('platform','mobile')]]:
                result=self.query([('q','camera controls'),*filters],mode);self.assertEqual([],result['items'])
    def test_embedding_cache_corruption_falls_back_without_silent_rebuild(self):
        if model.availability():self.skipTest('Optional local model unavailable; lexical fallback covered')
        with tempfile.TemporaryDirectory() as folder,patch.dict(os.environ,{'HEADSTART_EMBEDDING_CACHE':folder}):
            first=self.query([('q','look around a world')]);self.assertEqual('hybrid',first['retrieval']['mode'])
            files=list(Path(folder).glob('*.json'));self.assertTrue(files);files[0].write_text('{"version":"old"}')
            second=self.query([('q','look around a world')]);self.assertEqual('embedding_version_mismatch',second['retrieval']['fallbackReason']);self.assertEqual('lexical',second['retrieval']['mode'])
    def test_model_switch_invalidates_cursor(self):
        if model.availability():self.skipTest('Optional local model unavailable; forced fallback covered separately')
        first=self.query([('limit','1')]);self.assertTrue(first['nextCursor'])
        with tempfile.TemporaryDirectory() as folder,patch.dict(os.environ,{'HEADSTART_EMBEDDING_DIR':folder}):
            with self.assertRaises(ApiError) as error:self.query([('limit','1'),('cursor',first['nextCursor'])])
            self.assertEqual(409,error.exception.status)
    def test_recommended_research_uses_explicit_rank_but_search_uses_relevance(self):
        docs=[{'id':'z','title':'Moon Racer','summary':'racing','genres':['racing'],'capabilities':[],'runtime':'Three.js','dimension':'3d','contentKind':'game','platformKind':'browser','aiProvenance':{},'editorialRank':{'position':2}},
              {'id':'a','title':'Forest Quest','summary':'forest','genres':['adventure'],'capabilities':[],'runtime':'Three.js','dimension':'3d','contentKind':'game','platformKind':'browser','aiProvenance':{},'editorialRank':{'position':1}}]
        browse=search(docs,[('limit','10')],b'key',research=True,retrieval_mode='lexical')
        self.assertEqual(['a','z'],[x['id'] for x in browse['items']])
        found=search(docs,[('q','Moon Racer'),('limit','10')],b'key',research=True,retrieval_mode='lexical')
        self.assertEqual(['z'],[x['id'] for x in found['items']])
if __name__=='__main__':unittest.main()
