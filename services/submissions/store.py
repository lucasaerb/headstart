"""Private append-only review queue. Submitted repositories are never executed or fetched."""
import hashlib
import json
import os
import re
import secrets
from datetime import datetime, timezone
from urllib.parse import urlsplit


def setup(db):
    db.executescript('''
    CREATE TABLE IF NOT EXISTS submission_events(id TEXT NOT NULL, revision INTEGER NOT NULL, payload TEXT NOT NULL, PRIMARY KEY(id,revision));
    CREATE TRIGGER IF NOT EXISTS submission_no_update BEFORE UPDATE ON submission_events BEGIN SELECT RAISE(ABORT,'Review history is immutable'); END;
    CREATE TRIGGER IF NOT EXISTS submission_no_delete BEFORE DELETE ON submission_events BEGIN SELECT RAISE(ABORT,'Review history is immutable'); END;
    ''')
    db.commit()


def bounded(value, maximum, required=True):
    if not isinstance(value,str) or len(value)>maximum or (required and not value.strip()) or any(ord(c)<32 and c not in '\n\t' for c in value):
        raise ValueError('Invalid or oversized text')
    return value.strip()


def safe_url(value, repository=False):
    value=bounded(value,2048)
    p=urlsplit(value)
    if p.scheme!='https' or p.username or p.password or p.port not in (None,443) or not p.hostname or p.fragment or p.query:
        raise ValueError('Use a public HTTPS URL without credentials, query or fragment')
    host=p.hostname.lower()
    if host in ('localhost','localhost.localdomain') or '.' not in host or re.fullmatch(r'[\d.:]+',host) or host.endswith(('.local','.internal','.localhost')):
        raise ValueError('Private addresses are not accepted')
    if repository and (host not in ('github.com','gitlab.com','codeberg.org') or len([x for x in p.path.split('/') if x])<2):
        raise ValueError('Use a GitHub, GitLab or Codeberg repository URL')
    if repository and not re.fullmatch(r'/[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+/?',p.path):
        raise ValueError('Use the repository root; supply subproject separately')
    return value.rstrip('/')


def scope_value(value):
    if not isinstance(value,dict) or set(value)-{'entity','id','version','paths'}: raise ValueError('Invalid affected scope')
    result={k:bounded(value.get(k),160) for k in ('entity','id','version')}
    if result['entity'] not in ('component_version','project_version'): raise ValueError('Select a source version')
    paths=value.get('paths',[])
    if not isinstance(paths,list) or len(paths)>100: raise ValueError('Invalid paths')
    for path in paths:
        bounded(path,500)
        if path.startswith('/') or '\\' in path or '..' in path.split('/'): raise ValueError('Unsafe path')
    result['paths']=sorted(set(paths))
    return result


class Queue:
    def __init__(self,db):
        self.db=db; setup(db)
        filename=db.execute("PRAGMA database_list").fetchone()[2]
        if filename: os.chmod(filename,0o600)
    def latest(self,id):
        row=self.db.execute('SELECT payload FROM submission_events WHERE id=? ORDER BY revision DESC LIMIT 1',(id,)).fetchone()
        if not row: raise KeyError('Review item unavailable')
        return json.loads(row[0])
    def all(self):
        return [json.loads(r[0]) for r in self.db.execute('SELECT payload FROM submission_events e WHERE revision=(SELECT MAX(revision) FROM submission_events WHERE id=e.id) ORDER BY id')]
    def append(self,item):
        self.db.execute('INSERT INTO submission_events VALUES(?,?,?)',(item['id'],item['revision'],json.dumps(item,sort_keys=True)))
    def submit(self,data,kind='submission'):
        if kind not in ('submission','rights_report','correction','appeal'): raise ValueError('Unknown proposal kind')
        allowed={'repository','subproject','demo','description','runtime','modelTags','reporter','scope','parentId','ownershipClaim'}
        if not isinstance(data,dict) or set(data)-allowed: raise ValueError('Unknown submission fields')
        description=bounded(data.get('description'),4000)
        reporter=bounded(data.get('reporter',''),320,False)
        proposal={'description':description}
        if kind in ('submission','correction'):
            proposal['repository']=safe_url(data.get('repository'),True)
            proposal['subproject']=bounded(data.get('subproject',''),500,False)
            if proposal['subproject'].startswith('/') or '..' in proposal['subproject'].split('/') or '\\' in proposal['subproject']: raise ValueError('Unsafe subproject')
            proposal['demo']=safe_url(data['demo']) if data.get('demo') else None
            proposal['runtime']=bounded(data.get('runtime',''),100,False)
            tags=data.get('modelTags',[])
            if not isinstance(tags,list) or len(tags)>10: raise ValueError('Invalid model tags')
            proposal['modelTags']=[bounded(t,100) for t in tags]
            proposal['ownership']='unverified' if data.get('ownershipClaim') else 'not_claimed'
        else:
            proposal['scope']=scope_value(data.get('scope'))
            row=self.db.execute('SELECT 1 FROM records WHERE entity=? AND id=? AND version=?',(proposal['scope']['entity'],proposal['scope']['id'],proposal['scope']['version'])).fetchone()
            if not row: raise ValueError('Affected source version does not exist')
        parent=data.get('parentId')
        if kind=='appeal':
            original=self.latest(bounded(parent,160))
            if original['kind']!='rights_report' or original['proposal']['scope']!=proposal['scope']: raise ValueError('Appeal must reference the affected report and scope')
        fingerprint=hashlib.sha256(json.dumps([kind,proposal,parent],sort_keys=True).encode()).hexdigest()
        # Duplicate responses never disclose another submitter's private receipt or existence.
        token=secrets.token_urlsafe(32)
        item={'id':secrets.token_hex(16),'revision':1,'kind':kind,'status':'pending','proposal':proposal,'parentId':parent,'reporter':reporter,'ownershipChallenge':secrets.token_urlsafe(32),'receiptHash':hashlib.sha256(token.encode()).hexdigest(),'fingerprint':fingerprint,'duplicateOf':None,'blockingFields':['source evidence','scope rights','demo/source relationship','proposed model tags review'] if kind in ('submission','correction') else ['rights review'],'nextAction':'Curator review required','actor':'anonymous','createdAt':datetime.now(timezone.utc).isoformat(),'reviewEvidence':[]}
        with self.db:
            duplicates=[x for x in self.all() if x['fingerprint']==fingerprint]
            if duplicates: item['duplicateOf']=duplicates[0]['id']
            self.append(item)
        return {'id':item['id'],'receipt':token,'revision':1,'status':'pending','ownershipChallenge':item['ownershipChallenge'] if proposal.get('ownership')=='unverified' else None,'message':'Saved for review; no automatic publication.'}
    def status(self,id,receipt):
        item=self.latest(id)
        if not isinstance(receipt,str) or not secrets.compare_digest(item['receiptHash'],hashlib.sha256(receipt.encode()).hexdigest()): raise PermissionError('Private receipt required')
        return {k:item[k] for k in ('id','revision','kind','status','blockingFields','nextAction')}
    def review(self,id,data,actor):
        if not actor: raise PermissionError('Curator authorization required')
        if not isinstance(data,dict) or set(data)-{'revision','status','nextAction','blockingFields','reviewEvidence','description'}: raise ValueError('Invalid review fields')
        with self.db:
            self.db.execute('BEGIN IMMEDIATE')
            old=self.latest(id)
            if type(data.get('revision')) is not int or data['revision']!=old['revision']: raise RuntimeError('Stale revision; reload the queue')
            state=data.get('status')
            if state not in ('pending','changes_requested','approved','rejected','resolved'): raise ValueError('Invalid review state')
            if state=='resolved' and old['kind'] not in ('rights_report','appeal'): raise ValueError('Resolution is for reports')
            if old['kind']=='rights_report' and state=='approved': raise ValueError('Resolve a report explicitly')
            fields=data.get('blockingFields',[])
            evidence=data.get('reviewEvidence',[])
            if not isinstance(fields,list) or len(fields)>30 or not isinstance(evidence,list) or len(evidence)>30: raise ValueError('Invalid review evidence')
            fields=[bounded(x,200) for x in fields]; evidence=[bounded(x,1000) for x in evidence]
            if state in ('approved','resolved','rejected') and (fields or not evidence): raise ValueError('Decision requires evidence and no unresolved blocking fields')
            item={**old,'revision':old['revision']+1,'status':state,'blockingFields':fields,'reviewEvidence':evidence,'nextAction':bounded(data.get('nextAction'),1000),'actor':actor,'reviewedAt':datetime.now(timezone.utc).isoformat()}
            if 'description' in data:
                item['proposal']={**old['proposal'],'description':bounded(data['description'],4000)}
            item['modelTagsReview']='accepted' if state=='approved' else 'unreviewed'
            self.append(item)
        return item
    def verify_ownership(self,id,receipt,commit,fetch):
        self.status(id,receipt)
        old=self.latest(id)
        repo=old['proposal'].get('repository','')
        p=urlsplit(repo)
        if p.hostname!='github.com' or len(p.path.strip('/').split('/'))!=2 or not re.fullmatch('[a-f0-9]{40}',commit or ''): raise ValueError('Control verification requires a pinned GitHub repository commit')
        url='https://raw.githubusercontent.com'+p.path+'/'+commit+'/.headstart-ownership.txt'
        content=fetch(url)
        expected=('HeadStart ownership '+old['id']+' '+old['ownershipChallenge']).encode()
        if content.strip()!=expected: raise ValueError('Repository challenge did not match')
        with self.db:
            self.db.execute('BEGIN IMMEDIATE')
            current=self.latest(id)
            if current['revision']!=old['revision']: raise RuntimeError('Stale ownership check; retry')
            item={**old,'revision':old['revision']+1,'proposal':{**old['proposal'],'ownership':'repository_control_verified','ownershipEvidence':{'url':url,'sha256':hashlib.sha256(content).hexdigest(),'commit':commit}},'actor':'repository-challenge'}
            self.append(item)
        return self.status(id,receipt)
    def history(self,id):
        return [json.loads(r[0]) for r in self.db.execute('SELECT payload FROM submission_events WHERE id=? ORDER BY revision',(id,))]


def assert_export_allowed(catalog_store, records):
    """Call under the delivery transaction, on the entire source/dependency closure."""
    db=catalog_store.db
    records=list(records)
    # Never treat a missing operations schema as an implicit permission grant.
    if not db.execute("SELECT 1 FROM sqlite_master WHERE type='table' AND name='submission_events'").fetchone():
        raise ValueError('Rights review policy unavailable')
    rows=db.execute('SELECT payload FROM submission_events e WHERE revision=(SELECT MAX(revision) FROM submission_events WHERE id=e.id)')
    for row in rows:
        item=json.loads(row[0])
        if item['kind']!='rights_report' or item['status'] in ('resolved','rejected'): continue
        scope=item['proposal']['scope']
        for record in records:
            if (record['entity_type'],record['id'],record['version'])!=(scope['entity'],scope['id'],scope['version']): continue
            selected=record['data'].get('scope',{})
            paths=set(selected.get('required_files',[])+selected.get('optional_files',[])+record['data'].get('rights',{}).get('scope',[]))
            if not scope['paths'] or not paths or paths.intersection(scope['paths']): raise ValueError('Source delivery frozen pending rights review')
