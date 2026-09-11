import { chromium, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { createDevServer } from '../tools/dev/server.mjs';

const server = createDevServer();
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;
const output = process.env.SCREENSHOT_DIR || 'docs/reviews/discovery-ui/evidence';
await mkdir(output, { recursive: true });
const browser = await chromium.launch(process.env.HEADSTART_CHROME_CHANNEL ? {channel:process.env.HEADSTART_CHROME_CHANNEL} : {});
try {
  for (const [name, viewport] of [['desktop', {width:1440,height:1000}], ['mobile', {width:390,height:844}]]) {
    const page = await browser.newPage({ viewport, reducedMotion:'reduce' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route('**/api/research?**',async route=>{await new Promise(resolve=>setTimeout(resolve,1200));await route.continue();},{times:1});
    await page.goto(base);
    await page.evaluate(()=>document.getElementById('games').scrollIntoView({block:'start',behavior:'instant'}));
    await expect(page.locator('#discovery-status-text')).toContainText('Finding');
    await page.screenshot({path:`${output}/${name}-loading.png`});
    await expect(page.locator('.game-card')).toHaveCount(12);
    await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
    await page.screenshot({path:`${output}/${name}-hero.png`});
    await page.evaluate(()=>document.getElementById('games').scrollIntoView({block:'start',behavior:'instant'}));
    await page.waitForTimeout(350);
    await page.screenshot({path:`${output}/${name}-default.png`});
    await expect(page.locator('.header-plugin-cta')).toHaveAttribute('href','plugin.html');
    if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)) throw new Error('Horizontal overflow '+name);
    const initial = await page.locator('.game-card').first().getAttribute('data-game');
    await page.locator('[data-add]').first().click();
    await page.locator('#next-page').click();
    await expect(page).toHaveURL(/cursor=/);
    await expect(page.locator('.game-card').first()).not.toHaveAttribute('data-game', initial);
    await page.goBack();
    await expect(page.locator('.game-card').first()).toHaveAttribute('data-game', initial);
    await expect(page.locator('[data-add]').first()).toHaveAttribute('aria-pressed','true');
    if(name==='mobile' && await page.locator('#toggle-filters').getAttribute('aria-expanded')==='false') await page.locator('#toggle-filters').click();
    await page.locator('#list-view').click();
    await expect(page).toHaveURL(/view=list/);
    await page.locator('#genre').selectOption('simulation');
    await expect(page.locator('#result-count')).toContainText('matching projects');
    await page.evaluate(()=>document.getElementById('games').scrollIntoView({block:'start',behavior:'instant'}));
    await page.screenshot({path:`${output}/${name}-filter-list.png`});
    await page.reload();
    await expect(page.locator('#genre')).toHaveValue('simulation');
    await expect(page.locator('#game-grid')).toHaveClass(/list/);
    await page.locator('#clear-filters').click();
    await page.locator('#search-games').fill('camera');
    await expect(page).toHaveURL(/q=camera/);
    await expect(page.locator('#result-count')).toContainText('matching projects');
    await page.evaluate(()=>document.getElementById('games').scrollIntoView({block:'start',behavior:'instant'}));
    await page.screenshot({path:`${output}/${name}-search.png`});
    // Test deterministic lexical emptiness; semantic no-answer quality has its
    // own frozen evaluation and must not depend on this invented phrase.
    await page.goto(base+'?retrieval=lexical&interpret=off&q=no-such-game-921743#games');
    await expect(page.locator('#empty-games')).toBeVisible();
    await page.evaluate(()=>document.getElementById('empty-games').scrollIntoView({block:'center',behavior:'instant'}));
    await page.screenshot({path:`${output}/${name}-empty.png`});
    await page.goto(base+'?genre=unsupported-genre#games');
    await expect(page.locator('#discovery-status-text')).toContainText('unsupported');
    await page.evaluate(()=>document.getElementById('discovery-status').scrollIntoView({block:'center',behavior:'instant'}));
    await page.screenshot({path:`${output}/${name}-unsupported.png`});
    await page.locator('#clear-filters').click();
    await expect(page.locator('.game-card')).toHaveCount(12);
    // Scoped history must preserve the independently paginated research list.
    await page.locator('#list-view').click();
    await page.locator('#next-page').click();
    await expect(page).toHaveURL(/cursor=/);
    const researchPage = new URL(page.url()).searchParams.get('cursor');
    const researchFirst = await page.locator('.game-card').first().getAttribute('data-game');
    await page.locator('#reviewed-systems > summary').click();
    await page.locator('#systems-query').fill('2048 tile state and serialization');
    await page.locator('#systems-search button').click();
    await expect(page.locator('.reviewed-system')).toHaveCount(1);
    await expect(page.locator('.reviewed-system')).toContainText('2048 tile state and serialization');
    await expect(page.locator('.reviewed-system')).toContainText('full game and its assets are outside this scope');
    await page.evaluate(()=>document.getElementById('reviewed-systems').scrollIntoView({block:'start',behavior:'instant'}));
    await page.screenshot({path:`${output}/${name}-reviewed-system.png`});
    await page.locator('#systems-query').fill('not-a-reviewed-system');
    await page.locator('#systems-search button').click();
    await expect(page.locator('#systems-status')).toContainText('No reviewed systems');
    await expect(page).toHaveURL(/systems_q=not-a-reviewed-system/);
    await page.reload();
    await expect(page.locator('#reviewed-systems')).toHaveAttribute('open','');
    await expect(page.locator('#systems-query')).toHaveValue('not-a-reviewed-system');
    await expect(page.locator('#systems-status')).toContainText('No reviewed systems');
    if(new URL(page.url()).searchParams.get('cursor')!==researchPage)throw new Error('Scoped reload lost research cursor');
    await expect(page.locator('.game-card').first()).toHaveAttribute('data-game',researchFirst);
    await expect(page.locator('#game-grid')).toHaveClass(/list/);
    await page.evaluate(()=>document.getElementById('reviewed-systems').scrollIntoView({block:'start',behavior:'instant'}));
    await page.screenshot({path:`${output}/${name}-scoped-reload.png`});
    await page.goBack();
    await expect(page.locator('#systems-query')).toHaveValue('2048 tile state and serialization');
    await expect(page.locator('.reviewed-system')).toHaveCount(1);
    if(new URL(page.url()).searchParams.get('cursor')!==researchPage)throw new Error('Scoped back lost research cursor');
    await page.screenshot({path:`${output}/${name}-scoped-back.png`});
    await page.locator('#reviewed-systems > summary').click();
    await expect(page.locator('#reviewed-systems')).not.toHaveAttribute('open','');
    await page.reload();
    await expect(page.locator('#reviewed-systems')).not.toHaveAttribute('open','');
    await page.goBack();
    await expect(page.locator('#reviewed-systems')).toHaveAttribute('open','');
    await expect(page.locator('.reviewed-system')).toHaveCount(1);
    await page.locator('#reviewed-systems > summary').click();
    await page.route('**/api/research?**', route=>route.fulfill({status:503,contentType:'application/json',body:JSON.stringify({error:{message:'Injected failure'}})}));
    await page.locator('#genre').selectOption('simulation');
    await expect(page.locator('#discovery-status-text')).toContainText('couldn’t load');
    await page.evaluate(()=>document.getElementById('discovery-status').scrollIntoView({block:'center',behavior:'instant'}));
    await page.screenshot({path:`${output}/${name}-failure.png`});
    await page.unroute('**/api/research?**');
    await page.locator('#retry-games').click();
    await expect(page.locator('#result-count')).toContainText('matching projects');
    await page.locator('#clear-filters').click();
    await expect(page.locator('.game-card')).toHaveCount(12);
    await page.locator('.game-systems summary').first().click();
    await expect(page.locator('.game-systems[open]')).toBeVisible();
    // The existing demo gate must still intercept dynamically loaded cards.
    await page.locator('[data-demo-game]').first().click();
    await expect(page.locator('#demo-email-dialog')).toBeVisible();
    await page.locator('[data-close="demo-email-dialog"]').click();
    // CityMaker remains eligible under the current catalog gate. Remove only
    // its preview in this controlled response fixture to exercise the missing
    // image state without restoring excluded research or asserting real media
    // is missing. Search, selection, reload and prompt still use its real ID.
    await page.route('**/api/research?**', async route => {
      const response = await route.fetch();
      const result = await response.json();
      result.items = result.items.map(item => item.id === 'open-city-maker' ? {...item, preview:null} : item);
      await route.fulfill({response, json:result});
    });
    await page.locator('#search-games').fill('CityMaker');
    await expect(page.locator('.game-card')).toHaveCount(1);
    await expect(page.locator('.missing-preview')).toContainText('Preview not captured');
    await page.locator('[data-add]').click();
    await page.reload();
    await expect(page.locator('.game-card')).toHaveCount(1);
    await page.locator('#bag-open').click();
    await expect(page.locator('#bag-items')).toContainText('CityMaker');
    await expect(page.locator('#continue-astra')).toBeEnabled();
    // Exercise the integrated action without opening an external website or
    // sending this local test prompt anywhere. Real helper unit tests cover it.
    await page.evaluate(()=>{
      window.open=()=>null;
      Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw new Error('Test clipboard unavailable');}}});
    });
    await page.locator('#continue-astra').click();
    await expect(page.locator('#prompt-status')).toContainText('unavailable');
    await expect(page.locator('#chatgpt-fallback')).toBeVisible();
    await expect(page.locator('#gauntlet-prompt')).toHaveValue(/CityMaker/);
    await page.screenshot({path:`${output}/${name}-astra-fallback.png`});
    await page.locator('[data-close="bag-dialog"]').click();
    await page.evaluate(()=>document.getElementById('game-grid').scrollIntoView({block:'start',behavior:'instant'}));
    await page.screenshot({path:`${output}/${name}-missing-preview.png`});
    // A synthetic remembered preference must remain visible and removable.
    await page.evaluate(()=>localStorage.setItem('headstart.remembered-email.v1',JSON.stringify({version:1,email:'browser-test@example.com'})));
    await page.reload();
    await expect(page.locator('#remembered-email-value')).toHaveText('browser-test@example.com');
    await page.locator('#forget-email').click();
    await expect(page.locator('#remembered-email')).toBeHidden();
    if(await page.evaluate(()=>localStorage.getItem('headstart.remembered-email.v1'))!==null)throw new Error('Forget email did not remove preference');
    if(errors.length) throw new Error(errors.join('; '));
    await page.unrouteAll({behavior:'wait'});
    await page.close();
  }
  console.log('Discovery UI desktop/mobile, API results, pagination/back, filters/reload/list, search, empty, unsupported, failure/retry, bag retention, systems and demo gate PASS');
} finally {
  await browser.close();
  await new Promise(resolve=>server.close(resolve));
}
