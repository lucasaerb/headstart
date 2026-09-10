#!/usr/bin/env python3
"""Refresh repository-level GitHub star observations using the public API."""
from __future__ import annotations
import argparse
from collections import Counter
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
import hashlib
import json
import os
from pathlib import Path
import re
import tempfile
from urllib.error import HTTPError, URLError
from urllib.parse import urlsplit
from urllib.request import HTTPRedirectHandler, Request, build_opener

ROOT = Path(__file__).resolve().parents[1]
MAX_BYTES = 1024 * 1024
TIMEOUT = 20


def now():
    return datetime.now(timezone.utc).isoformat(timespec='seconds').replace('+00:00', 'Z')


class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def request_bytes(endpoint):
    request = Request(endpoint, headers={'Accept': 'application/vnd.github+json',
                                        'User-Agent': 'HeadStart-public-popularity'})
    with build_opener(NoRedirect).open(request, timeout=TIMEOUT) as response:
        body = response.read(MAX_BYTES + 1)
        if len(body) > MAX_BYTES:
            raise ValueError('Response exceeds metadata size limit')
        return response.status, body


def observe(repo_url, fetch=request_bytes):
    parsed = urlsplit(repo_url)
    stamp = now()
    row = dict(repo_url=repo_url, stars=None, status='unavailable', checked_at=stamp,
               evidence_url=repo_url, notes='')
    audit = dict(repo_url=repo_url, requested_at=stamp)
    if parsed.scheme != 'https' or not parsed.hostname or parsed.username or parsed.password or parsed.port or parsed.query or parsed.fragment:
        raise ValueError('Repository URL must be canonical HTTPS without credentials or extras')
    if parsed.hostname != 'github.com':
        row.update(status='not_github', notes='GitHub star metric does not apply to this repository host.')
        audit.update(status='not_github', checked_at=stamp)
        return row, audit
    # Repository names alone can influence this fixed API path; no dynamic host,
    # query, traversal, escaped separators, redirects or upstream source execution.
    if not re.fullmatch(r'/[A-Za-z0-9][A-Za-z0-9-]{0,38}/[A-Za-z0-9_.-]{1,100}', parsed.path):
        raise ValueError('Invalid canonical GitHub owner/repository path')
    if parsed.path.rsplit('/', 1)[1] in {'.', '..'}:
        raise ValueError('Invalid repository path')
    endpoint = 'https://api.github.com/repos' + parsed.path
    row['evidence_url'] = endpoint
    audit['evidence_url'] = endpoint
    try:
        status, body = fetch(endpoint)
        audit['http_status'] = status
        if status != 200 or len(body) > MAX_BYTES:
            raise ValueError('Unexpected HTTP status or metadata size')
        metadata = json.loads(body)
        stars = metadata.get('stargazers_count')
        if type(stars) is not int or stars < 0:
            raise ValueError('Missing or invalid star count')
        canonical = metadata.get('html_url')
        if not isinstance(canonical, str) or canonical.lower() != repo_url.lower():
            raise ValueError('Repository identity mismatch')
        row.update(stars=stars, status='available', checked_at=now(),
                   notes='Observed GitHub stargazers_count for the whole repository; shared by its subprojects. A popularity signal, not quality or compatibility evidence.')
        audit.update(status='available', checked_at=row['checked_at'], provider_id=metadata.get('id'),
                     canonical_url=canonical, stargazers_count=stars,
                     response_sha256=hashlib.sha256(body).hexdigest(), response_bytes=len(body))
    except HTTPError as exc:
        status_code = exc.code
        exc.close()
        audit.update(status='unavailable', http_status=status_code, checked_at=now())
        row.update(checked_at=audit['checked_at'], notes=f'Public GitHub API returned HTTP {status_code}; stars are unknown, not zero.')
    except (OSError, URLError, ValueError, TypeError, AttributeError) as exc:
        audit.update(status='unavailable', checked_at=now(), error_type=type(exc).__name__)
        row.update(checked_at=audit['checked_at'], notes='Public GitHub metadata could not be verified; stars are unknown, not zero.')
    return row, audit


def collect(records, fetch=request_bytes):
    urls = sorted({record['repo_url'] for record in records})
    started = now()
    with ThreadPoolExecutor(max_workers=4) as pool:
        results = list(pool.map(lambda url: observe(url, fetch), urls))
    stamp = now()
    snapshot = dict(schema_version='1.0', checked_at=stamp, repositories=[r for r, _ in results])
    audit = dict(schema_version='1.0', started_at=started, completed_at=stamp,
                 method='Public GitHub API on a fixed host with redirects disabled; repository identity verified. Subprojects share repository counts. No source execution.',
                 fetches=[a for _, a in results])
    return snapshot, audit


def atomic_json(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    if path.is_symlink():
        raise ValueError('Output may not be a symlink')
    temporary = None
    try:
        with tempfile.NamedTemporaryFile(mode='w', encoding='utf-8', dir=path.parent,
                                         prefix='.popularity-', delete=False) as handle:
            temporary = Path(handle.name)
            json.dump(value, handle, indent=2, allow_nan=False)
            handle.write('\n')
            handle.flush()
            os.fsync(handle.fileno())
        os.replace(temporary, path)
    finally:
        if temporary is not None:
            temporary.unlink(missing_ok=True)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=ROOT, help='Research catalog directory')
    args = parser.parse_args()
    try:
        records = [record for p in sorted((args.root / 'records').glob('*.json'))
                   for record in json.loads(p.read_text(encoding='utf-8'))]
        if not records:
            raise ValueError('No catalog records found')
        snapshot, audit = collect(records)
        atomic_json(args.root / 'evidence/github-popularity-audit.json', audit)
        atomic_json(args.root / 'github-popularity.json', snapshot)
        print(json.dumps({'repositories': len(snapshot['repositories']),
                          'statuses': dict(Counter(r['status'] for r in snapshot['repositories'])),
                          'checked_at': snapshot['checked_at']}, indent=2))
    except (OSError, ValueError, KeyError, TypeError) as exc:
        parser.exit(1, f'Popularity refresh failed: {exc}\n')


if __name__ == '__main__':
    main()
