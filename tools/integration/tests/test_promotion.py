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
if __name__=='__main__':unittest.main()
