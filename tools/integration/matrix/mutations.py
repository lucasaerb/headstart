"""Real sandbox negative oracles, separate from successful integration evidence."""
import argparse,json
from pathlib import Path
from .run import ROWS,integrate,HERE,sandbox_run
from tools.integration import workflow as w

def main():
 p=argparse.ArgumentParser();p.add_argument('--output',required=True);p.add_argument('--image',required=True);args=p.parse_args();output=Path(args.output);results={}
 for row in ROWS:
  for kind in ('noop','disposal'):
   job=integrate(output/(row+'-'+kind),row,True);file=job/'target/src/feature.js'
   if kind=='noop':file.write_text((HERE/'baseline-feature.js').read_text())
   else:
    text=file.read_text();needle='for(const resource of new Set(owned))resource.dispose();'
    if needle not in text:raise AssertionError('Mutation target missing')
    file.write_text(text.replace(needle,'/* Deliberately broken cleanup mutant. */'))
   try:sandbox_run(job/'target',job/'negative-evidence',args.image,'integrated')
   except ValueError:
    log=job/'negative-evidence/integrated-1280,800.log';data=json.loads(log.read_text().splitlines()[0]);error=data['report'].get('error','')
    if data['report']['result']!='FAIL' or not error:raise AssertionError('No explicit negative result')
    if kind=='disposal' and error!='feature disposes all owned resources exactly once':raise AssertionError('Wrong cleanup failure: '+error)
    if kind=='noop' and ('Page result absent' in error or 'CDP deadline' in error):raise AssertionError('Browser failure is not no-op rejection')
    results[row+'-'+kind]={'result':'rejected','error':error,'logDigest':w.sha(log.read_bytes())};print(row+' '+kind+': rejected',flush=True)
   else:raise AssertionError('Broken mutation falsely passed: '+row+' '+kind)
 w.write_json(output/'negative-results.json',results)
if __name__=='__main__':main()
