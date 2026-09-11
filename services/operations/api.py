"""Local status and optional telemetry API; network jobs run only through the CLI."""
import json
import os
from pathlib import Path
import sys
from services.catalog.store import CatalogStore
from services.catalog.search import public_documents
from services.submissions.store import Queue, assert_export_allowed
from .events import EventStore
from .health import HealthJobs
from .changes import SourceChanges
from .monitor import SourceMonitor
ROOT = Path(__file__).resolve().parents[2]


def serve(request):
    database = Path(os.environ.get('HEADSTART_CATALOG_DB', ROOT/'.local/catalog.sqlite3'))
    if not database.is_file(): raise RuntimeError('Catalog is not initialized')
    store = CatalogStore(database,os.environ.get('HEADSTART_EVIDENCE_DIR',ROOT/'.local/evidence'))
    try:
        documents = public_documents(store)
        events = EventStore(store.db,enabled=os.environ.get('HEADSTART_TELEMETRY')=='1',catalog_ids={r['id'] for r in documents})
        health = HealthJobs(store.db)
        action, data = request.get('action'), request.get('data',{})
        if action == 'health':
            return {'schemaVersion':'headstart-public-health-1','checks':health.status(),'telemetryAvailable':events.enabled}
        if action == 'event':
            if not isinstance(data,dict) or set(data) != {'event','consent'}: raise ValueError('Invalid event')
            return events.collect(data['event'],consent=data['consent'])
        if action == 'forget':
            if not isinstance(data,dict) or set(data) != {'deletionToken'}: raise ValueError('Invalid deletion request')
            return {'deleted':events.forget(data['deletionToken'])}
        if action != 'operations' or not request.get('actor'): raise PermissionError('Curator access required')
        queue = Queue(store.db)
        SourceChanges(store.db)
        SourceMonitor(store.db)
        blocked = 0
        for record in store.records():
            try: assert_export_allowed(store,[record])
            except ValueError: blocked += 1
        checks = health.status()
        stale = sum(bool(row['reachability'] and row['reachability']['stale']) for row in checks)
        broken = sum(bool(row['reachability'] and row['reachability']['category']!='reachable') for row in checks)
        failed = store.db.execute("SELECT COUNT(*) FROM source_change_outbox WHERE status='failed'").fetchone()[0]
        pending = store.db.execute("SELECT COUNT(*) FROM source_change_outbox WHERE status='pending'").fetchone()[0]
        return {'schemaVersion':'headstart-operations-1','checks':checks,'events':events.counts(),
                'counts':{'eligibleVersions':len(documents),'reviewQueueOpen':sum(row['status'] in ('pending','changes_requested') for row in queue.all()),'blockedExports':blocked,'staleChecks':stale,'unreachableOrReviewRequired':broken,'registeredDemos':len(checks),'uncheckedDemos':sum(row['reachability'] is None for row in checks),'sourceCandidates':store.db.execute('SELECT COUNT(*) FROM source_change_candidates').fetchone()[0],'failedSourceJobs':failed,'pendingSourceJobs':pending},
                'alerts':[{'kind':kind,'count':value} for kind,value in [('stale_checks',stale),('demo_attention',broken),('source_job_failed',failed),('exports_blocked',blocked)] if value],
                'sourceJobs':[dict(zip(('id','status','nextCheck','attempts'),row)) for row in store.db.execute('SELECT id,status,next_check,attempts FROM source_monitors')],
                'indexRecovery':'Published catalog remains readable during a transactional rebuild; failed or interrupted transactions retain the prior index.',
                'scheduling':'Local CLI only; no production scheduler configured'}
    finally:
        store.close()


def main():
    try:
        raw = sys.stdin.read(8193)
        if len(raw)>8192: raise ValueError('Request too large')
        request = json.loads(raw)
        if not isinstance(request,dict): raise ValueError('Invalid request')
        response = {'status':200,'body':serve(request)}
    except PermissionError: response={'status':403,'body':{'error':'Curator access required'}}
    except (ValueError,TypeError): response={'status':400,'body':{'error':'Invalid operations request'}}
    except Exception: response={'status':503,'body':{'error':'Operations unavailable; initialize the local catalog and retry'}}
    print(json.dumps(response))
if __name__=='__main__': main()
