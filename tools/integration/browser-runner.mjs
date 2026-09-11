// Runs only inside the offline disposable container. No platform environment.
import http from 'node:http';import {readFile} from 'node:fs/promises';import {spawn} from 'node:child_process';
const phase=process.argv[2], viewport=process.argv[3]||'1280,800';
if(!['baseline','integrated'].includes(phase)||!/^\d{3,4},\d{3,4}$/.test(viewport))throw Error('Invalid harness arguments');
const server=http.createServer(async(req,res)=>{try{const pathname=new URL(req.url,'http://127.0.0.1').pathname;if(pathname.includes('..')||!/^\/(app|harness)\//.test(pathname))throw Error();res.setHeader('Content-Type',pathname.endsWith('.html')?'text/html':pathname.endsWith('.js')?'text/javascript':'text/plain');res.end(await readFile(pathname));}catch{res.statusCode=404;res.end();}});
await new Promise(r=>server.listen(8080,'127.0.0.1',r));
const args=['--headless','--renderer-process-limit=2','--num-raster-threads=1','--no-sandbox','--disable-dev-shm-usage','--disable-background-networking','--no-first-run','--disable-default-apps','--disable-extensions','--disable-sync','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--hide-scrollbars','--window-size='+viewport,'--virtual-time-budget=3000','--screenshot=/output/'+phase+'-'+viewport+'.png','--dump-dom','http://127.0.0.1:8080/app/index.html?expected='+phase];
const child=spawn('chromium',args,{env:{PATH:'/usr/bin:/bin',HOME:'/tmp',TMPDIR:'/tmp'},stdio:['ignore','pipe','pipe']});
let stdout='',stderr='';child.stdout.on('data',b=>stdout+=b);child.stderr.on('data',b=>stderr+=b);const code=await new Promise(r=>child.on('exit',r));await new Promise(r=>server.close(r));
const match=stdout.match(/<pre id="result">([\s\S]*?)<\/pre>/);const decode=s=>s.replaceAll('&quot;','"').replaceAll('&lt;','<').replaceAll('&gt;','>').replaceAll('&amp;','&');
try{const report=JSON.parse(decode(match?.[1]||''));console.log(JSON.stringify({report,browserExit:code,viewport}));process.exitCode=report.result==='PASS'&&code===0?0:1;}catch{console.log(JSON.stringify({report:{result:'FAIL',error:'Browser did not emit runtime evidence'},browserExit:code,stderr:stderr.slice(-4000)}));process.exitCode=1;}
