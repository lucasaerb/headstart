"""Bounded local queue transport. Caller authenticates curator identity server-side."""
import json
import os
import sys
from pathlib import Path
from urllib.parse import urlsplit
import ipaddress
import socket
from services.intake.pipeline import PinnedHTTPS
from services.catalog.store import CatalogStore
from .store import Queue
ROOT=Path(__file__).resolve().parents[2]
def fetch_proof(url):
    """Pinned public TLS socket; no proxies, redirects, credentials or compressed bodies."""
    parsed=urlsplit(url)
    if parsed.scheme!='https' or parsed.hostname not in ('api.github.com','raw.githubusercontent.com') or parsed.port not in (None,443) or parsed.username or parsed.password or parsed.query or parsed.fragment:raise ValueError('Unsupported ownership destination')
    addresses={r[4][0] for r in socket.getaddrinfo(parsed.hostname,443,type=socket.SOCK_STREAM)}
    if not addresses or any(not ipaddress.ip_address(a).is_global for a in addresses):raise ValueError('Nonpublic ownership destination')
    maximum=262144 if parsed.hostname=='api.github.com' else 4096
    connection=PinnedHTTPS(parsed.hostname,sorted(addresses)[0])
    try:
        connection.request('GET',parsed.path,headers={'User-Agent':'HeadStart-local-control-check','Accept':'application/vnd.github+json' if parsed.hostname=='api.github.com' else 'text/plain','Accept-Encoding':'identity','X-GitHub-Api-Version':'2026-03-10'})
        response=connection.getresponse()
        if response.status!=200:raise ValueError('Ownership evidence unavailable or redirected')
        if response.getheader('Content-Encoding','identity')!='identity':raise ValueError('Compressed ownership evidence rejected')
        declared=response.getheader('Content-Length')
        if declared and int(declared)>maximum:raise ValueError('Ownership evidence oversized')
        body=response.read(maximum+1)
        if len(body)>maximum:raise ValueError('Ownership evidence oversized')
        return body
    finally:connection.close()

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
