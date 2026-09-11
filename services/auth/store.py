"""Transactional local authentication. Credential hashes only in SQLite."""
import hashlib
import json
import os
from pathlib import Path
import re
import secrets
import sqlite3
import time

class AuthError(Exception):
    def __init__(self, code, status=401):
        self.code, self.status = code, status
        super().__init__(code)

def digest(value):
    return hashlib.sha256(value.encode()).hexdigest()

def connect(path=None):
    path = Path(path or os.environ.get('HEADSTART_AUTH_DB', '.local/auth.sqlite3'))
    path.parent.mkdir(parents=True, exist_ok=True)
    db = sqlite3.connect(path, timeout=15, isolation_level=None)
    os.chmod(path, 0o600)
    db.row_factory = sqlite3.Row
    db.executescript('''
    PRAGMA journal_mode=WAL;
    CREATE TABLE IF NOT EXISTS challenges(id TEXT PRIMARY KEY, email TEXT, token TEXT, binding TEXT, intent TEXT, expires INTEGER, attempts INTEGER DEFAULT 0, consumed INTEGER DEFAULT 0);
    CREATE TABLE IF NOT EXISTS accounts(id TEXT PRIMARY KEY, email TEXT UNIQUE, verified INTEGER);
    CREATE TABLE IF NOT EXISTS sessions(token TEXT PRIMARY KEY, account TEXT, csrf TEXT, expires INTEGER, revoked INTEGER DEFAULT 0, kind TEXT DEFAULT 'browser', parent TEXT);
    CREATE TABLE IF NOT EXISTS rates(key TEXT, at INTEGER);
    CREATE INDEX IF NOT EXISTS rate_lookup ON rates(key,at);
    CREATE TABLE IF NOT EXISTS bridges(id TEXT PRIMARY KEY, token TEXT, expires INTEGER, approved INTEGER DEFAULT 0);
    ''')
    return db

def rate(db, key, limit, seconds=900):
    now = int(time.time())
    db.execute('DELETE FROM rates WHERE at < ?', (now-86400,))
    if db.execute('SELECT count(*) FROM rates WHERE key=? AND at>?', (key,now-seconds)).fetchone()[0] >= limit:
        raise AuthError('RATE_LIMITED',429)
    db.execute('INSERT INTO rates VALUES (?,?)',(key,now))

def intent(value):
    if not isinstance(value,dict) or set(value) != {'action','bagRevision','selections'} or value['action'] not in ('prepare_handoff','download_source','account'):
        raise AuthError('INVALID_INTENT',400)
    if not isinstance(value['bagRevision'],str) or not re.fullmatch(r'[a-f0-9]{64}',value['bagRevision']):
        raise AuthError('INVALID_INTENT',400)
    if not isinstance(value['selections'],list) or not (0 if value['action']=='account' else 1) <= len(value['selections']) <= 24:
        raise AuthError('INVALID_INTENT',400)
    for row in value['selections']:
        if not isinstance(row,dict) or set(row) != {'id','version','kind'} or row['kind'] not in ('project','component') or any(not isinstance(row[k],str) or not re.fullmatch(r'[A-Za-z0-9_.:@/-]{1,180}',row[k]) for k in ('id','version')):
            raise AuthError('INVALID_INTENT',400)
    return json.dumps(value,sort_keys=True,separators=(',',':'))

def issue(db,email,binding,selected,client):
    if not isinstance(email,str) or len(email)>254 or not re.fullmatch(r'[^\s@]+@[^\s@]+\.[^\s@]+',email):
        raise AuthError('INVALID_EMAIL',400)
    email=email.strip().lower()
    selected=intent(selected)
    db.execute('BEGIN IMMEDIATE')
    try:
        rate(db,'issue-client:'+client,20)
        rate(db,'issue-email:'+digest(email),5)
        db.execute('UPDATE challenges SET consumed=1 WHERE email=? AND binding=?',(email,digest(binding)))
        ident,token=secrets.token_urlsafe(24),secrets.token_urlsafe(32)
        db.execute('INSERT INTO challenges(id,email,token,binding,intent,expires) VALUES (?,?,?,?,?,?)',(ident,email,digest(token),digest(binding),selected,int(time.time())+600))
        db.commit()
        return ident,token
    except Exception:
        db.rollback()
        raise

def verify(db,ident,token,binding,old_session='',client='local'):
    db.execute('BEGIN IMMEDIATE')
    try:
        rate(db,'verify:'+client,40)
        row=db.execute('SELECT * FROM challenges WHERE id=?',(ident,)).fetchone()
        good=row and not row['consumed'] and row['expires']>time.time() and row['attempts']<5
        if row:
            db.execute('UPDATE challenges SET attempts=attempts+1 WHERE id=?',(ident,))
        if not good or not secrets.compare_digest(row['token'],digest(token)) or not secrets.compare_digest(row['binding'],digest(binding)):
            db.commit()
            raise AuthError('VERIFICATION_FAILED')
        account=secrets.token_urlsafe(24)
        db.execute('INSERT OR IGNORE INTO accounts VALUES (?,?,?)',(account,row['email'],int(time.time())))
        account=db.execute('SELECT id FROM accounts WHERE email=?',(row['email'],)).fetchone()[0]
        db.execute('UPDATE challenges SET consumed=1 WHERE id=?',(ident,))
        if old_session:
            revoke(db,old_session)
        session,csrf=secrets.token_urlsafe(32),secrets.token_urlsafe(32)
        db.execute('INSERT INTO sessions(token,account,csrf,expires) VALUES (?,?,?,?)',(digest(session),account,csrf,int(time.time())+86400))
        db.commit()
        return session,csrf,json.loads(row['intent'])
    except Exception:
        if db.in_transaction: db.rollback()
        raise

def authorize(db,credential,purpose='prepare_handoff',kind=None):
    if purpose not in ('prepare_handoff','download_source','session','connect_mcp'):
        raise AuthError('UNKNOWN_PURPOSE',403)
    if not isinstance(credential,str) or not credential: raise AuthError('VERIFICATION_REQUIRED')
    row=db.execute('SELECT s.*,a.verified FROM sessions s JOIN accounts a ON a.id=s.account WHERE s.token=?',(digest(credential),)).fetchone()
    if not row or not row['verified'] or row['revoked'] or row['expires']<=time.time() or (kind and row['kind']!=kind):
        raise AuthError('SESSION_INVALID')
    if row['parent']:
        parent=db.execute('SELECT revoked,expires FROM sessions WHERE token=?',(row['parent'],)).fetchone()
        if not parent or parent['revoked'] or parent['expires']<=time.time(): raise AuthError('SESSION_INVALID')
    return dict(row)

def revoke(db,credential):
    db.execute('UPDATE sessions SET revoked=1 WHERE token=? OR parent=?',(digest(credential),digest(credential)))

def approve_bridge(db,credential,ident):
    identity=authorize(db,credential,'connect_mcp','browser')
    db.execute('BEGIN IMMEDIATE')
    try:
        row=db.execute('SELECT * FROM bridges WHERE id=? AND approved=0 AND expires>?',(ident,time.time())).fetchone()
        if not row: raise AuthError('BRIDGE_EXPIRED',400)
        db.execute('UPDATE bridges SET approved=1 WHERE id=?',(ident,))
        db.execute("INSERT INTO sessions VALUES (?,?,?,?,0,'mcp',?)",(row['token'],identity['account'],secrets.token_urlsafe(32),min(identity['expires'],int(time.time())+3600),digest(credential)))
        db.commit()
    except Exception:
        db.rollback()
        raise
