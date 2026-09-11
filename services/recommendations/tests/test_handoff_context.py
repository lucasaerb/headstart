import copy
import tempfile
from pathlib import Path
import unittest
from services.catalog.store import CatalogStore
from services.catalog.search import public_documents
from services.curation.seed import seed_curated_capabilities
from services.submissions.store import setup,Queue
from services.handoff.service import create,retrieve,HandoffError,digest
from services.recommendations.planning import handoff_context,load_templates


class RecipeHandoffTests(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory();root=Path(self.tmp.name)
        self.store=CatalogStore(root/'catalog.db',root/'evidence');setup(self.store.db);seed_curated_capabilities(self.store)
        self.brief={'revision':3,'constraints':{'experience':{'value':'fly through a landscape','origin':'explicit'}}}
        self.template=next(r for r in load_templates() if r['id']=='flight-landscape')
        self.ref={k:self.template[k] for k in ('id','version','digest')}
        self.context=handoff_context(self.brief,public_documents(self.store),self.ref)
        self.request={'schemaVersion':2,'selections':[{'id':'three-simplexnoise-v1','version':'1'}],'brief':self.brief,'intent':'Plan a terrain capability in my existing camera system','recipe':None,'recommendationContext':self.context}
    def tearDown(self):self.store.close();self.tmp.cleanup()
    def test_server_recomputed_context_persists_in_real_packet_and_bag(self):
        result=create(self.store,'owner',self.request)
        packet=retrieve(self.store,'owner',result['digest'])
        bag=retrieve(self.store,'owner',result['bagRevision'],True)
        self.assertEqual(packet['recommendationContext'],self.context)
        self.assertEqual(bag['schemaVersion'],2);self.assertEqual(bag['recommendationContext'],self.context)
        self.assertEqual(digest(bag),packet['bagRevision'])
        self.assertIsNone(packet['recipe']);self.assertEqual(self.context['compositionStatus'],'candidate')
    def test_tampered_rationale_stale_template_or_wrong_scope_rejected(self):
        for change in ('rationale','template','selection'):
            request=copy.deepcopy(self.request)
            if change=='rationale':request['recommendationContext']['reasons'][0]['text']='Invented acceleration claim'
            elif change=='template':request['recommendationContext']['template']['digest']='a'*64
            else:request['selections']=[{'id':'three-mapcontrols-v1','version':'1'}]
            with self.assertRaises(HandoffError):create(self.store,'owner',request)
    def test_rights_freeze_blocks_prepared_recipe_and_keeps_old_bytes(self):
        result=create(self.store,'owner',self.request)
        original=self.store.db.execute('SELECT payload FROM handoff_artifacts WHERE digest=?',(result['digest'],)).fetchone()[0]
        Queue(self.store.db).submit({'description':'Review this scope','scope':{'entity':'component_version','id':'three-simplexnoise-v1','version':'1','paths':[]}},'rights_report')
        with self.assertRaises(HandoffError):retrieve(self.store,'owner',result['digest'])
        self.assertEqual(original,self.store.db.execute('SELECT payload FROM handoff_artifacts WHERE digest=?',(result['digest'],)).fetchone()[0])

    def test_unselected_recipe_part_freeze_invalidates_recipe_context(self):
        Queue(self.store.db).submit({'description':'Review flight control scope','scope':{'entity':'component_version','id':'three-flycontrols-v1','version':'1','paths':[]}},'rights_report')
        with self.assertRaises(HandoffError):create(self.store,'owner',self.request)
