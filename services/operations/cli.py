"""Explicit local jobs. Run daily reachability and weekly source/interactive checks."""
import argparse
import json
import os
import sqlite3
from pathlib import Path
from .health import HealthJobs
from .monitor import SourceMonitor
from .changes import SourceChanges
from .browser import run
from services.submissions.store import Queue

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--database',default=os.environ.get('HEADSTART_CATALOG_DB','.local/catalog.sqlite3'))
    parser.add_argument('action',choices=['register-demo','reachability','interactive','register-source','sources','dispatch','retry-source','retry-queue','status'])
    parser.add_argument('--id');parser.add_argument('--url');parser.add_argument('--file');parser.add_argument('--image');parser.add_argument('--featured',action='store_true')
    args=parser.parse_args()
    if not Path(args.database).is_file():parser.error('Initialize the local catalog first')
    db=sqlite3.connect(args.database,timeout=15)
    try:
        health=HealthJobs(db);monitor=SourceMonitor(db);changes=SourceChanges(db)
        config=None
        if args.file:
            path=Path(args.file)
            if path.is_symlink() or path.stat().st_size>32000:raise ValueError('Use a bounded local JSON configuration')
            config=json.loads(path.read_text())
        if args.action=='register-demo':health.register(args.id,args.url,featured=args.featured);result={'registered':args.id}
        elif args.action=='reachability':result=health.run()
        elif args.action=='interactive':
            report=run(config,image=args.image)
            result={'evidenceDigest':health.record_interactive(args.id,config,report),'report':report}
        elif args.action=='register-source':result={'id':monitor.register(config)}
        elif args.action=='sources':result=monitor.run_due()
        elif args.action=='dispatch':result=changes.dispatch(Queue(db))
        elif args.action=='retry-source':result={'retried':monitor.retry(args.id)}
        elif args.action=='retry-queue':result={'retried':changes.retry(args.id)}
        else:result={'checks':health.status(),'sourceJobs':[dict(zip(('id','status','nextCheck','attempts'),r)) for r in db.execute('SELECT id,status,next_check,attempts FROM source_monitors')]}
        print(json.dumps(result,indent=2))
    finally:db.close()

if __name__=='__main__':main()
