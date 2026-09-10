"""Vercel read-only catalog adapter; durable email writes belong to subscribe.js."""
import hashlib
import hmac
import json
import os
from pathlib import Path
import shutil
import tempfile
import threading
from http.server import BaseHTTPRequestHandler

from services.catalog.api import serve
from services.catalog.search import ApiError

ROOT = Path(__file__).resolve().parents[1]
_LOCK = threading.Lock()
_SCRATCH = None


def snapshot():
    global _SCRATCH
    with _LOCK:
        if _SCRATCH is None:
            manifest = json.loads((ROOT / 'runtime/snapshot.json').read_text())
            database = ROOT / 'runtime/catalog.sqlite3'
            if hashlib.sha256(database.read_bytes()).hexdigest() != manifest['databaseSha256']:
                raise RuntimeError('Catalog snapshot digest mismatch')
            scratch = Path(tempfile.mkdtemp(prefix='headstart-catalog-'))
            shutil.copyfile(database, scratch / 'catalog.sqlite3')
            os.environ['HEADSTART_EMBEDDING_DIR'] = str(ROOT / 'runtime/model')
            os.environ['HEADSTART_EMBEDDING_CACHE'] = str(scratch / 'vectors')
            if (ROOT / 'runtime/vectors').is_dir():
                shutil.copytree(ROOT / 'runtime/vectors', scratch / 'vectors')
            _SCRATCH = scratch
    return _SCRATCH


def response(method, url):
    if method not in ('GET', 'HEAD'):
        return 405, {'error': {'code': 'METHOD_NOT_ALLOWED', 'message': 'Use GET for catalog retrieval.', 'retriable': False}}
    try:
        secret = os.environ.get('SIGNUP_HASH_SECRET', '').encode()
        if len(secret) < 32:
            raise RuntimeError('Catalog cursor signing unavailable')
        key = hmac.new(secret, b'headstart/catalog-cursors/v1', hashlib.sha256).digest()
        scratch = snapshot()
        return 200, serve(url, scratch / 'catalog.sqlite3', ROOT / 'runtime/evidence', key)
    except ApiError as error:
        return error.status, error.body
    except (ValueError, TypeError):
        return 400, {'error': {'code': 'INVALID_QUERY', 'message': 'Malformed query.', 'retriable': False}}
    except Exception:
        return 503, {'error': {'code': 'CATALOG_UNAVAILABLE', 'message': 'Catalog data is temporarily unavailable.', 'retriable': True, 'action': 'Please retry shortly.'}}


class handler(BaseHTTPRequestHandler):
    def _respond(self):
        status, body = response(self.command, self.path)
        content = json.dumps(body, ensure_ascii=False).encode()
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Cache-Control', 'no-store')
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('Content-Length', str(len(content)))
        if status == 405:
            self.send_header('Allow', 'GET, HEAD')
        self.end_headers()
        if self.command != 'HEAD':
            self.wfile.write(content)

    do_GET = _respond
    do_HEAD = _respond
    do_POST = _respond
    do_PUT = _respond
    do_PATCH = _respond
    do_DELETE = _respond
    do_OPTIONS = _respond

    def log_message(self, format, *args):
        pass  # Query strings may contain a developer's private game brief.
