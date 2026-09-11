import copy
from pathlib import Path
import unittest
from services.recommendations.context import validate,digest
ROOT=Path(__file__).resolve().parents[3]

class ContextTests(unittest.TestCase):
    def setUp(self):
        self.brief={'revision':1,'constraints':{}}
        self.value={'schemaVersion':'headstart-recommendation-context-1','template':{'id':'flight-landscape','version':'1','digest':'a'*64},'recommendationVersion':'headstart-recommendation-plan-1','briefRevision':1,'briefDigest':digest(self.brief),'reasons':[{'type':'inspected','text':'Pinned noise module','components':['three-simplexnoise']},{'type':'editorial','text':'Open terrain proposal'}],'tradeoffs':['No flight physics supplied'],'compositionStatus':'candidate','combinationValidation':None}
    def test_roundtrip_and_bundled_validator_identical(self):
        self.assertEqual(validate(self.value,self.brief),self.value)
        self.assertEqual((ROOT/'services/recommendations/context.py').read_bytes(),(ROOT/'HeadStart-Starter-Package/headstart-plugin/scripts/recommendation_context.py').read_bytes())
    def test_stale_promoted_unknown_and_oversized_rejected(self):
        for key,value in [('briefRevision',2),('briefDigest','b'*64),('compositionStatus','integration_tested'),('combinationValidation',{}),('extra','field'),('tradeoffs',['x'*1001]),('reasons',[])]:
            changed=copy.deepcopy(self.value);changed[key]=value
            with self.assertRaises(ValueError):validate(changed,self.brief)
        changed=copy.deepcopy(self.value);changed['reasons'][0]['components']=['/private/path']
        with self.assertRaises(ValueError):validate(changed,self.brief)
