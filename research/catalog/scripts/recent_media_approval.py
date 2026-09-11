#!/usr/bin/env python3
"""Apply an independent, exact-set decision to the recent catalog media batch."""
from __future__ import annotations
import argparse, copy, json
from datetime import datetime
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]

def expected_ids(root=ROOT):
    return {r['id'] for r in json.loads((root/'records/recent-vibe.json').read_text())}

def load_approvals(path, expected):
    data=json.loads(Path(path).read_text())
    if data.get('schema_version')!='1.0' or not isinstance(data.get('records'),list): raise ValueError('Invalid recent media approval contract')
    out={}
    required={'record_id','decision','reviewer','reviewed_at','verdict'}
    for item in data['records']:
        if not isinstance(item,dict) or set(item)!=required or item.get('record_id') in out: raise ValueError('Invalid or duplicate recent media approval record')
        if item['decision']!='approved_for_local_catalog_display': raise ValueError('Every recent media decision must be approved before publication')
        if not all(isinstance(item[k],str) and item[k].strip() for k in required): raise ValueError('Approval fields must be nonempty strings')
        if item['reviewer'] in {'OpenAI Codex','/root/catalog_research'}: raise ValueError('Media author cannot independently approve their own batch')
        if not item['verdict'].startswith('PASS'): raise ValueError('Approval verdict must start with PASS')
        try:
            if datetime.fromisoformat(item['reviewed_at'].replace('Z','+00:00')).tzinfo is None: raise ValueError()
        except (ValueError,TypeError): raise ValueError('Approval timestamp must include timezone')
        out[item['record_id']]=item
    if set(out)!=set(expected): raise ValueError(f'Approval must cover exact recent set; missing={sorted(set(expected)-out.keys())}, extra={sorted(out.keys()-set(expected))}')
    return out

def mark_pending(manifest, recent):
    result=copy.deepcopy(manifest)
    for item in result:
        if item['record_id'] in recent:
            item['rights_status']='candidate_local_display_pending_independent_review'
            for key in ('reviewer','independent_reviewed_at','independent_review_verdict'): item.pop(key,None)
    return result

def apply_approvals(manifest, approvals, recent):
    result=mark_pending(manifest,recent)
    by_id={m['record_id']:m for m in result}
    if not recent <= by_id.keys(): raise ValueError('Manifest is missing recent media rows')
    for rid,approval in approvals.items():
        by_id[rid].update(rights_status='reviewed_for_catalog_display',reviewer=approval['reviewer'],independent_reviewed_at=approval['reviewed_at'],independent_review_verdict=approval['verdict'])
    return result

def main():
    p=argparse.ArgumentParser();p.add_argument('--approval',type=Path,required=True);p.add_argument('--manifest',type=Path,default=ROOT/'media-manifest.json');p.add_argument('--output',type=Path,required=True);a=p.parse_args()
    approvals=load_approvals(a.approval,expected_ids());result=apply_approvals(json.loads(a.manifest.read_text()),approvals,expected_ids());a.output.write_text(json.dumps(result,indent=2)+'\n')
if __name__=='__main__': main()
