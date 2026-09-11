#!/usr/bin/env python3
"""Build a deterministic, metadata-only Codex plugin ZIP (Python 3.10+)."""
from __future__ import annotations
import argparse
import hashlib
import json
import os
from pathlib import Path
import re
import stat
import tempfile
import zipfile

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
SOURCE = ROOT / 'HeadStart-Starter-Package/headstart-plugin'
MAX_FILE = 8 * 1024 * 1024
MAX_TOTAL = 32 * 1024 * 1024
REQUIRED = {'.codex-plugin/plugin.json', 'plugin.json', 'mcp.json', 'README.md',
            'scripts/catalog_mcp.py', 'scripts/inspect_project.py', 'scripts/live_catalog.py', 'scripts/configure_connection.py', 'scripts/review_evidence.py', 'scripts/integration_review_context.py', 'scripts/recommendation_context.py',
            'references/discovery-catalog.json', 'references/discovery-manifest.json',
            'references/review-rubric.json', 'references/review-rubric.md', 'references/review-records.md', 'references/local-integration-workflow.md',
            'references/starting-project-media.json', 'references/technology-companions.md'}
REQUIRED |= {f'skills/headstart-{name}/SKILL.md' for name in
             ('find', 'inspect', 'plan', 'integrate', 'validate', 'credit', 'threejs-starter', 'unity', 'blender', 'art-direction', 'performance-review', 'code-review')}


def allowed(path: str) -> bool:
    parts = path.split('/')
    if path in {'.codex-plugin/plugin.json', 'plugin.json', 'mcp.json', 'README.md', 'LICENSE', 'LICENSE.md'}:
        return True
    if len(parts) == 2 and parts[0] == 'scripts':
        return parts[1] in {'catalog_mcp.py', 'inspect_project.py', 'live_catalog.py', 'configure_connection.py', 'review_evidence.py', 'integration_review_context.py', 'recommendation_context.py'}
    if len(parts) == 2 and parts[0] == 'references':
        return parts[1].endswith(('.md', '.json')) and not parts[1].startswith('.')
    if len(parts) == 3 and parts[0] == 'skills':
        return parts[2] == 'SKILL.md' and re.fullmatch(r'headstart-[a-z-]+', parts[1]) is not None
    if len(parts) == 4 and parts[0] == 'skills' and parts[2:] == ['agents', 'openai.yaml']:
        return re.fullmatch(r'headstart-[a-z-]+', parts[1]) is not None
    return False


def read_payload(source: Path) -> dict[str, bytes]:
    if source.is_symlink() or not source.is_dir():
        raise ValueError('Plugin source must be a real directory, not a symlink')
    payload = {}
    total = 0
    for directory, dirs, files in os.walk(source, followlinks=False):
        for name in dirs + files:
            path = Path(directory) / name
            if path.is_symlink():
                raise ValueError(f'Symlinks are not distributable: {path.relative_to(source)}')
        for name in files:
            path = Path(directory) / name
            relative = path.relative_to(source).as_posix()
            if not allowed(relative):
                continue
            if not stat.S_ISREG(path.stat().st_mode):
                raise ValueError(f'Not a regular file: {relative}')
            if path.stat().st_size > MAX_FILE:
                raise ValueError(f'Payload file exceeds size budget: {relative}')
            data = path.read_bytes()
            total += len(data)
            if total > MAX_TOTAL:
                raise ValueError('Plugin exceeds payload size budget')
            payload[relative] = data
    missing = REQUIRED - payload.keys()
    if missing:
        raise ValueError('Missing required plugin files: ' + ', '.join(sorted(missing)))
    return payload


def encoded(value: object) -> bytes:
    return (json.dumps(value, indent=2, sort_keys=True, ensure_ascii=False) + '\n').encode()


def build(source: Path, output: Path) -> dict:
    payload = read_payload(source)
    manifest = json.loads(payload['plugin.json'])
    legacy = json.loads(payload['.codex-plugin/plugin.json'])
    if any(manifest.get(k) != legacy.get(k) for k in ('name', 'version')):
        raise ValueError('Canonical and legacy manifest identity/version mismatch')
    if manifest.get('name') != 'headstart-plugin':
        raise ValueError('Unexpected plugin identifier')
    version = manifest.get('version')
    if not isinstance(version, str) or not re.fullmatch(r'[A-Za-z0-9][A-Za-z0-9.+_-]{0,127}', version):
        raise ValueError('Invalid plugin version')
    marketplace = (HERE / 'templates/marketplace.json').read_bytes()
    market = json.loads(marketplace)
    if market.get('name') != 'personal' or len(market.get('plugins', [])) != 1:
        raise ValueError('Unexpected distribution marketplace')
    entry = market['plugins'][0]
    if entry.get('name') != 'headstart-plugin' or entry.get('source') != {'source': 'local', 'path': './plugins/headstart-plugin'}:
        raise ValueError('Marketplace does not resolve bundled plugin')
    files = {'plugins/headstart-plugin/' + name: value for name, value in payload.items()}
    files['.agents/plugins/marketplace.json'] = marketplace
    files['README.md'] = (HERE / 'templates/INSTALL.md').read_bytes()
    report = {'schema_version': '1.0', 'name': manifest['name'], 'version': version,
              'distribution': 'private-local-preview',
              'files': {name: {'sha256': hashlib.sha256(data).hexdigest(), 'bytes': len(data)}
                        for name, data in sorted(files.items())}}
    files['distribution-manifest.json'] = encoded(report)
    output = output.absolute()
    if output.suffix != '.zip' or output.is_symlink():
        raise ValueError('Output must be a non-symlink .zip path')
    if source.resolve() == output.parent.resolve() or source.resolve() in output.resolve().parents:
        raise ValueError('Output must be outside plugin source')
    output.parent.mkdir(parents=True, exist_ok=True)
    temporary = None
    try:
        with tempfile.NamedTemporaryFile(dir=output.parent, prefix='.headstart-', suffix='.zip', delete=False) as handle:
            temporary = Path(handle.name)
        with zipfile.ZipFile(temporary, 'w', compression=zipfile.ZIP_STORED) as archive:
            for name, data in sorted(files.items()):
                info = zipfile.ZipInfo(name, date_time=(1980, 1, 1, 0, 0, 0))
                info.create_system = 3
                info.external_attr = (stat.S_IFREG | 0o644) << 16
                archive.writestr(info, data)
        os.replace(temporary, output)
    finally:
        if temporary is not None:
            temporary.unlink(missing_ok=True)
    return {'archive': str(output), 'sha256': hashlib.sha256(output.read_bytes()).hexdigest(),
            'version': version, 'files': len(files)}


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', type=Path, default=SOURCE)
    parser.add_argument('--output', type=Path, default=ROOT / 'dist/headstart-plugin/headstart-plugin.zip')
    args = parser.parse_args()
    try:
        print(json.dumps(build(args.source, args.output), indent=2))
    except (ValueError, OSError, json.JSONDecodeError) as exc:
        parser.exit(1, f'Build failed: {exc}\n')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
