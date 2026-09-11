"""Durable weekly source-monitor configuration and immutable observed snapshots."""
import json
import time
from .changes import SourceChanges,digest
from .snapshots import collect
from services.submissions.store import safe_url
from services.intake.pipeline import safe_path


class SourceMonitor:
    def __init__(self,db,*,clock=time.time):
        self.db,self.clock=db,clock
        db.executescript('''
        CREATE TABLE IF NOT EXISTS source_monitors(id TEXT PRIMARY KEY,payload TEXT NOT NULL,next_check INTEGER NOT NULL DEFAULT 0,attempts INTEGER NOT NULL DEFAULT 0,status TEXT NOT NULL DEFAULT 'pending');
        CREATE TABLE IF NOT EXISTS source_snapshots(id TEXT NOT NULL,digest TEXT NOT NULL,observed_at INTEGER NOT NULL,payload TEXT NOT NULL,PRIMARY KEY(id,digest));
        CREATE TRIGGER IF NOT EXISTS source_snapshots_no_update BEFORE UPDATE ON source_snapshots BEGIN SELECT RAISE(ABORT,'Snapshots are immutable'); END;
        CREATE TRIGGER IF NOT EXISTS source_snapshots_no_delete BEFORE DELETE ON source_snapshots BEGIN SELECT RAISE(ABORT,'Snapshots are immutable'); END;
        ''');db.commit()
        self.changes=SourceChanges(db,clock=clock)
    def register(self,config):
        if not isinstance(config,dict) or set(config)!={'repository','paths','licensePaths'}:raise ValueError('Invalid source monitor')
        safe_url(config['repository'],True)
        if not isinstance(config['paths'],list) or not isinstance(config['licensePaths'],list) or not config['paths'] or not config['licensePaths'] or len(config['paths'])+len(config['licensePaths'])>20:raise ValueError('Select bounded source and license files')
        for path in config['paths']+config['licensePaths']:safe_path(path)
        identity=digest(config)
        with self.db:self.db.execute('INSERT OR IGNORE INTO source_monitors(id,payload) VALUES(?,?)',(identity,json.dumps(config,sort_keys=True)))
        return identity
    def run_due(self,*,fetch_snapshot=collect,limit=1):
        if type(limit) is not int or not 1<=limit<=3:raise ValueError('Source batch limit is one to three')
        now=int(self.clock());results=[]
        rows=self.db.execute("SELECT id,payload,attempts FROM source_monitors WHERE next_check<=? AND status!='failed' ORDER BY id LIMIT ?",(now,limit)).fetchall()
        for identity,raw,attempts in rows:
            with self.db:
                self.db.execute('BEGIN IMMEDIATE')
                claimed=self.db.execute("UPDATE source_monitors SET status='checking',next_check=? WHERE id=? AND next_check<=? AND status!='failed'",(now+300,identity,now)).rowcount
            if not claimed:continue
            config=json.loads(raw)
            try:
                result=fetch_snapshot(config['repository'],config['paths'],config['licensePaths'])
                from .changes import snapshot
                snapshot(result['snapshot'])
                previous=self.db.execute('SELECT payload FROM source_snapshots WHERE id=? ORDER BY observed_at DESC LIMIT 1',(identity,)).fetchone()
                if previous:self.changes.observe(config['repository'],json.loads(previous[0])['snapshot'],result['snapshot'])
                with self.db:
                    self.db.execute('INSERT OR IGNORE INTO source_snapshots VALUES(?,?,?,?)',(identity,digest(result),now,json.dumps(result,sort_keys=True)))
                    self.db.execute("UPDATE source_monitors SET next_check=?,attempts=0,status='current' WHERE id=?",(now+7*86400,identity))
                results.append({'id':identity,'status':'current'})
            except Exception:
                attempts+=1
                with self.db:self.db.execute('UPDATE source_monitors SET next_check=?,attempts=?,status=? WHERE id=?',(now+min(86400,3600*2**attempts),attempts,'failed' if attempts>=3 else 'retry',identity))
                results.append({'id':identity,'status':'failed' if attempts>=3 else 'retry'})
        return results
    def retry(self,identity):
        with self.db:return self.db.execute("UPDATE source_monitors SET next_check=0,attempts=0,status='pending' WHERE id=? AND status='failed'",(identity,)).rowcount
