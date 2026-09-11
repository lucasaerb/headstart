import os
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch
from services.auth.store import connect,issue,verify,revoke,AuthError
from services.catalog.store import CatalogStore
from services.catalog.seed import seed_reviewed_tile
from services.submissions.store import setup
from services.handoff.api import serve

class HandoffAuthTests(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory();root=Path(self.tmp.name)
        self.env=patch.dict(os.environ,{'HEADSTART_AUTH_DB':str(root/'auth.db'),'HEADSTART_CATALOG_DB':str(root/'catalog.db'),'HEADSTART_EVIDENCE_DIR':str(root/'evidence')});self.env.start()
        store=CatalogStore(root/'catalog.db',root/'evidence');setup(store.db);seed_reviewed_tile(store);store.close()
        self.auth=connect();intent={'action':'prepare_handoff','bagRevision':'a'*64,'selections':[{'id':'2048-tile-v1','version':'1','kind':'component'}]}
        ident,token=issue(self.auth,'test@example.invalid','binding',intent,'test')
        self.session,_,_=verify(self.auth,ident,token,'binding')
        self.request={'schemaVersion':1,'selections':[{'id':'2048-tile-v1','version':'1'}],'brief':{'revision':0,'constraints':{}},'intent':'Use state','recipe':None}
    def tearDown(self):self.auth.close();self.env.stop();self.tmp.cleanup()
    def test_verify_generate_and_revoked_download(self):
        with self.assertRaises(AuthError):serve({'method':'POST','url':'/v1/handoffs','body':self.request})
        result=serve({'method':'POST','url':'/v1/handoffs','body':self.request,'credential':self.session,'credentialKind':'browser'})
        self.assertEqual(result['status'],200)
        url=result['body']['downloads']['markdown']
        self.assertIn('HeadStart source-reviewed',serve({'method':'GET','url':url,'credential':self.session,'credentialKind':'browser'})['body']['content'])
        revoke(self.auth,self.session)
        with self.assertRaises(AuthError):serve({'method':'GET','url':url,'credential':self.session,'credentialKind':'browser'})
    def test_current_bag_authenticated_owner_and_withdrawal(self):
        from services.handoff.service import HandoffError
        with self.assertRaises(HandoffError):serve({'method':'GET','url':'/v1/bags/current','credential':self.session,'credentialKind':'browser'})
        created=serve({'method':'POST','url':'/v1/handoffs','body':self.request,'credential':self.session,'credentialKind':'browser'})
        result=serve({'method':'GET','url':'/v1/bags/current','credential':self.session,'credentialKind':'browser'})
        self.assertEqual(result['body']['bagRevision'],created['body']['bagRevision'])
        store=CatalogStore(os.environ['HEADSTART_CATALOG_DB'],os.environ['HEADSTART_EVIDENCE_DIR']);store.tombstone('component','2048-tile','Withdrawn');store.close()
        with self.assertRaises(HandoffError):serve({'method':'GET','url':'/v1/bags/current','credential':self.session,'credentialKind':'browser'})

    def test_unverified_account_and_expired_session(self):
        self.auth.execute('UPDATE accounts SET verified=0')
        with self.assertRaises(AuthError):serve({'method':'POST','url':'/v1/handoffs','body':self.request,'credential':self.session,'credentialKind':'browser'})
        self.auth.execute('UPDATE accounts SET verified=1');self.auth.execute('UPDATE sessions SET expires=0')
        with self.assertRaises(AuthError):serve({'method':'POST','url':'/v1/handoffs','body':self.request,'credential':self.session,'credentialKind':'browser'})

if __name__=='__main__':unittest.main()
