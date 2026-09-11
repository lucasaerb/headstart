"""Bounded, pinned repository snapshots. No source execution or publication."""
import base64
import hashlib
import json
import re
from urllib.parse import quote, urlsplit
from services.intake.pipeline import safe_path
from services.submissions.store import safe_url
from .browser import bounded_resource


def collect(repository, paths, license_paths, *, fetch=bounded_resource):
    repository = safe_url(repository, True)
    parsed = urlsplit(repository)
    if parsed.hostname != 'github.com':
        raise ValueError('Scheduled snapshots currently support GitHub only')
    if not isinstance(paths,list) or not isinstance(license_paths,list) or not paths or not license_paths or len(paths)+len(license_paths)>20:
        raise ValueError('Select bounded source and license scopes')
    for path in paths+license_paths: safe_path(path)
    if len(set(paths+license_paths)) != len(paths+license_paths):
        raise ValueError('Source and license scopes must be distinct')
    def get(url, maximum):
        response = fetch(url)
        if response['status'] != 200: raise ValueError('Repository evidence unavailable')
        body = base64.b64decode(response['body'],validate=True)
        if len(body)>maximum: raise ValueError('Snapshot evidence too large')
        return body
    slug = parsed.path.strip('/')
    metadata = json.loads(get('https://api.github.com/repos/'+slug,262144))
    if metadata.get('full_name','').casefold()!=slug.casefold() or metadata.get('private') is not False:
        raise ValueError('Repository identity mismatch')
    branch = metadata.get('default_branch')
    if not isinstance(branch,str) or not 1<=len(branch)<=200: raise ValueError('Invalid repository branch')
    reference = json.loads(get('https://api.github.com/repos/'+slug+'/branches/'+quote(branch,safe=''),262144))
    commit = reference.get('commit',{}).get('sha')
    if reference.get('name')!=branch or not isinstance(commit,str) or not re.fullmatch('[a-f0-9]{40}',commit):
        raise ValueError('Repository revision unavailable')
    files = {}
    total = 0
    for path in sorted(paths+license_paths):
        body = get('https://raw.githubusercontent.com/'+slug+'/'+commit+'/'+quote(path,safe='/'),262144)
        total += len(body)
        if total > 2*1024*1024: raise ValueError('Snapshot scope too large')
        files[path] = hashlib.sha256(body).hexdigest()
    def scope_digest(selected):
        return hashlib.sha256(json.dumps({p:files[p] for p in sorted(selected)},sort_keys=True,separators=(',',':')).encode()).hexdigest()
    return {'snapshot':{'sourceCommit':commit,'sourceDigest':scope_digest(paths),'licenseDigest':scope_digest(license_paths)},'files':files,'repository':repository,'defaultBranch':branch}
