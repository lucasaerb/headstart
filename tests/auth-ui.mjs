import { chromium, expect } from '@playwright/test';
import { mkdtemp,mkdir,readFile,rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createDevServer } from '../tools/dev/server.mjs';
const dir=await mkdtemp(join(tmpdir(),'headstart-auth-browser-'));
process.env.HEADSTART_AUTH_DB=join(dir,'auth.sqlite3');process.env.HEADSTART_AUTH_PREVIEW_DIR=join(dir,'preview');process.env.HEADSTART_AUTH_DELIVERY='preview';
const server=createDevServer();await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;process.env.HEADSTART_AUTH_ORIGIN=base;
const output=process.env.SCREENSHOT_DIR||'docs/reviews/27-verified-email/evidence';await mkdir(output,{recursive:true});
const browser=await chromium.launch(process.env.HEADSTART_CHROME_CHANNEL?{channel:process.env.HEADSTART_CHROME_CHANNEL}:{});
try{for(const [name,viewport] of [['desktop',{width:1440,height:1000}],['mobile',{width:390,height:844}]]){
 const page=await browser.newPage({viewport,reducedMotion:'reduce'});await page.goto(base);await page.waitForFunction(()=>window.HeadStartAuth);
 const intent={action:'prepare_handoff',bagRevision:'a'.repeat(64),selections:[{id:'2048-tile',version:'v1',kind:'component'}]};
 await page.evaluate(value=>{localStorage.setItem('headstart.local-bag.v1',JSON.stringify({version:1,ids:['2048'],brief:'Preserve this idea'}));sessionStorage.setItem('headstart.auth.intent',JSON.stringify(value));},intent);
 await page.goto(base+'/auth.html');await page.screenshot({path:output+'/'+name+'-entry.png'});
 await page.getByLabel('Email address').fill(name+'@example.invalid');await page.keyboard.press('Tab');await expect(page.getByRole('button',{name:'Send verification link'})).toBeFocused();await page.keyboard.press('Enter');await expect(page.locator('#auth-status')).toContainText('Preview reference:');await page.screenshot({path:output+'/'+name+'-sent.png'});
 const ident=(await page.locator('#auth-status').textContent()).split('Preview reference: ')[1];const {url}=JSON.parse(await readFile(join(dir,'preview',ident+'.json'),'utf8'));
 await page.goto(base+'/auth.html#challenge=bad&token=invalid');await page.locator('#auth-confirm').click();await expect(page.locator('#auth-status')).toContainText('invalid, expired');await page.screenshot({path:output+'/'+name+'-invalid.png'});
 await page.goto(url);await expect(page.locator('#auth-confirm')).toBeFocused();await page.locator('#auth-confirm').click();await page.waitForURL('**/#games');await expect.poll(()=>page.evaluate(()=>JSON.parse(localStorage.getItem('headstart.local-bag.v1')).brief)).toBe('Preserve this idea');
 await page.goto(base+'/auth.html');await expect(page.locator('#auth-logout')).toBeVisible();await page.screenshot({path:output+'/'+name+'-verified.png'});await page.locator('#auth-logout').click();await expect(page.locator('#auth-status')).toContainText('Signed out');await page.screenshot({path:output+'/'+name+'-logout.png'});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.close();
}}finally{await browser.close();await new Promise(r=>server.close(r));await rm(dir,{recursive:true,force:true});}
console.log('Desktop/mobile real verification, invalid link, preserved bag, keyboard and logout passed.');
