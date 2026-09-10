import hashlib
import json
from pathlib import Path
import posixpath
import re
from .review_specs import SPECS, WITHHELD

ROOT=Path(__file__).parent
SOURCE=ROOT/'fixtures'/'threejs'
COMMIT='5c5a575bd8cc0cf440026ce8dcf6a77862067684'
DATE='2026-09-10T00:00:00Z'

def sha(raw):return hashlib.sha256(raw).hexdigest()
def envelope(kind,id,data):return dict(schema_version='0.2',entity_type=kind,id=id,version='1',data=data)
def imports(text):
 return re.findall(r'^import\s+(?:[\s\S]*?\s+from\s+)?[\"\x27]([^\"\x27]+)[\"\x27]\s*;',text,re.M)
def closure(path):
 found=set();pending=[path]
 while pending:
  current=pending.pop()
  if current in found:continue
  found.add(current)
  for ref in imports((SOURCE/current).read_text()):
   if ref.startswith('.'):
    dep=posixpath.normpath(posixpath.join(posixpath.dirname(current),ref))
    if dep.startswith('../') or not (SOURCE/dep).is_file():raise ValueError('Unresolved source dependency: '+dep)
    pending.append(dep)
   elif ref!='three':raise ValueError('Unreviewed peer: '+ref)
 return sorted(found)

def source_maps():
 result=[]
 for rel,title,category,concept,boundary,lifecycle,behavior,effort in SPECS:
  path='examples/jsm/'+rel;files=closure(path);text=(SOURCE/path).read_text()
  symbols=re.findall(r'^(?:class|function)\s+(\w+)',text,re.M)
  refs=[]
  for f in files:
   raw=(SOURCE/f).read_bytes();content=raw.decode()
   refs.append(dict(path=f,digest=sha(raw),url=f'https://github.com/mrdoob/three.js/blob/{COMMIT}/{f}',line_start=1,line_end=len(content.splitlines()),imports=imports(content)))
  result.append(dict(id='three-'+Path(rel).stem.lower(),title=title,parent='threejs',revision=COMMIT,category=category,concept=concept,source_path=path,symbols=symbols,files=refs,required_files=files+['LICENSE','package.json'],optional_files=[],reuse_form='copy_scoped_module_with_adapter_and_external_engine_peer',boundary=boundary,lifecycle=lifecycle,units='Three coordinate units are target-defined; angular parameters follow source API; no automatic engine conversion.',render_input_physics='No independent WebGL renderer or physics world is introduced. '+lifecycle,assets='No images/audio/fonts are included or cleared. Inline shader strings in selected files are included. Caller-supplied assets remain separately gated.',services='No backend service integration. Comment/reference URLs are citations, not runtime endpoint permission.',external_peer=dict(package='three',declared_version='0.186.0',source_commit=COMMIT,scope='Existing target engine peer; engine implementation not copied by these components.',rights='Peer Three.js uses retained root MIT notice; other target dependencies require target inspection.') if any('three' in f['imports'] for f in refs) else None,creator='three.js authors; retain all inline contributor/algorithm references from complete source files',rights='MIT for selected source files and complete local addon closure; root LICENSE and inline notices preserved; excludes caller assets',reviewer='batch1_data static curation',reviewed_at=DATE,readiness='source_reviewed',integration_effort=effort,proposed_validation=behavior))
 return result

def seed_curated_capabilities(store):
 # The manifest is frozen author evidence; never bless modified source bytes by recomputing only.
 manifest=json.loads((ROOT/'reviewed-source-maps.json').read_text())
 maps=manifest['capabilities']
 actual=source_maps()
 if maps!=actual:raise ValueError('Source/review manifest changed; repeat independent review')
 notice=(SOURCE/'LICENSE').read_text();package=(SOURCE/'package.json').read_bytes()
 expected=manifest['shared_digests']
 if sha(notice.encode())!=expected['LICENSE'] or sha(package)!=expected['package.json']:raise ValueError('Shared license/manifest tampered')
 allfiles=sorted({f for m in maps for f in m['required_files']})
 evidence={}
 for path in allfiles:
  raw=(SOURCE/path).read_bytes();digest=sha(raw);store.put_blob(raw,digest)
  evidence[path]=dict(path=path,digest=digest,source_commit=COMMIT,origin='curator',claim_type='inspected',reviewer='batch1_data static curation',observed_at=DATE,claim='Pinned selected-source review; exact ranges and boundary in reviewed-source-maps.json. No execution or integration success.')
 def rights(paths):return dict(status='scope_cleared',scope=paths,code_spdx='MIT',asset_status='excluded',notices=[notice,'Retain inline contributor and algorithm references in complete selected source files.'],evidence=[evidence['LICENSE']])
 records=[envelope('project','threejs',dict(title='Three.js',repository_url='https://github.com/mrdoob/three.js',summary='Selected addon capabilities; full engine is an external target peer.',creator_attribution=['three.js authors'])),envelope('project_version','threejs-reviewed-addon-source',dict(project_id='threejs',source_commit=COMMIT,publication_state='published',rights=rights(allfiles),evidence=list(evidence.values())))]
 for m in maps:
  id=m['id'];vid=id+'-v1';dep=id+'-engine-peer'
  has_peer=any('three' in f['imports'] for f in m['files'])
  records.extend([
   envelope('component',id,dict(project_id='threejs',name=m['title'],concept_ids=[m['concept']],ontology_version='0.2')),
   envelope('dependency',dep,dict(from_version=dict(id=vid,version='1'),to_version=None,external_package='three',kind='requires',version_constraint='0.186.0 (same pinned source revision preferred)',resolved_version=None,optional=False)),
   envelope('component_version',vid,dict(component_id=id,project_version=dict(id='threejs-reviewed-addon-source',version='1'),source_commit=COMMIT,readiness='source_reviewed',scope=dict(required_files=m['required_files'],optional_files=[],excluded_systems=['Full engine implementation','Demo application','Caller textures, audio, fonts, models','Target renderer/input/physics ownership'],coupling_notes=[m['boundary'],m['lifecycle'],m['units'],'Reuse form: '+m['reuse_form'],'External Three peer declared 0.186.0 at pinned source; compatibility is proposed, not tested.','Validation proposal: '+m['proposed_validation']]),dependencies=[dict(id=dep,version='1')] if has_peer else [],compatibility=[dict(runtime='Three.js',version_range='0.186.0',support='reference_only'),dict(runtime='React Three Fiber',version_range=None,support='reference_only')],rights=rights(m['required_files']),evidence=[evidence[f] for f in m['required_files']],verification=None))
  ])
 records=[r for r in records if not (r['entity_type']=='dependency' and r['data']['from_version']['id']=='three-simplexnoise-v1')]
 store.put_records(records)
 return records
