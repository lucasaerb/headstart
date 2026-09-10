"""Explicit optional model installation; query handlers never download anything."""
import hashlib
import os
import urllib.request
from .model import MANIFEST,model_dir

def main():
    target=model_dir();target.mkdir(parents=True,exist_ok=True)
    for name,entry in MANIFEST['files'].items():
        path=target/name
        if path.exists() and hashlib.sha256(path.read_bytes()).hexdigest()==entry['sha256']:continue
        temporary=target/(name+'.partial')
        url='https://huggingface.co/'+MANIFEST['model']+'/resolve/'+MANIFEST['revision']+'/'+entry['path']
        try:
            with urllib.request.urlopen(url,timeout=60) as source,temporary.open('wb') as destination:
                size=0
                while chunk:=source.read(1024*1024):
                    size+=len(chunk)
                    if size>entry['bytes']:raise ValueError('Model download exceeds pinned size')
                    destination.write(chunk)
            if temporary.stat().st_size!=entry['bytes'] or hashlib.sha256(temporary.read_bytes()).hexdigest()!=entry['sha256']:raise ValueError('Model checksum mismatch')
            os.replace(temporary,path)
        finally:temporary.unlink(missing_ok=True)
    print('Pinned local model installed. No query data was uploaded.')
if __name__=='__main__':main()
