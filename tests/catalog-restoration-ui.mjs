import { chromium, expect } from '@playwright/test';
import { mkdir, readFile } from 'node:fs/promises';
import { createDevServer } from '../tools/dev/server.mjs';
const server=createDevServer();await new Promise(r=>server.listen(0,'127.0.0.1',r));
const base=`http://127.0.0.1:${server.address().port}`;
const output=process.env.SCREENSHOT_DIR||'docs/reviews/catalog-restoration/evidence';await mkdir(output,{recursive:true});
const browser=await chromium.launch({channel:process.env.HEADSTART_CHROME_CHANNEL||'chrome'});
const expected=JSON.parse(await readFile('docs/reviews/catalog-restoration/restoration-set.json','utf8'));
try{
for(const [name,viewport] of [['desktop',{width:1440,height:1000}],['mobile',{width:390,height:844}]]){
 const page=await browser.newPage({viewport,reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'/#games');await expect(page.locator('.game-card')).toHaveCount(12);
 for(let i=0;i<3;i++){await page.locator('#next-page').click();await expect(page.locator('.game-card').first()).toHaveAttribute('data-game',expected.previous_ids[(i+1)*12]);}
 const ids=await page.locator('.game-card').evaluateAll(cards=>cards.map(c=>c.dataset.game));
 expect(ids.slice(0,5)).toEqual(expected.previous_ids.slice(36));expect(expected.restored_ids).toContain(ids[5]);
 await page.locator('[data-game="'+ids[5]+'"]').scrollIntoViewIfNeeded();await page.locator('[data-game="'+ids[5]+'"] img').evaluate(img=>img.decode());await page.screenshot({path:`${output}/${name}-restored-boundary.png`});
 for(const id of ['openrct2','openai-sites-void-explorer','a-dark-room','yuka','browserquest']){
  await page.goto(base+'/?q='+encodeURIComponent(id==='a-dark-room'?'A Dark Room':id==='openai-sites-void-explorer'?'Void Explorer':id==='openrct2'?'OpenRCT2':id==='browserquest'?'BrowserQuest':'Yuka')+'#games');
  const card=page.locator('[data-game="'+id+'"]');await expect(card).toBeVisible();
  await card.locator('.game-source button').click();await expect(page.locator('#source-dialog')).toBeVisible();
  if(id==='openai-sites-void-explorer'){await expect(page.locator('#source-content')).toContainText('No public source available');await expect(page.locator('#source-content')).toContainText('Reference evidence review');}
  if(id==='browserquest')await expect(page.locator('#source-content')).toContainText('No demo is available');
  await page.screenshot({path:`${output}/${name}-${id}-detail.png`});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)).toBe(false);
  await page.locator('#source-dialog [data-close]').first().click();
 }
 // Exercise legacy/static detail path shipped by the production baseline as well.
 await page.evaluate(()=>showSourceBase(catalog.find(g=>g.id==='openai-sites-void-explorer')));
 await expect(page.locator('#source-content')).toContainText('No public source available');
 await expect(page.locator('#source-content')).toContainText('Not on GitHub');
 await page.locator('#source-dialog [data-close]').first().click();
 await page.evaluate(()=>showSourceBase(catalog.find(g=>g.id==='yuka')));
 await expect(page.locator('#source-content')).toContainText('Preview unavailable');
 await page.locator('#source-dialog [data-close]').first().click();
 expect(errors).toEqual([]);await page.close();
}
console.log('PASS restoration desktop/mobile boundary, native/source-less/no-preview details, legacy details, no overflow or page errors');
}finally{await browser.close();await new Promise(r=>server.close(r));}
