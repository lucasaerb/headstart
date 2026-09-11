"""Map real local runtime outputs into the catalog execution envelope; no publication."""
import tempfile
from datetime import datetime,timezone
from pathlib import Path
from contracts.validate import scope_digest
from services.catalog.store import CatalogStore
from services.curation.seed import seed_curated_capabilities
from tools.integration import workflow as w

def create(job,plan,validation):
 with tempfile.TemporaryDirectory() as tmp:
  store=CatalogStore(Path(tmp)/'catalog.db',Path(tmp)/'evidence');seed_curated_capabilities(store)
  component=next(r for r in store.records(False) if r['entity_type']=='component_version' and r['id']=='three-'+plan['row']+'-v1');store.close()
 checks=[]
 for phase,result in validation['results'].items():
  digest=w.sha((job/'evidence'/(phase+'.log')).read_bytes())
  checks.extend({'name':phase+': '+label,'result':'passed','log_digest':digest} for label in result['report']['checks'])
 return {'schema_version':'headstart-execution-0.1','source_commit':w.COMMIT,'target_commit':plan['base']['head'],'recipe_digest':plan['recipe']['digest'],'scope_digest':scope_digest(component['data']['scope']),'recipe':{'id':plan['recipe']['id'],'version':'1'},'target':{'id':'headstart-world-target-'+plan['row'],'version':'1'},'result':'passed','runner':'HeadStart reference matrix author runtime; independent review required','environment':w.encode({'image':validation['image'],'runtime':'Three.js0.186.0','physics':'none','pluginVersion':plan['pluginVersion'],'planDigest':plan['planDigest'],'integratedState':validation['targetIntegrated']['stateDigest'],'viewports':['1280,800','390,844'],'network':'none'}),'executed_at':datetime.now(timezone.utc).isoformat(),'checks':checks}
