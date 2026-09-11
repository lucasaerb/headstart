import base64
import hashlib
import json
import unittest
from services.operations.snapshots import collect

class SnapshotTests(unittest.TestCase):
    def test_actual_selected_bytes_are_pinned_and_separate_from_license(self):
        requested=[];commit='a'*40
        def fetch(url):
            requested.append(url)
            if url.endswith('/branches/main'):body=json.dumps({'name':'main','commit':{'sha':commit}}).encode()
            elif url=='https://api.github.com/repos/example/game':body=json.dumps({'full_name':'example/game','private':False,'default_branch':'main'}).encode()
            elif url.endswith('/LICENSE'):body=b'MIT fixture'
            else:body=b'export const fixture = 1'
            return {'status':200,'body':base64.b64encode(body).decode()}
        result=collect('https://github.com/example/game',['src/game.js'],['LICENSE'],fetch=fetch)
        self.assertEqual(result['files']['LICENSE'],hashlib.sha256(b'MIT fixture').hexdigest())
        self.assertNotEqual(result['snapshot']['sourceDigest'],result['snapshot']['licenseDigest'])
        self.assertTrue(all('/'+commit+'/' in u for u in requested if 'raw.githubusercontent.com' in u))
        self.assertEqual(len(requested),4)
    def test_identity_change_rejected_before_source_download(self):
        def fetch(url):return {'status':200,'body':base64.b64encode(b'{"full_name":"other/game","private":false,"default_branch":"main"}').decode()}
        with self.assertRaises(ValueError):collect('https://github.com/example/game',['game.js'],['LICENSE'],fetch=fetch)
