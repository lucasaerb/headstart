#!/usr/bin/env python3
"""Audit curated research links without executing projects or asserting playability.

Python 3.10+ standard library only. HEAD first; a single bounded GET fallback is
allowed for HEAD 403/405. Connections use DNS-validated public addresses, including
on redirects. This local research helper is not a public ingestion service.
"""
from __future__ import annotations

import argparse
from collections import Counter
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
import http.client
import ipaddress
import json
from pathlib import Path
import socket
import ssl
import time
from urllib.parse import parse_qsl, quote, unquote, urljoin, urlsplit, urlunsplit

ROOT = Path(__file__).resolve().parents[1]
TIMEOUT = 15.0
BODY_LIMIT = 1024
REDIRECT_LIMIT = 5
REDIRECTS = {301, 302, 303, 307, 308}
ARCHIVES = ('.zip', '.tar', '.tar.gz', '.tgz', '.7z', '.rar', '.exe', '.msi', '.dmg', '.iso', '.apk', '.appimage', '.deb', '.rpm', '.gz', '.xz', '.bz2')


class UnsafeURL(ValueError):
    """The URL or resolved destination is outside this helper's boundary."""


def now():
    return datetime.now(timezone.utc).isoformat()


def public_address(value):
    ip = ipaddress.ip_address(value)
    # IPv4-mapped IPv6 must not bypass the underlying address policy.
    underlying = ip.ipv4_mapped if isinstance(ip, ipaddress.IPv6Address) else None
    return (ip.is_global and not ip.is_multicast and not ip.is_reserved
            and (underlying is None or (underlying.is_global and not underlying.is_multicast and not underlying.is_reserved)))


def validate_url(url, resolver=socket.getaddrinfo):
    """Return parsed URL plus approved IPs; reject mixed public/private DNS answers."""
    if not isinstance(url, str) or not url or len(url) > 8192:
        raise UnsafeURL('URL must be a nonempty string of at most 8192 characters')
    if any(ord(c) <= 32 or ord(c) == 127 for c in url) or '\\' in url:
        raise UnsafeURL('Whitespace, control characters and backslashes are forbidden')
    try:
        parsed = urlsplit(url)
        if parsed.scheme not in {'http', 'https'} or not parsed.hostname:
            raise UnsafeURL('Only absolute HTTP(S) URLs are allowed')
        if parsed.username is not None or parsed.password is not None:
            raise UnsafeURL('URL credentials are forbidden')
        host = parsed.hostname.rstrip('.').encode('idna').decode('ascii')
        if '%' in host or host.lower() == 'localhost' or host.lower().endswith(('.localhost', '.local', '.internal')):
            raise UnsafeURL('Local names, escaped hosts and scoped addresses are forbidden')
        port = parsed.port or (443 if parsed.scheme == 'https' else 80)
        if port not in {80, 443}:
            raise UnsafeURL('Only public web ports 80 and 443 are allowed')
    except (ValueError, UnicodeError) as exc:
        raise UnsafeURL(str(exc)) from exc
    addresses = []
    for answer in resolver(host, port, type=socket.SOCK_STREAM):
        address = answer[4][0]
        if not public_address(address):
            raise UnsafeURL('Destination resolves to a non-public address')
        if address not in addresses:
            addresses.append(address)
    if not addresses:
        raise UnsafeURL('Destination has no public address')
    return parsed, host, port, addresses


class PinnedHTTPConnection(http.client.HTTPConnection):
    def __init__(self, host, port, address, timeout):
        super().__init__(host, port, timeout=timeout)
        self.address = address

    def connect(self):
        self.sock = socket.create_connection((self.address, self.port), self.timeout)


class PinnedHTTPSConnection(PinnedHTTPConnection):
    def connect(self):
        super().connect()
        try:
            self.sock = ssl.create_default_context().wrap_socket(self.sock, server_hostname=self.host)
        except Exception:
            self.sock.close()
            raise


def request_once(url, method, timeout, resolver=socket.getaddrinfo):
    parsed, host, port, addresses = validate_url(url, resolver)
    cls = PinnedHTTPSConnection if parsed.scheme == 'https' else PinnedHTTPConnection
    # One address attempt; failed DNS routes are reported, not silently retried.
    connection = cls(host, port, addresses[0], timeout)
    path = quote(parsed.path or '/', safe="/%:@!$&'()*+,;=-._~")
    if parsed.query:
        path += '?' + quote(parsed.query, safe="/%?:@!$&'()*+,;=-._~")
    headers = {'User-Agent': 'HeadStart-Research-LinkAudit/1.0', 'Accept': '*/*', 'Connection': 'close'}
    if method == 'GET':
        headers['Range'] = f'bytes=0-{BODY_LIMIT - 1}'
    try:
        connection.request(method, path, headers=headers)
        response = connection.getresponse()
        mime = response.getheader('Content-Type', '').split(';')[0].lower()
        archive = unquote(parsed.path).lower().endswith(ARCHIVES)
        binary_download = mime in {'application/octet-stream', 'application/zip', 'application/x-tar', 'application/gzip', 'application/x-executable', 'application/x-msdownload'} or 'attachment' in response.getheader('Content-Disposition', '').lower()
        # Never read redirect bodies, archives or binary download responses.
        body = response.read(BODY_LIMIT) if method == 'GET' and response.status not in REDIRECTS and not archive and not binary_download else b''
        return {'url': url, 'method': method, 'http_status': response.status,
                'location': response.getheader('Location'), 'content_type': mime,
                'bytes_read': len(body), 'connected_address': addresses[0],
                'body_skipped': bool(method == 'GET' and (archive or binary_download))}
    finally:
        connection.close()


def audit_url(url, request=request_once):
    """HTTP status is reachability only. Each call has its own bounded socket wait."""
    started = now()
    timer = time.monotonic()
    current = url
    result = {'url': url, 'checked_at': started, 'final_url': current, 'method': None,
              'http_status': None, 'result': 'error', 'error': None, 'attempts': [],
              'interactive_status': 'not_tested'}
    method, fallback_used, redirects = 'HEAD', False, 0
    try:
        while True:
            result['final_url'], result['method'] = current, method
            attempt = request(current, method, TIMEOUT)
            result['attempts'].append(attempt)
            status = attempt['http_status']
            result['http_status'] = status
            if status in REDIRECTS:
                location = attempt.get('location')
                if not location:
                    raise ValueError('Redirect response has no Location header')
                if redirects >= REDIRECT_LIMIT:
                    raise ValueError('Redirect limit exceeded')
                if any(ord(c) <= 32 or ord(c) == 127 for c in location) or '\\' in location:
                    raise UnsafeURL('Redirect contains forbidden characters')
                target = urljoin(current, location)
                # request_once revalidates scheme, host and DNS before connecting.
                current = urlunsplit(urlsplit(target)._replace(fragment=''))
                redirects += 1
                continue
            if method == 'HEAD' and status in {403, 405} and not fallback_used:
                # A HEAD probe of an archive is okay; never issue its GET fallback.
                if not unquote(urlsplit(current).path).lower().endswith(ARCHIVES):
                    method, fallback_used = 'GET', True
                    continue
            result['result'] = ('reachable' if 200 <= status < 300 else
                                'restricted' if status in {401, 403, 405, 407, 429, 451} else 'http_error')
            break
    except Exception as exc:
        result['result'] = 'blocked' if isinstance(exc, UnsafeURL) else 'error'
        result['error'] = {'type': type(exc).__name__, 'message': str(exc)[:1000]}
    result['elapsed_seconds'] = round(time.monotonic() - timer, 3)
    result['bytes_read'] = sum(a.get('bytes_read', 0) for a in result['attempts'])
    return result


def collect_urls(records, all_evidence=False):
    found = {}
    for row in records:
        fields = [('repo_url', row.get('repo_url')), ('project_url', row.get('project_url')),
                  ('demo.url', row.get('demo', {}).get('url')),
                  ('preview.source_url', row.get('preview', {}).get('source_url'))]
        if all_evidence:
            fields.extend(('source.evidence', v.get('url')) for v in row.get('source', {}).get('evidence', []))
            fields.extend(('building_blocks.evidence_url', v.get('evidence_url')) for v in row.get('building_blocks', []))
            fields.append(('rights.code_evidence_url', row.get('rights', {}).get('code_evidence_url')))
        for field, url in fields:
            if url is not None:
                if not isinstance(url, str):
                    raise ValueError(f'{row.get("id")}: {field} must be a URL string or null')
                found.setdefault(url, []).append({'record_id': row['id'], 'field': field})
    return found


def sanitize_report_urls(check):
    """Keep ephemeral redirect credentials out of durable research artifacts."""
    redactions = []
    def clean(value, location):
        if not isinstance(value, str):
            return value
        try:
            parsed = urlsplit(value)
            keys = {key.lower() for key, _ in parse_qsl(parsed.query)}
            sensitive = {'x-amz-signature', 'x-amz-credential', 'x-amz-security-token',
                         'x-goog-signature', 'x-goog-credential', 'access_token',
                         'token', 'signature', 'sig', 'api_key', 'key'}
            if keys & sensitive or parsed.username is not None:
                host = parsed.hostname or ''
                if ':' in host:
                    host = '[' + host + ']'
                if parsed.port:
                    host += ':' + str(parsed.port)
                redactions.append(location)
                return urlunsplit((parsed.scheme, host, parsed.path, '', ''))
        except ValueError:
            # A malformed credential-bearing URL should not leak through a parse error.
            if '@' in value:
                redactions.append(location)
                return '[invalid credential-bearing URL redacted]'
        return value
    for key in ('url', 'final_url'):
        check[key] = clean(check.get(key), key)
    for index, attempt in enumerate(check.get('attempts', [])):
        for key in ('url', 'location'):
            if key in attempt:
                attempt[key] = clean(attempt[key], f'attempts[{index}].{key}')
    if redactions:
        check['url_redactions'] = redactions
    return check


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--records', type=Path, default=ROOT / 'records')
    parser.add_argument('--output', type=Path, default=ROOT / 'evidence/link-checks.json')
    parser.add_argument('--all-evidence', action='store_true')
    parser.add_argument('--workers', type=int, choices=range(1, 5), default=4)
    args = parser.parse_args()
    started = now()
    records = []
    for path in sorted(args.records.glob('*.json')):
        records.extend(json.loads(path.read_text(encoding='utf-8')))
    if not records:
        parser.error('No research records found')
    urls = collect_urls(records, args.all_evidence)
    with ThreadPoolExecutor(max_workers=args.workers) as pool:
        checks = list(pool.map(audit_url, sorted(urls)))
    for check in checks:
        check['references'] = urls[check['url']]
        sanitize_report_urls(check)
    counts = dict(Counter(check['result'] for check in checks))
    report = {'started_at': started, 'completed_at': now(), 'record_count': len(records),
              'unique_url_count': len(urls), 'all_evidence': args.all_evidence,
              'method': 'HEAD with at most one GET fallback for 403/405; public-address-pinned connections; manual validated redirects; no project execution.',
              'limits': {'socket_timeout_seconds': TIMEOUT, 'concurrency': args.workers,
                         'body_bytes_per_response': BODY_LIMIT, 'redirects': REDIRECT_LIMIT,
                         'fallback_gets_per_url': 1},
              'limitations': ['HTTP reachability never establishes gameplay, source/demo revision identity, rights clearance or integration readiness.',
                             'Credential-bearing redirect query strings are removed from durable URLs; url_redactions identifies changed fields.',
                             '15-second timeout applies to socket operations; system DNS resolution follows the operating system resolver timeout.',
                             'Blocked/rate-limited services and temporarily failed IPv4/IPv6 routes remain explicit; no proxy or credential bypass is attempted.'],
              'counts': counts, 'checks': checks}
    args.output.parent.mkdir(parents=True, exist_ok=True)
    temp = args.output.with_suffix(args.output.suffix + '.tmp')
    temp.write_text(json.dumps(report, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
    temp.replace(args.output)
    print(json.dumps({'unique_urls': len(urls), 'counts': counts, 'output': str(args.output)}))


if __name__ == '__main__':
    main()
