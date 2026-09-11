"""Public metadata recommendations; brief is processed in memory and never logged/stored."""
import json
import os
from pathlib import Path
import sys
from services.catalog.store import CatalogStore
from .planning import recommend, current_documents, handoff_context
ROOT=Path(__file__).resolve().parents[2]


def serve(request):
    if not isinstance(request,dict) or set(request)!={'brief','query','constraints'}:
        raise ValueError('Invalid recommendation request')
    database=Path(os.environ.get('HEADSTART_CATALOG_DB',ROOT/'.local/catalog.sqlite3'))
    if not database.is_file():raise RuntimeError('Catalog unavailable')
    store=CatalogStore(database,os.environ.get('HEADSTART_EVIDENCE_DIR',ROOT/'.local/evidence'))
    try:
        documents=current_documents(store)
        result=recommend(request['brief'],documents,request['query'],request['constraints'])
        for row in result['items']:
            template=row['template']
            row['recommendationContext']=handoff_context(request['brief'],documents,{k:template[k] for k in ('id','version','digest')})
            # Persisted reasons use the brief alone. Transient query affects ordering only.
            row['reasons']=row['recommendationContext']['reasons']
        return result
    finally:store.close()


def main():
    try:
        raw=sys.stdin.read(65537)
        if len(raw)>65536:raise ValueError('Request too large')
        result={'status':200,'body':serve(json.loads(raw))}
    except (ValueError,TypeError,KeyError):result={'status':400,'body':{'error':'Check the brief and explicit filters; no constraint was relaxed.'}}
    except Exception:result={'status':503,'body':{'error':'Recommendations are unavailable. Your brief stays in this browser; retry later.'}}
    print(json.dumps(result))
if __name__=='__main__':main()
