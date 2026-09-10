"""Frozen judgments evaluator; no label mutation or threshold tuning."""
import argparse
import hashlib
import json
import math
import statistics
import time
from collections import Counter
from pathlib import Path
from services.catalog.search import search

ROOT=Path(__file__).parent

def load_frozen():
    freeze=json.loads((ROOT/'freeze.json').read_text())
    for name,digest in freeze['digests'].items():
        if hashlib.sha256((ROOT/name).read_bytes()).hexdigest()!=digest:raise ValueError('Frozen artifact changed: '+name)
    corpus=json.loads((ROOT/'corpus.json').read_text())['documents']
    queries=json.loads((ROOT/'queries.json').read_text())['queries']
    ids={row['id'] for row in corpus}
    if len(ids)!=len(corpus) or len(queries)!=100:raise ValueError('Duplicate identities or query count changed')
    for query in queries:
        if not set(query['relevance']).issubset(ids):raise ValueError('Unknown relevance identity')
        if any(type(g) is not int or not 0<=g<=3 for g in query['relevance'].values()):raise ValueError('Invalid grade')
    return freeze,corpus,queries

def metrics(ids,relevance):
    # Duplicate IDs do not receive repeated gain or inflate recall.
    seen=set();gains=[]
    for id in ids[:10]:
        grade=relevance.get(id,0) if id not in seen else 0
        gains.append(2**grade-1);seen.add(id)
    ideal=sorted((2**g-1 for g in relevance.values() if g>0),reverse=True)[:10]
    dcg=sum(g/math.log2(i+2) for i,g in enumerate(gains))
    idcg=sum(g/math.log2(i+2) for i,g in enumerate(ideal))
    relevant={id for id,grade in relevance.items() if grade>0}
    return {'ndcgAt10':dcg/idcg if idcg else None,'recallAt20':len(set(ids[:20])&relevant)/len(relevant) if relevant else None}

def violates(row,filters):
    # Independently assert filter semantics against frozen metadata, not the
    # implementation's facet helpers or returned model assertions.
    data=row['data']; compat=data.get('compatibility',[])
    if filters.get('type') and row['type']!=filters['type']:return True
    if filters.get('readiness') and row['readiness']!=filters['readiness']:return True
    if filters.get('rights') and filters['rights'] not in [data['rights']['status'],data['rights']['code_spdx']]:return True
    if filters.get('platform') and filters['platform'] not in data.get('platforms',[]):return True
    if filters.get('runtime_version'):
        if not any(c.get('runtime')==filters.get('runtime') and c.get('version_range')==filters['runtime_version'] and c.get('support')=='tested' for c in compat):return True
    elif filters.get('runtime') and not any(c.get('runtime')==filters['runtime'] for c in compat):return True
    return False

def evaluate(split='tuning',mode='lexical'):
    freeze,corpus,all_queries=load_frozen();byid={r['id']:r for r in corpus}
    queries=[q for q in all_queries if q['split']==split];rows=[]
    for query in queries:
        pairs=[('q',query['q']),('limit','20'),*query['filters'].items()]
        begin=time.perf_counter()
        response=search(corpus,pairs,b'evaluation-only-cursor-key-32bytes!',retrieval_mode=mode)
        elapsed=(time.perf_counter()-begin)*1000
        ids=[r['id'] for r in response['items']]
        violations=sum(id not in byid or violates(byid[id],query['filters']) for id in ids)
        rows.append({'id':query['id'],'category':query['category'],'returnedIds':ids,'metrics':metrics(ids,query['relevance']),'hardFilterViolations':violations,'duplicateResults':len(ids)-len(set(ids)),'latencyMs':round(elapsed,3),'retrieval':response.get('retrieval',{}),'indexVersion':response.get('indexVersion')})
    answerable=[row for row in rows if row['metrics']['ndcgAt10'] is not None]
    negative=[row for row in rows if row['metrics']['ndcgAt10'] is None]
    mean=lambda key:statistics.mean(row['metrics'][key] for row in answerable) if answerable else None
    timings=sorted(row['latencyMs'] for row in rows)
    summary={'queries':len(rows),'answerable':len(answerable),'noAnswer':len(negative),'ndcgAt10':mean('ndcgAt10'),'recallAt20':mean('recallAt20'),'hardFilterViolations':sum(row['hardFilterViolations'] for row in rows),'duplicateResults':sum(row['duplicateResults'] for row in rows),'noAnswerQueriesReturningResults':sum(bool(row['returnedIds']) for row in negative),'medianLatencyMs':statistics.median(timings),'p95LatencyMs':timings[math.ceil(.95*len(timings))-1],'actualModes':dict(Counter(row['retrieval'].get('mode','not_reported') for row in rows))}
    summary['targetsMet']={'ndcgAt10':summary['ndcgAt10']>=.75,'recallAt20':summary['recallAt20']>=.90,'hardFilterViolations':summary['hardFilterViolations']==0}
    return {'schemaVersion':'headstart-evaluation-result-1','requestedMode':mode,'split':split,'frozenDigests':freeze['digests'],'summary':summary,'queries':rows}

if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--split',choices=['tuning','heldout'],default='tuning');parser.add_argument('--mode',choices=['lexical','hybrid'],default='lexical');parser.add_argument('--output',required=True);args=parser.parse_args()
    result=evaluate(args.split,args.mode);path=Path(args.output);path.parent.mkdir(parents=True,exist_ok=True)
    with path.open('x') as file:json.dump(result,file,indent=2);file.write('\n')
    print(json.dumps(result['summary'],indent=2))
