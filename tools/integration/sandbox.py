"""Fixed Docker command, immutable image ID, no host execution of target scripts."""
import json, os, re, subprocess, shutil, tempfile
from pathlib import Path
HERE=Path(__file__).resolve().parent

def run(target,output,image,phase,viewport='1280,800'):
 if not re.fullmatch('sha256:[0-9a-f]{64}',image):raise ValueError('Use an inspected immutable local image ID')
 if phase not in ('baseline','integrated'):raise ValueError('Invalid phase')
 target=Path(target).resolve();output=Path(output).resolve();output.mkdir(parents=True,exist_ok=True);output.chmod(0o777)
 if target==output or output.is_relative_to(target):raise ValueError('Separate private output directory required')
 from .workflow import snapshot, safe_path
 state=snapshot(target)
 staging=tempfile.TemporaryDirectory(prefix='headstart-sandbox-input-')
 clean=Path(staging.name);clean.chmod(0o755)
 for rel in state['files']:
  source=safe_path(target,rel);destination=clean/rel;destination.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(source,destination);shutil.copymode(source,destination)
 name='headstart-check-'+os.urandom(8).hex()
 command=['docker','run','--rm','--name',name,'--pull','never','--network','none','--read-only','--cap-drop','ALL','--security-opt','no-new-privileges','--pids-limit','256','--cpus','2','--memory','1536m','--memory-swap','1536m','--tmpfs','/tmp:rw,nosuid,size=512m','--user','1000:1000','--mount',f'type=bind,source={clean},target=/app,readonly','--mount',f'type=bind,source={HERE},target=/harness,readonly','--mount',f'type=bind,source={output},target=/output',image,'node','/harness/browser-runner.mjs',phase,viewport]
 try:
  result=subprocess.run(command,capture_output=True,text=True,timeout=60)
  (output/(phase+'-'+viewport+'.log')).write_text(result.stdout+'\n'+result.stderr)
  if not result.stdout.strip():raise ValueError('Sandbox emitted no evidence; exit '+str(result.returncode))
  parsed=json.loads(result.stdout)
  if result.returncode or parsed['report']['result']!='PASS':raise ValueError('Runtime checks failed; inspect retained log')
  return parsed
 except subprocess.TimeoutExpired as error:
  stdout=error.stdout or b'';stderr=error.stderr or b''
  if isinstance(stdout,bytes):stdout=stdout.decode('utf-8','replace')
  if isinstance(stderr,bytes):stderr=stderr.decode('utf-8','replace')
  (output/(phase+'-'+viewport+'.log')).write_text('Sandbox timed out at 60 seconds\n'+stdout[-64000:]+'\n'+stderr[-64000:])
  subprocess.run(['docker','rm','-f',name],capture_output=True,timeout=10)
  raise
 except BaseException:
  subprocess.run(['docker','rm','-f',name],capture_output=True,timeout=10)
  raise
 finally:staging.cleanup()
