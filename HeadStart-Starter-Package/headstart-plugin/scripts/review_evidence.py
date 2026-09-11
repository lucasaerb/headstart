#!/usr/bin/env python3
"""Read-only local BenchmarkRun raw-evidence/profile check; never a trust or performance attestation."""
from __future__ import annotations
import argparse
import hashlib
import json
import math
from pathlib import Path
import re
import statistics

PROFILE = ('workload','device','os','engine_version','browser_version','resolution','settings','warmup','sampling_method')
MAX_BYTES = 2_000_000


def read_json(path):
    with Path(path).open('rb') as handle:
        raw=handle.read(MAX_BYTES+1)
    if len(raw)>MAX_BYTES:raise ValueError('Evidence exceeds the 2MB limit.')
    return json.loads(raw,parse_constant=lambda value: (_ for _ in ()).throw(ValueError('Nonfinite JSON value'))),raw


def validate(record, root):
    if not isinstance(record,dict) or record.get('schema_version')!='0.2' or record.get('entity_type')!='benchmark_run':
        raise ValueError('Expected the canonical v0.2 benchmark_run envelope.')
    data=record.get('data')
    if not isinstance(data,dict):raise ValueError('Missing benchmark data.')
    for key in ('source_commit','target_commit'):
        if not isinstance(data.get(key),str) or not re.fullmatch('[a-f0-9]{40}',data[key]):raise ValueError('Pin source and target commits.')
    if any(key not in data for key in PROFILE):raise ValueError('Missing complete measurement profile.')
    if any(not isinstance(data[key],str) or not data[key] for key in PROFILE if key not in ('browser_version','resolution')):raise ValueError('Invalid measurement profile.')
    resolution=data['resolution']
    if not isinstance(resolution,dict) or set(resolution)!={'width','height'} or any(type(v) is not int or v<=0 for v in resolution.values()):raise ValueError('Invalid resolution.')
    if data['browser_version'] is not None and not isinstance(data['browser_version'],str):raise ValueError('Invalid browser version.')
    evidence=data.get('raw_results')
    if not isinstance(evidence,dict) or evidence.get('claim_type')!='measured' or evidence.get('origin')!='executed_test':raise ValueError('Unmeasured evidence cannot establish a BenchmarkRun.')
    if evidence.get('source_commit')!=data['source_commit']:raise ValueError('Stale source evidence.')
    relative=evidence.get('path')
    if not isinstance(relative,str) or not relative or re.search(r'[\\:%\x00-\x1f]',relative) or Path(relative).is_absolute() or '..' in Path(relative).parts:raise ValueError('Raw evidence must be a safe relative path.')
    root=Path(root).resolve();path=root/relative
    if any(parent.is_symlink() for parent in [path,*path.parents] if parent!=root and root in parent.parents):raise ValueError('Raw evidence cannot traverse symlinks.')
    if not path.is_file() or not path.resolve().is_relative_to(root):raise ValueError('Raw evidence is missing or outside the selected root.')
    raw,content=read_json(path)
    if hashlib.sha256(content).hexdigest()!=evidence.get('digest'):raise ValueError('Raw evidence digest mismatch.')
    if not isinstance(raw,dict) or raw.get('version')!=1 or type(raw.get('version')) is not int or raw.get('source_commit')!=data['source_commit'] or raw.get('target_commit')!=data['target_commit']:raise ValueError('Raw evidence has stale or unsupported state.')
    profile={key:data[key] for key in PROFILE}
    if json.dumps(raw.get('profile'),sort_keys=True)!=json.dumps(profile,sort_keys=True):raise ValueError('Raw evidence profile mismatch.')
    measurements=data.get('measurements');metrics=raw.get('metrics')
    if not isinstance(measurements,list) or not measurements or not isinstance(metrics,list) or len(metrics)!=len(measurements):raise ValueError('Actual samples and declared measurements are required.')
    seen=set()
    for measured, samples in zip(measurements,metrics):
        if not isinstance(measured,dict) or not isinstance(samples,dict):raise ValueError('Invalid measurement entry.')
        key=(measured.get('metric'),measured.get('unit'))
        if not all(isinstance(v,str) and v for v in key) or key in seen or key!=(samples.get('metric'),samples.get('unit')):raise ValueError('Measurement metric/unit mismatch or duplicate.')
        seen.add(key);values=samples.get('samples')
        if not isinstance(values,list) or not values or len(values)>100000 or any(type(v) not in (int,float) or not math.isfinite(v) or v<0 for v in values):raise ValueError('Missing or invalid actual raw samples.')
        value=measured.get('value')
        if type(value) not in (int,float) or not math.isfinite(value) or not math.isclose(value,statistics.mean(values),rel_tol=1e-9,abs_tol=1e-12):raise ValueError('Declared mean is not supported by raw samples.')
    return profile


def compare(left,right,root,expected_before=None,expected_after=None):
    a=validate(left,root);b=validate(right,root)
    if a!=b:raise ValueError('Incompatible benchmark profiles; run the same workload and environment.')
    if left['data']['source_commit']!=right['data']['source_commit']:raise ValueError('Source revision mismatch.')
    if expected_before is not None and left['data']['target_commit']!=expected_before:raise ValueError('Unexpected baseline target revision.')
    if expected_after is not None and right['data']['target_commit']!=expected_after:raise ValueError('Unexpected changed target revision.')
    if [(x['metric'],x['unit']) for x in left['data']['measurements']] != [(x['metric'],x['unit']) for x in right['data']['measurements']]:raise ValueError('Compared metrics differ.')
    return {'compatible':True,'trust':'Raw evidence matches; independent execution/review is still required.'}


def main():
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('record');p.add_argument('--root',required=True);p.add_argument('--compare');p.add_argument('--before');p.add_argument('--after');a=p.parse_args()
    try:
        record,_=read_json(a.record)
        result=compare(record,read_json(a.compare)[0],a.root,a.before,a.after) if a.compare else {'compatible':bool(validate(record,a.root)),'trust':'Evidence bytes/profile match; this does not establish trusted authorship.'}
        print(json.dumps(result))
    except (OSError,ValueError,TypeError,KeyError) as e:p.exit(1,'Review evidence rejected: '+str(e)+'\n')

if __name__=='__main__':main()
