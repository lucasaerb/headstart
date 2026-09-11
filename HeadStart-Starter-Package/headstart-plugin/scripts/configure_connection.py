#!/usr/bin/env python3
"""Configure this extracted plugin for explicit localhost metadata access or offline research."""
from __future__ import annotations
import argparse
import hashlib
import json
import os
from pathlib import Path
import stat
import tempfile
from urllib.parse import urlsplit


def configure(root: Path, origin: str | None = None, credential: str | None = None):
    root = root.absolute()
    if root.is_symlink() or not root.is_dir():
        raise ValueError('Choose a real extracted plugin directory.')
    if origin is not None:
        try:
            url = urlsplit(origin)
            valid = (url.scheme == 'http' and url.hostname in ('127.0.0.1', '::1') and
                     url.port and not (url.username or url.password or url.path or url.query or url.fragment) and
                     not any(c.isspace() for c in origin))
        except ValueError:
            valid = False
        if not valid:
            raise ValueError('Use an exact numeric loopback HTTP origin with a port and no path.')
    elif credential is not None:
        raise ValueError('A credential file requires a localhost origin.')
    env = {'HEADSTART_CATALOG_ORIGIN': origin} if origin else {}
    if credential:
        path = Path(credential).expanduser()
        if not path.is_absolute() or path.is_symlink():
            raise ValueError('Use an absolute private credential file path, not a symlink.')
        info = path.stat()
        if not stat.S_ISREG(info.st_mode) or info.st_uid != os.getuid() or stat.S_IMODE(info.st_mode) != 0o600:
            raise ValueError('Credential file must be owned by you and mode0600.')
        env['HEADSTART_CREDENTIAL_FILE'] = str(path)
    names = ['mcp.json', 'plugin.json', '.codex-plugin/plugin.json']
    paths = [root / name for name in names]
    for path in paths:
        if path.is_symlink() or path.parent.is_symlink() or not path.is_file():
            raise ValueError('Plugin configuration files must be real regular files.')
    values = [json.loads(p.read_text()) for p in paths]
    mcp, manifest, legacy = values
    if manifest.get('name') != 'headstart-plugin' or legacy.get('name') != 'headstart-plugin':
        raise ValueError('Not a HeadStart plugin.')
    base = manifest.get('version', '').split('+')[0]
    if base != '0.7.0' or legacy.get('version', '').split('+')[0] != base:
        raise ValueError('This helper requires HeadStart 0.7.0; do not mix releases.')
    server = mcp.get('mcpServers', {}).get('headstart')
    if not isinstance(server, dict) or server.get('command') != 'python3' or server.get('args') != ['-B', '${PLUGIN_ROOT}/scripts/catalog_mcp.py']:
        raise ValueError('Unexpected MCP command; restore the complete archive first.')
    server['env'] = env
    suffix = hashlib.sha256(json.dumps(env, sort_keys=True).encode()).hexdigest()[:12]
    # A local version avoids an installed cache silently retaining old connection values.
    for value in (manifest, legacy):
        value['version'] = base + '+local.' + suffix
    staged = []
    originals = [p.read_bytes() for p in paths]
    changed = []
    try:
        for path, value in zip(paths, values):
            with tempfile.NamedTemporaryFile(dir=path.parent, prefix='.headstart-config-', delete=False) as f:
                staged.append(Path(f.name))
                f.write((json.dumps(value, indent=2) + '\n').encode())
        for path, temporary in zip(paths, staged):
            os.replace(temporary, path)
            changed.append(path)
    except OSError:
        for path, original in zip(paths, originals):
            if path in changed:
                path.write_bytes(original)
        raise
    finally:
        for temporary in staged:
            temporary.unlink(missing_ok=True)
    return {'mode': 'localhost' if origin else 'offline', 'version': manifest['version']}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('mode', choices=['localhost', 'offline'])
    parser.add_argument('--origin')
    parser.add_argument('--credential-file')
    args = parser.parse_args()
    if args.mode == 'localhost' and not args.origin:
        parser.error('localhost requires --origin')
    if args.mode == 'offline' and (args.origin or args.credential_file):
        parser.error('offline accepts no connection parameters')
    try:
        result = configure(Path(__file__).resolve().parent.parent, args.origin, args.credential_file)
    except (OSError, ValueError, TypeError, KeyError) as error:
        parser.exit(1, 'Setup failed: ' + str(error) + '\n')
    print('Configured ' + result['mode'] + ' mode (' + result['version'] + '). Re-add this plugin from its marketplace and start a new Codex thread. No client connection is confirmed.')


if __name__ == '__main__':
    main()
