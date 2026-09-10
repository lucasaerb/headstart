import hashlib
import http.client
import ipaddress
import json
from pathlib import Path, PurePosixPath
import re
import socket
import sqlite3
import ssl
import time
from urllib.parse import urlsplit, quote

ANALYZER='static-js-0.2-url-redaction'
MAX_FILES=100
MAX_FILE=256*1024
MAX_TOTAL=2*1024*1024
SUFFIXES={'.js','.jsx','.ts','.tsx','.json','.md','.txt','.yaml','.yml','.lock'}
SECRET=re.compile(r'(?:AKIA[0-9A-Z]{16}|-----BEGIN [A-Z ]*PRIVATE KEY-----|(?:api[_-]?key|secret|password|token)\s*[=:]\s*[\"\x27][^\"\x27]{8,})',re.I)
URL=re.compile(r'(?<![a-z0-9+.-])(?:[a-z][a-z0-9+.-]{0,31}:)?//[^\s\"\x27<>\\]+',re.I)
RELATIVE_URL=re.compile(r'[\"\x27]([^\s\"\x27<>]+[?#][^\s\"\x27<>]*)[\"\x27]')

def sensitive_url(value):
 if not isinstance(value,str):return False
 try:
  u=urlsplit(value)
  return bool(u.query or u.fragment or u.username is not None or u.password is not None or '?' in value or '#' in value)
 except ValueError:return True

def redact(value):
 """Shared conservative URL redaction across references and JSON summaries."""
 if isinstance(value,dict):return {redact(k):redact(v) for k,v in value.items()}
 if isinstance(value,list):return [redact(v) for v in value]
 if not isinstance(value,str):return value
 def replace(match):
  url=match.group()
  if not sensitive_url(url):return url
  return '[redacted_url]'
 text=URL.sub(replace,value)
 # Relative query/fragment references must not bypass absolute URL handling.
 if text not in ('[redacted_url]','[redacted_reference]') and sensitive_url(text):return '[redacted_reference]'
 return text

def sensitive_source(text):
 if SECRET.search(text):return True
 if any(sensitive_url(m.group()) for m in URL.finditer(text)):return True
 if any(sensitive_url(m.group(1)) for m in RELATIVE_URL.finditer(text)):return True
 # JSON permits escaped slashes/unicode inside dependency names and versions.
 try:
  value=json.loads(text)
  def walk(node):
   if isinstance(node,str):return sensitive_url(node) and (bool(URL.search(node)) or '?' in node or '#' in node)
   if isinstance(node,dict):return any(walk(k) or walk(v) for k,v in node.items())
   if isinstance(node,list):return any(walk(v) for v in node)
   return False
  return walk(value)
 except (ValueError,TypeError):return False


def digest(data):return hashlib.sha256(data).hexdigest()
def canonical(value):return json.dumps(value,sort_keys=True,separators=(',',':'))

def safe_path(path):
 p=PurePosixPath(path)
 if not isinstance(path,str) or not path or p.is_absolute() or any(x in ('..','.') for x in path.split('/')) or any(c in path for c in '\\:%?#\x00') or any(ord(c)<32 for c in path) or '' in path.split('/'):
  raise ValueError('unsafe_path')
 return path

def normalize(repository,revision,subproject,paths):
 u=urlsplit(repository)
 if u.scheme!='https' or u.hostname!='github.com' or u.username or u.password or u.port not in (None,443) or u.query or u.fragment or not re.fullmatch(r'/[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+',u.path):raise ValueError('unsupported_repository')
 if any(part in ('.','..') for part in u.path.split('/')[1:]):raise ValueError('unsupported_repository')
 if not re.fullmatch('[a-f0-9]{40}',revision):raise ValueError('unpinned_revision')
 if subproject:safe_path(subproject)
 if not isinstance(paths,list) or not paths or len(paths)>MAX_FILES or len(set(paths))!=len(paths):raise ValueError('file_count')
 for path in paths:
  safe_path(path)
  if subproject and not path.startswith(subproject+'/'):raise ValueError('outside_subproject')
 return dict(repository='https://github.com'+u.path.removesuffix('.git'),revision=revision,subproject=subproject,paths=sorted(paths))

class PinnedHTTPS(http.client.HTTPSConnection):
 def __init__(self,host,address):super().__init__(host,timeout=15);self.address=address
 def connect(self):
  sock=socket.create_connection((self.address,443),self.timeout)
  self.sock=ssl.create_default_context().wrap_socket(sock,server_hostname=self.host)

def fetch(url):
 """Only raw.githubusercontent.com; verified public DNS address used for TLS socket."""
 u=urlsplit(url)
 if u.scheme!='https' or u.hostname!='raw.githubusercontent.com' or u.port not in (None,443) or u.username or u.password or u.query or u.fragment:raise ValueError('unsupported_destination')
 addresses={r[4][0] for r in socket.getaddrinfo(u.hostname,443,type=socket.SOCK_STREAM)}
 if not addresses or any(not ipaddress.ip_address(a).is_global for a in addresses):raise ValueError('nonpublic_destination')
 conn=PinnedHTTPS(u.hostname,sorted(addresses)[0])
 try:
  conn.request('GET',u.path,headers={'User-Agent':'HeadStart-static-intake/0.1','Accept-Encoding':'identity'})
  response=conn.getresponse()
  if 300<=response.status<400:raise ValueError('redirect_rejected')
  if response.status!=200:raise OSError('upstream_http_'+str(response.status))
  if response.getheader('Content-Encoding','identity')!='identity':raise ValueError('compressed_response_rejected')
  declared=response.getheader('Content-Length')
  if declared and int(declared)>MAX_FILE:raise ValueError('file_size')
  body=response.read(MAX_FILE+1)
  if len(body)>MAX_FILE:raise ValueError('file_size')
  return body
 finally:conn.close()


def allowed_file(path):
 name=PurePosixPath(path).name.lower()
 if name.startswith('.') or any(x in name for x in ('secret','credential','.env','id_rsa','id_ed25519')):return False
 return PurePosixPath(path).suffix.lower() in SUFFIXES or name in ('license','copying','notice')


def inspect(files):
 results=[]
 for path,raw in sorted(files.items()):
  text=raw.decode('utf-8');refs=[];unknown=[]
  if sensitive_source(text):
   results.append(dict(path=redact(path),digest=digest(raw),bytes=len(raw),references=[],unknowns=[dict(kind='sensitive_source_excluded')],manifest=None))
   continue
  if path.endswith(('.js','.jsx','.ts','.tsx')):
   # Literal edges only: static approximation; not executable parsing or capability proof.
   pattern=r'(?:\bfrom\s*|\brequire\s*\(\s*|\bimport\s*\(\s*|\bimport\s*)[\"\x27]([^\"\x27]+)[\"\x27]'
   for m in re.finditer(pattern,text):
    ref=m.group(1);kind='asset' if re.search(r'\.(png|jpg|jpeg|glb|gltf|mp3|wav|svg|webp)$',ref,re.I) else 'physics' if re.search('cannon|rapier|ammo|matter',ref,re.I) else 'runtime'
    missing=False
    if ref.startswith('.'):
     candidate=str(PurePosixPath(path).parent/ref)
     import posixpath
     candidate=posixpath.normpath(candidate)
     missing=not any(candidate+s in files for s in ('','.js','.ts','.tsx','.jsx','/index.js','/index.ts'))
    refs.append(dict(reference=ref,kind=kind,line_start=text[:m.start()].count('\n')+1,line_end=text[:m.end()].count('\n')+1,resolution='missing_or_outside_snapshot' if missing else 'literal_reference'))
   for m in re.finditer(r'\b(?:import|require)\s*\(\s*(?![\s\"\x27])',text):unknown.append(dict(kind='dynamic_import',line=text[:m.start()].count('\n')+1))
   for m in re.finditer(r'[\"\x27]([^\"\x27\n]+\.(?:png|jpg|jpeg|glb|gltf|mp3|wav|svg|webp))[\"\x27]',text):
    refs.append(dict(reference=m.group(1),kind='asset',line_start=text[:m.start()].count('\n')+1,line_end=text[:m.end()].count('\n')+1,resolution='literal_reference'))
   for m in re.finditer(r'https?://[^\s\"\x27<>]+',text):
    u=urlsplit(m.group());refs.append(dict(reference=u.scheme+'://'+u.hostname if u.hostname else 'invalid_url',kind='service',line_start=text[:m.start()].count('\n')+1,line_end=text[:m.end()].count('\n')+1,resolution='host_only_query_redacted'))
  manifest=None
  if PurePosixPath(path).name=='package.json':
   try:
    value=json.loads(text);manifest={}
    for group in ('dependencies','devDependencies','peerDependencies','engines'):
     entries=value.get(group,{})
     if not isinstance(entries,dict):raise ValueError()
     manifest[group]={name: ('redacted_url' if isinstance(version,str) and ('://' in version or '?' in version) else version) for name,version in entries.items()}
     for name,version in manifest[group].items():refs.append(dict(reference=name,kind='physics' if re.search('cannon|rapier|ammo|matter',name,re.I) else 'build' if group=='devDependencies' else 'runtime',version=version,resolution='declared_only'))
   except (ValueError,TypeError):unknown.append(dict(kind='invalid_manifest'))
  if PurePosixPath(path).name=='package-lock.json':
   try:
    lock=json.loads(text)
    packages=lock.get('packages')
    if not isinstance(packages,dict):unknown.append(dict(kind='unsupported_lockfile_version'))
    else:
     for package,metadata in packages.items():
      if package and isinstance(metadata,dict):refs.append(dict(reference=package,kind='build' if metadata.get('dev') else 'runtime',version=metadata.get('version'),resolution='lockfile_declared_not_installed'))
   except (ValueError,TypeError):unknown.append(dict(kind='invalid_lockfile'))
  elif PurePosixPath(path).name in ('yarn.lock','pnpm-lock.yaml','bun.lock'):
   unknown.append(dict(kind='unsupported_lockfile_parser',note='bytes and digest retained; dependency resolution not inferred'))
  results.append(dict(path=path,digest=digest(raw),bytes=len(raw),source_range=dict(line_start=1,line_end=len(text.splitlines())),references=refs,unknowns=unknown,manifest=manifest))
 return redact(dict(analyzer=ANALYZER,method='bounded literal static inspection; comments can contain inert references; no scripts executed',files=results))


class Intake:
 def __init__(self,root,fetcher=fetch,clock=time.time):
  self.root=Path(root);self.root.mkdir(parents=True,exist_ok=True);self.blobs=self.root/'blobs';self.blobs.mkdir(exist_ok=True);self.fetcher=fetcher;self.clock=clock
  self.db=sqlite3.connect(self.root/'jobs.sqlite3');self.db.row_factory=sqlite3.Row
  self.db.executescript('CREATE TABLE IF NOT EXISTS jobs(id TEXT PRIMARY KEY,request TEXT,stage TEXT,status TEXT,attempts INTEGER DEFAULT 0,next_retry REAL DEFAULT 0,error TEXT,result TEXT); CREATE TABLE IF NOT EXISTS cache(key TEXT PRIMARY KEY,result TEXT);')
  # Scrub old serialized summaries too; analyzer versioning alone does not
  # protect the completed-job fast path or an existing cache entry.
  with self.db:
   for table,key in [('jobs','id'),('cache','key')]:
    for row in self.db.execute('SELECT '+key+',result FROM '+table+' WHERE result IS NOT NULL').fetchall():
     try:clean=canonical(redact(json.loads(row['result'])))
     except (ValueError,TypeError):clean=None
     self.db.execute('UPDATE '+table+' SET result=? WHERE '+key+'=?',(clean,row[key]))
 def close(self):self.db.close()
 def submit(self,repository,revision,paths,subproject=''):
  request=normalize(repository,revision,subproject,paths);key=digest(canonical(request).encode())
  with self.db:self.db.execute('INSERT OR IGNORE INTO jobs(id,request,stage,status) VALUES(?,?,?,?)',(key,canonical(request),'normalize','queued'))
  return key
 def status(self,key):
  row=self.db.execute('SELECT * FROM jobs WHERE id=?',(key,)).fetchone()
  if row is None:raise ValueError('unknown_job')
  result=dict(row)
  if result.get('result'):
   try:result['result']=canonical(redact(json.loads(result['result'])))
   except (ValueError,TypeError):result['result']=None
  result['error']=redact(result.get('error'))
  return result
 def retry(self,key):
  self.status(key)
  with self.db:self.db.execute("UPDATE jobs SET status='queued',attempts=0,next_retry=0,error=NULL WHERE id=?",(key,))
 def _stage(self,key,stage):
  with self.db:self.db.execute("UPDATE jobs SET stage=?,status='running' WHERE id=?",(stage,key))
 def run(self,key):
  job=self.status(key)
  if job['status']=='complete' and job['result']:return redact(json.loads(job['result']))
  if job['status']=='dead_letter' or job['next_retry']>self.clock():return None
  request=json.loads(job['request'])
  with self.db:self.db.execute('UPDATE jobs SET attempts=attempts+1 WHERE id=?',(key,))
  try:
   self._stage(key,'snapshot');files={};excluded=[];total=0
   for path in request['paths']:
    if not allowed_file(path):excluded.append(dict(path=path,reason='unsupported_or_sensitive'));continue
    url='https://raw.githubusercontent.com/'+request['repository'].split('github.com/')[1]+'/'+request['revision']+'/'+quote(path,safe='/')
    raw=self.fetcher(url)
    total+=len(raw)
    if len(raw)>MAX_FILE or total>MAX_TOTAL:raise ValueError('snapshot_size')
    try:decoded=raw.decode('utf-8')
    except UnicodeDecodeError:excluded.append(dict(path=path,reason='binary'));continue
    if '\x00' in decoded or sensitive_source(decoded):excluded.append(dict(path=path,reason='binary_or_secret'));continue
    files[path]=raw;dest=self.blobs/digest(raw)
    if dest.is_symlink():raise ValueError('unsafe_blob')
    if dest.exists() and digest(dest.read_bytes())!=digest(raw):raise ValueError('tampered_blob')
    if not dest.exists():dest.write_bytes(raw)
   self._stage(key,'inspect')
   tree=digest(canonical({p:digest(b) for p,b in files.items()}).encode());cache_key=digest((tree+ANALYZER).encode())
   cached=self.db.execute('SELECT result FROM cache WHERE key=?',(cache_key,)).fetchone()
   analysis=json.loads(cached['result']) if cached else inspect(files)
   result=dict(request=request,scope='selected files only; not complete repository tree',tree_digest=tree,manifest_digests={p:digest(b) for p,b in files.items() if PurePosixPath(p).name=='package.json'},lockfile_digests={p:digest(b) for p,b in files.items() if PurePosixPath(p).name in ('package-lock.json','yarn.lock','pnpm-lock.yaml','bun.lock')},excluded=excluded,analysis=analysis)
   with self.db:
    self.db.execute('INSERT OR IGNORE INTO cache VALUES(?,?)',(cache_key,canonical(analysis)))
    self.db.execute("UPDATE jobs SET stage='inspect',status='complete',error=NULL,result=? WHERE id=?",(canonical(result),key))
   return result
  except Exception as error:
   # Exception messages can contain upstream secrets. Log only bounded local codes.
   code=str(error) if isinstance(error,ValueError) and re.fullmatch('[a-z_]+',str(error)) else type(error).__name__
   attempt=self.status(key)['attempts'];status='dead_letter' if attempt>=3 or isinstance(error,ValueError) else 'retry_wait'
   with self.db:self.db.execute('UPDATE jobs SET status=?,error=?,next_retry=? WHERE id=?',(status,code,self.clock()+min(60,2**attempt),key))
   return None
