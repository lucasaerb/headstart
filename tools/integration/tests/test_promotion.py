import tempfile,unittest
from pathlib import Path
from services.catalog.store import CatalogStore
from services.curation.seed import seed_curated_capabilities
from services.curation.integration_promotions import promote
from tools.integration.matrix.run import integrate
from tools.integration import workflow as w
class PromotionGuards(unittest.TestCase):
 def test_missing_self_and_unbound_reviews_never_promote(self):
  with tempfile.TemporaryDirectory() as tmp:
   job=integrate(Path(tmp)/'job','capsule',True)
   # Deliberately incomplete evidence: never presented as a successful runtime.
   w.write_json(job/'validation.json',{});w.write_json(job/'execution-attestation.json',{})
   store=CatalogStore(Path(tmp)/'catalog.db',Path(tmp)/'evidence');seed_curated_capabilities(store);before=store.records(False)
   for review in [{},{'verdict':'PASS','reviewer':'reuse_mcp'},{'verdict':'PASS','reviewer':'independent','rows':{}}]:
    with self.assertRaises(ValueError):promote(store,job,review)
    self.assertEqual(store.records(False),before)
   store.close()
 def test_failed_or_missing_phase_cannot_be_relabelled_passed(self):
  import copy
  with tempfile.TemporaryDirectory() as tmp:
   job=integrate(Path(tmp)/'job','capsule',True);plan=w.read_json(job/'plan.json');attestation={'fixture':'deliberately incomplete evidence'}
   w.write_json(job/'execution-attestation.json',attestation)
   results={phase+'-'+viewport:{'report':{'result':'PASS','phase':phase,'row':'capsule','checks':['Synthetic guard fixture']}} for phase in ['baseline','integrated'] for viewport in ['1280,800','390,844']}
   value={'result':'PASS','planDigest':plan['planDigest'],'targetIntegrated':w.snapshot(job/'target'),'attestationDigest':w.sha(attestation),'results':results}
   store=CatalogStore(Path(tmp)/'catalog.db',Path(tmp)/'evidence');seed_curated_capabilities(store);before=store.records(False)
   for kind in ['missing','failed','wrong-row','wrong-phase']:
    altered=copy.deepcopy(value)
    if kind=='missing':del altered['results']['baseline-390,844']
    else:altered['results']['baseline-390,844']['report'][{'failed':'result','wrong-row':'row','wrong-phase':'phase'}[kind]]={'failed':'FAIL','wrong-row':'obb','wrong-phase':'integrated'}[kind]
    w.write_json(job/'validation.json',altered)
    review={'verdict':'PASS','reviewer':'synthetic guard fixture','rows':{'capsule':{'validationDigest':w.sha(altered),'attestationDigest':w.sha(attestation),'recipeDigest':plan['recipe']['digest']}}}
    with self.assertRaisesRegex(ValueError,'runtime phase'):promote(store,job,review)
    self.assertEqual(store.records(False),before)
   store.close()
if __name__=='__main__':unittest.main()
