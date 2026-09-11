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
    if type(brief.get('revision')) is not int or brief_revision is not None and brief['revision'] != brief_revision:
        raise ValueError('Review brief revision is stale')
    if not isinstance(plan.get('context'),dict) or not isinstance(plan['context'].get('state'),dict) or not isinstance(plan.get('recipe'),dict):
        raise ValueError('Invalid target or recipe context')
    state = plan['context']['state']
    recipe = plan.get('recipe',{})
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
