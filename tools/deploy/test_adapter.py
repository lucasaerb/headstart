"""Run against the actual packaged artifact: HEADSTART_DEPLOY_DIR=/tmp/... python -m unittest tools.deploy.test_adapter."""
import importlib.util
import json
import os
from pathlib import Path
import sys
import unittest

STAGE = Path(os.environ.get('HEADSTART_DEPLOY_DIR', '/tmp/headstart-production-candidate'))
sys.path.insert(0, str(STAGE))
spec = importlib.util.spec_from_file_location('production_catalog', STAGE / 'api/catalog.py')
adapter = importlib.util.module_from_spec(spec)
spec.loader.exec_module(adapter)
os.environ['SIGNUP_HASH_SECRET'] = 'local-adapter-test-only-secret-32-characters'

class AdapterTests(unittest.TestCase):
    def test_packaged_model_and_research(self):
        status, body = adapter.response('GET','/api/research?q=driving')
        self.assertEqual(status,200)
        self.assertEqual(body['retrieval']['mode'],'hybrid')
        self.assertGreater(len(body['items']),0)

    def test_cursor_and_detail(self):
        status, first = adapter.response('GET','/v1/search?limit=1')
        self.assertEqual(status,200)
        self.assertIsNotNone(first['nextCursor'])
        status, second = adapter.response('GET','/v1/search?limit=1&cursor='+first['nextCursor'])
        self.assertEqual(status,200)
        self.assertNotEqual(first['items'][0]['id'],second['items'][0]['id'])
        item=first['items'][0]
        route='/v1/components/'+item['id']+'/versions/'+item['version'] if item['type']=='component' else '/v1/projects/'+item['id']
        self.assertEqual(adapter.response('GET',route)[0],200)
        self.assertEqual(adapter.response('GET','/v1/search?cursor=tampered')[0],400)

    def test_scoped_hard_filter(self):
        status, body = adapter.response('GET','/v1/search?runtime=Godot')
        self.assertEqual(status,200)
        self.assertEqual(body['items'],[])
        status, body = adapter.response('GET','/v1/search?readiness=integration_tested')
        self.assertEqual(status,200)
        self.assertEqual(body['items'],[])

    def test_errors_and_methods(self):
        self.assertEqual(adapter.response('POST','/api/research')[0],405)
        self.assertEqual(adapter.response('GET','/v1/projects/nonexistent')[0],404)
        self.assertEqual(adapter.response('GET','/api/research?unknown=x')[0],400)
        self.assertEqual(adapter.response('GET','/v1/search?path=search')[0],400)
        self.assertEqual(adapter.response('GET','/v1/search?q='+('x'*9000))[0],400)

    def test_local_api_parity(self):
        from services.catalog.api import serve
        scratch=adapter.snapshot()
        import hashlib,hmac
        key=hmac.new(os.environ['SIGNUP_HASH_SECRET'].encode(),b'headstart/catalog-cursors/v1',hashlib.sha256).digest()
        for route in ['/api/research?q=city&retrieval=lexical','/v1/search?limit=3','/api/catalog/search?runtime=Three.js']:
            status,actual=adapter.response('GET',route)
            self.assertEqual(status,200)
            self.assertEqual(actual,serve(route,scratch/'catalog.sqlite3',STAGE/'runtime/evidence',key))

    def test_missing_model_honest_fallback(self):
        from unittest.mock import patch
        from services.retrieval import model
        with patch.object(model, 'model_dir', return_value=STAGE/'nonexistent-model'):
            status, body = adapter.response('GET','/api/research?q=driving')
            self.assertEqual(status,200)
            self.assertEqual(body['retrieval']['mode'],'lexical')
            self.assertEqual(body['retrieval']['fallbackReason'],'local_model_missing')

    def test_missing_secret_fails_closed(self):
        from unittest.mock import patch
        with patch.dict(os.environ, {'SIGNUP_HASH_SECRET':''}):
            status, body = adapter.response('GET','/api/research')
            self.assertEqual(status,503)
            self.assertEqual(body['error']['code'],'CATALOG_UNAVAILABLE')

    def test_no_static_internals(self):
        for name in ['runtime','services','api','contracts','.env','package.json']:
            self.assertFalse((STAGE/'public'/name).exists())
        config=json.loads((STAGE/'vercel.json').read_text())
        self.assertIn('public/**',config['functions']['api/catalog.py']['excludeFiles'])
        self.assertTrue((STAGE/'public/downloads').is_dir())
        for path in (STAGE/'public').rglob('*'):
            self.assertFalse(path.is_symlink())
            self.assertNotIn(path.suffix, {'.py', '.pyc', '.sqlite', '.sqlite3', '.onnx'})
            self.assertFalse(path.name.startswith('.env'))

    def test_routes_add_no_query_capture_parameters(self):
        import re
        config=json.loads((STAGE/'vercel.json').read_text())
        self.assertNotIn('rewrites',config)
        for route in ['/v1/search','/v1/projects/2048','/v1/components/tile/versions/1','/api/research','/api/catalog/search']:
            matches=[r for r in config['routes'] if 'src' in r and re.fullmatch(r['src'],route)]
            self.assertEqual(len(matches),1)
            self.assertEqual(re.compile(matches[0]['src']).groups,0)
            self.assertEqual(matches[0]['dest'],'/api/catalog')
        self.assertEqual(config['routes'][-1],{'handle':'filesystem'})

    def test_runtime_bytes_match_manifest(self):
        import hashlib
        manifest=json.loads((STAGE/'runtime/snapshot.json').read_text())
        self.assertEqual(hashlib.sha256((STAGE/'runtime/catalog.sqlite3').read_bytes()).hexdigest(),manifest['databaseSha256'])
        for path in (STAGE/'runtime/evidence').iterdir():
            self.assertEqual(hashlib.sha256(path.read_bytes()).hexdigest(),path.name)
        model=json.loads((STAGE/'services/retrieval/model-manifest.json').read_text())
        for name, entry in model['files'].items():
            content=(STAGE/'runtime/model'/name).read_bytes()
            self.assertEqual(len(content),entry['bytes'])
            self.assertEqual(hashlib.sha256(content).hexdigest(),entry['sha256'])

if __name__=='__main__':unittest.main()
