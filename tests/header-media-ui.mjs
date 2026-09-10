import { chromium, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { createDevServer } from '../tools/dev/server.mjs';
const server=createDevServer();
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const base=`http://127.0.0.1:${server.address().port}`;
const output=process.env.SCREENSHOT_DIR || 'test-results/header-media';
await mkdir(output,{recursive:true});
const browser=await chromium.launch(process.env.HEADSTART_CHROME_CHANNEL?{channel:process.env.HEADSTART_CHROME_CHANNEL}:{});
try {
 for(const width of [320,390,1440]) {
  const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
  await page.goto(base);
  await expect(page.locator('.header-plugin-cta')).toBeVisible();
  await expect(page.locator('.header-github-cta')).toHaveAttribute('href','https://github.com/lucasaerb/headstart');
  for(const selector of ['.brand','.header-plugin-cta','.header-github-cta','#bag-open']) {
   const box=await page.locator('.site-header').locator(selector).boundingBox();
   if(!box || box.x<0 || box.x+box.width>width+1) throw Error(`${width}: header control outside viewport ${selector}`);
  }
  if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1)) throw Error(`${width}: page overflow`);
  await page.screenshot({path:`${output}/${width}-header.png`});
  await page.locator(await page.locator('#how-open').isVisible() ? '#how-open' : '#how-footer').click();
  const video=page.locator('#how-video-player');
  await video.evaluate(async element=>{element.muted=true;await element.play();});
  await expect.poll(()=>video.evaluate(element=>element.currentTime)).toBeGreaterThan(0);
  await expect.poll(()=>video.evaluate(element=>element.videoWidth)).toBe(1280);
  await expect.poll(()=>video.evaluate(element=>element.error)).toBeNull();
  await page.screenshot({path:`${output}/${width}-video.png`});
  await page.locator('[data-close="how-dialog"]').click();
  await expect.poll(()=>video.evaluate(element=>element.paused && element.currentTime===0)).toBe(true);
  await page.locator(await page.locator('#how-open').isVisible() ? '#how-open' : '#how-footer').click();
  await video.evaluate(async element=>{await element.play();});
  await page.keyboard.press('Escape');
  await expect.poll(()=>video.evaluate(element=>element.paused && element.currentTime===0)).toBe(true);
  await page.close();
 }
 console.log('320/390/1440 header controls, real MP4 decoding/playback, close/Escape pause/reset PASS');
} finally { await browser.close(); await new Promise(resolve=>server.close(resolve)); }
