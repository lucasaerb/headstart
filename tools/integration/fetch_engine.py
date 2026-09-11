"""Explicit static download of two fixed, digest-pinned Three.js files; no execution."""
import ipaddress,socket
from pathlib import Path
from services.intake.pipeline import PinnedHTTPS
from .workflow import HERE,ROOT,read_json,sha

def main():
 manifest=read_json(HERE/'engine-manifest.json');host='raw.githubusercontent.com'
 addresses={r[4][0] for r in socket.getaddrinfo(host,443,type=socket.SOCK_STREAM)}
 if not addresses or any(not ipaddress.ip_address(a).is_global for a in addresses):raise ValueError('Nonpublic source address')
 output=ROOT/'.cache/integration-engine';output.mkdir(parents=True,exist_ok=True)
 for name,digest in manifest['files'].items():
  path=output/name
  if path.is_file() and sha(path.read_bytes())==digest:continue
  conn=PinnedHTTPS(host,sorted(addresses)[0])
  try:
   conn.request('GET','/mrdoob/three.js/'+manifest['commit']+'/build/'+name,headers={'User-Agent':'HeadStart-reference-target','Accept-Encoding':'identity'})
   response=conn.getresponse()
   if response.status!=200 or response.getheader('Content-Encoding','identity')!='identity':raise ValueError('Source unavailable, redirected or compressed')
   body=response.read(5_000_001)
   if len(body)>5_000_000 or sha(body)!=digest:raise ValueError('Source size/digest mismatch')
   path.write_bytes(body)
  finally:conn.close()
 print('Verified pinned target-engine source cache. No source was executed.')
if __name__=='__main__':main()
