import test from 'node:test';
import assert from 'node:assert/strict';
import { createHandler, emailAddress, CONSENT_VERSION } from '../../HeadStart-Starter-Package/site/dist/api/subscribe.js';
const env = { BLOB_READ_WRITE_TOKEN: 'test-token', SIGNUP_HASH_SECRET: 'test-secret', HEADSTART_ALLOWED_ORIGINS: 'https://headstart.test', VERCEL: '1' };
function fixture(overrides = {}) {
  const blobs = new Map(); const calls = [];
  const write = async (path, content, options) => { calls.push({ path, options }); if (blobs.has(path)) throw new Error('already exists'); blobs.set(path, content); };
  const read = async path => blobs.has(path) ? { statusCode: 200, stream: new Response(blobs.get(path)).body } : null;
  const handler = createHandler({ write, read, env, now: () => new Date('2026-09-10T20:10:00Z'), ...overrides });
  async function request(change = {}) {
    const req = { method: 'POST', headers: { origin: 'https://headstart.test', 'content-type': 'application/json', 'x-vercel-forwarded-for': '192.0.2.1' }, body: { email: 'Test@example.com', website: '', consentVersion: CONSENT_VERSION }, ...change };
    const res = { headers: {}, setHeader(k,v) { this.headers[k]=v; }, status(code) { this.code=code; return this; }, json(body) { this.body=body; return this; } };
    await handler(req,res); return res;
  }
  return { blobs, calls, request };
}
test('private durable record, consent, no raw email pathname or response', async () => {
  const f=fixture(); const r=await f.request(); assert.equal(r.code,200);
  const [path,value]=[...f.blobs].find(([key])=>key.startsWith('signups/'));
  assert.ok(!path.includes('example')); const record=JSON.parse(value);
  assert.equal(record.email,'test@example.com'); assert.equal(record.identityStatus,'unverified'); assert.equal(record.consentVersion,CONSENT_VERSION);
  assert.ok(!JSON.stringify(r).includes('test@example.com'));
  for(const call of f.calls) { assert.equal(call.options.access,'private'); assert.equal(call.options.allowOverwrite,false); assert.equal(call.options.addRandomSuffix,false); }
});
test('concurrent retries dedupe and preserve initial record', async () => {
  const f=fixture(); const results=await Promise.all([f.request(),f.request(),f.request()]); assert.ok(results.every(r=>r.code===200)); assert.equal([...f.blobs.keys()].filter(p=>p.startsWith('signups/')).length,1);
});
test('distributed limit caps attempts at five per IP/hour',async()=>{
  const f=fixture(); for(let n=0;n<5;n++)assert.equal((await f.request()).code,200); const r=await f.request(); assert.equal(r.code,429); assert.equal(r.headers['Retry-After'],'3000');
});
test('method origin type oversized body invalid consent honeypot rejected before storage',async()=>{
  const f=fixture();
  for(const [change,expected] of [[{method:'GET'},405],[{headers:{origin:'https://evil.test'}},403],[{headers:{origin:'https://headstart.test','content-type':'text/plain'}},415],[{body:'x'.repeat(1025)},400],[{body:{email:'a@b.com',website:'bot',consentVersion:CONSENT_VERSION}},400],[{body:{email:'a@b.com',website:'',consentVersion:'wrong'}},400],[{body:{email:'invalid',website:'',consentVersion:CONSENT_VERSION}},400]]) assert.equal((await f.request(change)).code,expected);
  assert.equal(f.calls.length,0);
});
test('missing credentials and storage failure fail honestly',async()=>{
  assert.equal((await fixture({env:{...env,BLOB_READ_WRITE_TOKEN:''}}).request()).code,503);
  assert.equal((await fixture({write:async()=>{throw new Error('outage');}}).request()).code,503);
});
test('email normalization preserves plus addressing and rejects malformed local/domain',()=>{
  assert.equal(emailAddress(' A+test@Example.com '),'a+test@example.com');
  for(const value of ['a..b@example.com','.a@example.com','a@-example.com','a@example','a\n@example.com','a'.repeat(65)+'@example.com'])assert.equal(emailAddress(value),null);
});
test('concurrent rate slots enforce exactly five accepted requests',async()=>{
  const f=fixture();const results=await Promise.all(Array.from({length:9},()=>f.request()));assert.equal(results.filter(r=>r.code===200).length,5);assert.equal(results.filter(r=>r.code===429).length,4);
});
test('ambiguous write only succeeds after matching persisted readback',async()=>{
  let saved; const f=fixture({write:async(path,content)=>{if(path.startsWith('signups/')){saved=content;throw new Error('timeout after durable write');}},read:async()=>({statusCode:200,stream:new Response(saved).body})});assert.equal((await f.request()).code,200);
  const bad=fixture({write:async(path)=>{if(path.startsWith('signups/'))throw new Error('write failed');},read:async()=>({statusCode:200,stream:new Response(JSON.stringify({email:'other@example.com',schemaVersion:'headstart-email-signup-1'})).body})});assert.equal((await bad.request()).code,503);
  const missing=fixture({write:async(path)=>{if(path.startsWith('signups/'))throw new Error('write failed');},read:async()=>null});assert.equal((await missing.request()).code,503);
});
test('demo-only consent adds no updates; later opt-in preserves first demo record',async()=>{
  const f=fixture();const body={email:'test@example.com',website:'',consentVersion:CONSENT_VERSION,purpose:'demo-access',updates:false,gameId:'tiny-game'};
  assert.equal((await f.request({body})).code,200);
  const demo=[...f.blobs].find(([key])=>key.endsWith('/demo-access.json'));assert.ok(demo);assert.equal(JSON.parse(demo[1]).purpose,'demo-access');assert.ok(![...f.blobs.keys()].some(key=>key.endsWith('/updates.json')));
  assert.equal((await f.request({body:{...body,updates:true,gameId:'other-game'}})).code,200);
  assert.equal(f.blobs.get(demo[0]),demo[1]);assert.equal([...f.blobs.keys()].filter(key=>key.endsWith('/updates.json')).length,1);
});
test('homepage consent preserved after demo access; malformed demo choices fail',async()=>{
  const f=fixture();await f.request();const initial=[...f.blobs].find(([key])=>key.endsWith('/updates.json'));
  const body={email:'test@example.com',website:'',consentVersion:CONSENT_VERSION,purpose:'demo-access',updates:false,gameId:'tiny-game'};assert.equal((await f.request({body})).code,200);assert.equal(f.blobs.get(initial[0]),initial[1]);
  assert.equal((await f.request({body:{...body,updates:'yes'}})).code,400);assert.equal((await f.request({body:{...body,gameId:'../../private'}})).code,400);
});
test('partial demo and marketing write failure is honest and retry recovers without overwriting',async()=>{
  const stored=new Map();let failUpdates=true;
  const f=fixture({write:async(path,data)=>{if(path.endsWith('/updates.json')&&failUpdates)throw Error('outage');if(stored.has(path))throw Error('exists');stored.set(path,data);},read:async(path)=>stored.has(path)?{statusCode:200,stream:new Response(stored.get(path)).body}:null});
  const body={email:'test@example.com',website:'',consentVersion:CONSENT_VERSION,purpose:'demo-access',updates:true,gameId:'tiny-game'};
  assert.equal((await f.request({body})).code,503);const demo=[...stored].find(([key])=>key.endsWith('/demo-access.json'));assert.ok(demo);failUpdates=false;
  assert.equal((await f.request({body})).code,200);assert.equal((await f.request({body})).code,200);assert.equal(stored.get(demo[0]),demo[1]);assert.equal([...stored.keys()].filter(key=>key.startsWith('signups/')).length,2);
});
