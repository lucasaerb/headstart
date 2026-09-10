import math
import unittest
from .runner import load_frozen,metrics,violates

class EvaluationTests(unittest.TestCase):
    def test_frozen_coverage_and_split(self):
        _,corpus,queries=load_frozen();self.assertEqual(30,len(corpus));self.assertEqual(100,len(queries));self.assertEqual(100,len({q['id'] for q in queries}))
        self.assertEqual(50,sum(q['split']=='heldout' for q in queries))
        for start in range(0,60,2):self.assertEqual(queries[start]['split'],queries[start+1]['split'])
        for category in ['title','ordinary-language','composite','geospatial','simulation-rts','hard-filter']:self.assertTrue(any(q['category']==category for q in queries),category)
    def test_hand_calculated_discounted_gain_and_recall(self):
        relevance={'a':3,'b':1}
        self.assertEqual({'ndcgAt10':1.0,'recallAt20':1.0},metrics(['a','b'],relevance))
        result=metrics(['b','a'],relevance)
        self.assertAlmostEqual((1+7/math.log2(3))/(7+1/math.log2(3)),result['ndcgAt10'])
        self.assertEqual(.5,metrics(['a','a','x'],relevance)['recallAt20'])
        self.assertEqual({'ndcgAt10':None,'recallAt20':None},metrics(['x'],{}))
        self.assertEqual(0,metrics([],relevance)['ndcgAt10'])
    def test_independent_filter_pair_and_unknowns(self):
        _,corpus,_=load_frozen();row=next(r for r in corpus if r['id']=='2048-tile')
        self.assertFalse(violates(row,{'type':'component','rights':'MIT'}))
        self.assertTrue(violates(row,{'platform':'mobile'}))
        row['data']['compatibility']=[{'runtime':'Unity','version_range':'2022','support':'reference_only'},{'runtime':'JavaScript','version_range':'1','support':'tested'}]
        self.assertTrue(violates(row,{'runtime':'Unity','runtime_version':'1'}))
        self.assertFalse(violates(row,{'runtime':'JavaScript','runtime_version':'1'}))

if __name__=='__main__':unittest.main()
