import {chromium,expect} from '@playwright/test';
import {mkdir} from 'node:fs/promises';
import {createDevServer} from '../tools/dev/server.mjs';
const server=createDevServer();await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const base=`http://127.0.0.1:${server.address().port}`;
const output=process.env.SCREENSHOT_DIR||'docs/reviews/batches/evidence/issue7';await mkdir(output,{recursive:true});
const browser=await chromium.launch(process.env.HEADSTART_CHROME_CHANNEL?{channel:process.env.HEADSTART_CHROME_CHANNEL}:{});
try{
 for(const [name,viewport]of [['desktop',{width:1440,height:1000}],['mobile',{width:390,height:844}]]){
  const page=await browser.newPage({viewport,reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'?q=CityMaker');await expect(page.locator('.game-card')).toHaveCount(1);
  const opener=page.getByRole('button',{name:'View project evidence and image credits for CityMaker'});
  await opener.click();await expect(page.locator('#source-dialog')).toBeVisible();
  await expect(page.locator('.detail-overview')).toContainText('Source / demo relationship');
  await expect(page.locator('.detail-overview')).toContainText('Code, assets and data are separate');
  await page.screenshot({path:`${output}/${name}-project-detail.png`});
  const step=page.locator('.detail-overview summary').first();await step.focus();await page.keyboard.press('Enter');
  const source=page.locator('.detail-overview details a').first();await expect(source).toHaveAttribute('href',/\/blob\/[a-f0-9]{40}\/src\//);
  await page.screenshot({path:`${output}/${name}-project-tour.png`});
  await page.keyboard.press('Escape');await expect(opener).toBeFocused();
  // Controlled metadata fixtures exercise states, never presented as real findings.
  for(const status of ['broken','removed','frame_blocked','unknown','native']){
   await page.evaluate(status=>{const game={...window.HEADSTART_CATALOG.find(g=>g.id==='open-city-maker'),title:'TEST FIXTURE: '+status,playReview:{status,checked_at:'2026-09-10T00:00:00Z'},demoStatus:status,pinnedSourceUrl:null,buildingBlocks:[],rights:{code_license:null,asset_status:'unreviewed'},demoKind:status==='native'?'native-download':'browser',platformKind:status==='native'?'desktop':'browser'};window.showSource(game,document.querySelector('.game-source button'));},status);
   await expect(page.locator('.detail-overview')).toContainText('revision');
   await expect(page.locator('.detail-overview')).toContainText('License unresolved');
   if(['broken','removed','native'].includes(status))await expect(page.locator('.detail-overview [data-demo-game]')).toHaveCount(0);
   await expect(page.locator('iframe')).toHaveCount(0);
   await page.screenshot({path:`${output}/${name}-${status}.png`});
   await page.keyboard.press('Escape');
  }
  await page.locator('#reviewed-systems > summary').click();
  await expect(page.locator('.reviewed-system').first()).toBeVisible();
  let scopedPage=0;
  while(true){
   if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw new Error('Scoped source metadata overflow '+name+' page '+scopedPage);
   await page.locator('.reviewed-system').last().scrollIntoViewIfNeeded();
   await page.screenshot({path:`${output}/${name}-scopes-page-${scopedPage}.png`});
   if(!(await page.locator('#systems-more').isVisible()))break;
   if(++scopedPage>10)throw new Error('Scoped pagination did not terminate');
   const response=page.waitForResponse(r=>r.url().includes('/api/catalog/search?')&&r.url().includes('cursor='));
   await page.locator('#systems-more').click();await response;
   await expect(page.locator('.reviewed-system').first()).toBeVisible();
  }
  await page.locator('#systems-query').fill('2048 tile state and serialization');
  await page.locator('#systems-search button').click();await expect(page.locator('.reviewed-system')).toHaveCount(1);
  await page.getByRole('button',{name:'Inspect component',exact:true}).click();
  await expect(page.locator('#source-content')).toContainText('Gabriele Cirulli');
  await expect(page.locator('#source-content')).toContainText('Excluded systems');
  await page.screenshot({path:`${output}/${name}-component.png`});await page.keyboard.press('Escape');
  await page.route('**/v1/components/**',route=>route.fulfill({status:404,contentType:'application/json',body:JSON.stringify({error:{code:'NOT_FOUND'}})}));
  await page.getByRole('button',{name:'Inspect component',exact:true}).click();await expect(page.locator('.detail-error')).toBeVisible();
  await page.screenshot({path:`${output}/${name}-component-unavailable.png`});await page.keyboard.press('Escape');
  await page.unroute('**/v1/components/**');
  // Labeled durable-storage stub: exercises email gate and a separate external
  // tab without claiming production persistence or upstream game execution.
  const saved=[];
  await page.route('**/api/subscribe',async route=>{saved.push(route.request().postDataJSON());await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({message:'TEST STUB: saved'})});});
  await page.context().route('https://example.test/demo',route=>route.fulfill({contentType:'text/html',body:'<title>External demo test fixture</title><p>TEST FIXTURE ONLY</p>'}));
  await page.evaluate(()=>window.showSource({...window.HEADSTART_CATALOG.find(g=>g.id==='open-city-maker'),title:'TEST FIXTURE: external launch',demoUrl:'https://example.test/demo'},document.querySelector('.game-source button')));
  await page.locator('.detail-overview [data-demo-game]').click();await expect(page.locator('#demo-email-dialog')).toBeVisible();
  await page.locator('#demo-email').fill('detail-test@example.com');await page.locator('#demo-email-form button[type="submit"]').click();
  await expect(page.locator('#demo-launch')).toBeVisible();if(saved.length!==1||saved[0].email!=='detail-test@example.com')throw new Error('Email gate did not save once');
  const popupPromise=page.waitForEvent('popup');await page.locator('#demo-launch').click();const popup=await popupPromise;await popup.waitForLoadState();await expect(popup).toHaveTitle('External demo test fixture');await popup.close();
  await expect(page.locator('#source-dialog')).toBeVisible();await page.locator('[data-close="demo-email-dialog"]').click();await page.keyboard.press('Escape');
  if(errors.length)throw new Error(errors.join('; '));await page.close();
 }
 console.log('Detail desktop/mobile: source tour, scoped component, missing revision/license, broken/removed/frame/native states, keyboard return, immutable detail404, stubbed email save/external launch PASS');
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
