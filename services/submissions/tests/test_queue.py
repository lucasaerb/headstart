import copy
import sqlite3
import tempfile
import unittest
from pathlib import Path
from services.catalog.store import CatalogStore
from services.submissions.store import Queue,assert_export_allowed

class QueueTests(unittest.TestCase):
 def setUp(self):
  self.tmp=tempfile.TemporaryDirectory();self.store=CatalogStore(Path(self.tmp.name)/'db',Path(self.tmp.name)/'evidence');self.q=Queue(self.store.db)
  self.record={'entity_type':'component_version','id':'sample','version':'1','data':{'scope':{'required_files':['source.js'],'optional_files':[]},'rights':{'scope':['LICENSE']}}}
  self.store.db.execute('INSERT INTO records VALUES(?,?,?,?)',('component_version','sample','1','{}'));self.store.db.commit()
  self.suggestion={'repository':'https://github.com/example/game','description':'A useful camera','reporter':'private@example.invalid','ownershipClaim':True}
 def tearDown(self): self.store.close();self.tmp.cleanup()
 def test_receipt_privacy_and_duplicate(self):
  first=self.q.submit(self.suggestion);second=self.q.submit(self.suggestion)
  self.assertNotEqual(first['receipt'],second['receipt']);self.assertNotEqual(first['id'],second['id'])
  self.assertEqual(self.q.latest(second['id'])['duplicateOf'],first['id'])
  public=self.q.status(first['id'],first['receipt']);self.assertNotIn('reporter',public);self.assertNotIn('proposal',public)
  with self.assertRaises(PermissionError):self.q.status(first['id'],second['receipt'])
 def test_unsafe_and_oversized(self):
  for url in ['file:///etc/passwd','https://localhost/repo','https://127.0.0.1/r','https://github.com@evil.test/r','https://github.com/u/r?token=x']:
   with self.assertRaises(ValueError):self.q.submit({**self.suggestion,'repository':url})
  for data in [{'subproject':'../secret'},{'description':'x'*4001},{'modelTags':'AI'}]:
   with self.assertRaises(ValueError):self.q.submit({**self.suggestion,**data})
 def test_unauthorized_stale_and_immutable(self):
  item=self.q.submit(self.suggestion);decision={'revision':1,'status':'approved','nextAction':'Apply through catalog evidence gate','blockingFields':[],'reviewEvidence':['local review source commit and rights evidence']}
  with self.assertRaises(PermissionError):self.q.review(item['id'],decision,None)
  self.q.review(item['id'],decision,'curator')
  with self.assertRaises(RuntimeError):self.q.review(item['id'],decision,'curator')
  self.assertEqual(len(self.q.history(item['id'])),2)
  self.assertEqual(self.q.latest(item['id'])['proposal']['ownership'],'unverified')
  with self.assertRaises(sqlite3.IntegrityError):self.store.db.execute('DELETE FROM submission_events')
  self.store.db.rollback()
 def test_required_evidence(self):
  item=self.q.submit(self.suggestion)
  for body in [{'revision':True,'status':'approved','nextAction':'ready'},{'revision':1,'status':'approved','nextAction':'ready','blockingFields':['rights'],'reviewEvidence':['claim']},{'revision':1,'status':'approved','nextAction':'ready'}]:
   with self.assertRaises((ValueError,RuntimeError)):self.q.review(item['id'],body,'curator')
 def test_report_freezes_scope_appeal_does_not_clear_and_resolution_restores(self):
  scope={'entity':'component_version','id':'sample','version':'1','paths':['source.js']}
  assert_export_allowed(self.store,[self.record])
  report=self.q.submit({'description':'License conflict','scope':scope},'rights_report')
  with self.assertRaises(ValueError):assert_export_allowed(self.store,[self.record])
  other=copy.deepcopy(self.record);other['version']='2';assert_export_allowed(self.store,[other])
  appeal=self.q.submit({'description':'Please review evidence','scope':scope,'parentId':report['id']},'appeal')
  self.q.review(appeal['id'],{'revision':1,'status':'resolved','nextAction':'Review original report','reviewEvidence':['appeal checked']},'curator')
  with self.assertRaises(ValueError):assert_export_allowed(self.store,[self.record])
  self.q.review(report['id'],{'revision':1,'status':'resolved','nextAction':'Rights evidence corrected','reviewEvidence':['dated source/license review']},'curator')
  assert_export_allowed(self.store,[self.record]);self.assertEqual(len(self.q.history(report['id'])),2)
 def test_control_challenge_bound_to_repo_and_receipt(self):
  item=self.q.submit(self.suggestion);seen=[]
  def fetch(url):seen.append(url);return f"HeadStart ownership {item['id']} {item['ownershipChallenge']}".encode()
  with self.assertRaises(ValueError):self.q.verify_ownership(item['id'],item['receipt'],'a'*40,lambda u:b'spoof')
  result=self.q.verify_ownership(item['id'],item['receipt'],'a'*40,fetch)
  self.assertEqual(seen,['https://raw.githubusercontent.com/example/game/'+'a'*40+'/.headstart-ownership.txt'])
  self.assertEqual(result['status'],'pending');self.assertTrue(result['blockingFields'])
  self.assertEqual(self.q.latest(item['id'])['proposal']['ownership'],'repository_control_verified')
 def test_concurrent_review_has_one_winner(self):
  from concurrent.futures import ThreadPoolExecutor
  item=self.q.submit(self.suggestion)
  decision={'revision':1,'status':'changes_requested','nextAction':'Resolve source evidence','blockingFields':['source evidence']}
  def attempt(_):
   store=CatalogStore(Path(self.tmp.name)/'db',Path(self.tmp.name)/'evidence')
   try:
    queue=Queue(store.db)
    try: queue.review(item['id'],decision,'curator'); return 'saved'
    except RuntimeError: return 'conflict'
   finally: store.close()
  with ThreadPoolExecutor(max_workers=2) as pool: outcomes=list(pool.map(attempt,range(2)))
  self.assertEqual(sorted(outcomes),['conflict','saved'])
  self.assertEqual(len(self.q.history(item['id'])),2)
 def test_unknown_scope_and_policy_missing_fail_closed(self):
  with self.assertRaises(ValueError):self.q.submit({'description':'x','scope':{'entity':'component_version','id':'unknown','version':'1'}},'rights_report')
  self.store.db.execute('DROP TABLE submission_events')
  with self.assertRaises(ValueError):assert_export_allowed(self.store,[self.record])
if __name__=='__main__':unittest.main()
