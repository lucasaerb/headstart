"""Opt-in local outcome wrappers. Packaged MCP and integration core stay unchanged."""
import argparse
import hashlib
import hmac
import json
import os
from pathlib import Path
import secrets
import sqlite3
import stat
import sys
if __package__ in (None, ''):
    sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
    __package__ = 'services.operations'
from .events import EventStore, token

ROOT = Path(__file__).resolve().parents[2]


def private_json(path):
    fd = os.open(path, os.O_RDONLY | os.O_NOFOLLOW | os.O_NONBLOCK)
    with os.fdopen(fd, 'rb') as handle:
        info = os.fstat(handle.fileno())
        if not stat.S_ISREG(info.st_mode) or info.st_uid != os.getuid() or stat.S_IMODE(info.st_mode) != 0o600:
            raise ValueError('Use a private mode0600 consent file')
        raw = handle.read(1025)
    if len(raw) > 1024:
        raise ValueError('Consent file is oversized')
    value = json.loads(raw)
    if not isinstance(value, dict) or set(value) != {'version', 'consent', 'deletionToken'} or type(value['version']) is not int or value['version'] != 1:
        raise ValueError('Invalid local consent version')
    token(value['deletionToken'])
    if type(value['consent']) is not bool:
        raise ValueError('Explicit boolean local consent required')
    return value


class Recorder:
    def __init__(self, *, for_deletion=False):
        self.store = None
        self.db = None
        if os.environ.get('HEADSTART_TELEMETRY') != '1' and not for_deletion:
            return
        try:
            consent = private_json(os.environ['HEADSTART_TELEMETRY_CONSENT_FILE'])
            if consent['consent'] is not True and not for_deletion:
                return
            path = Path(os.environ['HEADSTART_TELEMETRY_DATABASE']).expanduser()
            parent = path.parent.stat()
            if not path.is_absolute() or path.parent.is_symlink() or parent.st_uid != os.getuid() or stat.S_IMODE(parent.st_mode) != 0o700:
                raise ValueError('Use a private mode0700 database directory')
            fd = os.open(path, os.O_RDWR | os.O_CREAT | os.O_NOFOLLOW | os.O_NONBLOCK, 0o600)
            info = os.fstat(fd)
            os.close(fd)
            if not stat.S_ISREG(info.st_mode) or info.st_uid != os.getuid() or stat.S_IMODE(info.st_mode) != 0o600:
                raise ValueError('Use a private mode0600 database')
            self.db = sqlite3.connect(path, timeout=2)
            self.store = EventStore(self.db, enabled=True)
            self.deletion_token = consent['deletionToken']
            self.consent_path = os.environ['HEADSTART_TELEMETRY_CONSENT_FILE']
        except (OSError, ValueError, KeyError, sqlite3.Error):
            # Optional collection never changes a successful product action.
            if self.db:
                self.db.close()
            self.db = None
            self.store = None
            sys.stderr.write('Optional local outcome collection is disabled: check private consent/database configuration.\n')

    def completed(self, kind):
        if self.store is None:
            return
        event_id = (hmac.new(self.store.salt, ('first_plan:' + self.deletion_token).encode(), hashlib.sha256).hexdigest()
                    if kind == 'first_plan' else secrets.token_hex(32))
        try:
            # Serialize against deletion, and never cache a long-lived MCP user's
            # consent. Forget writes consent=false before taking this DB lock.
            with self.db:
                self.db.execute('BEGIN IMMEDIATE')
                current = private_json(self.consent_path)
                if current['consent'] is not True or current['deletionToken'] != self.deletion_token:
                    return
                self.store.collect({'eventId': event_id, 'deletionToken': self.deletion_token, 'type': kind},
                                   consent=True, completed_action=True)
        except (OSError, ValueError, sqlite3.Error):
            sys.stderr.write('Optional local outcome could not be recorded.\n')

    def close(self):
        if self.db:
            self.db.close()

    def forget(self):
        if self.store is None:
            raise ValueError('Private deletion configuration is unavailable')
        value = private_json(self.consent_path)
        if value['deletionToken'] != self.deletion_token:
            raise ValueError('Local deletion configuration changed')
        value['consent'] = False
        fd = os.open(self.consent_path, os.O_WRONLY | os.O_NOFOLLOW | os.O_NONBLOCK)
        with os.fdopen(fd, 'wb') as handle:
            info = os.fstat(handle.fileno())
            if not stat.S_ISREG(info.st_mode) or info.st_uid != os.getuid() or stat.S_IMODE(info.st_mode) != 0o600:
                raise ValueError('Unsafe consent file')
            handle.truncate(0)
            handle.write(json.dumps(value).encode())
        return self.store.forget(self.deletion_token)


def mcp(recorder):
    sys.path.insert(0, str(ROOT / 'HeadStart-Starter-Package/headstart-plugin/scripts'))
    import catalog_mcp
    original = catalog_mcp.Server.dispatch

    def dispatch(server, request):
        response = original(server, request)
        if (isinstance(request, dict) and request.get('method') == 'tools/call' and
                isinstance(request.get('params'), dict) and request['params'].get('name') in ('search_components', 'get_component') and
                isinstance(response, dict) and isinstance(response.get('result'), dict) and response['result'].get('isError') is False):
            recorder.completed('plugin_lookup')
        return response

    catalog_mcp.Server.dispatch = dispatch
    try:
        catalog_mcp.main()
    finally:
        catalog_mcp.Server.dispatch = original


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest='action', required=True)
    sub.add_parser('mcp')
    sub.add_parser('forget')
    plan = sub.add_parser('plan')
    plan.add_argument('target'); plan.add_argument('packet'); plan.add_argument('output')
    plan.add_argument('--author', default='local-builder')
    args = parser.parse_args()
    recorder = Recorder(for_deletion=args.action == 'forget')
    try:
        if args.action == 'mcp':
            mcp(recorder)
        elif args.action == 'forget':
            print(json.dumps({'deleted': recorder.forget(), 'localConsent': False}))
        else:
            from tools.integration.workflow import plan as prepare, read_json, write_json
            value = prepare(args.target, read_json(args.packet), author=args.author)
            write_json(args.output, value)
            recorder.completed('first_plan')
            print(json.dumps(value, indent=2))
    finally:
        recorder.close()


if __name__ == '__main__':
    main()
