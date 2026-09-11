import {pythonCommand} from '../tools/dev/catalog-handler.mjs';
import {chromium,expect} from '@playwright/test';
import {mkdtemp,mkdir,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {execFileSync} from 'node:child_process';
import {createDevServer} from '../tools/dev/server.mjs';
const scratch=await mkdtemp(join(tmpdir(),'headstart-operations-'));
const channel=process.env.HEADSTART_CHROME_CHANNEL;
for(const key of Object.keys(process.env))if(key.startsWith('HEADSTART_')||['BLOB_READ_WRITE_TOKEN','SIGNUP_HASH_SECRET'].includes(key))delete process.env[key];
Object.assign(process.env,{HEADSTART_CATALOG_DB:join(scratch,'catalog.db'),HEADSTART_EVIDENCE_DIR:join(scratch,'evidence'),HEADSTART_AUTH_DB:join(scratch,'auth.db'),HEADSTART_AUTH_MODE:'local-preview',HEADSTART_TELEMETRY:'1'});
execFileSync(pythonCommand(),['-c',`import os,time
from services.catalog.store import CatalogStore
from services.submissions.store import setup
from services.operations.health import HealthJobs
s=CatalogStore(os.environ['HEADSTART_CATALOG_DB'],os.environ['HEADSTART_EVIDENCE_DIR']);setup(s.db)
h=HealthJobs(s.db,clock=lambda:int(time.time())-90000);h.register('controlled-demo-v1','https://example.com/game',featured=True);h.run(fetch=lambda u:'broken_url');s.close()`],{env:process.env});
const server=createDevServer();await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;process.env.HEADSTART_AUTH_ORIGIN=base;
const identity=JSON.parse(execFileSync(pythonCommand(),['-c',`import json
from services.auth.store import connect,issue,verify
db=connect();id,token=issue(db,'ops@example.invalid','binding',{'action':'account','bagRevision':'a'*64,'selections':[]},'test');session,csrf,_=verify(db,id,token,'binding');account=db.execute('SELECT id FROM accounts').fetchone()[0];print(json.dumps({'session':session,'account':account}))`],{env:process.env,encoding:'utf8'}));
process.env.HEADSTART_CURATOR_ACCOUNTS=identity.account;
const output=process.env.SCREENSHOT_DIR||'test-results/operations';await mkdir(output,{recursive:true});
const browser=await chromium.launch(channel?{channel}:{});
try{for(const [name,viewport]of [['desktop',{width:1440,height:1000}],['mobile',{width:390,height:844}]]){
 const context=await browser.newContext({viewport,reducedMotion:'reduce'});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'/operations.html');await expect(page.locator('#health-status')).toContainText('1 registered');await expect(page.locator('#health-checks')).toContainText('broken url · stale');await expect(page.locator('#health-checks')).toContainText('Interaction: unchecked');await expect(page.locator('#telemetry-consent')).not.toBeChecked();
 await page.locator('#telemetry-consent').check();await expect(page.locator('#privacy-status')).toContainText('enabled');
 const collected=await page.evaluate(async()=>{const p=JSON.parse(localStorage.getItem('headstart.telemetry.v1'));const event={eventId:'a'.repeat(64),deletionToken:p.deletionToken,type:'search'};return(await fetch('/api/events',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({event,consent:true})})).status;});expect(collected).toBe(200);
 await page.locator('summary').click();await page.locator('#load-operations').click();await expect(page.locator('#operations-status')).toContainText('Curator access required');await page.screenshot({path:output+'/'+name+'-health.png',fullPage:true});
 await context.addCookies([{name:'hs_session',value:identity.session,url:base,httpOnly:true,sameSite:'Strict'}]);await page.locator('#load-operations').click();await expect(page.locator('#operations-status')).toContainText('Local CLI only');await expect(page.locator('#operations-results')).toContainText('Not activated');await page.screenshot({path:output+'/'+name+'-curator.png',fullPage:true});
 await page.locator('#forget-events').click();await expect(page.locator('#privacy-status')).toContainText('Collected events deleted');await expect(page.locator('#telemetry-consent')).not.toBeChecked();
 await page.route('**/api/health',r=>r.fulfill({status:503,contentType:'application/json',body:'{"error":"unavailable"}'}));await page.locator('#refresh-health').click();await expect(page.locator('#health-status')).toContainText('unavailable');await page.screenshot({path:output+'/'+name+'-error.png',fullPage:true});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);expect(errors).toEqual([]);await context.close();
}console.log('Operations desktop/mobile real health, consent, collection/deletion, curator denial and error PASS');}finally{await browser.close();await new Promise(r=>server.close(r));await rm(scratch,{recursive:true,force:true});}
