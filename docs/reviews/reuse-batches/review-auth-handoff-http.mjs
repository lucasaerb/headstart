// Independent reviewer probes: real HTTP, synthetic local identities only.
import assert from 'node:assert/strict';
import { mkdtemp,rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { createDevServer } from '../../../tools/dev/server.mjs';
const tmp=await mkdtemp(join(tmpdir(),'headstart-review-http-'));
Object.assign(process.env,{HEADSTART_AUTH_DB:join(tmp,'auth.db'),HEADSTART_AUTH_DELIVERY:'preview',HEADSTART_AUTH_PREVIEW_DIR:join(tmp,'preview'),HEADSTART_CATALOG_DB:join(tmp,'catalog.db'),HEADSTART_EVIDENCE_DIR:join(tmp,'evidence')});
const result=spawnSync('.venv/bin/python',['-c',`import json,time
from services.catalog.store import CatalogStore
from services.catalog.seed import seed_reviewed_tile
from services.submissions.store import setup
from services.auth.store import *
s=CatalogStore(os.environ['HEADSTART_CATALOG_DB'],os.environ['HEADSTART_EVIDENCE_DIR']);seed_reviewed_tile(s);setup(s.db);s.close()
db=connect();out={}
for name in ['alice','bob']:
 i,t=issue(db,name+'@example.invalid','binding',{'action':'account','bagRevision':'a'*64,'selections':[]},name)
 session,csrf,_=verify(db,i,t,'binding');bridge=secrets.token_urlsafe(32);ident=secrets.token_urlsafe(24)
 db.execute('INSERT INTO bridges VALUES (?,?,?,0)',(ident,digest(bridge),int(time.time())+600));approve_bridge(db,session,ident)
 out[name]={'cookie':'hs_session='+session,'csrf':csrf,'bridge':bridge}
print(json.dumps(out));db.close()`],{env:process.env,encoding:'utf8'});assert.equal(result.status,0);const identity=JSON.parse(result.stdout);
const server=createDevServer();await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;process.env.HEADSTART_AUTH_ORIGIN=origin;
const request={schemaVersion:1,selections:[{id:'2048-tile-v1',version:'1'}],brief:{revision:7,constraints:{preserve:{value:'existing camera',origin:'explicit'}}},intent:'Reuse tile state',recipe:null};
const call=(path,body,headers={})=>fetch(origin+path,{method:body?'POST':'GET',headers:{...(body?{'Content-Type':'application/json'}:{}),...headers},body:body?JSON.stringify(body):undefined});
const alice={Cookie:identity.alice.cookie,Origin:origin,'X-CSRF-Token':identity.alice.csrf};
try{
 assert.equal((await call('/v1/search?limit=1')).status,200);
 const challengeIntent={action:'account',bagRevision:'a'.repeat(64),selections:[]};
 const known=await call('/api/auth/challenge',{email:'alice@example.invalid',intent:challengeIntent},{Origin:origin});
 const unknown=await call('/api/auth/challenge',{email:'unknown@example.invalid',intent:challengeIntent},{Origin:origin});
 assert.equal(known.status,202);assert.equal(unknown.status,202);assert.deepEqual(Object.keys(await known.json()),Object.keys(await unknown.json()));
 assert.equal((await call('/api/auth/challenge',{email:'x'.repeat(25000)},{Origin:origin})).status,413);
 assert.equal((await call('/v1/handoffs',{...request,verified_email:true})).status,401);
 assert.equal((await call('/v1/handoffs',request,{Cookie:identity.alice.cookie})).status,403);
 assert.equal((await call('/v1/handoffs',request,{Authorization:'Bearer '+identity.alice.cookie.slice(11)})).status,401);
 assert.equal((await call('/v1/handoffs',request,{Authorization:'Bearer '+identity.alice.bridge,Origin:origin})).status,403);
 assert.equal((await call('/v1/bags/current',null,{Authorization:'Bearer '+identity.alice.bridge})).status,404);
 const made=await call('/v1/handoffs',request,alice);assert.equal(made.status,200);assert.equal(made.headers.get('cache-control'),'no-store');const packet=await made.json();
 const url='/v1/handoffs/'+packet.digest+'/json';
 assert.equal((await call(url)).status,401);
 assert.equal((await call(url,null,{Authorization:'Bearer '+identity.bob.bridge})).status,404);
 assert.equal((await call('/v1/bags/'+packet.bagRevision,null,{Authorization:'Bearer '+identity.bob.bridge})).status,404);
 const own=await call(url,null,{Authorization:'Bearer '+identity.alice.bridge});assert.equal(own.status,200);const content=JSON.parse((await own.json()).content);assert.equal(content.target.assumptions.preserve.value,'existing camera');assert.equal(content.bag.brief.revision,7);
 assert.equal((await call('/v1/handoffs',{...request,recipe:{id:'unknown'}},alice)).status,422);
 const current=await call('/v1/bags/current',null,{Authorization:'Bearer '+identity.alice.bridge});assert.equal(current.status,200);assert.equal((await current.json()).bagRevision,packet.bagRevision);
 const logout=await call('/api/auth/logout',{},alice);assert.equal(logout.status,200);
 assert.equal((await call(url,null,{Authorization:'Bearer '+identity.alice.bridge})).status,401);
 assert.equal((await call('/v1/bags/current',null,{Authorization:'Bearer '+identity.alice.bridge})).status,401);
 let limited=false;
 for(let i=0;i<21;i++){const response=await call('/v1/bags/current',null,{Authorization:'Bearer '+identity.bob.bridge});if(response.status===429){limited=true;break;}assert.equal(response.status,404);}
 assert.equal(limited,true);
 for(const path of ['/.local/auth.db','/services/auth/store.py','/api/auth-preview','/runtime/catalog.sqlite3'])assert.equal((await call(path)).status,404);
 console.log('PASS reviewer real HTTP: public retrieval, forged flag, CSRF, typed bearer, browser bearer, owner isolation, protected current/history, non-enumerating challenge responses, request-size and artifact-rate limits, preserved brief, unsupported recipe, revoke delivery and private routes.');
}finally{await new Promise(r=>server.close(r));await rm(tmp,{recursive:true,force:true});}
