"""Protocol tests launch the real server with no network or client credentials."""
import hashlib
import json
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]


def request(i, method, params=None):
    value = {'jsonrpc': '2.0', 'method': method}
    if i is not None:
        value['id'] = i
    if params is not None:
        value['params'] = params
    return value


INIT = request(1, 'initialize', {'protocolVersion': '2025-06-18', 'capabilities': {}, 'clientInfo': {'name': 'test', 'version': '1'}})
READY = request(None, 'notifications/initialized')


def run(messages, root=ROOT, initialize=True):
    messages = ([INIT, READY] if initialize else []) + messages
    data = '\n'.join(json.dumps(m) if not isinstance(m, str) else m for m in messages) + '\n'
    result = subprocess.run([sys.executable, '-B', str(root / 'scripts/catalog_mcp.py')], input=data, text=True, capture_output=True, cwd=tempfile.gettempdir(), timeout=10)
    if result.returncode or result.stderr:
        raise AssertionError(result.stderr)
    responses = [json.loads(line) for line in result.stdout.splitlines()]
    return responses[1:] if initialize else responses


def call(name, args=None):
    return request(2, 'tools/call', {'name': name, 'arguments': args or {}})


def content(response):
    result = response['result']
    assert json.loads(result['content'][0]['text']) == result['structuredContent']
    return result['structuredContent']


class CatalogMCPTests(unittest.TestCase):
    def test_real_lifecycle_discovery_and_evidence(self):
        listing, info, found = run([request(2, 'tools/list'), call('catalog_info'), call('search_components', {'query': 'puzzle', 'code_license': 'MIT'})])
        self.assertEqual(len(listing['result']['tools']), 4)
        self.assertEqual(content(info)['projects'], 52)
        results = content(found)['results']
        self.assertTrue(results)
        selected = results[0]
        detail = content(run([call('get_component', {'id': selected['id'], 'source_commit': selected['source_commit']})])[0])['record']
        self.assertTrue(detail['evidence'])
        self.assertEqual(detail['rights']['scope_reuse_status'], 'review_required')
        self.assertIn('PASS', detail['discovery_review']['review_verdict'])

    def test_component_search_provides_exact_source_path(self):
        found = content(run([call('search_components', {'query': 'camera', 'kind': 'component'})])[0])
        self.assertTrue(found['results'])
        self.assertTrue(all(r['source_path'] and r['evidence_url'] for r in found['results']))
        self.assertTrue(all(r['kind'] == 'component' for r in found['results']))

    def test_exact_filters_and_no_silent_relaxation(self):
        for filters in ({'runtime': 'NonexistentEngine'}, {'platform': 'browser', 'runtime': 'Wesnoth native engine'}, {'readiness': 'integration_tested'}, {'code_license': 'MIT OR GPL'}):
            with self.subTest(filters=filters):
                value = content(run([call('search_components', filters)])[0])
                self.assertEqual(value['results'], [])
                self.assertFalse(value['filters_relaxed'])
        value = content(run([call('search_components', {'code_license': 'MIT', 'platform': 'browser'})])[0])
        self.assertTrue(value['results'])
        self.assertTrue(all(r['rights']['code_license'] == 'MIT' and 'browser' in r['platforms'] for r in value['results']))

    def test_handoff_always_denied_and_not_bypassable(self):
        for args in ({'id': '2048', 'source_commit': 'a' * 40}, {'id': '2048', 'source_commit': 'a' * 40, 'verified_email': True}, {'token': 'fake'}):
            result = run([call('prepare_handoff', args)])[0]['result']
            self.assertTrue(result['isError'])
        value = content(run([call('prepare_handoff', {'id': '2048', 'source_commit': 'a' * 40})])[0])
        self.assertEqual(value['error']['code'], 'verified_email_required')

    def test_missing_record_and_version(self):
        for args, code in [({'id': '../secrets', 'source_commit': 'a' * 40}, 'not_found'), ({'id': '2048', 'source_commit': 'a' * 40}, 'version_mismatch'), ({'id': '3d-city', 'source_commit': 'a' * 40}, 'not_found')]:
            self.assertEqual(content(run([call('get_component', args)])[0])['error']['code'], code)

    def test_invalid_arguments_do_not_crash_or_coerce(self):
        for args in ({'limit': True}, {'limit': 100}, {'offset': -1}, {'query': {}}, {'runtime': ''}, {'unknown': True}, {'query': '*'}, {'query': 'x' * 201}):
            result = run([call('search_components', args), call('catalog_info')])
            self.assertTrue(result[0]['result']['isError'])
            self.assertEqual(content(result[1])['projects'], 52)

    def test_pagination_is_deterministic(self):
        values = [content(x) for x in run([call('search_components', {'limit': 10, 'offset': 0}), call('search_components', {'limit': 10, 'offset': 10})])]
        self.assertEqual(values[0]['next_offset'], 10)
        self.assertEqual(values[0]['total'], 52)
        self.assertFalse({r['id'] for r in values[0]['results']} & {r['id'] for r in values[1]['results']})

    def test_malformed_frames_and_lifecycle(self):
        responses = run(['{', [], request(3, 'tools/list'), INIT, READY, request(4, 'made_up'), call('catalog_info')], initialize=False)
        self.assertEqual([r['error']['code'] for r in responses[:3]], [-32700, -32600, -32002])
        self.assertEqual(responses[4]['error']['code'], -32601)
        self.assertEqual(content(responses[5])['projects'], 52)
        self.assertEqual(run(['x' * 70000, call('catalog_info')])[0]['error']['code'], -32600)

    def test_protocol_negotiation(self):
        init = request(1, 'initialize', {'protocolVersion': 'future-version', 'capabilities': {}, 'clientInfo': {'name': 'test'}})
        self.assertEqual(run([init], initialize=False)[0]['result']['protocolVersion'], '2025-06-18')

    def test_matching_digest_malformed_snapshot_fails_closed(self):
        mutations = [
            lambda d: d['records'][0]['building_blocks'][0].update(source_path=[]),
            lambda d: d['records'].append(d['records'][0]),
            lambda d: d['records'][0]['runtime'].update(name=[]),
            lambda d: d['records'][0]['rights'].update(scope_reuse_status='cleared'),
            lambda d: d['records'][0]['discovery_review'].update(source_commit='f' * 40),
            lambda d: d.update(schema_version='unknown'),
            lambda d: d['records'][0].update(repo_url='javascript:alert(1)'),
            lambda d: d['records'][0]['source']['evidence'][1].update(url='https://github.com/example/main'),
        ]
        for mutate in mutations:
            with self.subTest(mutate=mutate), tempfile.TemporaryDirectory() as directory:
                copied = Path(directory) / 'plugin'
                shutil.copytree(ROOT, copied, ignore=shutil.ignore_patterns('__pycache__'))
                catalog_path = copied / 'references/discovery-catalog.json'
                manifest_path = copied / 'references/discovery-manifest.json'
                snapshot = json.loads(catalog_path.read_text())
                mutate(snapshot)
                catalog_path.write_text(json.dumps(snapshot))
                manifest = json.loads(manifest_path.read_text())
                manifest['snapshot_sha256'] = hashlib.sha256(catalog_path.read_bytes()).hexdigest()
                manifest['record_count'] = len(snapshot['records'])
                manifest_path.write_text(json.dumps(manifest))
                responses = run([call('catalog_info'), call('search_components')], copied)
                self.assertTrue(all(content(r)['error']['code'] == 'catalog_unavailable' for r in responses))

    def test_bundle_skips_records_without_review_decisions(self):
        sys.path.insert(0, str(ROOT / 'scripts'))
        try:
            from bundle_catalog import bundle
        finally:
            sys.path.pop(0)
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            source, output = root / 'research', root / 'plugin'
            source.mkdir()
            (output / 'references').mkdir(parents=True)
            records = json.loads((ROOT / 'references/discovery-catalog.json').read_text())['records'][:2]
            first = records[0]
            (source / 'catalog.json').write_text(json.dumps({'schema_version': 'research-0.1', 'records': records}))
            (source / 'internal-discovery-review.json').write_text(json.dumps({'definition': 'Fixture link-only review', 'records': [first['discovery_review']]}))
            bundle(source, output)
            snapshot = json.loads((output / 'references/discovery-catalog.json').read_text())
            self.assertEqual([r['id'] for r in snapshot['records']], [first['id']])
            first['discovery_review']['source_commit'] = 'f' * 40
            (source / 'internal-discovery-review.json').write_text(json.dumps({'definition': 'Fixture', 'records': [first['discovery_review']]}))
            with self.assertRaises(ValueError):
                bundle(source, output)

    def test_model_filter_and_attribution_errors(self):
        ai = {'status': 'creator_attributed', 'models': ['GPT-6 Astra'],
              'evidence': [{'url': 'https://example.com/creator', 'claim': 'Synthetic test creator statement.'}],
              'notes': 'Test fixture only, not a real attribution.'}
        with tempfile.TemporaryDirectory() as directory:
            copied = Path(directory) / 'plugin'
            shutil.copytree(ROOT, copied, ignore=shutil.ignore_patterns('__pycache__'))
            catalog_path = copied / 'references/discovery-catalog.json'
            manifest_path = copied / 'references/discovery-manifest.json'
            snapshot = json.loads(catalog_path.read_text())
            snapshot['records'][0]['ai_provenance'] = ai
            def save():
                catalog_path.write_text(json.dumps(snapshot))
                manifest = json.loads(manifest_path.read_text())
                manifest['snapshot_sha256'] = hashlib.sha256(catalog_path.read_bytes()).hexdigest()
                manifest_path.write_text(json.dumps(manifest))
            save()
            outputs = run([call('catalog_info'), call('search_components', {'model': 'GPT-6 Astra'}),
                           call('search_components', {'model': 'Imaginary model'}),
                           call('search_components', {'model': 'GPT-6 Astra', 'runtime': 'Imaginary runtime'})], copied)
            self.assertIn('GPT-6 Astra', content(outputs[0])['filters']['model'])
            found = content(outputs[1])['results']
            self.assertTrue(any(r['id'] == snapshot['records'][0]['id'] for r in found))
            self.assertTrue(all(r['ai_provenance']['status'] == 'creator_attributed' for r in found))
            self.assertEqual(content(outputs[2])['results'], [])
            self.assertEqual(content(outputs[3])['results'], [])
            ai['status'] = 'unverified'
            save()
            found = content(run([call('search_components', {'model': 'GPT-6 Astra'})], copied)[0])['results']
            self.assertNotIn(snapshot['records'][0]['id'], [r['id'] for r in found])
            ai['status'] = 'unknown'
            save()
            self.assertEqual(content(run([call('catalog_info')], copied)[0])['error']['code'], 'catalog_unavailable')
            ai['status'] = 'creator_attributed'
            ai['evidence'] = []
            save()
            self.assertEqual(content(run([call('catalog_info')], copied)[0])['error']['code'], 'catalog_unavailable')

    def test_relocated_bundle_no_writes_and_corruption(self):
        with tempfile.TemporaryDirectory() as directory:
            copied = Path(directory) / 'package with spaces'
            shutil.copytree(ROOT, copied, ignore=shutil.ignore_patterns('__pycache__'))
            def files():
                return {str(p.relative_to(copied)): hashlib.sha256(p.read_bytes()).hexdigest() for p in copied.rglob('*') if p.is_file()}
            before = files()
            self.assertEqual(content(run([call('catalog_info')], copied)[0])['projects'], 52)
            self.assertEqual(before, files())
            catalog = copied / 'references/discovery-catalog.json'
            catalog.write_text('{}')
            self.assertEqual(content(run([call('catalog_info')], copied)[0])['error']['code'], 'catalog_unavailable')
            catalog.unlink()
            self.assertEqual(content(run([call('search_components')], copied)[0])['error']['code'], 'catalog_unavailable')


if __name__ == '__main__':
    unittest.main()
