"""Inactive recipe planning rules. Public metadata only; no source delivery or target writes."""
import hashlib
import json
from pathlib import Path
from services.handoff.service import FIELDS
ROOT=Path(__file__).resolve().parents[2]
CATALOG=Path(__file__).with_name('recipe-candidates.json')


def canonical(value):return json.dumps(value,sort_keys=True,separators=(',',':'))

def load_templates():
    value=json.loads(CATALOG.read_text())
    if value.get('schemaVersion')!='headstart-recipe-template-catalog-1':raise ValueError('Unsupported recipe template catalog')
    rows=value.get('templates')
    if not isinstance(rows,list) or len(rows)!=3:raise ValueError('Expected three pinned planning templates')
    source_map=(ROOT/'services/curation/reviewed-source-maps.json').read_bytes()
    source_hash=hashlib.sha256(source_map).hexdigest()
    sources={r['id']:r for r in json.loads(source_map)['capabilities']}
    seen=set()
    for row in rows:
        if row['id'] in seen:raise ValueError('Duplicate recipe template')
        seen.add(row['id'])
        expected=hashlib.sha256(canonical({k:v for k,v in row.items() if k!='digest'}).encode()).hexdigest()
        if row['digest']!=expected or row['sourceMapDigest']!=source_hash:raise ValueError('Stale recipe source-map or content digest')
        if row['status']!='candidate' or any(row[k] is not None for k in ('targetBinding','combinationValidation','performance')):raise ValueError('An unbound template cannot claim validation or measured performance')
        for part in row['components']:
            source=sources.get(part['id'])
            if not source or part['version']!='1' or part['sourceCommit']!=source['revision'] or part['sourceFiles']!=source['files'] or part['requiredFiles']!=source['required_files']:raise ValueError('Template source scope drift')
            for evidence in part['sourceFiles']:
                path=ROOT/'services/curation/fixtures/threejs'/evidence['path']
                if hashlib.sha256(path.read_bytes()).hexdigest()!=evidence['digest']:raise ValueError('Template source bytes changed')
    return rows


def recommend(brief, documents, query='', constraints=None):
    """Explain eligible planning choices. Not exposed by HTTP until dependency acceptance."""
    if not isinstance(brief,dict) or set(brief)!={'revision','constraints'} or type(brief['revision']) is not int or not 0<=brief['revision']<=2**53-1 or not isinstance(brief['constraints'],dict) or not set(brief['constraints'])<=FIELDS:raise ValueError('Invalid versioned brief')
    if not isinstance(query,str) or len(query)>200:raise ValueError('Invalid query')
    for value in brief['constraints'].values():
        if not isinstance(value,dict) or set(value)!={'value','origin'} or not isinstance(value['value'],str) or len(value['value'])>4000 or value['origin'] not in ('explicit','inferred'):raise ValueError('Invalid brief constraint')
    constraints={} if constraints is None else constraints
    if not isinstance(constraints,dict) or not set(constraints)<=set(['runtime','runtimeVersion','platform','rights','readiness']):raise ValueError('Unsupported hard constraint')
    if any(not isinstance(v,str) or not v for v in constraints.values()):raise ValueError('Invalid hard constraint')
    # Explicit target runtime/platform/version constraints always precede preference ranking.
    hard={k:v['value'] for k,v in brief['constraints'].items() if k in ('runtime','runtimeVersion','platform') and v['origin']=='explicit' and v['value']}
    for key,value in constraints.items():
        if key in hard and hard[key].casefold()!=value.casefold():raise ValueError('Conflicting explicit constraints; edit them rather than silently dropping one')
        hard[key]=value
    by={(r['id'],r['version']):r for r in documents if r.get('type')=='component'}
    templates=load_templates();eligible=[];excluded=[]
    text=' '.join([query,*[c['value'] for c in brief['constraints'].values()]]).casefold()
    for row in templates:
        reason=None
        for key in ('runtime','runtimeVersion','platform'):
            if key in hard and hard[key].casefold()!=row['brief'][key].casefold():reason='Explicit '+key+' does not match this planning template'
        if hard.get('readiness') not in (None,'candidate'):reason='The assembled recipe is only a planning candidate; component readiness does not establish composition readiness'
        if hard.get('rights') not in (None,'MIT','scope_cleared'):reason='Selected source rights do not match the explicit constraint'
        for part in row['components']:
            doc=by.get((part['id'],part['version']))
            if not doc or doc.get('data',{}).get('source_commit')!=part['sourceCommit']:
                reason='A pinned component version is no longer eligible in the current catalog';continue
            rights=doc['data'].get('rights',{})
            if rights.get('status')!='scope_cleared' or not set(part['requiredFiles'])<=set(rights.get('scope',[])):
                reason='Selected source scope rights need review'
        if reason:excluded.append({'id':row['id'],'reason':reason});continue
        matches=[tag for tag in row['tags'] if tag in text]
        score=len(matches)
        camera=brief['constraints'].get('camera',{}).get('value','').casefold()
        if camera==row['brief']['camera']:score+=3
        reasons=[{'type':'inspected','text':row['reason'],'components':[p['id'] for p in row['components']]},
                 {'type':'editorial','text':'Visual proposal: '+row['settings']['geometry']},
                 {'type':'brief_match' if matches or camera==row['brief']['camera'] else 'assumption','text':('Your brief mentions '+', '.join(matches)+'.') if matches else ('Matches the requested '+camera+' camera.') if camera==row['brief']['camera'] else 'A candidate alternative; the brief has not established a closer match.'}]
        eligible.append({'template':row,'reasons':reasons,'matchedTerms':matches,'score':score})
    eligible.sort(key=lambda value:(-value['score'],value['template']['id']))
    permitted={v['template']['id'] for v in eligible}
    for result in eligible:
        preferred=result['template']['alternative']
        result['alternative']=preferred if preferred in permitted else next((r['template']['id'] for r in eligible if r!=result),None)
        result.pop('score') # Transparent reasons, never an opaque public quality score.
    return {'schemaVersion':'headstart-recommendation-plan-1','briefRevision':brief['revision'],'briefDigest':hashlib.sha256(canonical(brief).encode()).hexdigest(),'hardConstraints':hard,'items':eligible,'excluded':excluded,'unknowns':['Composition performance is unmeasured.','A planning template is not a bound or tested integration recipe.','Target dependencies, ownership and caller assets need inspection.'],'emptyAction':None if eligible else 'No recipe meets all explicit constraints. Edit a constraint or browse components; no filter was relaxed.'}


def handoff_context(brief, documents, template_ref, selections=None):
    """Recompute persisted rationale from the immutable brief, never trust client prose."""
    from .context import validate, digest
    if not isinstance(template_ref,dict) or set(template_ref)!={'id','version','digest'}:
        raise ValueError('Select an exact recipe template')
    result=recommend(brief,documents)
    row=next((r for r in result['items'] if {k:r['template'][k] for k in ('id','version','digest')}==template_ref),None)
    if row is None:raise ValueError('Recipe is stale or no longer eligible for this brief')
    recipe=row['template']
    if selections is not None:
        available={(p['versionId'],p['version']) for p in recipe['components']}
        if not selections or any((p['id'],p['version']) not in available for p in selections):
            raise ValueError('Selected source scope does not belong to this recipe')
    value={'schemaVersion':'headstart-recommendation-context-1','template':template_ref,
           'recommendationVersion':result['schemaVersion'],'briefRevision':brief['revision'],
           'briefDigest':digest(brief),'reasons':row['reasons'],'tradeoffs':[recipe['tradeoff']],
           'compositionStatus':'candidate','combinationValidation':None}
    return validate(value,brief)


def current_documents(store):
    """Recommendation eligibility includes current scope freezes, without hiding public metadata."""
    from services.catalog.search import public_documents
    from services.submissions.store import assert_export_allowed
    records={(r['id'],r['version']):r for r in store.records()}
    output=[]
    for doc in public_documents(store):
        record=records.get((doc['versionId'],doc['version']))
        if record is None:continue
        scope=[record]
        parent=record['data'].get('project_version')
        if parent:
            row=records.get((parent['id'],parent['version']))
            if row is None:continue
            scope.append(row)
        try:assert_export_allowed(store,scope)
        except ValueError:continue
        output.append(doc)
    return output
