"""Explainable hybrid ranking, called only after hard eligibility/filter checks."""
import hashlib
import json
import math
import os
import re
from functools import lru_cache
from pathlib import Path
from . import model

ALIASES=json.loads(Path(__file__).with_name('aliases.json').read_text())
RANK_VERSION='headstart-rrf-1'
TEXT_VERSION='public-metadata-2'
COSINE_MINIMUM=0.25

def digest(value):return hashlib.sha256(json.dumps(value,sort_keys=True,separators=(',',':')).encode()).hexdigest()

def interpret(query,enabled=True):
    result={'version':ALIASES['version'],'originalQuery':query,'capabilities':[],'style':[],'compatibility':'Only explicit filters constrain compatibility; semantic similarity never establishes tested support.','editable':True}
    if enabled:
        text=query.casefold()
        for group,target in [('capabilities','capabilities'),('styles','style')]:
            for canonical,alternatives in ALIASES[group].items():
                if any(re.search(r'(?<!\w)'+re.escape(term.casefold())+r'(?!\w)',text) for term in [canonical,*alternatives]):result[target].append(canonical)
    return result

def context(mode='hybrid'):
    reason=model.availability() if mode=='hybrid' else 'lexical_requested'
    return {'version':RANK_VERSION,'mode':'hybrid' if reason is None else 'lexical','modelVersion':model.MODEL_VERSION if reason is None else None,'fallbackReason':reason,'textVersion':TEXT_VERSION,'interpretationVersion':ALIASES['version'],'threshold':COSINE_MINIMUM,'weights':{'lexical':0.65,'semantic':0.35,'rrfK':20},'configurationDigest':digest(ALIASES)}

def document_text(row,research=False):
    # Explicit allowlist excludes raw source, license bodies, private paths and captures.
    data=row.get('data',{});scope=data.get('scope',{})
    parts=[row.get('title',''),*row.get('aliases',[]),row.get('summary',''),*row.get('capabilities',[])]
    if research:parts += [str(b.get('name',''))+' '+str(b.get('notes','')) for b in row.get('buildingBlocks',[])]
    else:parts += [Path(path).stem for path in scope.get('required_files',[]) if path.endswith(('.js','.ts','.tsx'))]+scope.get('coupling_notes',[])[:2]
    return ' '.join(str(value) for value in parts)[:12000]

def cache_dir():return Path(os.environ.get('HEADSTART_EMBEDDING_CACHE',model.ROOT/'.cache/retrieval/vectors'))

def vectors(texts):
    root=cache_dir(); result=[None]*len(texts);missing=[]
    for i,text in enumerate(texts):
        identity=digest({'model':model.MODEL_VERSION,'textVersion':TEXT_VERSION,'text':text})
        path=root/(identity+'.json')
        try:
            if path.exists():
                payload=json.loads(path.read_text());vector=payload['vector']
                if payload['version']!=identity or payload['model']!=model.MODEL_VERSION or payload['digest']!=digest(vector) or len(vector)!=384 or any(type(v) not in [int,float] or not math.isfinite(v) for v in vector):raise ValueError()
                result[i]=vector
            else:missing.append((i,text,path,identity))
        except (OSError,ValueError,KeyError,TypeError):raise model.Unavailable('embedding_version_mismatch')
    if missing:
        computed=model.encode([entry[1] for entry in missing])
        for (i,text,path,identity),vector in zip(missing,computed):
            result[i]=vector
            try:
                root.mkdir(parents=True,exist_ok=True)
                temporary=path.with_suffix('.'+str(os.getpid())+'.tmp')
                temporary.write_text(json.dumps({'version':identity,'model':model.MODEL_VERSION,'digest':digest(vector),'vector':vector}))
                temporary.replace(path)
            except OSError:pass # Read-only cache still permits correct in-memory inference.
    return result

def rank(candidates,query,text_score,research=False,mode='hybrid',expand=True):
    settings=context(mode); intent=interpret(query,expand);settings['interpretation']=intent
    lexical=[]
    for row in candidates:
        score,reasons=text_score(row,query,research)
        if score is not None:lexical.append((score,row,reasons))
    lexical.sort(key=lambda x:(-x[0],x[1]['id'],x[1].get('versionId','')))
    if not query or settings['mode']=='lexical':return lexical,settings
    # Exact identity/source-path and typo recovery remain precise lookup operations.
    if any(score>=85 or any('trigrams' in reason for reason in reasons) for score,row,reasons in lexical) or '/' in query:
        settings['lookup']='exact_or_source_lookup'
        return lexical,settings
    try:
        import numpy as np
        texts=[document_text(row,research) for row in candidates]
        if not texts:return [],settings
        embeddings=np.array(vectors(texts))
        # The original sentence is retained; recognized aliases add editable hints.
        expanded=query+(' '+ ' '.join(intent['capabilities']+intent['style']) if expand else '')
        vector=np.array(model.encode([expanded])[0]);cosines=embeddings@vector
        semantic=sorted([(float(score),row) for score,row in zip(cosines,candidates) if float(score)>=COSINE_MINIMUM],key=lambda x:(-x[0],x[1]['id'],x[1].get('versionId','')))
        identity=lambda row:(row['id'],row.get('versionId',''))
        fused={}
        for position,(score,row,reasons) in enumerate(lexical):
            fused[identity(row)]=[0.65/(20+position+1)+(1 if score>=85 else 0),row,list(reasons)]
        for position,(cosine,row) in enumerate(semantic):
            slot=fused.setdefault(identity(row),[0,row,[]]);slot[0]+=0.35/(20+position+1)
            slot[2].append('Semantic metadata similarity; capability fit needs inspection')
        ranked=sorted(fused.values(),key=lambda x:(-x[0],x[1]['id'],x[1].get('versionId','')))
        # First pass gives each parent two places; remaining results remain reachable.
        primary=[];tail=[];counts={}
        for item in ranked:
            group=item[1].get('projectId',item[1].get('repoUrl',item[1]['id']))
            count=counts.get(group,0);counts[group]=count+1
            (primary if count<2 else tail).append(tuple(item))
        settings['embeddingIndexVersion']=digest({'model':model.MODEL_VERSION,'texts':texts,'textVersion':TEXT_VERSION})
        return primary+tail,settings
    except (model.Unavailable,ImportError) as error:
        settings.update(mode='lexical',modelVersion=None,fallbackReason=str(error) if isinstance(error,model.Unavailable) else 'optional_model_dependencies_missing')
        return lexical,settings
