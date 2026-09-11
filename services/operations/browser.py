"""Network-disabled browser with a bounded public-HTTPS resource broker."""
import base64
import hashlib
import ipaddress
import json
import os
from pathlib import Path
import re
import selectors
import socket
import subprocess
import time
import uuid
from urllib.parse import urlsplit
from services.intake.pipeline import PinnedHTTPS
from services.submissions.store import safe_url

ROOT = Path(__file__).resolve().parents[2]


def resource(url):
    safe_url(url)
    parsed = urlsplit(url)
    addresses = {r[4][0] for r in socket.getaddrinfo(parsed.hostname,443,type=socket.SOCK_STREAM)}
    if not addresses or any(not ipaddress.ip_address(a).is_global for a in addresses):
        raise ValueError('Unsafe resource destination')
    connection = PinnedHTTPS(parsed.hostname, sorted(addresses)[0])
    connection.timeout = 5
    try:
        connection.request('GET',parsed.path or '/',headers={'Accept-Encoding':'identity','User-Agent':'HeadStart-demo-check/1'})
        response = connection.getresponse()
        if response.getheader('Content-Encoding','identity') != 'identity':
            raise ValueError('Compressed resource rejected')
        if 300 <= response.status < 400:
            # Redirects require a new explicitly reviewed URL, never auto-follow.
            raise ValueError('Redirect requires review')
        body = response.read(2 * 1024 * 1024 + 1)
        if len(body) > 2 * 1024 * 1024:
            raise ValueError('Resource too large')
        headers = {'content-type':response.getheader('Content-Type','application/octet-stream')}
        for key in ('content-security-policy','x-frame-options','access-control-allow-origin'):
            value = response.getheader(key)
            if value and len(value) <= 4000:
                headers[key] = value
        return {'status':response.status,'headers':headers,'body':base64.b64encode(body).decode()}
    finally:
        connection.close()


def _resource_worker(pipe, url):
    try:
        pipe.send(resource(url))
    except Exception:
        pipe.send({'error': True})
    finally:
        pipe.close()


def bounded_resource(url):
    import multiprocessing
    context = multiprocessing.get_context('spawn')
    receiver, sender = context.Pipe(duplex=False)
    process = context.Process(target=_resource_worker,args=(sender,url),daemon=True)
    try:
        process.start();sender.close()
        if not receiver.poll(8): raise ValueError('Resource deadline exceeded')
        result = receiver.recv()
        if result.get('error'): raise ValueError('Resource unavailable')
        return result
    finally:
        if process.pid is not None:
            if process.is_alive(): process.terminate()
            process.join(timeout=1)
            if process.is_alive(): process.kill();process.join(timeout=1)
        receiver.close();sender.close()


def validate_plan(plan):
    if not isinstance(plan,dict) or set(plan) != {'url','steps'}:
        raise ValueError('Invalid interaction plan')
    safe_url(plan['url'])
    if not isinstance(plan['steps'],list) or not 1 <= len(plan['steps']) <= 5:
        raise ValueError('Declare one to five interaction outcomes')
    for step in plan['steps']:
        if not isinstance(step,dict) or set(step) != {'name','action','input','observe','attribute','before','after'}:
            raise ValueError('Invalid interaction step')
        if any(not isinstance(step[k],str) or not 1 <= len(step[k]) <= 200 for k in ('name','input','observe')):
            raise ValueError('Invalid interaction selector')
        if step['action'] not in ('key','click') or step['attribute'] is not None and (not isinstance(step['attribute'],str) or not re.fullmatch('[a-z][a-z0-9-]{0,40}',step['attribute'])):
            raise ValueError('Unsupported interaction')
        if any(not isinstance(step[k],str) or len(step[k]) > 200 for k in ('before','after')) or step['before'] == step['after']:
            raise ValueError('Declare a changed observable outcome')
    return plan


def run(plan, *, image, fetch=bounded_resource):
    """No host secret/config/project mount; only this worker and scoped Playwright runtime."""
    validate_plan(plan)
    if not isinstance(image,str) or not re.fullmatch(r'(?:sha256:[a-f0-9]{64}|[a-z0-9./_-]+@sha256:[a-f0-9]{64})',image):
        raise ValueError('Use an immutable installed browser image digest')
    runtime = ROOT/'node_modules/playwright-core'
    if not runtime.is_dir():
        raise ValueError('Install the reviewed Playwright runtime first')
    name = 'headstart-health-' + uuid.uuid4().hex
    command = ['docker','run','--rm','--name',name,'--network=none','--read-only','--cap-drop=ALL','--security-opt=no-new-privileges','--pids-limit=128','--memory=768m','--cpus=1','--tmpfs','/tmp:rw,nosuid,size=128m','--mount',f'type=bind,src={ROOT / "tools/operations/browser-worker.mjs"},dst=/worker.mjs,readonly','--mount',f'type=bind,src={runtime},dst=/opt/playwright,readonly','-i',image,'node','/worker.mjs']
    process = subprocess.Popen(command,stdin=subprocess.PIPE,stdout=subprocess.PIPE,stderr=subprocess.DEVNULL,text=True,bufsize=1)
    selector = selectors.DefaultSelector()
    selector.register(process.stdout, selectors.EVENT_READ)
    deadline, requests, total, denied = time.monotonic() + 60, 0, 0, 0
    result = None
    try:
        process.stdin.write(json.dumps({'config':plan})+'\n');process.stdin.flush()
        while time.monotonic() < deadline:
            if not selector.select(timeout=min(1,max(0,deadline-time.monotonic()))):
                if process.poll() is not None: break
                continue
            line = process.stdout.readline(4097)
            if not line or len(line) > 4096: break
            value = json.loads(line)
            if value.get('result'):
                result = value
                break
            if not value.get('request') or type(value.get('id')) is not int: break
            requests += 1
            reply = {'id':value['id'],'error':True}
            try:
                if requests > 40 or total > 12 * 1024 * 1024: raise ValueError('Budget exhausted')
                response = fetch(value['url'])
                size = len(base64.b64decode(response['body'],validate=True))
                if size > 2 * 1024 * 1024 or total + size > 12 * 1024 * 1024: raise ValueError('Budget exhausted')
                total += size
                reply = {'id':value['id'],**response}
            except Exception:
                denied += 1
            process.stdin.write(json.dumps(reply)+'\n');process.stdin.flush()
    except (OSError,ValueError):
        pass
    finally:
        selector.close()
        subprocess.run(['docker','rm','-f',name],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL,timeout=15,check=False)
        if process.poll() is None: process.kill()
        process.communicate(timeout=5)
    result = result or {'category':'worker_failed','checks':[]}
    result.pop('result',None)
    return {'schemaVersion':'headstart-interactive-check-1','observedAt':int(time.time()),'planDigest':hashlib.sha256(json.dumps(plan,sort_keys=True,separators=(',',':')).encode()).hexdigest(),'image':image,'network':'none_brokered_public_https','requestCount':requests,'deniedRequests':denied,'bytes':total,**result}
