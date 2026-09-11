"""Versioned informational recommendation context; never an executable recipe."""
import hashlib
import json
import re


def digest(value):
    return hashlib.sha256(json.dumps(value,sort_keys=True,separators=(',',':'),ensure_ascii=False).encode()).hexdigest()


def validate(value, brief):
    if not isinstance(brief,dict):
        raise ValueError('A versioned brief is required')
    fields={'schemaVersion','template','recommendationVersion','briefRevision','briefDigest','reasons','tradeoffs','compositionStatus','combinationValidation'}
    if not isinstance(value,dict) or set(value)!=fields or value['schemaVersion']!='headstart-recommendation-context-1' or value['recommendationVersion']!='headstart-recommendation-plan-1':
        raise ValueError('Unsupported recommendation context')
    if value['compositionStatus']!='candidate' or value['combinationValidation'] is not None:
        raise ValueError('An informational composition cannot claim validation')
    if type(value['briefRevision']) is not int or not 0<=value['briefRevision']<=2**53-1 or value['briefRevision']!=brief.get('revision') or value['briefDigest']!=digest(brief):
        raise ValueError('Recommendation brief is stale')
    template=value['template']
    if not isinstance(template,dict) or set(template)!={'id','version','digest'} or any(not isinstance(template[k],str) or not re.fullmatch('[A-Za-z0-9_.-]{1,120}',template[k]) for k in ('id','version')) or not isinstance(template['digest'],str) or not re.fullmatch('[a-f0-9]{64}',template['digest']):
        raise ValueError('Invalid template reference')
    reasons=value['reasons']
    if not isinstance(reasons,list) or not 2<=len(reasons)<=3:
        raise ValueError('Two or three concise reasons are required')
    for reason in reasons:
        if not isinstance(reason,dict) or set(reason) not in ({'type','text'},{'type','text','components'}) or reason['type'] not in ('inspected','editorial','brief_match','assumption') or not isinstance(reason['text'],str) or not 1<=len(reason['text'])<=1000:
            raise ValueError('Invalid explained reason')
        refs=reason.get('components',[])
        if not isinstance(refs,list) or len(refs)>6 or any(not isinstance(r,str) or not re.fullmatch('[A-Za-z0-9_.-]{1,120}',r) for r in refs):
            raise ValueError('Invalid component explanation reference')
    tradeoffs=value['tradeoffs']
    if not isinstance(tradeoffs,list) or not 1<=len(tradeoffs)<=8 or any(not isinstance(t,str) or not 1<=len(t)<=1000 for t in tradeoffs):
        raise ValueError('Bounded tradeoffs are required')
    return value
