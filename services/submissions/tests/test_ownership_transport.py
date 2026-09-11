import unittest
from unittest.mock import patch
from services.submissions.api import fetch_proof
class TransportTests(unittest.TestCase):
 def test_host_and_private_dns_rejected(self):
  for url in ('https://evil.test/x','http://api.github.com/x','https://user@api.github.com/x','https://api.github.com/x?token=x'):
   with self.assertRaises(ValueError):fetch_proof(url)
  for ip in ('127.0.0.1','169.254.169.254','::1'):
   with patch('socket.getaddrinfo',return_value=[(0,0,0,'',(ip,443))]):
    with self.assertRaises(ValueError):fetch_proof('https://api.github.com/repos/example/game')
 def test_pinned_socket_redirect_size_and_headers(self):
  class Response:
   status=200
   def getheader(self,key,default=None):return default
   def read(self,count):return b'{}'
  class Connection:
   instances=[]
   def __init__(self,host,address):self.host=host;self.address=address;self.closed=False;self.instances.append(self)
   def request(self,*args,**kwargs):self.headers=kwargs['headers']
   def getresponse(self):return Response()
   def close(self):self.closed=True
  with patch('socket.getaddrinfo',return_value=[(0,0,0,'',('8.8.8.8',443))]),patch('services.submissions.api.PinnedHTTPS',Connection):
   self.assertEqual(fetch_proof('https://api.github.com/repos/example/game'),b'{}')
   connection=Connection.instances[-1];self.assertEqual(connection.address,'8.8.8.8');self.assertTrue(connection.closed)
   self.assertNotIn('Authorization',connection.headers)
   with patch.object(Response,'status',302):
    with self.assertRaises(ValueError):fetch_proof('https://api.github.com/repos/example/game')
   with patch.object(Response,'read',return_value=b'x'*4097):
    with self.assertRaises(ValueError):fetch_proof('https://raw.githubusercontent.com/example/game/'+'a'*40+'/.headstart-ownership.txt')
if __name__=='__main__':unittest.main()
