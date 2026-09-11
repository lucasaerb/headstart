import hashlib
import json
import sqlite3
import unittest
from services.operations.monitor import SourceMonitor
from services.operations.health import HealthJobs

class MonitorTests(unittest.TestCase):
    def test_weekly_changes_preserve_old_snapshot_and_retry(self):
        db=sqlite3.connect(':memory:');now=[2000000000]
        monitor=SourceMonitor(db,clock=lambda:now[0])
        identity=monitor.register({'repository':'https://github.com/example/game','paths':['game.js'],'licensePaths':['LICENSE']})
        value={'snapshot':{'sourceCommit':'a'*40,'sourceDigest':'b'*64,'licenseDigest':'c'*64}}
        self.assertEqual(monitor.run_due(fetch_snapshot=lambda *a:value)[0]['status'],'current')
        self.assertEqual(monitor.run_due(fetch_snapshot=lambda *a:self.fail('Early scan')),[])
        now[0]+=604801;value={'snapshot':{**value['snapshot'],'licenseDigest':'d'*64}}
        monitor.run_due(fetch_snapshot=lambda *a:value)
        self.assertEqual(db.execute('SELECT COUNT(*) FROM source_snapshots').fetchone()[0],2)
        candidate=json.loads(db.execute('SELECT payload FROM source_change_candidates').fetchone()[0])
        self.assertIsNone(candidate['verification']);self.assertEqual(candidate['previous']['licenseDigest'],'c'*64)
        for _ in range(3):
            now[0]+=604801;monitor.run_due(fetch_snapshot=lambda *a:(_ for _ in ()).throw(ValueError()))
        self.assertEqual(monitor.retry(identity),1)
        db.close()

    def test_dated_interactive_requires_matching_outcomes(self):
        db=sqlite3.connect(':memory:');now=[2000000000];jobs=HealthJobs(db,clock=lambda:now[0])
        jobs.register('demo-v1','https://example.com/game',featured=True)
        plan={'url':'https://example.com/game','steps':[{'name':'count','action':'click','input':'button','observe':'output','attribute':None,'before':'0','after':'1'}]}
        report={'schemaVersion':'headstart-interactive-check-1','planDigest':hashlib.sha256(json.dumps(plan,sort_keys=True,separators=(',',':')).encode()).hexdigest(),'observedAt':now[0],'category':'interactive_passed','checks':[{'passed':True},{'passed':True}]}
        jobs.record_interactive('demo-v1',plan,report)
        self.assertEqual(jobs.status()[0]['interactive']['status'],'interactive_passed')
        now[0]+=604801;self.assertTrue(jobs.status()[0]['interactive']['stale'])
        report['checks'].pop()
        with self.assertRaises(ValueError):jobs.record_interactive('demo-v1',plan,report)
        db.close()
