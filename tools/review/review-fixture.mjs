import assert from 'node:assert/strict';
import {mkdtemp, copyFile, readFile, writeFile, rm, mkdir} from 'node:fs/promises';
import {tmpdir, platform, release, cpus} from 'node:os';
import {join, resolve, dirname} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import http from 'node:http';
import {performance} from 'node:perf_hooks';
import {chromium} from '@playwright/test';
const here=dirname(fileURLToPath(import.meta.url));
const root=resolve(here,'../..');
const out=resolve(process.env.HEADSTART_REVIEW_OUTPUT || '/tmp/headstart-review-fixture');
await mkdir(out,{recursive:true});
const target=await mkdtemp(join(tmpdir(),'headstart-review-target-'));
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const git=(...args)=>execFileSync('git',args,{cwd:target,encoding:'utf8'}).trim();
let server,browser;
try {
  for(const [from,to] of [['index.html','index.html'],['before.mjs','game.mjs']])await copyFile(join(here,'fixtures',from),join(target,to));
  await writeFile(join(target,'unrelated.txt'),'Preserve this user work exactly.\n');
  await writeFile(join(target,'LICENSE'),'First-party synthetic review fixture; no upstream source included.\n');
  git('init','-q');git('add','.');git('-c','user.name=HeadStart fixture','-c','user.email=fixture@example.invalid','commit','-qm','Fixture baseline');
  const beforeCommit=git('rev-parse','HEAD');
  const original=await readFile(join(target,'game.mjs'));
  // Review-only host inspection reads the exact source and does not mutate the target.
  assert.match(original.toString(),/new World\(\)/);
  const before=await import(pathToFileURL(join(target,'game.mjs')).href+'?before');
  const input=new EventTarget(),world=new before.World();const bad=before.attachGame(input,world);
  input.dispatchEvent(new Event('move'));bad.dispose();input.dispatchEvent(new Event('move'));
  assert.equal(bad.moves(),2);assert.equal(bad.worlds().length,2);
  assert.equal(git('status','--porcelain'),'');
  const reviewOnlyDigest=sha(await readFile(join(target,'game.mjs')));
  assert.equal(reviewOnlyDigest,sha(original));
  server=http.createServer(async(req,res)=>{try{const file=req.url?.split('?')[0]==='/game.mjs'?'game.mjs':'index.html';res.setHeader('Content-Type',file.endsWith('mjs')?'text/javascript':'text/html');res.setHeader('Cache-Control','no-store');res.end(await readFile(join(target,file)));}catch{res.statusCode=404;res.end();}});
  await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin=`http://127.0.0.1:${server.address().port}`;
  browser=await chromium.launch({channel:process.env.HEADSTART_CHROME_CHANNEL||'chrome',headless:true});
  const captures=[];
  async function capture(phase,commit){for(const [name,width,height] of [['desktop',1200,860],['mobile',390,844]]){const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});await page.goto(origin);await page.locator('#status').waitFor();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);const path=join(out,`${name}-${phase}.png`);await page.screenshot({path,fullPage:true});captures.push({file:`${name}-${phase}.png`,viewport:{width,height},target_commit:commit,sha256:sha(await readFile(path)),browser:browser.version()});await page.close();}}
  await capture('before',beforeCommit);
  // Separately authorized bounded correction, applied only to this disposable fixture project.
  await copyFile(join(here,'fixtures/after.mjs'),join(target,'game.mjs'));
  const after=await import(pathToFileURL(join(target,'game.mjs')).href+'?after');
  const goodInput=new EventTarget(),goodWorld=new after.World(),good=after.attachGame(goodInput,goodWorld);
  goodInput.dispatchEvent(new Event('move'));good.dispose();goodInput.dispatchEvent(new Event('move'));
  assert.equal(good.moves(),1);assert.equal(good.worlds().length,1);assert.equal(good.worlds()[0],goodWorld);
  good.update(1);assert.equal(goodWorld.position,1);
  assert.equal(await readFile(join(target,'unrelated.txt'),'utf8'),'Preserve this user work exactly.\n');
  assert.equal(await readFile(join(target,'LICENSE'),'utf8'),'First-party synthetic review fixture; no upstream source included.\n');
  git('add','game.mjs');git('-c','user.name=HeadStart fixture','-c','user.email=fixture@example.invalid','commit','-qm','Bounded fixture correction');const afterCommit=git('rev-parse','HEAD');
  await capture('after',afterCommit);
  // An actual local CPU-only sample, explicitly not gameplay FPS or a before/after speedup.
  const profile={workload:'50000 toy World.step(1/60) calls per batch; no rendering/input; 10 batches',device:`${cpus()[0]?.model||'unknown CPU'}; ${process.arch}; GPU unused`,os:`${platform()} ${release()}`,engine_version:`Node ${process.version}`,browser_version:null,resolution:{width:1,height:1},settings:'Headless CPU-only toy fixture, no rendering, non-rendered 1x1 placeholder. Background system load uncontrolled.',warmup:'3 batches of 50000 updates before collection',sampling_method:'performance.now monotonic wall time; 10 sequential batch durations; arithmetic mean milliseconds'};
  const measuredWorld=new after.World();function batch(){const t=performance.now();for(let i=0;i<50000;i++)measuredWorld.step(1/60);return performance.now()-t;}
  for(let i=0;i<3;i++)batch();const samples=Array.from({length:10},batch);
  const sourceCommit=execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim();
  const raw={version:1,source_commit:sourceCommit,target_commit:afterCommit,profile,metrics:[{metric:'cpu-update-batch-mean',unit:'ms',samples}]};
  const rawBytes=JSON.stringify(raw,null,2)+'\n';await writeFile(join(out,'raw.json'),rawBytes);
  const observed=new Date().toISOString();
  const record={schema_version:'0.2',entity_type:'benchmark_run',id:'expert-review-cpu-fixture',version:'1',data:{source_commit:sourceCommit,target_commit:afterCommit,...profile,raw_results:{path:'raw.json',digest:sha(rawBytes),source_commit:sourceCommit,origin:'executed_test',claim_type:'measured',reviewer:'reuse_plugin fixture command',observed_at:observed,claim:'Actual Node CPU-only toy-update durations; not gameplay FPS.'},measurements:[{metric:'cpu-update-batch-mean',value:samples.reduce((a,b)=>a+b,0)/samples.length,unit:'ms'}],summary:'Single local CPU-only baseline. No before/after performance comparison or broad speedup is established.'}};
  await writeFile(join(out,'benchmark.json'),JSON.stringify(record,null,2)+'\n');
  await writeFile(join(out,'evidence.json'),JSON.stringify({fixture:true,source_commit:sourceCommit,before_commit:beforeCommit,after_commit:afterCommit,review_only_unchanged:true,review_only_digest:reviewOnlyDigest,authorized_improvement_changed:['game.mjs'],unrelated_preserved:true,observed:{before:{callbacks_after_dispose:2,world_owners:2},after:{callbacks_after_dispose:1,world_owners:1}},captures},null,2)+'\n');
  console.log('PASS: review-only unchanged; actual callback leak and duplicate world; bounded correction preserves target; desktop/mobile captures; actual CPU raw samples. '+out);
} finally {if(browser)await browser.close();if(server)await new Promise(r=>server.close(r));await rm(target,{recursive:true,force:true});}
