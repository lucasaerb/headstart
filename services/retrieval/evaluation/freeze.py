"""One-time authoring command. Refuses to overwrite a frozen evaluation."""
import hashlib
import json
import tempfile
from pathlib import Path
from services.catalog.store import CatalogStore
from services.catalog.seed import seed_reviewed_tile
from services.catalog.search import public_documents
from services.curation.seed import seed_curated_capabilities
from services.curation.review_specs import SPECS
from .query_spec import PARAPHRASES,COMPOSITES,NEGATIVES

ROOT=Path(__file__).parent
def write(name,value):
    with (ROOT/name).open('x') as file:json.dump(value,file,indent=2,ensure_ascii=False);file.write('\n')

def freeze():
    if any((ROOT/name).exists() for name in ['queries.json','corpus.json','freeze.json']):raise RuntimeError('Frozen corpus exists; create a new independently reviewed version instead.')
    with tempfile.TemporaryDirectory() as tmp:
        store=CatalogStore(Path(tmp)/'catalog.db',Path(tmp)/'evidence')
        try:
            seed_reviewed_tile(store);seed_curated_capabilities(store)
            docs=[r for r in public_documents(store) if r['type']=='component']
        finally:store.close()
    bykey={Path(spec[0]).stem:'three-'+Path(spec[0]).stem.lower() for spec in SPECS};bykey['Tile']='2048-tile'
    byid={row['id']:row for row in docs};assert len(byid)==30 and set(byid)==set(bykey.values())
    rationale={Path(s[0]).stem:s[4] for s in SPECS};rationale['Tile']='Inspected Tile constructor, savePosition/updatePosition and serialize; no renderer, game rules, cloud persistence or restore loader.'
    queries=[]
    def add(q,split,category,grades,reason,filters=None,intent=None):
        relevance={bykey[k]:grade for k,grade in grades.items()}
        evidence={id:[{'path':e['path'],'digest':e['digest'],'source_commit':e['source_commit']} for e in byid[id]['data']['evidence']] for id in relevance}
        queries.append({'id':f'Q{len(queries)+1:03d}','split':split,'category':category,'q':q,'filters':{'type':'component',**(filters or {})},'relevance':relevance,'defaultGrade':0,'rationale':reason,'evidence':evidence,'intent':intent or {'capabilities':[],'style':[],'compatibility':filters or {}}})
    for i,(key,plain,related) in enumerate(PARAPHRASES):
        split='tuning' if i%2==0 else 'heldout'
        filters={'rights':'MIT'} if i%5==0 else {'readiness':'source_reviewed'} if i%7==0 else {}
        add(byid[bykey[key]]['title'],split,'title',{key:3},'Exact requested scoped component identity. '+rationale[key],filters)
        add(plain,split,'ordinary-language',{key:3,**related},rationale[key]+' Other nonzero judgments are useful partial source alternatives; not equivalent tested integrations.')
    for i,(q,grades,reason) in enumerate(COMPOSITES):add(q,'tuning' if i%2==0 else 'heldout','composite',grades,reason)
    for i,(q,filters,category,reason) in enumerate(NEGATIVES):add(q,'tuning' if i%2==0 else 'heldout',category,{},reason,filters)
    assert len(queries)==100
    assert sum(q['split']=='heldout' for q in queries)==50
    write('corpus.json',{'schemaVersion':'headstart-eval-corpus-1','scope':'eligible-component-metadata-only','documents':docs})
    write('queries.json',{'schemaVersion':'headstart-judgments-1','author':'batch1_foundation independent of retrieval implementation','gradeScale':{'0':'No scoped support','1':'Useful partial piece or weak alternative','2':'Substantial related capability','3':'Direct scoped match'},'pairSplit':'Exact title and its paraphrase stay together; alternating component groups. Composites and negatives alternate independently.','queries':queries})
    digests={name:hashlib.sha256((ROOT/name).read_bytes()).hexdigest() for name in ['queries.json','corpus.json','query_spec.py']}
    write('freeze.json',{'schemaVersion':'headstart-evaluation-freeze-1','status':'frozen-before-ranking-evaluation','digests':digests,'queryCount':100,'tuning':50,'heldout':50,'canonicalComponents':30,'targets':{'ndcgAt10':0.75,'recallAt20':0.90,'hardFilterViolations':0}})
    print(json.dumps(digests,indent=2))

if __name__=='__main__':freeze()
