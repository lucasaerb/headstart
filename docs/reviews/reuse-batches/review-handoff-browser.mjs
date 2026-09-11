import { pythonCommand } from "../../../tools/dev/catalog-handler.mjs";
import { chromium, expect } from '@playwright/test';
import { mkdtemp,mkdir,readFile,rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { createDevServer } from '../../../tools/dev/server.mjs';
const dir=await mkdtemp(join(tmpdir(),'headstart-handoff-ui-'));
process.env.HEADSTART_AUTH_DB=join(dir,'auth.sqlite3');process.env.HEADSTART_AUTH_PREVIEW_DIR=join(dir,'preview');process.env.HEADSTART_AUTH_DELIVERY='preview';
process.env.HEADSTART_CATALOG_DB=join(dir,'catalog.sqlite3');process.env.HEADSTART_EVIDENCE_DIR=join(dir,'evidence');
const seed=spawnSync(pythonCommand(),['-c',"import os; from services.catalog.store import CatalogStore; from services.catalog.seed import seed_reviewed_tile; from services.submissions.store import setup; s=CatalogStore(os.environ['HEADSTART_CATALOG_DB'],os.environ['HEADSTART_EVIDENCE_DIR']); seed_reviewed_tile(s); setup(s.db); s.close()"],{encoding:'utf8'});if(seed.error || seed.status!==0)throw Error(seed.error?.message || seed.stderr || "Seed process failed");
const server=createDevServer();await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;process.env.HEADSTART_AUTH_ORIGIN=base;
const output=process.env.SCREENSHOT_DIR||'/tmp/headstart-full-handoff-real-entry';await mkdir(output,{recursive:true});
const browser=await chromium.launch(process.env.HEADSTART_CHROME_CHANNEL?{channel:process.env.HEADSTART_CHROME_CHANNEL}:{});
try{for(const [name,viewport] of [['desktop',{width:1440,height:1000}],['mobile',{width:390,height:844}]]){
 const context=await browser.newContext({viewport,reducedMotion:'reduce'});const page=await context.newPage();await page.route('**/handoff.js',async route=>{await new Promise(r=>setTimeout(r,150));await route.continue();});await page.goto(base);await page.waitForFunction(()=>window.HeadStartHandoff&&window.HeadStartAuth);
 // Independent reviewer enters through the actual public catalog UI.
 await page.locator('#reviewed-systems > summary').click();
 await expect(page.locator('#systems-results .reviewed-system')).toHaveCount(1);
 await page.getByRole('button',{name:'Inspect component',exact:true}).click();
 await expect(page.getByLabel('What should this system do in your game?')).toBeVisible();
 await page.getByLabel('What should this system do in your game?').fill('Use tile state and preserve my existing camera.');await page.screenshot({path:output+'/'+name+'-entry.png'});
 await page.getByRole('button',{name:'Prepare agent handoff'}).click();await page.waitForURL('**/auth.html');await page.getByLabel('Email address').fill(name+'@example.invalid');await page.getByRole('button',{name:'Send verification link'}).click();await expect(page.locator('#auth-status')).toContainText('Preview reference:');
 const ident=(await page.locator('#auth-status').textContent()).split('Preview reference: ')[1];const {url}=JSON.parse(await readFile(join(dir,'preview',ident+'.json'),'utf8'));await page.goto(url);await page.locator('#auth-confirm').click();await page.waitForURL('**/#games');
 await expect(page.locator('#source-content')).toContainText('Your handoff is ready');await page.screenshot({path:output+'/'+name+'-ready.png'});
 const download=page.waitForEvent('download');await page.getByRole('button',{name:'Download JSON'}).click();const file=await download;const manifest=JSON.parse(await readFile(await file.path(),'utf8'));expect(manifest.bag.intent).toContain('preserve my existing camera');expect(manifest.records.some(r=>r.id==='2048-tile-v1')).toBe(true);
 // Revoke the real session in a separate tab; retained download button must fail.
 const logout=await page.context().newPage();await logout.goto(base+'/auth.html');await logout.locator('#auth-logout').click();await logout.close();await page.getByRole('button',{name:'Download Markdown'}).click();await expect(page.locator('#source-content')).toContainText('Verify your email');await page.screenshot({path:output+'/'+name+'-blocked.png'});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await context.close();
}}finally{await browser.close();await new Promise(r=>server.close(r));await rm(dir,{recursive:true,force:true});}
console.log('Desktop/mobile real verified handoff resume, JSON content, revoked-download blocking passed.');
