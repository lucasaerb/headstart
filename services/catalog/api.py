"""Local read-only bridge. All paths and credentials come from server config."""
import json
import os
import sys
from pathlib import Path
from urllib.parse import parse_qsl,urlsplit
from .store import CatalogStore
from .search import ApiError,public_documents,search,API_VERSION

ROOT=Path(__file__).resolve().parents[2]

def serve(url,database=None,evidence=None,secret=None):
    database=Path(database or os.environ.get('HEADSTART_CATALOG_DB',ROOT/'.local/catalog.sqlite3'))
    evidence=Path(evidence or os.environ.get('HEADSTART_EVIDENCE_DIR',ROOT/'.local/evidence'))
    keyfile=ROOT/'.local/cursor.key'
    if not database.is_file() or (secret is None and not keyfile.is_file()): raise ApiError('CATALOG_UNAVAILABLE','The local catalog is not initialized.',503,'Run npm run catalog:init, then retry.')
    secret=secret or keyfile.read_bytes()
    if len(secret)<32: raise ApiError('CATALOG_UNAVAILABLE','Cursor signing is unavailable.',503,'Reinitialize the local cursor key.')
    if len(url)>8192: raise ApiError('INVALID_QUERY','Request URL is too long.')
    parsed=urlsplit(url); pairs=parse_qsl(parsed.query,keep_blank_values=True,max_num_fields=30)
    store=CatalogStore(database,evidence)
    try:
        documents=public_documents(store)
        if parsed.path in ['/v1/search','/api/catalog/search']: return search(documents,pairs,secret)
        if parsed.path=='/api/research':
            # The display projection is explicit research metadata, independently
            # labeled and persisted during init; never an eligible catalog shortcut.
            row=store.db.execute("SELECT payload FROM display_projection WHERE id=1").fetchone()
            if row is None: raise ApiError('CATALOG_UNAVAILABLE','Research display projection is unavailable.',503,'Run npm run catalog:init.')
            return search(json.loads(row['payload']),pairs,secret,True)
        import re
        component=re.fullmatch(r'/v1/components/([A-Za-z0-9_.-]{1,120})/versions/([A-Za-z0-9_.-]{1,120})',parsed.path)
        project=re.fullmatch(r'/v1/projects/([A-Za-z0-9_.-]{1,120})',parsed.path)
        if component or project:
            if pairs: raise ApiError('INVALID_QUERY','Detail routes do not accept query parameters.')
            matches=[r for r in documents if (component and r['type']=='component' and r['id']==component[1] and r['version']==component[2]) or (project and r['type']=='project' and r['id']==project[1])]
            if not matches: raise ApiError('NOT_FOUND','No eligible public version was found.',404,'Return to search; removed and unresolved versions are not available.')
            return {'schemaVersion':API_VERSION,**({'item':matches[0]} if component else {'versions':matches})}
        raise ApiError('NOT_FOUND','Unknown catalog route.',404)
    finally: store.close()

def main():
    try:
        request=json.loads(sys.stdin.read(16385))
        if not isinstance(request,dict) or set(request)!={'url'} or not isinstance(request['url'],str): raise ApiError('INVALID_QUERY','Malformed request.')
        print(json.dumps({'status':200,'body':serve(request['url'])}))
    except ApiError as error: print(json.dumps({'status':error.status,'body':error.body}))
    except (ValueError,TypeError): print(json.dumps({'status':400,'body':{'error':{'code':'INVALID_QUERY','message':'Malformed query.','retriable':False,'action':'Correct the query and retry.'}}}))
    except Exception: print(json.dumps({'status':503,'body':{'error':{'code':'CATALOG_UNAVAILABLE','message':'Catalog data is temporarily unavailable.','retriable':True,'action':'Initialize the local catalog and retry.'}}}))

if __name__=='__main__': main()
