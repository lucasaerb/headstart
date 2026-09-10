import json
import tempfile
import unittest
from services.intake.pipeline import Intake,inspect,redact,sensitive_source

class URLRedactionTests(unittest.TestCase):
 def test_direct_inspection_excludes_sensitive_urls_in_all_reference_locations(self):
  marker='private-token-123456'
  fixtures=[
   ('main.js',f'import lib from "https://cdn.example.com/module.js?token={marker}";'),
   ('main.js',f'import lib from "https://user:{marker}@cdn.example.com/module.js";'),
   ('main.js',f'const asset="./foo.png?token={marker}";'),
   ('main.js',f'const asset="https://cdn.example.com/foo.png#{marker}";'),
   ('package.json',json.dumps({'dependencies':{'pkg':f'https://host.test/a?token={marker}'}})),
   ('package.json',json.dumps({'dependencies':{f'https://user:{marker}@host.test/a':'1'}})),
   ('package-lock.json',json.dumps({'packages':{'node_modules/pkg':{'version':f'https://host.test/a#{marker}'}}})),
   ('package-lock.json',json.dumps({'packages':{f'//user:{marker}@host.test/a':{'version':'1'}}})),
   ('package.json',json.dumps({'dependencies':{'pkg':f'https://host.test/a?token={marker}'}}).replace('/','\\/')),
  ]
  for path,text in fixtures:
   with self.subTest(path=path,text=text):
    self.assertTrue(sensitive_source(text))
    result=inspect({path:text.encode()})
    self.assertNotIn(marker,json.dumps(result));self.assertEqual([],result['files'][0]['references'])
    self.assertEqual('sensitive_source_excluded',result['files'][0]['unknowns'][0]['kind'])
 def test_no_sensitive_source_blob_result_or_cache_is_retained(self):
  marker='private-token-123456'
  with tempfile.TemporaryDirectory() as root:
   intake=Intake(root,fetcher=lambda url:f'import lib from "https://host.test/x?token={marker}";'.encode())
   try:
    job=intake.submit('https://github.com/example/repo','a'*40,['main.js'])
    result=intake.run(job)
    self.assertEqual([],list(intake.blobs.iterdir()));self.assertEqual([],result['analysis']['files'])
    self.assertNotIn(marker,json.dumps(result));self.assertNotIn(marker,json.dumps(intake.status(job)))
    self.assertTrue(all(marker not in row['result'] for row in intake.db.execute('SELECT result FROM cache')))
   finally:intake.close()
 def test_old_complete_results_and_cache_are_scrubbed(self):
  marker='private-token-123456';legacy={'references':[{'reference':f'https://user:{marker}@host.test/a?token={marker}'}]}
  with tempfile.TemporaryDirectory() as root:
   intake=Intake(root);job=intake.submit('https://github.com/example/repo','a'*40,['main.js'])
   with intake.db:
    intake.db.execute("UPDATE jobs SET status='complete',result=? WHERE id=?",(json.dumps(legacy),job))
    intake.db.execute('INSERT INTO cache VALUES(?,?)',('old',json.dumps(legacy)))
   intake.close();intake=Intake(root)
   try:
    self.assertNotIn(marker,json.dumps(intake.run(job)));self.assertNotIn(marker,json.dumps(intake.status(job)))
    for table in ['jobs','cache']:
     self.assertTrue(all(marker not in row['result'] for row in intake.db.execute('SELECT result FROM '+table)))
   finally:intake.close()
 def test_shared_redaction_and_clean_import_preservation(self):
  value={'https://user:private-token-123456@host.test/a':{'version':'./asset.glb#private-token-123456'}}
  self.assertNotIn('private-token-123456',json.dumps(redact(value)))
  for mixed in ['https://x.test/?token=one ./foo?token=two','[prefix] ./foo?token=two']:
   self.assertEqual('[redacted_reference]',redact(mixed))
  clean='import x from "./module.js";'
  self.assertFalse(sensitive_source(clean));self.assertEqual('./module.js',inspect({'main.js':clean.encode()})['files'][0]['references'][0]['reference'])

if __name__=='__main__':unittest.main()
