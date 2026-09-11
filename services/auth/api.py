"""Private stdin transport. Never logs request bodies or credentials."""
import json
import os
from pathlib import Path
import secrets
import sys
from urllib.parse import urlsplit
from .store import AuthError, connect, issue, verify, authorize, revoke, approve_bridge

def canonical_origin():
    origin=os.environ.get('HEADSTART_AUTH_ORIGIN','http://127.0.0.1:8767')
    parts=urlsplit(origin)
    if parts.scheme!='http' or parts.hostname not in ('127.0.0.1','localhost') or parts.path or parts.query or parts.fragment or parts.username or parts.password:
        raise AuthError('AUTH_UNAVAILABLE',503)
    # This local adapter never silently enables hosted authentication.
    return origin

def serve(req):
    origin=canonical_origin()
    path=urlsplit(req['url']).path
    method=req.get('method','GET')
    credential=req.get('credential','')
    db=connect()
    try:
        if path=='/api/auth/session' and method=='GET':
            try:
                who=authorize(db,credential,'session','browser')
                return {'status':200,'body':{'state':'verified','account':who['account'],'csrf':who['csrf'],'expires':who['expires']}}
            except AuthError:
                return {'status':200,'body':{'state':'anonymous'}}
        if method!='POST': raise AuthError('METHOD_NOT_ALLOWED',405)
        if req.get('origin')!=origin or req.get('contentType')!='application/json': raise AuthError('CSRF_REJECTED',403)
        body=req.get('body',{})
        if not isinstance(body,dict): raise AuthError('INVALID_REQUEST',400)
        binding=req.get('binding','')
        if path=='/api/auth/challenge':
            if not binding: binding=secrets.token_urlsafe(32)
            if os.environ.get('HEADSTART_AUTH_DELIVERY')!='preview': raise AuthError('DELIVERY_UNAVAILABLE',503)
            ident,token=issue(db,body.get('email'),binding,body.get('intent'),req.get('client','local'))
            directory=Path(os.environ.get('HEADSTART_AUTH_PREVIEW_DIR','.local/auth-preview'))
            directory.mkdir(parents=True,exist_ok=True,mode=0o700)
            os.chmod(directory,0o700)
            path=directory/(ident+'.json')
            fd=os.open(path,os.O_WRONLY|os.O_CREAT|os.O_EXCL,0o600)
            with os.fdopen(fd,'w') as f:
                json.dump({'url':origin+'/auth.html#challenge='+ident+'&token='+token},f)
            return {'status':202,'body':{'state':'challenge-issued','challenge':ident,'message':'Check the local delivery preview. Your selection is preserved.'},'cookies':[f'hs_binding={binding}; Path=/; HttpOnly; SameSite=Strict; Max-Age=600']}
        if path=='/api/auth/verify':
            session,csrf,selected=verify(db,body.get('challenge',''),body.get('token',''),binding,credential,req.get('client','local'))
            return {'status':200,'body':{'state':'verified','csrf':csrf,'intent':selected,'returnTo':'/#games','requiresScopeRevalidation':True},'cookies':[f'hs_session={session}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400','hs_binding=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0']}
        who=authorize(db,credential,'session','browser')
        if not secrets.compare_digest(str(req.get('csrf','')),who['csrf']): raise AuthError('CSRF_REJECTED',403)
        if path=='/api/auth/logout':
            revoke(db,credential)
            return {'status':200,'body':{'state':'revoked'},'cookies':['hs_session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0']}
        if path=='/api/auth/connect':
            approve_bridge(db,credential,body.get('request',''))
            return {'status':200,'body':{'state':'connected','message':'Local MCP access approved for this session. This grants no local editing permission.'}}
        raise AuthError('NOT_FOUND',404)
    finally: db.close()

def main():
    try:
        raw=sys.stdin.read(32769)
        if len(raw)>32768: raise AuthError('REQUEST_TOO_LARGE',413)
        result=serve(json.loads(raw))
    except AuthError as exc: result={'status':exc.status,'body':{'error':{'code':exc.code}}}
    except Exception: result={'status':503,'body':{'error':{'code':'AUTH_UNAVAILABLE'}}}
    print(json.dumps(result))
if __name__=='__main__': main()
