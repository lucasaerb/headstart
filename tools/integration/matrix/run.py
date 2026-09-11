"""Ten bounded, authorized local-source integrations. No catalog promotion or hosted handoff."""
import argparse,os,shutil
from pathlib import Path
from tools.integration import workflow as w
from tools.integration.fixture import target as terrain_target
from tools.integration.sandbox import run as sandbox_run
HERE=Path(__file__).resolve().parent
CLASSES=dict(zip(['simplexnoise','improvednoise','capsule','obb','roundedboxgeometry','parametricgeometry','boxlinegeometry','vertexnormalshelper','convexgeometry','vertextangentshelper'],['SimplexNoise','ImprovedNoise','Capsule','OBB','RoundedBoxGeometry','ParametricGeometry','BoxLineGeometry','VertexNormalsHelper','ConvexGeometry','VertexTangentsHelper']))
ROWS=['simplexnoise','improvednoise','capsule','obb','roundedboxgeometry','parametricgeometry','boxlinegeometry','vertexnormalshelper','convexgeometry','vertextangentshelper']

def sources(row):
 manifest=w.read_json(w.ROOT/'services/curation/reviewed-source-maps.json');source=next(x for x in manifest['capabilities'] if x['id']=='three-'+row)
 if source['revision']!=w.COMMIT or source['readiness']!='source_reviewed' or not source.get('rights') or not source.get('reviewer'):raise w.IntegrationError('Source rights/review gap')
 expected={x['path']:x['digest'] for x in source['files']};expected.update(manifest['shared_digests'])
 for rel in source['required_files']:
  path=w.safe_path(w.SOURCE,rel)
  if not path.is_file() or w.sha(path.read_bytes())!=expected.get(rel):raise w.IntegrationError('Missing or changed source/notice closure')
 peer=source['external_peer']
 if peer and (peer['package']!='three' or peer['declared_version']!='0.186.0' or peer['source_commit']!=w.COMMIT or not peer.get('rights')):raise w.IntegrationError('Unresolved exact engine peer')
 return source,{rel:expected[rel] for rel in source['required_files']}

def recipe(row):
 files=[*sorted(HERE.glob('*.js')),*sorted(HERE.glob('*.py')),w.HERE/'workflow.py',w.HERE/'sandbox.py',w.HERE/'browser-runner.mjs',w.HERE/'monitor.js',w.HERE/'engine-manifest.json']
 return {'id':'world-feature-'+row+'-1','digest':w.sha({'row':row,'files':{str(p.relative_to(w.HERE)):w.sha(p.read_bytes()) for p in files}})}

def base(path,row):
 path=terrain_target(path)
 instructions=(path/'AGENTS.md').read_text().replace('Change only src/terrain.js','Change only src/feature.js')
 (path/'AGENTS.md').write_text(instructions)
 index=(path/'index.html').read_text().replace('<body>','<body data-row="'+row+'">').replace('<script type="module">','<script type="importmap">{"imports":{"three":"/app/vendor/three.module.js"}}</script><script type="module">').replace('/harness/browser-check.js','/harness/matrix/check.js')
 (path/'index.html').write_text(index)
 shutil.copyfile(HERE/'baseline-feature.js',path/'src/feature.js')
 game=(path/'src/game.js').read_text().replace("import { heights, capability }", "import {createFeature} from './feature.js';\nimport { heights, capability }")
 game=game.replace("let seed=7", "const feature=createFeature(scene);\n  let seed=7")
 game=game.replace('ticks++;renderer.render(scene,camera);','ticks++;feature.update(player.position.x);renderer.render(scene,camera);')
 game=game.replace('ticks=0;regenerate(7);','ticks=0;regenerate(7);feature.refresh(7);')
 game=game.replace('disposed=true;window.removeEventListener','disposed=true;feature.dispose();window.removeEventListener')
 game=game.replace('return {start,pause','return {feature,start,pause')
 (path/'src/game.js').write_text(game)
 profile=w.read_json(path/'headstart-target.json');profile['extension']='world-feature-1';w.write_json(path/'headstart-target.json',profile)
 w.git(path,'add','.');w.git(path,'-c','user.name=HeadStart fixture','-c','user.email=fixture@example.invalid','commit','-qm','Existing world with locally owned landmark slot')
 return path

def verify(plan):
 if w.sha({k:v for k,v in plan.items() if k!='planDigest'})!=plan['planDigest'] or recipe(plan['row'])!=plan['recipe']:raise w.IntegrationError('Recipe or plan drift')
 source,files=sources(plan['row'])
 if source!=plan['source'] or files!=plan['sourceFiles']:raise w.IntegrationError('Source scope drift')
 if w.snapshot(plan['target'])!=plan['base']:raise w.IntegrationError('Target instructions/content/modes drift')
 if plan['pluginVersion']!=w.read_json(w.ROOT/'HeadStart-Starter-Package/headstart-plugin/plugin.json')['version']:raise w.IntegrationError('Plugin version drift')

def integrate(root,row,authorized):
 if not authorized:raise w.IntegrationError('Existing local edit authorization required')
 root=Path(root).resolve()
 if root.exists():raise w.IntegrationError('Fresh row output required')
 root.mkdir(parents=True,mode=0o700);original=base(root/'base',row);context=w.inspect(original);source,files=sources(row)
 if context['profile']['physics']!='none' or context['resolvedThree']!='0.186.0' or context['state']['unrelatedEdits']:raise w.IntegrationError('Unsupported or dirty target')
 plan={'schemaVersion':'headstart-reference-matrix-1','row':row,'author':'reuse_mcp','target':str(original),'base':context['state'],'source':source,'sourceFiles':files,'recipe':recipe(row),'pluginVersion':w.read_json(w.ROOT/'HeadStart-Starter-Package/headstart-plugin/plugin.json')['version'],'briefVersion':1,'brief':{'intent':'Add '+row+' to the existing world landmark slot','preserve':['renderer','camera','frame scheduler','keyboard explorer','flat world topology'],'physics':'none','coordinates':'Y-up meters'},'authorization':'User-authorized bounded local source integration; no production handoff or identity claim'}
 plan['planDigest']=w.sha(plan);w.write_json(root/'plan.json',plan);verify(plan);w.event(root,'planned',planDigest=plan['planDigest'])
 target=root/'target';branch='headstart/matrix-'+row+'-'+os.urandom(4).hex();w.git(original,'worktree','add','--no-checkout','-b',branch,str(target),plan['base']['head']);w.git(target,'read-tree',plan['base']['head'])
 for rel,digest in plan['base']['files'].items():
  raw=w.safe_path(original,rel).read_bytes()
  if w.sha(raw)!=digest:raise w.IntegrationError('Base changed during copy')
  dest=w.safe_path(target,rel);dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(raw);dest.chmod(plan['base']['modes'][rel])
 changes={}
 for rel in files:
  if rel.endswith('.js'):
   dest=w.safe_path(target,'vendor/addons/'+rel);dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes((w.SOURCE/rel).read_bytes());changes[str(dest.relative_to(target))]=w.sha(dest.read_bytes())
 adapter=(HERE/'feature-template.js').read_text().replace('CAPABILITY_CLASS',CLASSES[row]).replace('SOURCE_PATH','../vendor/addons/'+source['source_path']).replace('ROW_ID',row)
 (target/'src/feature.js').write_text(adapter);changes['src/feature.js']=w.sha(adapter.encode())
 notices=(w.SOURCE/'LICENSE').read_text()+'\n'+source['creator']+'\n'+source['rights']+'\nHeadStart adapter modifications: '+plan['recipe']['id']+'; upstream files retained intact.\n'
 (target/'HEADSTART-NOTICES.txt').write_text(notices);changes['HEADSTART-NOTICES.txt']=w.sha(notices.encode())
 state=w.snapshot(target);w.write_json(root/'applied.json',{'files':changes,'modes':{rel:state['modes'][rel] for rel in changes},'state':state});w.event(root,'applied',targetState=state['stateDigest']);return root

def validate(root,image):
 root=Path(root);plan=w.read_json(root/'plan.json');verify(plan);applied=w.read_json(root/'applied.json')
 if w.snapshot(root/'target')!=applied['state']:raise w.IntegrationError('Applied content or modes changed')
 w.event(root,'validating');results={}
 try:
  for phase,path in [('baseline',root/'base'),('integrated',root/'target')]:
   for viewport in ['1280,800','390,844']:results[phase+'-'+viewport]=sandbox_run(path,root/'evidence',image,phase,viewport)
  verify(plan)
  if w.snapshot(root/'target')!=applied['state']:raise w.IntegrationError('Target changed during runtime')
  artifact={'schemaVersion':'headstart-reference-matrix-1','result':'PASS','readiness':'awaiting independent review','planDigest':plan['planDigest'],'sourceCommit':w.COMMIT,'targetBase':plan['base'],'targetIntegrated':applied['state'],'recipe':plan['recipe'],'pluginVersion':plan['pluginVersion'],'briefVersion':1,'image':image,'results':results,'evidence':{p.name:w.sha(p.read_bytes()) for p in (root/'evidence').iterdir() if p.is_file()}}
  from .attestation import create
  attestation=create(root,plan,artifact);w.write_json(root/'execution-attestation.json',attestation);artifact['attestationDigest']=w.sha(attestation)
  w.write_json(root/'validation.json',artifact);w.event(root,'validated',validationDigest=w.sha(artifact));return artifact
 except BaseException as error:w.event(root,'validation_failed',reason=type(error).__name__);raise

def rollback(root):
 root=Path(root);plan=w.read_json(root/'plan.json');applied=w.read_json(root/'applied.json');target=root/'target'
 for rel,digest in applied['files'].items():
  path=w.safe_path(target,rel)
  if not path.is_file() or w.sha(path.read_bytes())!=digest or (path.stat().st_mode & 0o777)!=applied['modes'][rel]:raise w.IntegrationError('Preserve changed integration bytes/modes')
 for rel in applied['files']:
  path=w.safe_path(target,rel)
  if rel in plan['base']['files']:
   original=w.safe_path(plan['target'],rel);raw=original.read_bytes()
   if w.sha(raw)!=plan['base']['files'][rel]:raise w.IntegrationError('Base changed; review rollback manually')
   path.write_bytes(raw);path.chmod(plan['base']['modes'][rel])
  else:path.unlink()
 w.event(root,'rolled_back');return w.snapshot(target)

def main():
 p=argparse.ArgumentParser();p.add_argument('--row',choices=ROWS+['all'],required=True);p.add_argument('--output',required=True);p.add_argument('--image',required=True);p.add_argument('--authorized',action='store_true');a=p.parse_args()
 for row in ROWS if a.row=='all' else [a.row]:
  job=integrate(Path(a.output)/row,row,a.authorized);result=validate(job,a.image);print(row+': '+result['result'],flush=True)
if __name__=='__main__':main()
