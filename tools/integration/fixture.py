"""Create a controlled existing target and a synthetic authenticated test packet."""
import argparse,json,os,shutil,subprocess,tempfile
from pathlib import Path
from .workflow import ROOT,HERE,read_json,sha,write_json,git

def target(path):
 path=Path(path)
 if path.exists():raise ValueError('Fresh fixture path required')
 shutil.copytree(HERE/'fixtures/target',path)
 manifest=read_json(HERE/'engine-manifest.json');vendor=path/'vendor';vendor.mkdir();(vendor/'package.json').write_text(json.dumps({'name':'three','version':'0.186.0','type':'module','exports':'./three.module.js'})+'\n')
 for name,digest in manifest['files'].items():
  source=ROOT/'.cache/integration-engine'/name
  if sha(source.read_bytes())!=digest:raise ValueError('Fetch pinned engine cache first')
  shutil.copyfile(source,vendor/name)
 shutil.copyfile(ROOT/'services/curation/fixtures/threejs/LICENSE',vendor/'THREE-LICENSE.txt')
 subprocess.run(['git','init','-q',str(path)],check=True);git(path,'add','.');git(path,'-c','user.name=HeadStart fixture','-c','user.email=fixture@example.invalid','commit','-qm','Controlled existing terrain target')
 return path

def packet():
 from services.catalog.store import CatalogStore
 from services.curation.seed import seed_curated_capabilities
 from services.submissions.store import setup
 from services.handoff.service import build
 with tempfile.TemporaryDirectory() as tmp:
  store=CatalogStore(Path(tmp)/'catalog.db',Path(tmp)/'evidence');setup(store.db);seed_curated_capabilities(store)
  request={'schemaVersion':1,'selections':[{'id':'three-simplexnoise-v1','version':'1'}],'brief':{'revision':1,'constraints':{'preserve':{'value':'existing renderer camera keyboard and lifecycle','origin':'explicit'},'runtime':{'value':'Three.js 0.186.0','origin':'explicit'}}},'intent':'Add deterministic rolling terrain while preserving the existing explorer controls','recipe':None}
  result=build(store,request);store.close();return result

def main():
 p=argparse.ArgumentParser();p.add_argument('target');p.add_argument('packet_output');args=p.parse_args();target(args.target);write_json(args.packet_output,packet());print('Controlled local test target and labeled test packet created. This is not a production handoff or email verification.')
if __name__=='__main__':main()
