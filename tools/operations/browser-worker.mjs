// Runs only inside a network-disabled container. The host broker supplies every resource.
import readline from 'node:readline';
import {createRequire} from 'node:module';
import {createHash} from 'node:crypto';
const require = createRequire(import.meta.url);
const {chromium} = require('/opt/playwright/index.js');
const lines = readline.createInterface({input: process.stdin});
let configured;
const configuration = new Promise(resolve => configured = resolve);
const pending = new Map();
let sequence = 0;
lines.on('line', line => {
  const value = JSON.parse(line);
  if (value.config) configured(value.config);
  else if (pending.has(value.id)) { pending.get(value.id)(value); pending.delete(value.id); }
});
const send = value => process.stdout.write(JSON.stringify(value) + '\n');
const config = await configuration;
const browser = await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--disable-background-networking']});
try {
  const context = await browser.newContext({viewport:{width:960,height:540},serviceWorkers:'block',acceptDownloads:false,permissions:[]});
  await context.routeWebSocket('**/*', socket => socket.close());
  await context.route('**/*', async route => {
    if (route.request().method() !== 'GET') return route.abort();
    const id = ++sequence;
    const response = await new Promise(resolve => {pending.set(id, resolve);send({request:true,id,url:route.request().url()});});
    if (response.error) return route.abort();
    await route.fulfill({status:response.status,headers:response.headers,body:Buffer.from(response.body,'base64')});
  });
  const page = await context.newPage();
  page.setDefaultTimeout(7000);
  context.on('page', other => {if (other !== page) other.close();});
  const checks = [];
  await page.goto(config.url,{waitUntil:'domcontentloaded',timeout:15000});
  checks.push({name:'navigation',passed:true});
  for (const step of config.steps) {
    const observation = page.locator(step.observe).first();
    await observation.waitFor({state:'attached'});
    const read = () => step.attribute ? observation.getAttribute(step.attribute) : observation.textContent();
    const before = await read();
    if (before !== step.before) throw new Error('Initial condition mismatch');
    if (step.action === 'key') await page.keyboard.press(step.input);
    else await page.locator(step.input).first().click();
    await page.waitForFunction(({selector,attribute,expected}) => {
      const el = document.querySelector(selector);
      return el && (attribute ? el.getAttribute(attribute) : el.textContent) === expected;
    },{selector:step.observe,attribute:step.attribute,expected:step.after});
    const after = await read();
    checks.push({name:step.name,passed:before !== after && after === step.after});
  }
  const screenshot = await page.screenshot();
  send({result:true,category:checks.length > 1 && checks.every(c=>c.passed) ? 'interactive_passed' : 'navigation_only',checks,captureDigest:createHash('sha256').update(screenshot).digest('hex')});
} catch {
  send({result:true,category:'interactive_failed',checks:[{name:'declared_interaction',passed:false}]});
} finally {
  await browser.close();
  lines.close();
}
