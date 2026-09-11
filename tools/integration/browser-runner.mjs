// Runs only inside the offline disposable container. No platform environment.
import http from 'node:http';import {readFile,writeFile} from 'node:fs/promises';import {spawn} from 'node:child_process';
const phase=process.argv[2], viewport=process.argv[3]||'1280,800';
if(!['baseline','integrated'].includes(phase)||!/^\d{3,4},\d{3,4}$/.test(viewport))throw Error('Invalid harness arguments');
const server=http.createServer(async(req,res)=>{try{const pathname=new URL(req.url,'http://127.0.0.1').pathname;if(pathname.includes('..')||!/^\/(app|harness)\//.test(pathname))throw Error();res.setHeader('Content-Type',pathname.endsWith('.html')?'text/html':pathname.endsWith('.js')?'text/javascript':'text/plain');res.end(await readFile(pathname));}catch{res.statusCode=404;res.end();}});
await new Promise(r=>server.listen(8080,'127.0.0.1',r));
const args=['--headless','--renderer-process-limit=2','--num-raster-threads=1','--no-sandbox','--disable-dev-shm-usage','--disable-background-networking','--no-first-run','--disable-default-apps','--disable-extensions','--disable-sync','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--hide-scrollbars','--window-size='+viewport,'--remote-debugging-port=9222','--user-data-dir=/tmp/chrome','about:blank'];
const child=spawn('chromium',args,{env:{PATH:'/usr/bin:/bin',HOME:'/tmp',TMPDIR:'/tmp'},stdio:['ignore','ignore','pipe']});
let stderr='',socket;child.stderr.on('data',b=>{if(stderr.length<64000)process.stderr.write(b);stderr=(stderr+b).slice(-64000);});
const pause=ms=>new Promise(r=>setTimeout(r,ms));
try {
 let tab;
 for(let attempt=0;attempt<80;attempt++){try{tab=(await(await fetch('http://127.0.0.1:9222/json/list')).json()).find(x=>x.type==='page');if(tab)break;}catch{}await pause(100);}
 if(!tab)throw Error('DevTools page unavailable');
 socket=new WebSocket(tab.webSocketDebuggerUrl);await new Promise((resolve,reject)=>{socket.onopen=resolve;socket.onerror=reject;});
 let id=0;const pending=new Map();
 socket.onmessage=event=>{const data=JSON.parse(event.data);if(data.id&&pending.has(data.id)){const item=pending.get(data.id);pending.delete(data.id);clearTimeout(item.timer);data.error?item.reject(Error(JSON.stringify(data.error))):item.resolve(data.result);}};
 const call=(method,params={})=>new Promise((resolve,reject)=>{const key=++id,timer=setTimeout(()=>{pending.delete(key);reject(Error('CDP deadline: '+method));},8000);pending.set(key,{resolve,reject,timer});socket.send(JSON.stringify({id:key,method,params}));});
 await call('Page.enable');await call('Runtime.enable');
 const [width,height]=viewport.split(',').map(Number);await call('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:false});
 await call('Page.navigate',{url:'http://127.0.0.1:8080/app/index.html?expected='+phase});
 let report;
 for(let attempt=0;attempt<100;attempt++){
  const result=await call('Runtime.evaluate',{expression:'document.documentElement.dataset.result ? document.getElementById("result").textContent : null',returnByValue:true});
  if(result.result?.value){report=JSON.parse(result.result.value);break;}await pause(100);
 }
 if(!report){const state=await call('Runtime.evaluate',{expression:'({ready:document.readyState,text:document.body?.innerText})',returnByValue:true});throw Error('Page result absent: '+JSON.stringify(state.result?.value));}
 const screenshot=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});await writeFile('/output/'+phase+'-'+viewport+'.png',Buffer.from(screenshot.data,'base64'));
 console.log(JSON.stringify({report,browserTermination:"terminated after explicit result and capture",viewport}));process.exitCode=report.result==='PASS'?0:1;
} catch(error){console.log(JSON.stringify({report:{result:'FAIL',error:String(error.message)},stderr:stderr.slice(-4000),viewport}));process.exitCode=1;}
finally{socket?.close();child.kill('SIGKILL');server.closeAllConnections();await new Promise(r=>server.close(r));}
