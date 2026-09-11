"""Negative runtime evidence against the exact controlled existing target."""
import json,tempfile
from pathlib import Path
from tools.integration.fixture import target
from tools.integration.workflow import HERE
from tools.integration.sandbox import run
import argparse

def main():
 p=argparse.ArgumentParser();p.add_argument('--image',required=True);p.add_argument('--output',required=True);args=p.parse_args();out=Path(args.output);out.mkdir(parents=True,exist_ok=True);results={}
 # Each mutant is authored test content, still executed only inside the sandbox.
 with tempfile.TemporaryDirectory(prefix='headstart-negative-target-') as temp:
  for name in ['noop','listener-leak','second-renderer']:
   work=target(Path(temp)/name)
   if name!='noop':
    (work/'src/terrain.js').write_bytes((HERE/'adapters/simplex-terrain.js').read_bytes())
    from tools.integration.workflow import SOURCE
    (work/'vendor/SimplexNoise.js').write_bytes((SOURCE/'examples/jsm/math/SimplexNoise.js').read_bytes())
   game=work/'src/game.js'
   if name=='listener-leak':game.write_text(game.read_text().replace("window.removeEventListener('keydown',down);window.removeEventListener('keyup',up);",''))
   if name=='second-renderer':game.write_text(game.read_text().replace("const scene =", "const stray = new THREE.WebGLRenderer(); const scene ="))
   try:run(work,out/name,args.image,'integrated');raise AssertionError('Mutant escaped checks: '+name)
   except ValueError:
    report=json.loads((out/name/'integrated-1280,800.log').read_text().splitlines()[0])['report'];assert report['result']=='FAIL';results[name]=report['error']
 (out/'mutation-results.json').write_text(json.dumps(results,indent=2)+'\n');print(json.dumps(results))
if __name__=='__main__':main()
