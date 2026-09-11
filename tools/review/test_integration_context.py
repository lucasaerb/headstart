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
