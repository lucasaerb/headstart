"""Explicit idempotent local seed command; never runs on public requests."""
import json
import os
import secrets
from pathlib import Path
from .store import CatalogStore,encode
from .seed import seed_reviewed_tile
from services.curation.seed import seed_curated_capabilities

ROOT=Path(__file__).resolve().parents[2]
def initialize(database=None,evidence=None):
    database=database or os.environ.get('HEADSTART_CATALOG_DB',ROOT/'.local/catalog.sqlite3')
    evidence=evidence or os.environ.get('HEADSTART_EVIDENCE_DIR',ROOT/'.local/evidence')
    store=CatalogStore(database,evidence)
    try:
        count=store.import_research(ROOT/'research/catalog/catalog.json')
        seed_reviewed_tile(store)
        seed_curated_capabilities(store)
        text=(ROOT/'HeadStart-Starter-Package/site/dist/catalog.js').read_text()
        projection=json.loads(text.removeprefix('window.HEADSTART_CATALOG = ').strip().removesuffix(';'))
        if not isinstance(projection,list) or any(not isinstance(r,dict) or not r.get('id') for r in projection): raise ValueError('Invalid display projection')
        if len({r['id'] for r in projection})!=len(projection): raise ValueError('Duplicate display IDs')
        with store.transaction():
            store.db.execute('CREATE TABLE IF NOT EXISTS display_projection(id INTEGER PRIMARY KEY CHECK(id=1),payload TEXT NOT NULL)')
            store.db.execute('INSERT INTO display_projection VALUES(1,?) ON CONFLICT(id) DO UPDATE SET payload=excluded.payload',(encode(projection),))
        (ROOT/'.local').mkdir(exist_ok=True)
        try:
            fd=os.open(ROOT/'.local/cursor.key',os.O_WRONLY|os.O_CREAT|os.O_EXCL,0o600)
            with os.fdopen(fd,'wb') as file:file.write(secrets.token_bytes(32))
        except FileExistsError: pass
        return {'researchCount':count,'displayReferenceCount':len(projection),'eligibleScopedVersions':len(store.records())}
    finally: store.close()

if __name__=='__main__': print(json.dumps(initialize()))
