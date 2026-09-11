"""Bounded local execution contract. Static host inspection; upstream runs only in Docker.
This module never merges, deploys, contacts a repository or accepts model commands.
"""
from __future__ import annotations
import argparse, hashlib, json, os, re, shutil, subprocess, tempfile
from pathlib import Path
from datetime import datetime, timezone
ROOT=Path(__file__).resolve().parents[2]
HERE=Path(__file__).resolve().parent
SOURCE=ROOT/'services/curation/fixtures/threejs'
COMMIT='5c5a575bd8cc0cf440026ce8dcf6a77862067684'
VERSION='headstart-local-integration-1'
RECIPE='simplex-terrain-1'
class IntegrationError(ValueError):pass

def encode(v):return json.dumps(v,sort_keys=True,separators=(',',':'),ensure_ascii=False)
def sha(v):return hashlib.sha256(v if isinstance(v,bytes) else encode(v).encode()).hexdigest()
def read_json(p):return json.loads(Path(p).read_text())
def write_json(p,value):
 p=Path(p);p.parent.mkdir(parents=True,exist_ok=True);temp=p.with_suffix('.new');temp.write_text(json.dumps(value,indent=2)+'\n');temp.chmod(0o600);temp.replace(p)
def git(target,*args):
 result=subprocess.run(['git','-c','core.hooksPath=/dev/null','-c','core.fsmonitor=false','-c','core.attributesFile=/dev/null','-C',str(target),*args],capture_output=True,text=True,timeout=30,env={**{k:v for k,v in os.environ.items() if not k.startswith('GIT_')},'GIT_CONFIG_NOSYSTEM':'1','GIT_CONFIG_GLOBAL':os.devnull,'GIT_TERMINAL_PROMPT':'0'})
 if result.returncode:raise IntegrationError('Git operation failed; inspect target state without discarding edits.')
 return result.stdout.strip()
def safe_path(root,rel):
 root=Path(root).resolve()
 p=Path(rel)
 if p.is_absolute() or not p.parts or any(x in ('..','.git') or x.startswith('.env') for x in p.parts):raise IntegrationError('Unsafe path')
 candidate=root/p
 if any(x.is_symlink() for x in [candidate,*candidate.parents] if x==root or root in x.parents) or not candidate.resolve().is_relative_to(root):raise IntegrationError('Symlink or escaped target path')
 return candidate

def snapshot(target):
 target=Path(target).resolve();files={};size=0
 if any(line.lower().startswith('filter.') or (line.lower().startswith('core.attributesfile=') and line.split('=',1)[1]!='/dev/null') for line in git(target,'config','--list').splitlines()):raise IntegrationError('Repository filters/attributes config requires separate inspection')
 attributes=Path(git(target,'rev-parse','--git-path','info/attributes'))
 if not attributes.is_absolute():attributes=target/attributes
 if attributes.exists() or attributes.is_symlink():raise IntegrationError('Repository info attributes require separate inspection')
 if git(target,'rev-parse','--show-toplevel')!=str(target):raise IntegrationError('Select the repository root')
 for rel in git(target,'ls-files','--cached','--others','--exclude-standard').splitlines():
  if any(part in ('.gitmodules','.gitattributes') for part in Path(rel).parts):raise IntegrationError('Submodules/filters require a separately reviewed adapter')
  p=safe_path(target,rel)
  if not p.is_file():raise IntegrationError('Missing or nonregular target file')
  raw=p.read_bytes();size+=len(raw)
  if len(raw)>5_000_000 or size>30_000_000 or len(files)>500:raise IntegrationError('Target inspection exceeds bounded scope')
  files[rel]=sha(raw)
 return {'head':git(target,'rev-parse','HEAD'),'files':files,'stateDigest':sha(files),'unrelatedEdits':git(target,'status','--porcelain')}

def inspect(target):
 target=Path(target).resolve();state=snapshot(target)
 package=read_json(safe_path(target,'package.json'));profile=read_json(safe_path(target,'headstart-target.json'))
 dependencies={**package.get('dependencies',{}),**package.get('devDependencies',{})}
 owners=['rendererOwner','loopOwner','cameraOwner','inputOwner','lifecycleOwner']
 if profile.get('schemaVersion')!=1 or any(not isinstance(profile.get(k),str) for k in owners):raise IntegrationError('Explicit architecture ownership profile is required')
 for key in owners:
  if profile[key] not in state['files']:raise IntegrationError('Ownership evidence file is absent')
 if not any(k in state['files'] for k in ('AGENTS.md','CLAUDE.md')) or 'package-lock.json' not in state['files']:raise IntegrationError('Target instructions and resolved lockfile must be inspected')
 lock=read_json(target/'package-lock.json')
 link=lock.get('packages',{}).get('node_modules/three',{})
 resolved=lock.get('packages',{}).get('vendor',{}).get('version') if link=={'resolved':'vendor','link':True} else link.get('version')
 if dependencies.get('three')!='file:vendor' or read_json(target/'vendor/package.json').get('version')!=resolved:raise IntegrationError('Target engine dependency and lockfile disagree')
 physics=[k for k in dependencies if re.search('rapier|cannon|ammo|physx',k,re.I)]
 if physics and profile.get('physics')=='none':raise IntegrationError('Declared physics contradicts target ownership')
 engine=read_json(HERE/'engine-manifest.json')
 for name,digest in engine['files'].items():
  dependency=safe_path(target,'vendor/'+name)
  if not dependency.is_file() or sha(dependency.read_bytes())!=digest:raise IntegrationError('Missing or changed transitive engine dependency')
 write_json(ROOT/'.cache/integration-context'/ (state['stateDigest']+'.json'),{'schemaVersion':VERSION,'stateDigest':state['stateDigest'],'manifestDigest':state['files']['package.json'],'lockDigest':state['files']['package-lock.json'],'runtime':profile.get('runtime'),'runtimeVersion':resolved,'physics':profile.get('physics'),'instructionDigests':list({k:v for k,v in state['files'].items() if Path(k).name in ('AGENTS.md','CLAUDE.md')}.values())})
 return {'schemaVersion':VERSION,'stage':'inspected','target':str(target),'state':state,'profile':profile,'dependencies':dependencies,'resolvedThree':resolved,'instructionFiles':{k:v for k,v in state['files'].items() if Path(k).name in ('AGENTS.md','CLAUDE.md')},'limitations':['Static signals do not prove architecture. Host agent must read target instructions and owner files before planning.','R3F/Phaser/Godot/Unity require a separate target-specific adapter; this recipe supports the declared Three.js terrain interface only.']}

def recipe_digest():return sha({'id':RECIPE,'files':{p:sha((HERE/p).read_bytes()) for p in ['adapters/simplex-terrain.js','browser-check.js','monitor.js','browser-runner.mjs','sandbox.py','workflow.py','engine-manifest.json']}})
def source_manifest():
 manifest=read_json(ROOT/'services/curation/reviewed-source-maps.json')
 capability=next(x for x in manifest['capabilities'] if x['id']=='three-simplexnoise')
 paths=capability['required_files'];expected={r['path']:r['digest'] for r in capability['files']};expected.update(manifest['shared_digests'])
 for p in paths:
  if not (SOURCE/p).is_file() or sha((SOURCE/p).read_bytes())!=expected[p]:raise IntegrationError('Source/notice missing or drifted')
 if capability['revision']!=COMMIT or capability['external_peer'] is not None:raise IntegrationError('Unresolved source dependency')
 return {p:expected[p] for p in paths}

def validate_packet(packet):
 if packet.get('schemaVersion')!='headstart-handoff-1' or packet.get('mode')!='source_reviewed_planning' or packet.get('recipe') is not None:raise IntegrationError('Unsupported prepared packet')
 bag=packet.get('bag',{})
 if bag.get('selections')!=[{'id':'three-simplexnoise-v1','version':'1'}] or packet.get('bagRevision')!=sha(bag):raise IntegrationError('Recipe requires exact prepared SimplexNoise selection')
 records=packet.get('records',[]);component=next((r for r in records if r.get('entity_type')=='component_version' and r.get('id')=='three-simplexnoise-v1'),None)
 if not component or component.get('version')!='1':raise IntegrationError('Missing exact component version')
 expected={('project','threejs','1'),('project_version','threejs-reviewed-addon-source','1'),('component','three-simplexnoise','1'),('component_version','three-simplexnoise-v1','1')}
 if len(records)!=4 or {(r.get('entity_type'),r.get('id'),r.get('version')) for r in records}!=expected:raise IntegrationError('Missing or unexpected source parent closure')
 from contracts.validate import validate_record
 for record in records:
  try:validate_record(record)
  except ValueError as error:raise IntegrationError('Malformed source/rights record') from error
 parent=next(r for r in records if r['entity_type']=='project_version')
 if component['data']['project_version']!={'id':parent['id'],'version':parent['version']} or parent['data']['source_commit']!=COMMIT:raise IntegrationError('Parent source version mismatch')
 data=component['data'];files=source_manifest()
 for record in records:
  entry=next((d for d in packet.get('recordDigests',[]) if (d['entity'],d['id'],d['version'])==(record['entity_type'],record['id'],record['version'])),None)
  if not entry or entry['sha256']!=sha(record):raise IntegrationError('Packet record tampered')
  rights=record.get('data',{}).get('rights')
  if record['entity_type'] in ('component_version','project_version') and not rights:raise IntegrationError('Missing required rights')
  if rights and (rights['status']!='scope_cleared' or rights['asset_status']=='unreviewed' or not rights['notices']):raise IntegrationError('Unresolved rights or notices')
  if record['entity_type']=='asset':raise IntegrationError('This recipe does not copy assets; review attachment separately')
 if data['source_commit']!=COMMIT or data['dependencies']:raise IntegrationError('Unsupported source or dependencies')
 for p,digest in files.items():
  if not any(e['path']==p and e['digest']==digest and e['source_commit']==COMMIT for e in data['evidence']):raise IntegrationError('Missing pinned source scope')
 return files

def plan(target,packet,brief_version=1,author='local-builder'):
 context=inspect(target);profile=context['profile'];files=validate_packet(packet)
 if context['state']['unrelatedEdits']:raise IntegrationError('Preserve dirty target; create a clean isolated base before applying this recipe')
 if profile.get('runtime')!='Three.js' or profile.get('runtimeVersion')!='0.186.0' or context['resolvedThree']!='0.186.0' or profile.get('extension')!='terrain-heights-1' or profile.get('physics')!='none' or profile.get('coordinates')!='Y-up meters':raise IntegrationError('Incompatible runtime, physics, coordinate or extension contract')
 result={'schemaVersion':VERSION,'stage':'planned','context':context,'source':{'repository':'https://github.com/mrdoob/three.js','commit':COMMIT,'component':'three-simplexnoise-v1','version':'1','files':files,'packetDigest':sha(packet),'bagRevision':packet['bagRevision']},'recipe':{'id':RECIPE,'digest':recipe_digest()},'pluginVersion':read_json(ROOT/'HeadStart-Starter-Package/headstart-plugin/plugin.json')['version'],'briefVersion':brief_version,'brief':packet['bag']['brief'],'intent':packet['bag']['intent'],'author':author,'changes':['src/terrain.js','vendor/SimplexNoise.js','HEADSTART-NOTICES.txt'],'dependenciesChanged':[],'preserve':profile['preserve'],'assumptions':['Visual terrain only; no collision mesh or physics integration.','Target retains one renderer, loop, camera and input handlers.'],'rollback':'Restore only the exact changed files in the created worktree; retain unrelated edits and original target.'}
 result['planDigest']=sha(result);return result

def verify_plan(value,packet):
 digest=value.get('planDigest');copy={k:v for k,v in value.items() if k!='planDigest'}
 if digest!=sha(copy) or value.get('schemaVersion')!=VERSION:raise IntegrationError('Invalid plan digest/version')
 if value['pluginVersion']!=read_json(ROOT/'HeadStart-Starter-Package/headstart-plugin/plugin.json')['version']:raise IntegrationError('Plugin version drift')
 if value['recipe']!={'id':RECIPE,'digest':recipe_digest()}:raise IntegrationError('Recipe drift')
 if sha(packet)!=value['source']['packetDigest']:raise IntegrationError('Source packet drift')
 validate_packet(packet)
 if snapshot(value['context']['target'])!=value['context']['state']:raise IntegrationError('Stale target; re-inspect and replan')

def event(job,stage,**data):
 path=Path(job)/'events.jsonl';previous=[]
 if path.exists():previous=[json.loads(line) for line in path.read_text().splitlines()]
 item={'sequence':len(previous),'stage':stage,'at':datetime.now(timezone.utc).isoformat(),'previous':sha(previous[-1]) if previous else None,**data}
 with path.open('a') as f:f.write(encode(item)+'\n')
 path.chmod(0o600)
 return item

def apply(value,packet,job,authorized=False,cancel_after=None):
 if not authorized:raise IntegrationError('Local editing authorization is required')
 verify_plan(value,packet);job=Path(job).resolve()
 if job.exists():raise IntegrationError('Choose a fresh job directory')
 job.mkdir(parents=True,mode=0o700);write_json(job/'plan.json',value);write_json(job/'packet.json',packet);event(job,'planned',planDigest=value['planDigest'])
 target=job/'target';branch='headstart/'+value['planDigest'][:12]+'-'+os.urandom(4).hex()
 git(value['context']['target'],'worktree','add','--no-checkout','-b',branch,str(target),value['context']['state']['head'])
 # Never ask Git to materialize target contents: checkout can invoke smudge filters.
 git(target,'read-tree',value['context']['state']['head'])
 for rel,digest in value['context']['state']['files'].items():
  raw=safe_path(value['context']['target'],rel).read_bytes()
  if sha(raw)!=digest:raise IntegrationError('Target changed during worktree creation')
  path=safe_path(target,rel);path.parent.mkdir(parents=True,exist_ok=True);path.write_bytes(raw)
 event(job,'applying',branch=branch);written={}
 contents={'src/terrain.js':(HERE/'adapters/simplex-terrain.js').read_bytes(),'vendor/SimplexNoise.js':(SOURCE/'examples/jsm/math/SimplexNoise.js').read_bytes(),'HEADSTART-NOTICES.txt':(SOURCE/'LICENSE').read_bytes()+b'\nSimplexNoise retains Stefan Gustavson algorithm references in full original source. Adapter modifications: headstart simplex-terrain-1; actual integration requires matching validation/review.\n'}
 try:
  for i,(rel,raw) in enumerate(contents.items(),1):
   path=safe_path(target,rel)
   if path.exists() and rel!='src/terrain.js':raise IntegrationError('Refusing to replace existing source/notice additions')
   path.parent.mkdir(parents=True,exist_ok=True);path.write_bytes(raw);written[rel]=sha(raw);write_json(job/'applied.json',written)
   if cancel_after==i:raise InterruptedError('Cancellation requested')
  event(job,'applied',targetState=snapshot(target)['stateDigest'],changedFiles=written)
 except BaseException as error:
  event(job,'cancelled' if isinstance(error,(KeyboardInterrupt,InterruptedError)) else 'failed',reason=type(error).__name__,changedFiles=written)
  raise
 return target

def rollback(job):
 job=Path(job);value=read_json(job/'plan.json');target=job/'target';written=read_json(job/'applied.json')
 for rel,digest in written.items():
  path=safe_path(target,rel)
  if not path.is_file() or sha(path.read_bytes())!=digest:raise IntegrationError('Changed integration file; preserve edits and review rollback manually')
 for rel in written:
  path=target/rel
  if rel in value['context']['state']['files']:
   raw=subprocess.run(['git','-C',str(target),'show',value['context']['state']['head']+':'+rel],capture_output=True,check=True).stdout;path.write_bytes(raw)
  else:path.unlink()
 event(job,'rolled_back',state=snapshot(target)['stateDigest'])
 return snapshot(target)

def review(job,reviewer,verdict,validation_digest):
 job=Path(job).resolve();value=read_json(job/'plan.json');validation=read_json(job/'validation.json');verify_plan(value,read_json(job/'packet.json'))
 if validation.get('planDigest')!=value['planDigest'] or validation.get('recipe')!=value['recipe'] or validation.get('source')!=value['source']:raise IntegrationError('Validation does not match plan/source/recipe')
 if not reviewer or reviewer==value['author'] or verdict not in ('PASS','CHANGES_REQUESTED'):raise IntegrationError('Separate reviewer verdict required')
 history=[json.loads(line) for line in (job/'events.jsonl').read_text().splitlines()]
 if not history or history[-1]['stage']!='validated' or history[-1].get('validationDigest')!=validation_digest:raise IntegrationError('No matching completed validation stage')
 for i,item in enumerate(history):
  if item['sequence']!=i or item['previous']!=(sha(history[i-1]) if i else None):raise IntegrationError('Progress history changed')
 if validation_digest!=sha(validation) or validation['result']!='PASS' or validation['targetState']!=snapshot(job/'target')['stateDigest']:raise IntegrationError('Validation is stale or failed')
 evidence=validation.get('evidence')
 expected={f'{phase}-{viewport}.{ext}' for phase in ('baseline','integrated') for viewport in ('1280,800','390,844') for ext in ('png','log')}
 if not isinstance(evidence,dict) or set(evidence)!=expected:raise IntegrationError('Missing or unsupported validation evidence')
 for name,digest in evidence.items():
  path=safe_path(job,'evidence/'+name)
  if not isinstance(digest,str) or not re.fullmatch(r'[a-f0-9]{64}',digest) or not path.is_file() or path.stat().st_size>5_000_000:raise IntegrationError('Missing or unbounded validation evidence')
  with path.open('rb') as handle:raw=handle.read(5_000_001)
  if len(raw)>5_000_000 or sha(raw)!=digest:raise IntegrationError('Validation evidence changed')
 event(job,'integration_tested' if verdict=='PASS' else 'review_changes_requested',reviewer=reviewer,validationDigest=validation_digest)
 return {'schemaVersion':VERSION,'stage':'integration_tested' if verdict=='PASS' else 'review_changes_requested','scope':'Only this source/target/recipe digest combination; reviewer identity is a local assertion, not remote attestation.'}

def validate(job,image):
 from .sandbox import run
 job=Path(job);value=read_json(job/'plan.json');packet=read_json(job/'packet.json');verify_plan(value,packet)
 events=[json.loads(line) for line in (job/'events.jsonl').read_text().splitlines()]
 if events[-1]['stage'] not in ('applied','validation_failed'):raise IntegrationError('Apply must complete before validation')
 expected=read_json(job/'applied.json');current=snapshot(job/'target')
 if current['files']!={**value['context']['state']['files'],**expected}:raise IntegrationError('Applied files drifted')
 event(job,'validating',targetState=current['stateDigest'])
 try:
  results={}
  for phase,target in [('baseline',Path(value['context']['target'])),('integrated',job/'target')]:
   for viewport in ['1280,800','390,844']:
    results[phase+'-'+viewport]=run(target,job/'evidence',image,phase,viewport)
  verify_plan(value,packet)
  if snapshot(job/'target')['stateDigest']!=current['stateDigest']:raise IntegrationError('Target drifted during validation')
  artifact={'schemaVersion':VERSION,'result':'PASS','planDigest':value['planDigest'],'targetState':current['stateDigest'],'source':value['source'],'recipe':value['recipe'],'image':image,'results':results,'limitations':value['assumptions'],'evidence':{p.name:sha(p.read_bytes()) for p in (job/'evidence').iterdir() if p.is_file()}}
  write_json(job/'validation.json',artifact);event(job,'validated',validationDigest=sha(artifact));return artifact
 except BaseException as error:
  event(job,'validation_failed',reason=type(error).__name__);raise

def main():
 p=argparse.ArgumentParser(description=__doc__);sub=p.add_subparsers(dest='command',required=True)
 a=sub.add_parser('inspect');a.add_argument('target')
 a=sub.add_parser('plan');a.add_argument('target');a.add_argument('packet');a.add_argument('output');a.add_argument('--author',required=True)
 a=sub.add_parser('apply');a.add_argument('plan');a.add_argument('packet');a.add_argument('job');a.add_argument('--authorized',action='store_true')
 a=sub.add_parser('validate');a.add_argument('job');a.add_argument('--image',required=True)
 a=sub.add_parser('rollback');a.add_argument('job')
 a=sub.add_parser('review');a.add_argument('job');a.add_argument('--reviewer',required=True);a.add_argument('--verdict',choices=['PASS','CHANGES_REQUESTED'],required=True);a.add_argument('--validation-digest',required=True)
 args=p.parse_args()
 try:
  if args.command=='inspect':result=inspect(args.target)
  elif args.command=='plan':result=plan(args.target,read_json(args.packet),author=args.author);write_json(args.output,result)
  elif args.command=='apply':result={'worktree':str(apply(read_json(args.plan),read_json(args.packet),args.job,args.authorized))}
  elif args.command=='validate':result=validate(args.job,args.image)
  elif args.command=='rollback':result=rollback(args.job)
  else:result=review(args.job,args.reviewer,args.verdict,args.validation_digest)
  print(json.dumps(result,indent=2))
 except (IntegrationError,ValueError,OSError) as error:p.exit(1,str(error)+'\n')
if __name__=='__main__':main()
