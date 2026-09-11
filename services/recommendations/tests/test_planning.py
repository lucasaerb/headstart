import copy
import unittest
from services.recommendations.planning import load_templates,recommend

class PlanningTests(unittest.TestCase):
    def setUp(self):
        self.templates=load_templates();self.documents=[]
        for row in self.templates:
            for p in row['components']:
                self.documents.append({'id':p['id'],'version':p['version'],'type':'component','data':{'source_commit':p['sourceCommit'],'rights':{'status':'scope_cleared','scope':p['requiredFiles']}}})
    def brief(self,text,camera=''):
        return {'revision':1,'constraints':{'experience':{'value':text,'origin':'explicit'},'camera':{'value':camera,'origin':'explicit'}}}
    def test_contrasting_briefs_change_explained_choice(self):
        a=recommend(self.brief('cozy city builder','overhead'),self.documents,'camera')
        b=recommend(self.brief('fly through a landscape','free-flight'),self.documents,'camera')
        self.assertEqual(a['items'][0]['template']['id'],'cozy-builder');self.assertEqual(b['items'][0]['template']['id'],'flight-landscape')
        self.assertNotEqual(a['briefDigest'],b['briefDigest']);self.assertEqual(len(a['items'][0]['reasons']),3)
        self.assertIsNone(a['items'][0]['template']['performance']);self.assertEqual(a['items'][0]['template']['status'],'candidate')
        self.assertNotIn('score',a['items'][0]);self.assertTrue(a['items'][0]['alternative'])
    def test_hard_runtime_platform_rights_readiness_never_relax(self):
        for constraint in [{'runtime':'Unity'},{'runtimeVersion':'0.150.0'},{'platform':'native'},{'rights':'GPL-3.0'},{'readiness':'integration_tested'},{'readiness':'source_reviewed'}]:
            value=recommend(self.brief('cozy'),self.documents,constraints=constraint)
            self.assertEqual(value['items'],[]);self.assertEqual(value['hardConstraints'],constraint);self.assertIn('No recipe',value['emptyAction'])
    def test_explicit_brief_conflict_rejected(self):
        b=self.brief('cozy');b['constraints']['runtime']={'value':'Unity','origin':'explicit'}
        with self.assertRaises(ValueError):recommend(b,self.documents,constraints={'runtime':'Three.js'})
    def test_withdrawn_stale_or_uncleared_component_excludes_recipe(self):
        for mutate in [lambda d:d['data'].update(source_commit='0'*40),lambda d:d['data']['rights'].update(status='review_required'),lambda d:d['data']['rights'].update(scope=[])]:
            docs=copy.deepcopy(self.documents);mutate(next(d for d in docs if d['id']=='three-mapcontrols'))
            self.assertNotIn('cozy-builder',[r['template']['id'] for r in recommend(self.brief('cozy'),docs)['items']])
        docs=[d for d in self.documents if d['id']!='three-mapcontrols']
        self.assertNotIn('cozy-builder',[r['template']['id'] for r in recommend(self.brief('cozy'),docs)['items']])
    def test_invalid_input_has_no_silent_coercion(self):
        with self.assertRaises(ValueError):recommend({'revision':True,'constraints':{}},self.documents)
        with self.assertRaises(ValueError):recommend(self.brief('cozy'),self.documents,constraints={'secret':'ignored'})

        with self.assertRaises(ValueError):recommend(self.brief('cozy'),self.documents,constraints=[])
        with self.assertRaises(ValueError):recommend({'revision':1,'constraints':{'unknown':{'value':'x','origin':'explicit'}}},self.documents)
