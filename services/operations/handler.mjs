import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {pythonCommand} from '../../tools/dev/catalog-handler.mjs';
import {authenticateRequest} from '../../tools/dev/auth-handler.mjs';
const root=fileURLToPath(new URL('../../',import.meta.url));
const limits=new Map();
export async function operationsHandler(req,res){
  res.setHeader('Cache-Control','no-store');
  const url=new URL(req.url,'http://localhost');
  const action={'/api/health':'health','/api/operations':'operations','/api/events':'event','/api/events/forget':'forget'}[url.pathname];
  if(!action||url.search)return res.status(404).json({error:'Unknown operations route'});
  const method=['health','operations'].includes(action)?'GET':'POST';
  if(req.method!==method){res.setHeader('Allow',method);return res.status(405).json({error:'Unsupported method'});}
  let actor;
  if(action==='operations'){
    const principal=await authenticateRequest(req);
    if(!principal||!(process.env.HEADSTART_CURATOR_ACCOUNTS||'').split(',').map(x=>x.trim()).includes(principal.account))return res.status(403).json({error:'Curator access required'});
    actor=principal.account;
  }
  let data={};
  if(method==='POST'){
    if(!process.env.HEADSTART_AUTH_ORIGIN||req.headers.origin!==process.env.HEADSTART_AUTH_ORIGIN)return res.status(403).json({error:'Same-origin request required'});
    if(!String(req.headers['content-type']||'').startsWith('application/json'))return res.status(415).json({error:'JSON required'});
    const now=Date.now();
    for(const [key,value] of limits)if(now-value.start>60000)limits.delete(key);
    const key=req.socket.remoteAddress;
    const value=limits.get(key)||{start:now,count:0};value.count++;limits.set(key,value);
    if(value.count>90)return res.status(429).json({error:'Retry in one minute'});
    let body='';for await(const chunk of req){body+=chunk;if(Buffer.byteLength(body)>4096)return res.status(413).json({error:'Request too large'});}
    try{data=JSON.parse(body);}catch{return res.status(400).json({error:'Invalid JSON'});}
  }
  await new Promise(resolve=>{
    const child=spawn(pythonCommand(),['-m','services.operations.api'],{cwd:root,stdio:['pipe','pipe','ignore']});
    let output='',done=false;
    const finish=(status,body)=>{if(done)return;done=true;clearTimeout(timer);res.status(status).json(body);resolve();};
    const timer=setTimeout(()=>{child.kill();finish(503,{error:'Operations timed out'});},10000);
    child.on('error',()=>finish(503,{error:'Operations unavailable'}));
    child.stdout.on('data',chunk=>{output+=chunk;if(output.length>1000000){child.kill();finish(503,{error:'Operations response too large'});}});
    child.on('close',()=>{try{const value=JSON.parse(output);finish(value.status,value.body);}catch{finish(503,{error:'Operations unavailable'});}});
    child.stdin.on('error',()=>{});child.stdin.end(JSON.stringify({action,data,actor}));
  });
}
