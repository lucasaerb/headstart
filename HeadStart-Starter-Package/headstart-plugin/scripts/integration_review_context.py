#!/usr/bin/env python3
"""Read-only local review context from a pinned integration plan and its source packet.
Integrity/continuity check only: current target inspection and independent review are still required.
"""
import argparse
import hashlib
import json
from pathlib import Path
import re


def sha(value):
    return hashlib.sha256(json.dumps(value,sort_keys=True,separators=(',',':'),ensure_ascii=False).encode()).hexdigest()


def read(path):
    path = Path(path)
    if path.is_symlink() or not path.is_file() or path.stat().st_size > 2_000_000:
        raise ValueError('Select a bounded real local record')
    return json.loads(path.read_text(),parse_constant=lambda _: (_ for _ in ()).throw(ValueError('Nonfinite JSON')))


def context(plan, packet, *, authorization='review_only', brief_revision=None):
    if authorization not in ('review_only','bounded_improvement'):
        raise ValueError('Explicit review authorization required')
    if not isinstance(plan,dict) or plan.get('schemaVersion') != 'headstart-local-integration-1':
        raise ValueError('Unsupported integration record')
    if plan.get('planDigest') != sha({k:v for k,v in plan.items() if k!='planDigest'}):
        raise ValueError('Integration plan digest mismatch')
    if not isinstance(packet,dict) or not isinstance(plan.get('source'),dict):
        raise ValueError('Invalid packet or source context')
    source = plan['source']
    if source.get('packetDigest') != sha(packet):
        raise ValueError('Source packet drift')
    bag = packet.get('bag',{})
    if not isinstance(bag,dict) or not isinstance(bag.get('brief'),dict):
        raise ValueError('Invalid bag brief')
    brief = bag['brief']
    if plan.get('brief') != brief or plan.get('intent') != bag.get('intent') or source.get('bagRevision') != packet.get('bagRevision'):
        raise ValueError('Brief or bag context drift')
    if packet.get('bagRevision') != sha(bag):
        raise ValueError('Bag revision digest mismatch')
    records = packet.get('records')
    references = packet.get('recordDigests')
    if not isinstance(records,list) or not isinstance(references,list) or not records or len(records) != len(references):
        raise ValueError('Missing packet record pins')
    keyed = {}
    for record in records:
        if not isinstance(record,dict) or not isinstance(record.get('data'),dict):
            raise ValueError('Malformed packet record')
        key = (record.get('entity_type'),record.get('id'),record.get('version'))
        if not all(isinstance(v,str) for v in key) or key in keyed:
            raise ValueError('Duplicate or invalid record identity')
        matching = [r for r in references if isinstance(r,dict) and (r.get('entity'),r.get('id'),r.get('version')) == key]
        if len(matching) != 1 or matching[0].get('sha256') != sha(record):
            raise ValueError('Record digest mismatch')
        keyed[key] = record
    component = keyed.get(('component_version',source.get('component'),source.get('version')))
    if component is None or {'id':source['component'],'version':source['version']} not in bag.get('selections',[]):
        raise ValueError('Source component is not the selected pinned version')
    data = component['data']
    parent_ref = data.get('project_version',{})
    parent = keyed.get(('project_version',parent_ref.get('id'),parent_ref.get('version')))
    project = None if parent is None else next((r for r in records if r['entity_type']=='project' and r['id']==parent['data'].get('project_id')),None)
    if source.get('commit') != data.get('source_commit') or parent is None or parent['data'].get('source_commit') != source['commit'] or project is None or project['data'].get('repository_url') != source.get('repository'):
        raise ValueError('Source revision or repository contradicts packet records')
    required = data.get('scope',{}).get('required_files',[])
    evidence = data.get('evidence',[])
    files = {e['path']:e['digest'] for e in evidence if isinstance(e,dict) and e.get('path') in required and e.get('source_commit')==source['commit'] and 'digest' in e}
    if not required or set(files) != set(required) or source.get('files') != files:
        raise ValueError('Source scope contradicts pinned file evidence')
    if type(brief.get('revision')) is not int or brief_revision is not None and brief['revision'] != brief_revision:
        raise ValueError('Review brief revision is stale')
    if not isinstance(plan.get('context'),dict) or not isinstance(plan['context'].get('state'),dict) or not isinstance(plan.get('recipe'),dict):
        raise ValueError('Invalid target or recipe context')
    state = plan['context']['state']
    recipe = plan.get('recipe',{})
    if not isinstance(state.get('files'),dict) or not isinstance(state.get('modes'),dict) or set(state['files']) != set(state['modes']) or state.get('stateDigest') != sha({'files':state['files'],'modes':state['modes']}):
        raise ValueError('Target file/mode state digest mismatch')

    for value,width in ((source.get('commit'),40),(state.get('head'),40),(state.get('stateDigest'),64),(recipe.get('digest'),64)):
        if not isinstance(value,str) or not re.fullmatch('[a-f0-9]{'+str(width)+'}',value):
            raise ValueError('Missing pinned source, target or recipe state')
    if not all(isinstance(source.get(k),str) and source[k] for k in ('component','version')):
        raise ValueError('Missing source version')
    return {'schemaVersion':'headstart-review-context-1','rubricVersion':'headstart-review-rubric-1',
            'integrationRecord':{'schemaVersion':plan['schemaVersion'],'planDigest':plan['planDigest']},
            'brief':brief,'briefVersion':plan['briefVersion'],'intent':plan['intent'],
            'source':source,'targetRevision':state['head'],'targetState':state['stateDigest'],
            'recipe':recipe,'pluginVersion':plan['pluginVersion'],'preserve':plan['preserve'],
            'authorization':authorization,'currentTargetInspection':'required',
            'verification':'Context integrity only; not a validation result or reviewed reuse attestation.'}


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('plan');parser.add_argument('packet')
    parser.add_argument('--authorization',choices=['review_only','bounded_improvement'],default='review_only')
    parser.add_argument('--brief-revision',type=int)
    args=parser.parse_args()
    try:
        print(json.dumps(context(read(args.plan),read(args.packet),authorization=args.authorization,brief_revision=args.brief_revision),indent=2))
    except (OSError,ValueError,TypeError,KeyError):
        parser.exit(1,'Review context rejected; inspect the pinned plan, packet and brief locally.\n')
if __name__=='__main__':main()
