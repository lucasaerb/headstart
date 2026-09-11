"""Authenticated local bridge; credentials arrive on stdin, never command arguments."""
import json
import os
import re
import sys
from pathlib import Path
from services.auth.store import connect, authorize, rate, AuthError
from services.catalog.store import CatalogStore
from .service import create, retrieve, markdown, HandoffError, setup, current_bag

ROOT=Path(__file__).resolve().parents[2]

def serve(request):
    auth=connect()
    try:
        kind=request.get('credentialKind')
        if kind not in ('browser','mcp'):raise AuthError('SESSION_INVALID')
        principal=authorize(auth,request.get('credential'),'prepare_handoff',kind)
        method=request.get('method'); url=request.get('url')
        match=re.fullmatch(r'/v1/handoffs/([0-9a-f]{64})/(json|markdown)',url or '')
        bag=re.fullmatch(r'/v1/bags/([0-9a-f]{64})',url or '')
        selected=url=='/v1/bags/current'
        if not ((method=='POST' and url=='/v1/handoffs') or (method=='GET' and (match or bag or selected))):
            return {'status':405,'body':{'error':{'code':'METHOD_NOT_ALLOWED','message':'Unsupported handoff route or method.'}}}
        rate(auth,'artifact:'+principal['account'],20,900)
        database=Path(os.environ.get('HEADSTART_CATALOG_DB',ROOT/'.local/catalog.sqlite3'))
        if not database.is_file():raise HandoffError('CATALOG_UNAVAILABLE','Catalog is unavailable.','Initialize the local catalog.',503)
        store=CatalogStore(database,os.environ.get('HEADSTART_EVIDENCE_DIR',ROOT/'.local/evidence'))
        try:
            # Serializes rights-report writes with the permission check and artifact read.
            setup(store.db)
            store.db.execute('BEGIN IMMEDIATE')
            if method=='POST':
                result=create(store,principal['account'],request.get('body'))
                body={'schemaVersion':1,'digest':result['digest'],'bagRevision':result['bagRevision'],
                      'downloads':{kind:'/v1/handoffs/'+result['digest']+'/'+kind for kind in ('json','markdown')}}
            elif selected:
                bag_revision,result=current_bag(store,principal['account'])
                body={'schemaVersion':1,'format':'json','bagRevision':bag_revision,'content':json.dumps(result,sort_keys=True,indent=2,ensure_ascii=False)}
            else:
                result=retrieve(store,principal['account'],bag[1] if bag else match[1],bag=bool(bag))
                body={'schemaVersion':1,'content':markdown(result) if match and match[2]=='markdown' else json.dumps(result,sort_keys=True,indent=2,ensure_ascii=False),'format':match[2] if match else 'json'}
            store.db.commit()
            return {'status':200,'body':body,'headers':{'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'}}
        finally:store.close()
    finally:auth.close()

def main():
    try:
        raw=sys.stdin.read(65537)
        if len(raw)>65536:raise ValueError()
        request=json.loads(raw)
        if not isinstance(request,dict) or set(request)-{'method','url','body','credential','credentialKind'}:raise ValueError()
        result=serve(request)
    except HandoffError as error:result={'status':error.status,'body':error.body}
    except AuthError as error:result={'status':error.status,'body':{'error':{'code':error.code,'message':'Verified identity is required for this handoff.','action':'Verify your email and retry; your selection is preserved.'}}}
    except (ValueError,TypeError,KeyError):result={'status':422,'body':{'error':{'code':'HANDOFF_BLOCKED','message':'The handoff could not be prepared.','action':'Check the request and current source eligibility.'}}}
    except Exception:result={'status':503,'body':{'error':{'code':'HANDOFF_UNAVAILABLE','message':'Handoff service is unavailable.','action':'Retry after the local service is configured.'}}}
    print(json.dumps(result))

if __name__=='__main__':main()
