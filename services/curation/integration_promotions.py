"""Explicit local promotion after independent review, never part of ordinary seeding."""
import copy,json
from pathlib import Path
from contracts.validate import scope_digest
from services.curation.seed import envelope
from tools.integration.matrix.run import verify
from tools.integration import workflow as w

def promote(store,job,review):
 job=Path(job);plan=w.read_json(job/'plan.json');result=w.read_json(job/'validation.json');attestation=w.read_json(job/'execution-attestation.json')
 verify(plan)
 if not isinstance(review,dict) or review.get('verdict')!='PASS' or not review.get('reviewer') or review['reviewer']==plan['author']:raise ValueError('Independent explicit review required')
 accepted=review.get('rows',{}).get(plan['row'],{})
 if accepted!={'validationDigest':w.sha(result),'attestationDigest':w.sha(attestation),'recipeDigest':plan['recipe']['digest']}:raise ValueError('Review does not bind this exact runtime evidence')
 if result['result']!='PASS' or result['planDigest']!=plan['planDigest'] or result['targetIntegrated']!=w.snapshot(job/'target') or result['attestationDigest']!=w.sha(attestation):raise ValueError('Stale or failed execution evidence')
 phases={f'{phase}-{viewport}':phase for phase in ('baseline','integrated') for viewport in ('1280,800','390,844')}
 if not isinstance(result.get('results'),dict) or set(result['results'])!=set(phases):raise ValueError('Exactly four runtime phases required')
 for key,phase in phases.items():
  value=result['results'][key];report=value.get('report',{}) if isinstance(value,dict) else {}
  if report.get('result')!='PASS' or report.get('row')!=plan['row'] or report.get('phase')!=phase or not isinstance(report.get('checks'),list) or not report['checks'] or any(not isinstance(c,str) or not c for c in report['checks']):raise ValueError('Missing or failed exact runtime phase')
 expected={f'{phase}-{viewport}.{ext}' for phase in ('baseline','integrated') for viewport in ('1280,800','390,844') for ext in ('png','log')}
 if set(result['evidence'])!=expected:raise ValueError('Missing exact visual/log evidence')
 for name,digest in result['evidence'].items():
  path=w.safe_path(job,'evidence/'+name)
  if not path.is_file() or path.stat().st_size>5_000_000 or w.sha(path.read_bytes())!=digest:raise ValueError('Missing or changed runtime evidence')
  store.put_blob(path.read_bytes(),digest)
 records=store.records(False);old=next(r for r in records if r['entity_type']=='component_version' and r['id']=='three-'+plan['row']+'-v1' and r['version']=='1')
 if scope_digest(old['data']['scope'])!=attestation['scope_digest']:raise ValueError('Source scope no longer matches attestation')
 expected_checks=[{'name':phase+': '+label,'result':'passed','log_digest':result['evidence'][phase+'.log']} for phase,phase_result in result['results'].items() for label in phase_result['report']['checks']]
 if attestation['checks']!=expected_checks:raise ValueError('Attestation checks diverge from actual runtime report')
 stamp=attestation['executed_at'];new=copy.deepcopy(old);new['version']='2';new['data']['readiness']='integration_tested'
 # Compatibility is exact to this recorded target, never an entire runtime family.
 new['data']['compatibility']=[{'runtime':'Three.js','version_range':'0.186.0','support':'tested'}]
 new['data']['scope']['coupling_notes']=old['data']['scope']['coupling_notes']
 extra=[]
 for ref in new['data']['dependencies']:
  dep=copy.deepcopy(next(r for r in records if r['entity_type']=='dependency' and r['id']==ref['id'] and r['version']==ref['version']));dep['version']='2';dep['data']['from_version']={'id':new['id'],'version':'2'};ref['version']='2';extra.append(dep)
 digest=store.put_blob(w.encode(attestation).encode(),w.sha(attestation));evidence={'path':'reference-integrations/'+plan['row']+'/execution-attestation.json','digest':digest,'source_commit':w.COMMIT,'origin':'executed_test','claim_type':'measured','reviewer':review['reviewer'],'observed_at':stamp,'claim':'Independently accepted exact source/target/recipe matrix; target redistribution and other combinations are not cleared.'}
 verification={k:attestation[k] for k in ('source_commit','target_commit','recipe_digest','scope_digest','recipe','target','result')};verification['checks']=[c['name'] for c in attestation['checks']];verification['evidence']=[evidence];new['data']['verification']=verification
 project_id='headstart-controlled-world';target_id=attestation['target']['id'];brief_id='headstart-reference-brief-'+plan['row']
 unresolved={'status':'review_required','scope':['src/feature.js'],'code_spdx':None,'asset_status':'not_applicable','notices':['Local authored test use is authorized; no blanket target redistribution license is asserted.'],'evidence':[]}
 project=envelope('project',project_id,{'title':'HeadStart controlled world test target','repository_url':'https://github.com/lucasaerb/headstart','summary':'Authored local reference fixture, not a published reusable game.','moderation_status':'candidate','creator_attribution':['HeadStart test fixture author']})
 target=envelope('project_version',target_id,{'project_id':project_id,'source_commit':plan['base']['head'],'publication_state':'candidate','rights':copy.deepcopy(unresolved),'evidence':[]})
 brief=envelope('game_brief',brief_id,{'intent':plan['brief']['intent'],'runtime':'Three.js','runtime_version':'0.186.0','platform':'WebGL browser','device':'Declared container browser desktop/mobile viewports','visual_references':[],'camera':'Existing target camera retained','input':['Keyboard explorer'],'scope':'One exact world feature adapter','budgets':[],'preserved_systems':plan['brief']['preserve'],'constraints':[{'constraint':text,'origin':'explicit','hard':True} for text in ['No physics engine','No target publication or redistribution grant']]})
 recipe=envelope('recipe',attestation['recipe']['id'],{'components':[{'id':new['id'],'version':'2'}],'assets':[],'brief':{'id':brief_id,'version':'1'},'source_commit':w.COMMIT,'target_commit':plan['base']['head'],'digest':plan['recipe']['digest'],'adapters':['src/feature.js'],'compatibility_assumptions':['Only recorded target state '+result['targetIntegrated']['stateDigest'],'Only plugin '+plan['pluginVersion'],'No camera controller, R3F or collision-response claim'],'rights':copy.deepcopy(unresolved),'status':'candidate','verification':None,'rollback':'Use the recorded scoped local rollback; preserve unrelated edits.','limitations':['Source component execution is tested; assembled target redistribution rights are not cleared.']})
 store.put_records([project,target,brief,recipe,new,*extra]);return new
