"""Explicit local operator preview and stdio credential pairing, never live mail."""
import argparse
import json
import os
from pathlib import Path
import secrets
import time
from .api import canonical_origin
from .store import connect,digest

def main():
    p=argparse.ArgumentParser()
    sub=p.add_subparsers(dest='command',required=True)
    preview=sub.add_parser('preview'); preview.add_argument('challenge')
    bridge=sub.add_parser('connect-mcp'); bridge.add_argument('--file',required=True)
    args=p.parse_args()
    origin=canonical_origin()
    if args.command=='preview':
        if os.environ.get('HEADSTART_AUTH_DELIVERY')!='preview': p.error('Preview delivery is not enabled')
        if not all(c.isalnum() or c in '_-' for c in args.challenge): p.error('Invalid challenge')
        path=Path(os.environ.get('HEADSTART_AUTH_PREVIEW_DIR','.local/auth-preview'))/(args.challenge+'.json')
        print(json.loads(path.read_text())['url'])
    else:
        token,ident=secrets.token_urlsafe(32),secrets.token_urlsafe(24)
        path=Path(args.file).expanduser()
        path.parent.mkdir(parents=True,exist_ok=True,mode=0o700)
        fd=os.open(path,os.O_WRONLY|os.O_CREAT|os.O_EXCL,0o600)
        db=connect()
        try:
            db.execute('INSERT INTO bridges VALUES (?,?,?,0)',(ident,digest(token),int(time.time())+600))
            with os.fdopen(fd,'w') as f: json.dump({'version':1,'origin':origin,'credential':token},f)
        finally: db.close()
        print('Open in your verified browser to approve local MCP access: '+origin+'/auth.html#connect='+ident)
        print('Credential saved privately; inactive until browser approval. Do not paste it into prompts.')
if __name__=='__main__': main()
