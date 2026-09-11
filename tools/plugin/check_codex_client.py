"""Maintainer-only real Codex client check using a distinct, disposable test marketplace.
The caller scaffolds/registers that marketplace first. Never targets the user's personal plugin.
Run from repo root with .venv/bin/python; no model call, production auth or email delivery.
"""
from __future__ import annotations
import argparse
import hashlib
import importlib.util
import json
import os
from pathlib import Path
import queue
import secrets
import shutil
import socket
import subprocess
import sys
import tempfile
import threading
import time
import zipfile
from urllib.request import urlopen, Request
ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT))
from services.auth.store import connect, issue, verify, approve_bridge, digest, revoke
from services.catalog.store import CatalogStore
from services.catalog.seed import seed_reviewed_tile
from services.submissions.store import setup


class Client:
    def __init__(self, cwd):
        self.process = subprocess.Popen(['codex', 'app-server', '--stdio'], cwd=cwd,
            stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL,
            text=True, bufsize=1)
        self.queue = queue.Queue(); self.sequence = 0
        def receive():
            for line in self.process.stdout:
                try: self.queue.put(json.loads(line))
                except ValueError: pass
        threading.Thread(target=receive, daemon=True).start()
        self.call('initialize', {'clientInfo': {'name': 'headstart-release-review', 'version': '1'},
                               'capabilities': {'experimentalApi': True}})
        self.process.stdin.write('{"method":"initialized","params":{}}\n'); self.process.stdin.flush()
        self.thread = self.call('thread/start', {'cwd': str(cwd), 'sandbox': 'read-only', 'approvalPolicy': 'never'})['thread']['id']
    def call(self, method, params):
        self.sequence += 1
        self.process.stdin.write(json.dumps({'id': self.sequence, 'method': method, 'params': params})+'\n'); self.process.stdin.flush()
        end=time.time()+60
        while time.time()<end:
            item=self.queue.get(timeout=max(.1,end-time.time()))
            if item.get('id') == self.sequence:
                if 'error' in item: raise RuntimeError(str(item['error']))
                return item.get('result')
        raise TimeoutError(method)
    def tool(self, name, args):
        response=self.call('mcpServer/tool/call', {'threadId':self.thread, 'server':'headstart-release-test', 'tool':name, 'arguments':args})
        value=response.get('structuredContent')
        if value is None: value=json.loads(next(c['text'] for c in response['content'] if c['type']=='text'))
        return {'isError':response.get('isError',False),'value':value}
    def close(self):
        self.process.terminate(); self.process.wait(timeout=10)
        self.process.stdin.close(); self.process.stdout.close()


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--marketplace',type=Path,required=True)
    parser.add_argument('--output',type=Path,required=True)
    args=parser.parse_args(); market=args.marketplace.resolve()
    registry=json.loads((market/'.agents/plugins/marketplace.json').read_text())
    name=registry['name']
    if not name.startswith('headstart-review') or name=='personal': raise ValueError('Use a distinct disposable headstart-review marketplace.')
    plugin_id='headstart-plugin@'+name; plugin=market/'plugins/headstart-plugin'
    evidence={'client':subprocess.check_output(['codex','--version'],text=True).strip(),
        'testScope':'Fresh installed plugin; synthetic local account and prepared selection submitted through the real browser HTTP route. No model invocation or target writes.',
        'testAdaptation':'Only test marketplace name and MCP server key differ, to preserve the existing personal installation. Runtime/skills bytes are checked below.', 'checks':{}}
    source=ROOT/'HeadStart-Starter-Package/headstart-plugin'
    def install(mode, origin=None, credential=None, old=False):
        subprocess.run(['codex','plugin','remove',plugin_id],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL,check=False)
        if plugin.exists(): shutil.rmtree(plugin)
        if old:
            with zipfile.ZipFile(ROOT/'HeadStart-Starter-Package/site/dist/downloads/headstart-plugin-0.3.0.zip') as archive:
                for member in archive.namelist():
                    if member.startswith('plugins/headstart-plugin/'):
                        archive.extract(member,market)
        else:
            shutil.copytree(source,plugin,ignore=shutil.ignore_patterns('__pycache__','tests'))
            command=[sys.executable,str(plugin/'scripts/configure_connection.py'),mode]
            if origin:command+=['--origin',origin]
            if credential:command+=['--credential-file',str(credential)]
            subprocess.run(command,check=True,stdout=subprocess.DEVNULL)
        config=json.loads((plugin/'mcp.json').read_text())
        config['mcpServers']['headstart-release-test']=config['mcpServers'].pop('headstart')
        (plugin/'mcp.json').write_text(json.dumps(config,indent=2)+'\n')
        result=json.loads(subprocess.check_output(['codex','plugin','add',plugin_id,'--json'],text=True))
        cached=Path(result['installedPath'])
        checked={str(p.relative_to(source)):hashlib.sha256(p.read_bytes()).hexdigest()
                 for p in source.rglob('*') if p.is_file() and (p.parent.name=='scripts' or '/skills/' in str(p)) and p.suffix in ('.py','.md','.yaml') and p.name!='bundle_catalog.py'}
        if not old:
            for relative,d in checked.items():assert hashlib.sha256((cached/relative).read_bytes()).hexdigest()==d
        return {'pluginId':result['pluginId'],'version':result['version'],'authPolicy':result['authPolicy'],'runtimeAndSkillHashes':{} if old else checked}
    prior=os.environ.copy()
    for key in list(os.environ):
        if key.startswith('HEADSTART_') or key in ('BLOB_READ_WRITE_TOKEN','SIGNUP_HASH_SECRET'):os.environ.pop(key)
    server=None; db=None; client=None
    try:
      with tempfile.TemporaryDirectory(prefix='headstart-codex-release-') as temporary:
        scratch=Path(temporary)
        with socket.socket() as sock:sock.bind(('127.0.0.1',0));port=sock.getsockname()[1]
        origin=f'http://127.0.0.1:{port}'
        os.environ.update(PORT=str(port),HEADSTART_AUTH_ORIGIN=origin,HEADSTART_AUTH_MODE='local-preview',HEADSTART_AUTH_DB=str(scratch/'auth.db'),HEADSTART_CATALOG_DB=str(scratch/'catalog.db'),HEADSTART_EVIDENCE_DIR=str(scratch/'evidence'),HEADSTART_PYTHON=str(ROOT/'.venv/bin/python'))
        store=CatalogStore(scratch/'catalog.db',scratch/'evidence');setup(store.db);seed_reviewed_tile(store);store.close()
        db=connect();intent={'action':'prepare_handoff','bagRevision':'a'*64,'selections':[{'id':'2048-tile-v1','version':'1','kind':'component'}]}
        ident,token=issue(db,'client-check@example.invalid','binding',intent,'codex')
        browser,csrf,_=verify(db,ident,token,'binding')
        bridge,secret=secrets.token_urlsafe(24),secrets.token_urlsafe(32)
        db.execute('INSERT INTO bridges VALUES (?,?,?,0)',(bridge,digest(secret),int(time.time())+600));approve_bridge(db,browser,bridge)
        credential=scratch/'private.json';credential.write_text(json.dumps({'version':1,'origin':origin,'credential':secret}));credential.chmod(0o600)
        request={'schemaVersion':1,'selections':[{'id':'2048-tile-v1','version':'1'}],'brief':{'revision':2,'constraints':{'experience':{'value':'cozy puzzle','origin':'explicit'}}},'intent':'Reuse tile state and preserve existing rendering','recipe':None}
        server=subprocess.Popen(['node','tools/dev/server.mjs'],cwd=ROOT,env=os.environ.copy(),stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
        for _ in range(80):
            try:
                with urlopen(origin,timeout=.2):break
            except OSError:time.sleep(.1)
        with urlopen(Request(origin+'/v1/handoffs',data=json.dumps(request).encode(),headers={'Content-Type':'application/json','Origin':origin,'Cookie':'hs_session='+browser,'X-CSRF-Token':csrf}),timeout=20) as response:
            prepared=json.load(response)
        evidence['publicInstall']=install('localhost',origin)
        client=Client(market)
        public=client.tool('search_components',{'query':'tile','retrieval':'lexical'})
        assert not public['isError'] and public['value']['items']
        denied=client.tool('get_selected_bag',{});assert denied['isError']
        evidence['checks']['publicWithoutIdentity']=public;evidence['checks']['unpairedDenied']=denied
        client.close();client=None
        evidence['pairedInstall']=install('localhost',origin,credential)
        client=Client(market)
        skills=client.call('skills/list',{'cwds':[str(market)],'forceReload':True})
        selected=[s for entry in skills['data'] for s in entry['skills'] if s.get('pluginId')==plugin_id]
        assert len(selected)==12 and all(s['enabled'] for s in selected)
        evidence['skills']=[{'name':s['name'],'enabled':s['enabled'],'pluginId':s['pluginId']} for s in selected]
        status=client.call('mcpServerStatus/list',{'threadId':client.thread})
        owned=next(s for s in status['data'] if s.get('pluginId')==plugin_id)
        assert owned['runtimeStatus']=='connected' and owned['serverInfo']['version']=='0.7.0'
        evidence['server']={k:owned[k] for k in ('name','runtimeStatus','pluginId','serverInfo','tools')}
        info=client.tool('catalog_info',{});assert info['value']['schemaVersion']=='headstart-catalog-api-1'
        evidence['checks']['catalogInfo']=info
        row=public['value']['items'][0]
        detail=client.tool('get_component',{'id':row['id'],'version':row['version']});assert not detail['isError']
        missing=client.tool('get_component',{'id':row['id'],'version':'not-present'});assert missing['isError']
        bag=client.tool('get_selected_bag',{});handoff=client.tool('prepare_handoff',{})
        assert not bag['isError'] and not handoff['isError']
        assert bag['value']['bagRevision']==prepared['bagRevision']
        assert handoff['value']['digest']==prepared['digest']
        assert handoff['value']['handoff']['bag']==bag['value']['bag']
        assert bag['value']['bag']['brief']==request['brief'] and bag['value']['bag']['intent']==request['intent']
        for key,value in [('agentFirstExactDetail',detail),('missingVersion',missing),('automaticPreparedBag',bag),('immutableHandoff',handoff)]:evidence['checks'][key]=value
        revoke(db,browser)
        denied=client.tool('prepare_handoff',{});assert denied['isError'];evidence['checks']['revokedDenied']=denied
        server.terminate();server.wait(timeout=10);server=None
        offline=client.tool('search_components',{});assert offline['isError'] and offline['value']['error']['code']=='service_unavailable';evidence['checks']['serviceOffline']=offline
        client.close();client=None
        evidence['offlineInstall']=install('offline')
        client=Client(market);snapshot=client.tool('catalog_info',{});assert snapshot['value']['projects']==52
        evidence['checks']['explicitOfflineSnapshot']=snapshot;client.close();client=None
        evidence['rollbackInstall']=install('offline',old=True)
        client=Client(market);rollback=client.tool('catalog_info',{});assert rollback['value']['projects']==52
        evidence['checks']['rollback03']=rollback;client.close();client=None
        evidence['verdict']='PASS'
        args.output.parent.mkdir(parents=True,exist_ok=True);args.output.write_text(json.dumps(evidence,indent=2)+'\n')
        print('PASS: actual Codex installation, twelve skills, public lookup, exact detail, current bag, handoff, denied/revoked/offline, explicit snapshot and 0.3 rollback.')
    finally:
        if client:client.close()
        if server:server.terminate();server.wait(timeout=10)
        if db:db.close()
        os.environ.clear();os.environ.update(prior)


if __name__=='__main__':main()
