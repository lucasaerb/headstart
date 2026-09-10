#!/usr/bin/env python3
"""Read bounded known game manifests without executing or modifying the target."""
import argparse,json,re
from pathlib import Path
MAX_BYTES=2_000_000
KNOWN=('three','react','react-dom','@react-three/fiber','@react-three/rapier','@react-three/cannon','@react-three/drei','rapier','@dimforge/rapier3d','cannon-es','phaser','pixi.js','babylonjs','vite','typescript')
def inspect(root):
 root=Path(root).expanduser().resolve()
 if not root.is_dir():raise ValueError('Target must be an existing project directory')
 result={'schema_version':'0.1','workspace':str(root),'detected_runtimes':[],'declared_dependencies':{},'observed_files':[],'checks':{},'limitations':['Static manifest summary only; inspect code for lifecycle, units, architecture, rights and behavior.']}
 def read(rel):
  f=root/rel
  if not f.exists():return None
  if not f.is_file() or not f.resolve().is_relative_to(root):result['checks'][rel]='Skipped non-file or path outside selected workspace';return None
  if f.stat().st_size>MAX_BYTES:result['checks'][rel]='Skipped oversized manifest';return None
  result['observed_files'].append(rel)
  try:return f.read_text(encoding='utf-8')
  except (OSError,UnicodeError):result['checks'][rel]='Unreadable manifest';return None
 data=read('package.json')
 if data:
  try:
   obj=json.loads(data)
   if not isinstance(obj,dict):raise ValueError()
   deps={}
   for group in ['dependencies','devDependencies','peerDependencies']:
    if isinstance(obj.get(group),dict):deps.update(obj[group])
   result['declared_dependencies']={k:str(v)[:120] for k,v in deps.items() if k in KNOWN}
   for dep,label in [('three','Three.js'),('@react-three/fiber','React Three Fiber'),('phaser','Phaser'),('pixi.js','PixiJS'),('babylonjs','Babylon.js')]:
    if dep in deps:result['detected_runtimes'].append(label)
   result['checks']['package.json']='Parsed declared versions; resolved lockfile versions still require inspection'
  except (ValueError,TypeError):result['checks']['package.json']='Invalid JSON object'
 godot=read('project.godot')
 if godot:
  result['detected_runtimes'].append('Godot');m=re.search(r'^config_version\s*=\s*(\d+)',godot,re.M)
  result['godot_config_format']=int(m.group(1)) if m else None
  result['limitations'].append('Godot config format is not an engine version; inspect features and actual editor version.')
 unity=read('ProjectSettings/ProjectVersion.txt')
 if unity:
  result['detected_runtimes'].append('Unity');m=re.search(r'^m_EditorVersion:\s*([\w.]+)',unity,re.M);result['unity_editor_version']=m.group(1) if m else None
 for rel in ['package-lock.json','pnpm-lock.yaml','yarn.lock','bun.lock','Packages/manifest.json','AGENTS.md','CLAUDE.md']:
  f=root/rel
  if f.is_file() and f.resolve().is_relative_to(root):result['observed_files'].append(rel)
 result['detected_runtimes']=list(dict.fromkeys(result['detected_runtimes']))
 if not result['detected_runtimes']:result['limitations'].append('No recognized runtime in known manifests; this does not prove the project lacks an engine.')
 return result
if __name__=='__main__':
 ap=argparse.ArgumentParser(description=__doc__);ap.add_argument('project');args=ap.parse_args()
 try:print(json.dumps(inspect(args.project),indent=2))
 except ValueError as e:ap.error(str(e))
