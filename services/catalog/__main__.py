"""Local-only catalog operations: python3 -m services.catalog --help."""
import argparse
import json
from pathlib import Path
from .store import CatalogStore

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--database', default='.local/catalog.sqlite3')
parser.add_argument('--evidence', default='.local/evidence')
commands = parser.add_subparsers(dest='command', required=True)
commands.add_parser('migrate')
imp = commands.add_parser('import-research'); imp.add_argument('path')
export = commands.add_parser('export'); export.add_argument('path')
backup = commands.add_parser('backup'); backup.add_argument('path')
reset = commands.add_parser('reset'); reset.add_argument('--confirm-local-reset', action='store_true', required=True)
args = parser.parse_args()
if args.command == 'reset':
    Path(args.database).unlink(missing_ok=True)
    print('Local metadata reset; evidence retained. Re-run migrate/import-research.')
else:
    store = CatalogStore(args.database, args.evidence)
    try:
        if args.command == 'import-research':
            print(json.dumps({'research_count':store.import_research(args.path),'published_count':len(store.records())}))
        elif args.command == 'export':
            with open(args.path,'x') as file:
                json.dump(store.export(),file,indent=2)
            print('Metadata exported; copy evidence directory separately.')
        elif args.command == 'backup':
            if Path(args.path).exists():
                parser.error('Backup path already exists')
            store.backup(args.path)
            print('Metadata backed up; copy evidence directory separately.')
        else:
            print('Migration 1 ready')
    finally:
        store.close()
