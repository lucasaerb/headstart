"""One actual read-only Codex turn using all three review skills on first-party fixtures."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import shutil
import subprocess
import tempfile
import time
from check_codex_client import Client, ROOT
from tools.integration.fixture import target, packet
from tools.integration.workflow import plan, write_json, snapshot
import importlib.util


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--marketplace',type=Path,required=True)
    parser.add_argument('--output',type=Path,required=True)
    args=parser.parse_args()
    market=args.marketplace.resolve()
    registry=json.loads((market/'.agents/plugins/marketplace.json').read_text())
    if not registry['name'].startswith('headstart-review'):raise ValueError('Distinct test marketplace required')
    plugin_id='headstart-plugin@'+registry['name']
    source=ROOT/'HeadStart-Starter-Package/headstart-plugin';plugin=market/'plugins/headstart-plugin'
    subprocess.run(['codex','plugin','remove',plugin_id],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
    if plugin.exists():shutil.rmtree(plugin)
    shutil.copytree(source,plugin,ignore=shutil.ignore_patterns('__pycache__','tests'))
    subprocess.run([str(ROOT/'.venv/bin/python'),str(plugin/'scripts/configure_connection.py'),'offline'],check=True,stdout=subprocess.DEVNULL)
    mcp=json.loads((plugin/'mcp.json').read_text());mcp['mcpServers']['headstart-release-test']=mcp['mcpServers'].pop('headstart');(plugin/'mcp.json').write_text(json.dumps(mcp))
    installed=json.loads(subprocess.check_output(['codex','plugin','add',plugin_id,'--json'],text=True))
    with tempfile.TemporaryDirectory(prefix='headstart-review-client-') as temporary:
        workspace=Path(temporary)
        fixture=target(workspace/'target');p=packet();v=plan(fixture,p)
        write_json(workspace/'plan.json',v);write_json(workspace/'packet.json',p)
        for name in ('before.mjs','after.mjs','README.md'):
            shutil.copyfile(ROOT/'tools/review/fixtures'/name,workspace/name)
        shutil.copyfile(ROOT/'docs/reviews/expert-review-skills/art-guide.md',workspace/'art-guide.md')
        shutil.copyfile(ROOT/'docs/reviews/expert-review-skills/benchmark.json',workspace/'benchmark.json')
        shutil.copyfile(ROOT/'docs/reviews/expert-review-skills/raw.json',workspace/'raw.json')
        shutil.copytree(ROOT/'docs/reviews/expert-review-skills/captures',workspace/'captures')
        shutil.copyfile(ROOT/'docs/reviews/expert-review-skills/evidence.json',workspace/'evidence.json')
        before=snapshot(fixture)
        files_before={p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in workspace.iterdir() if p.is_file()}
        client=Client(workspace)
        try:
            listing=client.call('skills/list',{'cwds':[str(workspace)],'forceReload':True})
            wanted={'headstart-art-direction','headstart-code-review','headstart-performance-review'}
            skills=[s for row in listing['data'] for s in row['skills'] if s.get('pluginId')==plugin_id and s['name'].split(':')[-1] in wanted]
            assert len(skills)==3 and all(s['enabled'] for s in skills)
            prompt='''Apply the three attached HeadStart review skills in review-only mode to this first-party synthetic fixture. Read only files in this current working directory and the selected installed HeadStart plugin. Do not access credentials, other projects, network or write any files. Use actual host read tools and run the packaged integration_review_context.py on plan.json packet.json, plus review_evidence.py benchmark.json --root . (the raw file is raw.json). Review before.mjs versus after.mjs and the editable art-guide.md. Use the actual image-view tool to inspect captures/desktop-before.png, captures/desktop-after.png and captures/mobile-after.png, and cite an observed image region separately from editorial preference. Return a compact review with: the shared brief/source/target/recipe pins, one concrete editorial art mismatch, source-located leaked-listener and duplicate-world findings, and whether the supplied CPU benchmark supports an FPS or speedup claim. Label the runtime integration target and the separate visual toy fixture accurately; never treat toy checks as the Three.js integration's measurement. State that no edits were made. Do not execute either fixture's application code; the raw benchmark is previous measured evidence, not a new run. Stop after the review. Keep your answer under 600 words.'''
            inputs=[{'type':'text','text':prompt}]+[{'type':'skill','name':s['name'],'path':s['path']} for s in skills]
            result=client.call('turn/start',{'threadId':client.thread,'input':inputs})
            deadline=time.time()+240;messages=[];commands=[];images=[];completed=False
            while time.time()<deadline:
                try:item=client.queue.get(timeout=min(5,max(.1,deadline-time.time())))
                except Exception:continue
                if item.get('method')=='item/completed':
                    value=item['params']['item']
                    if value.get('type')=='agentMessage':messages.append(value.get('text',''))
                    if value.get('type')=='imageView':images.append({k:value.get(k) for k in ('path','status')})
                    if value.get('type')=='commandExecution':commands.append({k:value.get(k) for k in ('command','status','exitCode')})
                if item.get('method')=='turn/completed':
                    completed=item['params']['turn'].get('status')=='completed';break
            assert completed,'Review client did not complete'
            assert snapshot(fixture)==before
            assert files_before=={p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in workspace.iterdir() if p.is_file()}
            assert messages and commands and len(images)>=3,'Actual review/tool/image evidence missing'
            evidence={'client':subprocess.check_output(['codex','--version'],text=True).strip(),'pluginId':plugin_id,'installedVersion':installed['version'],'skills':[s['name'] for s in skills],'sharedPlanDigest':v['planDigest'],'commands':commands,'imageViews':images,'responses':messages,'targetUnchanged':True,'fixtureFilesUnchanged':True,'scope':'Actual read-only client invocation on first-party synthetic fixtures; previous CPU samples checked, no new benchmark run. No credentials, private target or raw user captures supplied.'}
            args.output.write_text(json.dumps(evidence,indent=2)+'\n')
            print('PASS: actual three-skill client turn completed with host commands and no target changes')
        finally:client.close()
if __name__=='__main__':main()
