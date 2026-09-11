import { chromium, expect } from '@playwright/test';
import { mkdtemp, mkdir, rm, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { createDevServer } from '../tools/dev/server.mjs';
const scratch=await mkdtemp(join(tmpdir(),'headstart-plugin-setup-'));
process.env.HEADSTART_CATALOG_DB=join(scratch,'catalog.db');process.env.HEADSTART_EVIDENCE_DIR=join(scratch,'evidence');
execFileSync(process.env.HEADSTART_PYTHON||'.venv/bin/python',['-c',`import os
from services.catalog.store import CatalogStore
from services.catalog.seed import seed_reviewed_tile
s=CatalogStore(os.environ['HEADSTART_CATALOG_DB'],os.environ['HEADSTART_EVIDENCE_DIR']);seed_reviewed_tile(s);s.close()`],{env:process.env});
const server=createDevServer();await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;
const output=process.env.SCREENSHOT_DIR||'test-results/plugin-setup';await mkdir(output,{recursive:true});
const browser=await chromium.launch(process.env.HEADSTART_CHROME_CHANNEL?{channel:process.env.HEADSTART_CHROME_CHANNEL}:{});
try{for(const [name,viewport] of [['desktop',{width:1440,height:1000}],['mobile',{width:390,height:844}]]){
 const page=await browser.newPage({viewport,reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'/plugin.html');
 await expect(page.locator('#catalog-setup-status')).toContainText('cannot inspect or confirm');
 await expect(page.getByText('Nine skills. One continuous brief.')).toBeVisible();
 await page.screenshot({path:output+'/'+name+'-entry.png',fullPage:true});
 const download=page.waitForEvent('download');await page.locator('#plugin-download').click();const file=await download;
 expect(file.suggestedFilename()).toBe('headstart-plugin-0.5.0.zip');expect((await readFile(await file.path())).subarray(0,2).toString()).toBe('PK');
 await page.locator('#check-catalog').focus();await page.keyboard.press('Enter');
 await expect(page.locator('#catalog-setup-status')).toContainText('local catalog responded with a compatible');
 await expect(page.locator('#catalog-setup-status')).toContainText('does not confirm plugin installation');
 await expect(page.locator('#local-signin')).toHaveAttribute('href','auth.html');
 await page.locator('#catalog-setup-status').scrollIntoViewIfNeeded();await page.screenshot({path:output+'/'+name+'-compatible.png'});
 await page.route('**/v1/search?*',route=>route.fulfill({status:503,contentType:'application/json',body:JSON.stringify({error:{code:'CATALOG_UNAVAILABLE'}})}));
 await page.locator('#check-catalog').click();await expect(page.locator('#catalog-setup-status')).toContainText('could not be reached');await expect(page.locator('#check-catalog')).toBeEnabled();
 await page.screenshot({path:output+'/'+name+'-unavailable.png'});await page.unroute('**/v1/search?*');
 await page.route('**/v1/search?*',route=>route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({schemaVersion:'future-version',items:[]})}));
 await page.locator('#check-catalog').click();await expect(page.locator('#catalog-setup-status')).toContainText('contract is unsupported');await page.screenshot({path:output+'/'+name+'-unsupported.png'});await page.unroute('**/v1/search?*');
 await page.locator('#plugin-fallback summary').click();await expect(page.getByText('Each download rechecks your session', {exact:false})).toBeVisible();await page.locator('#plugin-fallback').scrollIntoViewIfNeeded();await page.screenshot({path:output+'/'+name+'-fallback.png'});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);expect(errors).toEqual([]);await page.close();
}}finally{await browser.close();await new Promise(r=>server.close(r));await rm(scratch,{recursive:true,force:true});}
console.log('Plugin setup desktop/mobile: real local catalog probe, actual ZIP, keyboard, unavailable/unsupported fixtures, manual-state and fallback passed.');
