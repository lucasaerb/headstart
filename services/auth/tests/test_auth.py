import concurrent.futures
import json
import os
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch
from services.auth.store import *
from services.auth.api import serve

INTENT={'action':'prepare_handoff','bagRevision':'a'*64,'selections':[{'id':'sample','version':'v1','kind':'component'}]}
class AuthTests(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory();self.path=Path(self.tmp.name)/'auth.db';self.db=connect(self.path)
    def tearDown(self): self.db.close();self.tmp.cleanup()
    def challenge(self):return issue(self.db,'user@example.invalid','browser',INTENT,'ip')
    def login(self):
        ident,token=self.challenge();return verify(self.db,ident,token,'browser')
    def test_gate_rejects_forgery_expiry_and_revocation(self):
        for token in ('','verified_email=true','random'):
            with self.assertRaises(AuthError):authorize(self.db,token)
        token,_,_=self.login();self.assertTrue(authorize(self.db,token)['verified'])
        self.db.execute('UPDATE sessions SET expires=0')
        with self.assertRaises(AuthError):authorize(self.db,token)
        token,_,_=self.login();revoke(self.db,token)
        with self.assertRaises(AuthError):authorize(self.db,token)
    def test_bad_binding_exhaustion_and_expiry(self):
        ident,token=self.challenge()
        for _ in range(5):
            with self.assertRaises(AuthError):verify(self.db,ident,token,'other')
        with self.assertRaises(AuthError):verify(self.db,ident,token,'browser')
        ident,token=self.challenge();self.db.execute('UPDATE challenges SET expires=0')
        with self.assertRaises(AuthError):verify(self.db,ident,token,'browser')
    def test_superseded_and_rotation(self):
        ident,token=self.challenge();new,newtoken=self.challenge()
        with self.assertRaises(AuthError):verify(self.db,ident,token,'browser')
        old,_,_=verify(self.db,new,newtoken,'browser');ident,token=self.challenge();current,_,selected=verify(self.db,ident,token,'browser',old)
        self.assertEqual(selected,INTENT)
        with self.assertRaises(AuthError):authorize(self.db,old)
        self.assertEqual(authorize(self.db,current)['kind'],'browser')
    def test_atomic_replay(self):
        ident,token=self.challenge()
        def run(_):
            db=connect(self.path)
            try:verify(db,ident,token,'browser');return True
            except AuthError:return False
            finally:db.close()
        with concurrent.futures.ThreadPoolExecutor(4) as pool:self.assertEqual(sum(pool.map(run,range(4))),1)
    def test_creation_limits_and_hash_only(self):
        ident,token=self.challenge();raw=self.path.read_bytes();self.assertNotIn(token.encode(),raw)
        for _ in range(4):self.challenge()
        with self.assertRaises(AuthError) as e:self.challenge()
        self.assertEqual(e.exception.status,429)
    def test_no_open_redirect_intents(self):
        for value in ({**INTENT,'returnTo':'https://evil.invalid'}, {**INTENT,'action':'//evil.invalid'}, {**INTENT,'bagRevision':'../evil'}):
            with self.assertRaises(AuthError):intent(value)
    def test_bridge_needs_approval_and_revokes(self):
        token,_,_=self.login();bridge='bridge-token';self.db.execute('INSERT INTO bridges VALUES (?,?,?,0)',('request',digest(bridge),int(time.time())+60))
        with self.assertRaises(AuthError):authorize(self.db,bridge)
        approve_bridge(self.db,token,'request');self.assertEqual(authorize(self.db,bridge)['kind'],'mcp')
        with self.assertRaises(AuthError):approve_bridge(self.db,token,'request')
        revoke(self.db,token)
        with self.assertRaises(AuthError):authorize(self.db,bridge)
    def test_transport_origin_delivery_cookie_csrf(self):
        env={'HEADSTART_AUTH_DB':str(self.path),'HEADSTART_AUTH_DELIVERY':'preview','HEADSTART_AUTH_PREVIEW_DIR':self.tmp.name+'/preview','HEADSTART_AUTH_ORIGIN':'http://127.0.0.1:8767'}
        req={'method':'POST','url':'/api/auth/challenge','origin':env['HEADSTART_AUTH_ORIGIN'],'contentType':'application/json','body':{'email':'x@example.invalid','intent':INTENT}}
        with patch.dict(os.environ,env):
            with self.assertRaises(AuthError):serve({**req,'origin':'https://evil.invalid'})
            response=serve(req);self.assertEqual(response['status'],202);self.assertIn('HttpOnly; SameSite=Strict',response['cookies'][0]);self.assertNotIn('token',response['body'])
            token,csrf,_=self.login()
            with self.assertRaises(AuthError):serve({**req,'url':'/api/auth/logout','credential':token,'body':{}})
            self.assertEqual(serve({**req,'url':'/api/auth/logout','credential':token,'csrf':csrf,'body':{}})['body']['state'],'revoked')
        with patch.dict(os.environ,{**env,'HEADSTART_AUTH_ORIGIN':'http://evil.invalid'}):
            with self.assertRaises(AuthError):serve(req)
        with patch.dict(os.environ,{**env,'HEADSTART_AUTH_DELIVERY':'unavailable'}):
            with self.assertRaises(AuthError) as e:serve(req)
            self.assertEqual(e.exception.code,'DELIVERY_UNAVAILABLE')
if __name__=='__main__':unittest.main()
