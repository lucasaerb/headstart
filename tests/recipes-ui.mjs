import {pythonCommand} from '../tools/dev/catalog-handler.mjs';
import {chromium,expect} from '@playwright/test';
import {mkdtemp,mkdir,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {execFileSync} from 'node:child_process';
import {createDevServer} from '../tools/dev/server.mjs';
const scratch=await mkdtemp(join(tmpdir(),'headstart-recipes-'));
for(const key of Object.keys(process.env))if(key.startsWith('HEADSTART_')||['BLOB_READ_WRITE_TOKEN','SIGNUP_HASH_SECRET'].includes(key))delete process.env[key];
Object.assign(process.env,{HEADSTART_CATALOG_DB:join(scratch,'catalog.db'),HEADSTART_EVIDENCE_DIR:join(scratch,'evidence'),HEADSTART_AUTH_DB:join(scratch,'auth.db'),HEADSTART_AUTH_MODE:'local-preview'});
execFileSync(pythonCommand(),['-c',`import os
from services.catalog.store import CatalogStore
from services.curation.seed import seed_curated_capabilities
from services.submissions.store import setup
s=CatalogStore(os.environ['HEADSTART_CATALOG_DB'],os.environ['HEADSTART_EVIDENCE_DIR']);setup(s.db);seed_curated_capabilities(s);s.close()`],{env:process.env});
const server=createDevServer();await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;process.env.HEADSTART_AUTH_ORIGIN=base;
const identity=JSON.parse(execFileSync(pythonCommand(),['-c',`import json
from services.auth.store import connect,issue,verify
db=connect();id,token=issue(db,'recipe@example.invalid','binding',{'action':'account','bagRevision':'a'*64,'selections':[]},'test');session,csrf,_=verify(db,id,token,'binding');print(json.dumps({'session':session}))`],{env:process.env,encoding:'utf8'}));
const output=process.env.SCREENSHOT_DIR||'test-results/recipes';await mkdir(output,{recursive:true});
const browser=await chromium.launch(process.env.HEADSTART_CHROME_CHANNEL?{channel:process.env.HEADSTART_CHROME_CHANNEL}:{});
try{for(const [name,viewport] of [['desktop',{width:1440,height:1000}],['mobile',{width:390,height:844}]]){
 const context=await browser.newContext({viewport,reducedMotion:'reduce'});await context.addCookies([{name:'hs_session',value:identity.session,url:base,httpOnly:true,sameSite:'Strict'}]);const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'/recipes.html');await expect(page.locator('.recipe-row')).toHaveCount(3);
 await page.locator('#recipe-experience').fill('cozy city builder');await page.locator('#recipe-camera').selectOption('overhead');await page.getByRole('button',{name:'Find my starting points'}).click();await expect(page.locator('.recipe-row h3').first()).toHaveText('A quiet building world');
 await page.screenshot({path:output+'/'+name+'-cozy.png',fullPage:true});
 await page.locator('#recipe-experience').fill('fly through an open landscape');await page.locator('#recipe-camera').selectOption('free-flight');await page.locator('summary').click();await page.locator('#recipe-query').fill('camera');
 const response=page.waitForResponse(r=>r.url().endsWith('/api/recommendations')&&r.request().method()==='POST');await page.getByRole('button',{name:'Find my starting points'}).click();const result=await (await response).json();await expect(page.locator('.recipe-row h3').first()).toHaveText(result.items[0].template.title);
 await page.getByRole('button',{name:'Explore this recipe'}).first().click();await expect(page.locator('#source-dialog')).toBeVisible();await expect(page.getByText('Planning candidate · composition untested. Performance unmeasured.')).toBeVisible();await page.screenshot({path:output+'/'+name+'-detail.png'});
 const blocked=page.waitForResponse(r=>r.url().endsWith('/v1/handoffs')&&r.request().method()==='POST');await page.getByRole('button',{name:'Prepare agent handoff'}).click();expect((await blocked).status()).toBe(422);await expect(page.getByText('External dependency rights and exact source scope', {exact:false})).toBeVisible();await page.screenshot({path:output+'/'+name+'-blocked-composition.png'});
 const simple=page.locator('.recipe-scope').filter({has:page.getByRole('heading',{name:'three-simplexnoise',exact:true})});await simple.getByRole('button',{name:'Plan with this system'}).click();const prepared=page.waitForResponse(r=>r.url().endsWith('/v1/handoffs')&&r.request().method()==='POST');await simple.getByRole('button',{name:'Prepare agent handoff'}).click();const preparedResponse=await prepared;expect(preparedResponse.status(),JSON.stringify(await preparedResponse.json())).toBe(200);const artifact=await preparedResponse.json();await expect(page.getByRole('button',{name:'Download JSON'})).toBeVisible();
 const json=await context.request.get(base+'/v1/handoffs/'+artifact.digest+'/json');expect(json.status()).toBe(200);const packet=JSON.parse((await json.json()).content);expect(packet.bag.schemaVersion).toBe(2);expect(packet.recommendationContext).toEqual(result.items[0].recommendationContext);expect(packet.recipe).toBeNull();
 await page.getByRole('button',{name:'Download JSON'}).scrollIntoViewIfNeeded();await page.screenshot({path:output+'/'+name+'-handoff.png'});await page.keyboard.press('Escape');
 await page.locator('#recipe-runtime').selectOption('Unity');await page.getByRole('button',{name:'Find my starting points'}).click();await expect(page.locator('.recipe-row')).toHaveCount(0);await expect(page.locator('#recipe-status')).toContainText('No recipe meets all explicit constraints');await page.screenshot({path:output+'/'+name+'-empty.png',fullPage:true});
 await page.route('**/api/recommendations',r=>r.fulfill({status:503,contentType:'application/json',body:JSON.stringify({error:'Recommendations unavailable; retry later.'})}));await page.getByRole('button',{name:'Find my starting points'}).click();await expect(page.locator('#recipe-status')).toContainText('unavailable');await expect(page.locator('#recipe-results')).toHaveAttribute('aria-busy','false');await page.screenshot({path:output+'/'+name+'-error.png',fullPage:true});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);expect(errors).toEqual([]);await context.close();
}console.log('Recipe desktop/mobile: real query→brief→server rationale→protected schema2 handoff, empty and error states PASS');}finally{await browser.close();await new Promise(r=>server.close(r));await rm(scratch,{recursive:true,force:true});}
