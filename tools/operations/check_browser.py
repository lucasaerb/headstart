"""Actual isolated browser fixture; no external demo success is claimed."""
import base64
import json
import os
from pathlib import Path
from services.operations.browser import run

def main():
    image=os.environ['HEADSTART_BROWSER_IMAGE']
    plan={'url':'https://example.com/game','steps':[{'name':'button changes count','action':'click','input':'button','observe':'output','attribute':None,'before':'0','after':'1'}]}
    body=b'<button onclick="document.querySelector(\'output\').textContent=\'1\'">Play</button><output>0</output><script>fetch("https://127.0.0.1/private").catch(()=>{});new WebSocket("wss://127.0.0.1/private")</script>'
    def fetch(url):
        if url!=plan['url']:raise ValueError('Fixture denies every other destination')
        return {'status':200,'headers':{'content-type':'text/html'},'body':base64.b64encode(body).decode()}
    positive=run(plan,image=image,fetch=fetch)
    assert positive['category']=='interactive_passed',positive
    plan['steps'][0]['after']='2'
    negative=run(plan,image=image,fetch=fetch)
    assert negative['category']=='interactive_failed',negative
    destination=Path(os.environ.get('HEADSTART_OPERATIONS_EVIDENCE','/tmp/headstart-operations-browser.json'))
    destination.write_text(json.dumps({'scope':'first-party controlled fixture only','positive':positive,'negative':negative},indent=2)+'\n')
    print(json.dumps({'passed':True,'evidence':str(destination)}))
if __name__=='__main__':main()
