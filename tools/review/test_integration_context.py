import copy
import importlib.util
from pathlib import Path
import tempfile
import unittest
from tools.integration.fixture import target, packet
from tools.integration.workflow import plan, snapshot
ROOT=Path(__file__).resolve().parents[2]
spec=importlib.util.spec_from_file_location('review_context',ROOT/'HeadStart-Starter-Package/headstart-plugin/scripts/integration_review_context.py')
helper=importlib.util.module_from_spec(spec);spec.loader.exec_module(helper)


class IntegrationContextTests(unittest.TestCase):
    def setUp(self):
        self.temp=tempfile.TemporaryDirectory()
        self.target=target(Path(self.temp.name)/'target')
        self.packet=packet()
        self.plan=plan(self.target,self.packet)

    def tearDown(self):
        self.temp.cleanup()

    def test_real_plan_shared_context_is_read_only(self):
        before=snapshot(self.target)
        value=helper.context(self.plan,self.packet,brief_revision=self.packet['bag']['brief']['revision'])
        self.assertEqual(value['brief'],self.plan['brief'])
        self.assertEqual(value['source'],self.plan['source'])
        self.assertEqual(value['recipe'],self.plan['recipe'])
        self.assertEqual(value['targetState'],self.plan['context']['state']['stateDigest'])
        self.assertEqual(value['authorization'],'review_only')
        self.assertEqual(value['currentTargetInspection'],'required')
        self.assertEqual(snapshot(self.target),before)
        self.assertEqual(helper.context(self.plan,self.packet,authorization='bounded_improvement')['authorization'],'bounded_improvement')

    def test_stale_brief_packet_plan_and_missing_pins_rejected(self):
        with self.assertRaises(ValueError):helper.context(self.plan,self.packet,brief_revision=999)
        packet2=copy.deepcopy(self.packet);packet2['bag']['intent']='different'
        with self.assertRaises(ValueError):helper.context(self.plan,packet2)
        changed=copy.deepcopy(self.plan);changed['preserve']=[]
        with self.assertRaises(ValueError):helper.context(changed,self.packet)
        changed=copy.deepcopy(self.plan);changed['source']['commit']='unknown';changed['planDigest']=helper.sha({k:v for k,v in changed.items() if k!='planDigest'})
        with self.assertRaises(ValueError):helper.context(changed,self.packet)

    def test_unknown_authorization_rejected(self):
        with self.assertRaises(ValueError):helper.context(self.plan,self.packet,authorization='deploy')

    def test_digest_consistent_contradictions_rejected(self):
        mutations = [
            lambda p: p['source'].update(commit='a'*40),
            lambda p: p['source'].update(version='2'),
            lambda p: p['source'].update(files={}),
            lambda p: p['source'].update(repository='https://github.com/other/repo'),
            lambda p: p['context']['state'].update(stateDigest='b'*64),
        ]
        for mutate in mutations:
            changed=copy.deepcopy(self.plan);mutate(changed)
            changed['planDigest']=helper.sha({k:v for k,v in changed.items() if k!='planDigest'})
            with self.assertRaises(ValueError):helper.context(changed,self.packet)
        packet2=copy.deepcopy(self.packet);packet2['bag']['intent']='changed'
        changed=copy.deepcopy(self.plan);changed['intent']='changed';changed['source']['packetDigest']=helper.sha(packet2)
        changed['planDigest']=helper.sha({k:v for k,v in changed.items() if k!='planDigest'})
        with self.assertRaises(ValueError):helper.context(changed,packet2)
        packet2=copy.deepcopy(self.packet);packet2['recordDigests'][0]['sha256']='c'*64
        changed=copy.deepcopy(self.plan);changed['source']['packetDigest']=helper.sha(packet2)
        changed['planDigest']=helper.sha({k:v for k,v in changed.items() if k!='planDigest'})
        with self.assertRaises(ValueError):helper.context(changed,packet2)

    def test_schema_two_preserves_informational_recommendation(self):
        packet2=copy.deepcopy(self.packet)
        brief=packet2['bag']['brief']
        context={'schemaVersion':'headstart-recommendation-context-1','template':{'id':'flight-landscape','version':'1','digest':'a'*64},'recommendationVersion':'headstart-recommendation-plan-1','briefRevision':brief['revision'],'briefDigest':helper.sha(brief),'reasons':[{'type':'inspected','text':'Pinned noise module'},{'type':'editorial','text':'Open terrain proposal'}],'tradeoffs':['No flight physics supplied'],'compositionStatus':'candidate','combinationValidation':None}
        packet2['bag']['schemaVersion']=2;packet2['bag']['recommendationContext']=context
        packet2['bagRevision']=helper.sha(packet2['bag']);packet2['recommendationContext']=context
        value=plan(self.target,packet2)
        self.assertEqual(helper.context(value,packet2)['recommendationContext'],context)
        value['recommendationContext']=None;value['planDigest']=helper.sha({k:v for k,v in value.items() if k!='planDigest'})
        with self.assertRaises(ValueError):helper.context(value,packet2)
