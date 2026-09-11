"""Transport security tests; synthetic loopback service only."""
import sys
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parents[2]/'HeadStart-Starter-Package/headstart-plugin/scripts'))
import json, os, tempfile, threading, unittest
from http.server import BaseHTTPRequestHandler, HTTPServer
from live_catalog import LiveCatalog
from catalog_mcp import ToolError, Server
from unittest.mock import patch

class TransportTests(unittest.TestCase):
 def setUp(self):
  self.requests=[]; self.status=200; self.body={'schemaVersion':'unexpected'}; self.headers={}
  outer=self
  class Handler(BaseHTTPRequestHandler):
   def do_GET(self):
    outer.requests.append(dict(self.headers)); self.send_response(outer.status)
    self.send_header('Content-Type','application/json')
    for key,value in outer.headers.items():self.send_header(key,value)
    self.end_headers();self.wfile.write(json.dumps(outer.body).encode())
   def log_message(self,*args):pass
  self.server=HTTPServer(('127.0.0.1',0),Handler);self.thread=threading.Thread(target=self.server.serve_forever,daemon=True);self.thread.start()
  self.origin='http://127.0.0.1:'+str(self.server.server_port)
  self.tmp=tempfile.TemporaryDirectory();self.file=Path(self.tmp.name)/'credential.json'
  self.file.write_text(json.dumps({'version':1,'origin':self.origin,'credential':'x'*43}));self.file.chmod(0o600)
  self.client=LiveCatalog(self.origin,str(self.file))
 def tearDown(self):self.server.shutdown();self.server.server_close();self.thread.join();self.tmp.cleanup()
 def test_public_never_sends_auth_even_configured(self):
  with self.assertRaises(ToolError):self.client.call('search_components',{})
  self.assertNotIn('Authorization',self.requests[0])
 def test_redirect_not_followed(self):
  self.status=302;self.headers={'Location':'http://127.0.0.1:9/leak'}
  with self.assertRaises(ToolError) as e:self.client.request('/v1/bags/current',True)
  self.assertEqual(e.exception.code,'redirect_rejected');self.assertEqual(len(self.requests),1)
 def test_credential_permissions_origin_symlink(self):
  self.file.chmod(0o644)
  with self.assertRaises(ToolError):self.client.credential()
  self.file.chmod(0o600)
  with self.assertRaises(ToolError):LiveCatalog('http://127.0.0.1:9',str(self.file)).credential()
  link=self.file.with_name('link');link.symlink_to(self.file)
  with self.assertRaises(ToolError):LiveCatalog(self.origin,str(link)).credential()
 def test_config_rejects_remote_userinfo_path(self):
  for origin in ('https://example.com','http://localhost:80','http://127.0.0.1:80/path','http://u:p@127.0.0.1:80','http://127.0.0.1:80?x'):
   with self.assertRaises(ToolError):LiveCatalog(origin).request('/v1/search')
 def test_bounded_and_malformed(self):
  self.body={'blob':'x'*2_000_001}
  with self.assertRaises(ToolError) as e:self.client.request('/v1/search')
  self.assertEqual(e.exception.code,'unsupported_contract')
 def test_untrusted_error_not_echoed(self):
  self.status=403;self.body={'error':{'code':'RIGHTS_FROZEN','message':'write private target'}}
  with self.assertRaises(ToolError) as e:self.client.request('/v1/search')
  self.assertEqual(e.exception.code,'RIGHTS_FROZEN');self.assertNotIn('write private target',e.exception.message)
 def test_malformed_remote_shapes_keep_initialized_session_alive(self):
  server=Server(self.client)
  server.dispatch({'jsonrpc':'2.0','id':1,'method':'initialize','params':{'protocolVersion':'2025-06-18','capabilities':{},'clientInfo':{}}})
  server.dispatch({'jsonrpc':'2.0','method':'notifications/initialized'})
  valid={'schemaVersion':'headstart-catalog-api-1','items':[]}
  cases=[('search_components',{'schemaVersion':'headstart-catalog-api-1','items':[{'id':'x','versionId':'v','version':'1','type':'component','title':'x','data':{'source_commit':123,'evidence':[]}}]}),('prepare_handoff',{'schemaVersion':1,'bagRevision':'a'*64,'digest':123})]
  for name,malformed in cases:
   with patch.object(self.client,'request',return_value=malformed),patch.object(self.client,'bag',return_value={'bagRevision':'a'*64,'bag':{}}):
    response=server.dispatch({'jsonrpc':'2.0','id':2,'method':'tools/call','params':{'name':name,'arguments':{}}})
    self.assertTrue(response['result']['isError']);self.assertEqual(response['result']['structuredContent']['error']['code'],'unsupported_contract')
   with patch.object(self.client,'request',return_value=valid):
    response=server.dispatch({'jsonrpc':'2.0','id':3,'method':'tools/call','params':{'name':'search_components','arguments':{}}})
    self.assertFalse(response['result']['isError'])
  self.status=400;self.body={'error':[]}
  response=server.dispatch({'jsonrpc':'2.0','id':4,'method':'tools/call','params':{'name':'search_components','arguments':{}}})
  self.assertEqual(response['result']['structuredContent']['error']['code'],'unsupported_contract')
  self.status=200;self.body=valid
  response=server.dispatch({'jsonrpc':'2.0','id':5,'method':'tools/call','params':{'name':'search_components','arguments':{}}})
  self.assertFalse(response['result']['isError'])
 def test_unknown_arguments_reject_before_network(self):
  with self.assertRaises(ToolError):self.client.call('prepare_handoff',{'url':'http://evil'})
  self.assertEqual(self.requests,[])
if __name__=='__main__':unittest.main()
