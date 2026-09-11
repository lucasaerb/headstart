"""Bounded local queue transport. Caller authenticates curator identity server-side."""
import json
import os
import sys
from pathlib import Path
from urllib.request import build_opener, HTTPRedirectHandler, Request
from services.catalog.store import CatalogStore
from .store import Queue
ROOT=Path(__file__).resolve().parents[2]
class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self,*args,**kwargs): raise ValueError('Redirected ownership evidence rejected')
def fetch_proof(url):
    with build_opener(NoRedirect).open(Request(url,headers={'User-Agent':'HeadStart-local-control-check'}),timeout=5) as response:
        result=response.read(4097)
        if len(result)>4096: raise ValueError('Ownership proof is oversized')
        return result

def serve(request):
    store=CatalogStore(os.environ.get('HEADSTART_CATALOG_DB',ROOT/'.local/catalog.sqlite3'),os.environ.get('HEADSTART_EVIDENCE_DIR',ROOT/'.local/evidence'))
    try:
        queue=Queue(store.db); action=request['action']; data=request.get('data',{}); actor=request.get('actor')
        if action in ('submission','correction','rights_report','appeal'): return queue.submit(data,action)
        if action=='status': return queue.status(data.get('id'),data.get('receipt'))
        if action=='ownership': return queue.verify_ownership(data.get('id'),data.get('receipt'),data.get('commit'),fetch_proof)
        if not actor: raise PermissionError('Curator authorization required')
        if action=='queue': return {'items':queue.all()}
        if action=='history': return {'events':queue.history(request['id'])}
        if action=='review': return queue.review(request['id'],data,actor)
        raise ValueError('Unknown action')
    finally: store.close()

def main():
    try:
        request=json.loads(sys.stdin.read(32769))
        result={'status':200,'body':serve(request)}
    except PermissionError: result={'status':403,'body':{'error':'Not authorized'}}
    except KeyError: result={'status':404,'body':{'error':'Review item unavailable'}}
    except RuntimeError as e: result={'status':409,'body':{'error':str(e)}}
    except (ValueError,TypeError): result={'status':400,'body':{'error':'Invalid proposal, evidence, or unresolved review fields'}}
    except Exception: result={'status':503,'body':{'error':'Review queue unavailable; retry later'}}
    print(json.dumps(result))
if __name__=='__main__': main()
