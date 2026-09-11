import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {pythonCommand} from '../../tools/dev/catalog-handler.mjs';
const root=fileURLToPath(new URL('../../',import.meta.url));
export async function recommendationsHandler(req,res){
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({error:'POST required'});}
  if(new URL(req.url,'http://localhost').search)return res.status(400).json({error:'Use the request body'});
  if(!process.env.HEADSTART_AUTH_ORIGIN||req.headers.origin!==process.env.HEADSTART_AUTH_ORIGIN)return res.status(403).json({error:'Same-origin request required'});
  if(!String(req.headers['content-type']||'').startsWith('application/json'))return res.status(415).json({error:'JSON required'});
  let body='';for await(const chunk of req){body+=chunk;if(Buffer.byteLength(body)>60000)return res.status(413).json({error:'Brief too large'});}
  try{JSON.parse(body);}catch{return res.status(400).json({error:'Invalid JSON'});}
  await new Promise(resolve=>{
    const child=spawn(pythonCommand(),['-m','services.recommendations.api'],{cwd:root,stdio:['pipe','pipe','ignore']});
    let output='',done=false;
    const finish=(status,body)=>{if(done)return;done=true;clearTimeout(timer);res.status(status).json(body);resolve();};
    const timer=setTimeout(()=>{child.kill();finish(503,{error:'Recommendations timed out; retry later'});},10000);
    child.on('error',()=>finish(503,{error:'Recommendations unavailable'}));
    child.stdout.on('data',chunk=>{output+=chunk;if(output.length>1000000){child.kill();finish(503,{error:'Recommendation response too large'});}});
    child.on('close',()=>{try{const result=JSON.parse(output);finish(result.status,result.body);}catch{finish(503,{error:'Recommendations unavailable'});}});
    child.stdin.on('error',()=>{});child.stdin.end(body);
  });
}
