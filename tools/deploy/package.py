"""Build a reviewed, explicit-allowlist Vercel deployment outside the checkout."""
import argparse
import hashlib
import json
from pathlib import Path
import shutil
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT))
from services.catalog.initialize import initialize
from services.catalog.search import public_documents
from services.catalog.store import CatalogStore
from services.retrieval import model, engine


def package(destination):
    destination = Path(destination).resolve()
    if destination.exists():
        raise ValueError('Choose a new empty deployment directory; existing files are never overwritten.')
    if ROOT == destination or ROOT in destination.parents:
        raise ValueError('Deployment artifacts must be outside the repository.')
    if model.availability() is not None:
        raise ValueError('Install the pinned retrieval dependencies/model before packaging: ' + str(model.availability()))
    destination.mkdir(parents=True)
    site = ROOT / 'HeadStart-Starter-Package/site/dist'
    subprocess.run(['node', 'build.mjs'], cwd=site, check=True)
    shutil.copytree(site / 'public', destination / 'public')
    (destination / 'api').mkdir()
    shutil.copyfile(site / 'api/subscribe.js', destination / 'api/subscribe.js')
    shutil.copyfile(ROOT / 'tools/deploy/catalog.py', destination / 'api/catalog.py')
    for relative in ['services/catalog/__init__.py', 'services/catalog/api.py', 'services/catalog/store.py', 'services/catalog/search.py', 'services/retrieval/__init__.py', 'services/retrieval/engine.py', 'services/retrieval/model.py', 'services/retrieval/model-manifest.json', 'services/retrieval/aliases.json', 'contracts/__init__.py', 'contracts/validate.py', 'contracts/entity.schema.json', 'contracts/ontology.json']:
        target = destination / relative
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(ROOT / relative, target)
    runtime = destination / 'runtime'
    runtime.mkdir()
    counts = initialize(runtime / 'catalog.sqlite3', runtime / 'evidence')
    shutil.copytree(model.model_dir(), runtime / 'model')
    # Prime vectors solely from the exact public metadata projection; no source bodies.
    import os
    old_cache = os.environ.get('HEADSTART_EMBEDDING_CACHE')
    os.environ['HEADSTART_EMBEDDING_CACHE'] = str(runtime / 'vectors')
    store = CatalogStore(runtime / 'catalog.sqlite3', runtime / 'evidence')
    try:
        published = public_documents(store)
        research = json.loads(store.db.execute('SELECT payload FROM display_projection WHERE id=1').fetchone()['payload'])
        engine.vectors([engine.document_text(row) for row in published])
        engine.vectors([engine.document_text(row, True) for row in research])
    finally:
        store.close()
        if old_cache is None: os.environ.pop('HEADSTART_EMBEDDING_CACHE', None)
        else: os.environ['HEADSTART_EMBEDDING_CACHE'] = old_cache
    manifest = {'schemaVersion': 1, 'gitRevision': subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=ROOT, text=True).strip(), 'databaseSha256': hashlib.sha256((runtime / 'catalog.sqlite3').read_bytes()).hexdigest(), 'counts': counts, 'modelVersion': model.MODEL_VERSION}
    (runtime / 'snapshot.json').write_text(json.dumps(manifest, indent=2) + '\n')
    shutil.copyfile(ROOT / 'tools/deploy/requirements.txt', destination / 'requirements.txt')
    (destination / '.python-version').write_text('3.12\n')
    (destination / 'package.json').write_text(json.dumps({'name':'headstart-production','private':True,'type':'module','engines':{'node':'22.x'},'dependencies':{'@vercel/blob':'2.8.0'}}, indent=2)+'\n')
    (destination / 'build.mjs').write_text('// Assets are verified and assembled by tools/deploy/package.py.\n')
    configuration = {'$schema':'https://openapi.vercel.sh/vercel.json','framework':None,'buildCommand':'node build.mjs','outputDirectory':'public','functions':{'api/catalog.py':{'maxDuration':60,'excludeFiles':'{public/**,node_modules/**,api/subscribe.js,package-lock.json}'},'api/subscribe.js':{'excludeFiles':'{runtime/**,services/**,contracts/**,public/**}'}},'routes':[{'src':'^/api/research$','dest':'/api/catalog'},{'src':'^/api/catalog/search$','dest':'/api/catalog'},{'src':'^/v1/.*$','dest':'/api/catalog'},{'handle':'filesystem'}]}
    (destination / 'vercel.json').write_text(json.dumps(configuration, indent=2)+'\n')
    print(json.dumps({'directory':str(destination),**manifest}))
    return manifest

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('destination')
    package(parser.parse_args().destination)
