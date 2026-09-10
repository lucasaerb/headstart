"""Reviewed metadata for one bounded real component; never the entire 2048 game."""
import hashlib
from pathlib import Path

ROOT=Path(__file__).parent/'fixtures'/'2048'
COMMIT='478b6ec346e3787f589e4af751378d06ded4cbbc'
DIGESTS={'LICENSE.txt':'57e12c39a6ad9d98b2e451065bfdfbd15fc9e0c2ed3bf4dc1d09acab41ff02fc','tile.js':'13699e51d62179a6d36874108831a29901a98d6e11329918e64cfb5ee82d58e3'}

def seed_reviewed_tile(store):
    def envelope(kind,id,data):
        return {'schema_version':'0.2','entity_type':kind,'id':id,'version':'1','data':data}
    evidence=[]
    for path,filename,claim in [('js/tile.js','tile.js','Static inspection: standalone Tile position/value state, savePosition, updatePosition and serialize; no imports; no execution or target compatibility test.'),('LICENSE.txt','LICENSE.txt','MIT license text names Gabriele Cirulli, 2014; preserve copyright and permission notice for this two-file scope.')]:
        raw=(ROOT/filename).read_bytes();digest=DIGESTS[filename]
        store.put_blob(raw,digest)
        evidence.append({'path':path,'digest':digest,'source_commit':COMMIT,'origin':'curator','claim_type':'inspected','reviewer':'batch1_data static source review','observed_at':'2026-09-10T00:00:00Z','claim':claim})
    rights={'status':'scope_cleared','scope':['js/tile.js','LICENSE.txt'],'code_spdx':'MIT','asset_status':'excluded','notices':[(ROOT/'LICENSE.txt').read_text()],'evidence':[evidence[1]]}
    records=[
        envelope('project','2048',{'title':'2048','repository_url':'https://github.com/gabrielecirulli/2048'}),
        envelope('project_version','2048-tile-source',{'project_id':'2048','source_commit':COMMIT,'publication_state':'published','rights':rights,'evidence':evidence}),
        envelope('component','2048-tile',{'project_id':'2048','name':'2048 tile state and serialization','concept_ids':['capability.game-state'],'ontology_version':'0.2'}),
        envelope('component_version','2048-tile-v1',{'component_id':'2048-tile','project_version':{'id':'2048-tile-source','version':'1'},'source_commit':COMMIT,'readiness':'source_reviewed','scope':{'required_files':['js/tile.js','LICENSE.txt'],'optional_files':[],'excluded_systems':['board rules','input','rendering','CSS','images','audio','complete game'],'coupling_notes':['Global Tile constructor uses mutable position/value fields. An adapter is needed for a modules-based target; no target integration has been tested.']},'dependencies':[],'compatibility':[{'runtime':'JavaScript','version_range':None,'support':'reference_only'}],'rights':rights,'evidence':evidence,'verification':None})
    ]
    with store.transaction():
        for record in records:store.put_record(record)
    return records
