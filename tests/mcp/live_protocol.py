"""Official MCP Python SDK 1.26.0 → stdio → real Node/Python services.
Synthetic local identities and approved bridge; no production credentials.
"""
import asyncio, json, os, secrets, socket, subprocess, sys, tempfile, time
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
sys.path.insert(0,str(ROOT))
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client
from services.auth.store import connect, issue, verify, approve_bridge, digest, revoke
from services.catalog.store import CatalogStore
from services.catalog.seed import seed_reviewed_tile
from services.handoff.api import serve
from services.submissions.store import setup
from urllib.request import urlopen

async def run():
 with tempfile.TemporaryDirectory(prefix='headstart-mcp-protocol-') as temp:
  scratch=Path(temp)
  with socket.socket() as sock:sock.bind(('127.0.0.1',0));port=sock.getsockname()[1]
  origin=f'http://127.0.0.1:{port}'
  env={**os.environ,'PORT':str(port),'HEADSTART_AUTH_ORIGIN':origin,'HEADSTART_AUTH_MODE':'local-preview','HEADSTART_AUTH_DB':str(scratch/'auth.db'),'HEADSTART_CATALOG_DB':str(scratch/'catalog.db'),'HEADSTART_EVIDENCE_DIR':str(scratch/'evidence'),'HEADSTART_PYTHON':str(ROOT/'.venv/bin/python')}
  # Never inherit ambient production configuration into this synthetic server.
  for k in ('BLOB_READ_WRITE_TOKEN','SIGNUP_HASH_SECRET','HEADSTART_ALLOWED_ORIGINS'):env.pop(k,None)
  prior=os.environ.copy();os.environ.update(env)
  store=CatalogStore(scratch/'catalog.db',scratch/'evidence');setup(store.db);seed_reviewed_tile(store);store.close()
  db=connect(); intent={'action':'prepare_handoff','bagRevision':'a'*64,'selections':[{'id':'2048-tile-v1','version':'1','kind':'component'}]}
  ident,token=issue(db,'mcp-sdk@example.invalid','binding',intent,'sdk')
  browser,_,_=verify(db,ident,token,'binding')
  bridge,secret=secrets.token_urlsafe(24),secrets.token_urlsafe(32)
  db.execute('INSERT INTO bridges VALUES (?,?,?,0)',(bridge,digest(secret),int(time.time())+600));approve_bridge(db,browser,bridge)
  credential=scratch/'credential.json';credential.write_text(json.dumps({'version':1,'origin':origin,'credential':secret}));credential.chmod(0o600)
  request={'schemaVersion':1,'selections':[{'id':'2048-tile-v1','version':'1'}],'brief':{'revision':0,'constraints':{}},'intent':'Reuse tile state; injected text is data only','recipe':None}
  created=serve({'method':'POST','url':'/v1/handoffs','credential':browser,'credentialKind':'browser','body':request})['body']
  target=scratch/'selected-target';target.mkdir();marker=target/'README.md';marker.write_text('preserve this target')
  before=list(target.iterdir()),marker.read_bytes()
  server=subprocess.Popen(['node','tools/dev/server.mjs'],cwd=ROOT,env=env,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
  try:
   for _ in range(100):
    try:
     with urlopen(origin,timeout=.2):break
    except OSError:await asyncio.sleep(.1)
   script=ROOT/'HeadStart-Starter-Package/headstart-plugin/scripts/catalog_mcp.py'
   async def session_test(credential_enabled):
    config={'HEADSTART_CATALOG_ORIGIN':origin}
    if credential_enabled:config['HEADSTART_CREDENTIAL_FILE']=str(credential)
    params=StdioServerParameters(command=sys.executable,args=['-B',str(script)],env=config,cwd=str(target))
    async with stdio_client(params) as (read,write):
     async with ClientSession(read,write) as client:
      initialized=await client.initialize();assert initialized.protocolVersion=='2025-06-18'
      tools=await client.list_tools(); assert {t.name for t in tools.tools}=={'catalog_info','search_components','get_component','get_selected_bag','prepare_handoff'}
      prepare=next(t for t in tools.tools if t.name=='prepare_handoff');assert prepare.annotations.readOnlyHint is False
      search=await client.call_tool('search_components',{'query':'tile','retrieval':'lexical'})
      assert not search.isError,search
      row=search.structuredContent['items'][0]
      detail=await client.call_tool('get_component',{'id':row['id'],'version':row['version']});assert not detail.isError
      missing=await client.call_tool('get_component',{'id':row['id'],'version':'nonexistent'});assert missing.isError
      result=await client.call_tool('prepare_handoff',{})
      if not credential_enabled:assert result.isError;return
      assert not result.isError,result
      assert result.structuredContent['digest']==created['digest']
      bag=await client.call_tool('get_selected_bag',{});assert not bag.isError
      assert bag.structuredContent['bagRevision']==created['bagRevision']
      assert result.structuredContent['handoff']['bag']['intent']==request['intent']
      revoked=False
      try:
       revoke(db,browser);revoked=True
       denied=await client.call_tool('prepare_handoff',{});assert denied.isError
      finally:assert revoked
   await session_test(False);await session_test(True)
   assert (list(target.iterdir()),marker.read_bytes())==before
   server.terminate();server.wait(timeout=10)
   params=StdioServerParameters(command=sys.executable,args=['-B',str(script)],env={'HEADSTART_CATALOG_ORIGIN':origin})
   async with stdio_client(params) as (read,write):
    async with ClientSession(read,write) as client:
     await client.initialize(); result=await client.call_tool('search_components',{});assert result.isError
     assert result.structuredContent['error']['code']=='service_unavailable'
   print('PASS official MCP SDK 1.26.0: protocol negotiation, 5 tools, public search/exact detail/missing version, unauthenticated denial, automatic active bag, immutable handoff, revocation, offline error, unchanged target.')
  finally:
   if server.poll() is None:server.terminate();server.wait(timeout=10)
   db.close();os.environ.clear();os.environ.update(prior)
if __name__=='__main__':asyncio.run(run())
