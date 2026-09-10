"""Bounded lexical retrieval. No embeddings, source delivery or target writes."""
import base64
import hashlib
import hmac
import json
import re
from .store import encode

API_VERSION = 'headstart-catalog-api-1'
READINESS = ['suggested', 'source_reviewed', 'isolated', 'integration_tested']

class ApiError(ValueError):
    def __init__(self, code, message, status=400, action='Correct the query and retry.'):
        super().__init__(message)
        self.status=status
        self.body={'error':{'code':code,'message':message,'retriable':status==503,'action':action}}

def fingerprint(value):
    return hashlib.sha256(encode(value).encode()).hexdigest()

def public_documents(store):
    # Only eligible records enter the index. Parent identities enrich those records;
    # unpublished envelopes are never returned as a shortcut to detail lookup.
    live=store.records(False)
    parents={(r['entity_type'],r['id']):r for r in live}
    result=[]
    for record in store.records():
        data=record['data']
        if data.get('visibility','public')!='public' or data.get('rights',{}).get('status')!='scope_cleared': continue
        if record['entity_type']=='component_version':
            identity=parents.get(('component',data['component_id']))
            if not identity or data['readiness'] not in READINESS[1:]: continue
            project=parents.get(('project',identity['data']['project_id']))
            kind='component'; name=identity['data']['name']; group=identity['data']['project_id']
        else:
            project=parents.get(('project',data['project_id'])); identity=project
            kind='project'; name=project['data']['title'] if project else ''; group=data['project_id']
        if not project or project['data'].get('visibility','public')!='public' or identity['data'].get('visibility','public')!='public': continue
        # Verify evidence bytes at read time too: corrupted/missing backing evidence
        # cannot remain in the eligible index after an earlier successful insertion.
        try:
            for evidence in data.get('evidence',[])+data['rights'].get('evidence',[]): store.get_blob(evidence['digest'])
        except (ValueError,OSError): continue
        result.append({'id':identity['id'],'versionId':record['id'],'version':record['version'],'type':kind,'projectId':group,'title':name,'repositoryUrl':project['data']['repository_url'],'aliases':identity['data'].get('aliases',[]),'readiness':data.get('readiness','source_reviewed'),'data':data})
    return result

def models(row):
    ai=row.get('aiProvenance',{})
    return ai.get('models',[]) if ai.get('status')=='creator_attributed' else []

def values(row,key,research=False):
    if research:
        mapping={'genre':row.get('genres',[]),'capability':row.get('capabilities',[]),'runtime':[row.get('runtime')],'style':[row.get('dimension')],'kind':[row.get('contentKind')],
                 'platform':(['browser'] if row.get('platformKind')=='browser' else [])+(['native'] if row.get('platformKind')=='desktop' else []),'model':models(row) or ['unknown']}
        return [v for v in mapping.get(key,[]) if v is not None]
    data=row['data']; compat=data.get('compatibility',[])
    mapping={'runtime':[c.get('runtime') for c in compat],'runtime_version':[c.get('version_range') for c in compat if c.get('support')=='tested'],
             'platform':data.get('platforms',[]),'rights':[data['rights']['status'],data['rights']['code_spdx']],'readiness':[row['readiness']],
             'type':[row['type']]}
    return [v for v in mapping.get(key,[]) if v is not None]

def query_options(pairs,documents,research=False):
    facets=['genre','capability','runtime','style','platform','kind','model'] if research else ['runtime','runtime_version','platform','rights','readiness','type']
    allowed=set(facets+['q','cursor','limit']+(['sort','ids'] if research else []))
    query={}; seen=set()
    for key,value in pairs:
        if key not in allowed or key in seen: raise ApiError('INVALID_QUERY','Unknown or duplicate query field: '+key)
        seen.add(key)
        if len(value)>4096: raise ApiError('INVALID_QUERY','Query field is too long.')
        if value: query[key]=value
    if len(query.get('q',''))>200: raise ApiError('INVALID_QUERY','Search text must be at most 200 characters.')
    raw_limit=query.get('limit','24')
    if not re.fullmatch('[0-9]{1,3}',raw_limit) or not 1<=int(raw_limit)<=100: raise ApiError('INVALID_QUERY','Limit must be between 1 and 100.')
    query['limit']=int(raw_limit)
    if query.get('runtime_version') and not query.get('runtime'): raise ApiError('UNSUPPORTED_COMBINATION','A runtime version requires its runtime.',422)
    if research and query.get('sort','recommended') not in ['recommended','stars']: raise ApiError('INVALID_QUERY','Unknown sort order.')
    if 'ids' in query:
        ids=query['ids'].split(',')
        if len(ids)>3 or any(not re.fullmatch('[A-Za-z0-9_.-]{1,120}',id) for id in ids): raise ApiError('INVALID_QUERY','Request up to three selected project IDs.')
        if set(query)-{'ids','limit'}: raise ApiError('UNSUPPORTED_COMBINATION','Selected IDs cannot be combined with filters or pagination.',422)
    options={key:sorted({v for row in documents for v in values(row,key,research)}) for key in facets}
    # Standard facets remain valid even when no currently eligible record supports them.
    if not research:
        options['readiness']=READINESS
        options['platform']=sorted(set(options['platform']+['browser','desktop','mobile','web']))
        options['rights']=sorted(set(options['rights']+['scope_cleared','MIT','Apache-2.0','GPL-3.0-only']))
        options['runtime']=sorted(set(options['runtime']+['JavaScript','Three.js','React Three Fiber','Phaser','Godot','Unity']))
        options['type']=['project','component']
    for key in facets:
        if key=='runtime_version':
            if key in query and not re.fullmatch('[A-Za-z0-9.*^~+<>=| -]{1,80}',query[key]): raise ApiError('INVALID_QUERY','Malformed runtime version.')
        elif key in query and query[key] not in options[key]: raise ApiError('INVALID_FACET','Unknown '+key+' value.')
    return query,options,facets

def text_score(row,q,research=False):
    if not q: return 0,['Browse research references' if research else 'Eligible scoped metadata']
    title=row['title'].casefold(); aliases=[v.casefold() for v in row.get('aliases',[])]
    repo=row.get('repoUrl',row.get('repositoryUrl','')).casefold()
    paths=[] if research else row['data'].get('scope',{}).get('required_files',[])
    blocks=[str(block.get('name',''))+' '+str(block.get('notes','')) for block in row.get('buildingBlocks',[])]
    text=' '.join([title,repo,*aliases,*paths,row.get('summary',''),*row.get('capabilities',[]),*blocks]).casefold()
    q=q.casefold().strip()
    if q==title: return 100,['Exact title']
    if q in aliases: return 90,['Exact alias']
    if q==repo or q==repo.removesuffix('/').split('/')[-1]: return 85,['Exact repository']
    if all(token in text for token in q.split()): return 50,['Lexical title, repository or source-path match']
    # A conservative title-only trigram fallback handles minor misspellings.
    # It is lexical similarity, not a semantic or compatibility recommendation.
    if len(q)>=5:
        trigrams=lambda value:{value[i:i+3] for i in range(len(value)-2)}
        left,right=trigrams(q),trigrams(title)
        similarity=len(left & right)/len(left | right) if left | right else 0
        if similarity>=0.45:return round(20*similarity),['Approximate title match (character trigrams)']
    return None,[]

def search(documents,pairs,secret,research=False):
    query,facets,keys=query_options(pairs,documents,research)
    version=fingerprint({'schema':API_VERSION,'documents':documents})
    normalized={k:v for k,v in query.items() if k!='cursor'}
    key=fingerprint({'query':normalized,'index':version,'schema':API_VERSION,'research':research})
    offset=0
    if query.get('cursor'):
        try:
            token,signature=query['cursor'].split('.')
            expected=hmac.new(secret,token.encode(),'sha256').hexdigest()
            if not hmac.compare_digest(signature,expected): raise ValueError()
            state=json.loads(base64.urlsafe_b64decode(token+'='*(-len(token)%4)))
            if state['index']!=version: raise ApiError('STALE_CURSOR','The catalog changed. Restart this search.',409,'Clear the cursor and reload results.')
            if state['key']!=key or type(state['offset']) is not int or state['offset']<0: raise ValueError()
            offset=state['offset']
        except ApiError: raise
        except (ValueError,KeyError,TypeError): raise ApiError('INVALID_CURSOR','Cursor is invalid or belongs to another query.')
    ranked=[]
    for row in documents:
        if not research and query.get('runtime_version'):
            # Runtime and tested version are one compatibility assertion. Never
            # combine a runtime from one row with another runtime's tested version.
            if not any(compat.get('runtime')==query['runtime']
                       and compat.get('version_range')==query['runtime_version']
                       and compat.get('support')=='tested'
                       for compat in row['data'].get('compatibility',[])):
                continue
        if any(query.get(facet) and query[facet] not in values(row,facet,research) for facet in keys): continue
        if query.get('ids') and row['id'] not in query['ids'].split(','): continue
        score,reasons=text_score(row,query.get('q',''),research)
        if score is None: continue
        ranked.append((score,row,reasons))
    if research and query.get('sort')=='stars':
        ranked.sort(key=lambda item:(-(item[1].get('githubStars') if type(item[1].get('githubStars')) is int else -1),item[1]['id']))
    else: ranked.sort(key=lambda item:(-item[0],item[1]['id'],item[1].get('version',''),item[1].get('versionId','')))
    page=ranked[offset:offset+query['limit']]
    items=[dict(row,matchReasons=reasons,**({'eligibility':'research_only'} if research else {})) for _,row,reasons in page]
    next_cursor=None
    if offset+len(items)<len(ranked):
        token=base64.urlsafe_b64encode(encode({'offset':offset+len(items),'index':version,'key':key}).encode()).decode().rstrip('=')
        next_cursor=token+'.'+hmac.new(secret,token.encode(),'sha256').hexdigest()
    return {'schemaVersion':'headstart-research-api-1' if research else API_VERSION,'indexVersion':version,'cacheKey':key,'items':items,'total':len(ranked),'nextCursor':next_cursor,'appliedFilters':normalized,'facets':facets,**({'eligibility':'research_only'} if research else {'groups':sorted({r['projectId'] for r in items})})}
