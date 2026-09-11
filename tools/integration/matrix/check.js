import {monitor} from '/harness/monitor.js';
import {checkFeature} from '/harness/matrix/oracles.js';
import {createGame} from '/app/src/game.js';
const report={schemaVersion:1,result:'FAIL',checks:[]},check=(name,ok)=>{if(!ok)throw Error(name);report.checks.push(name);};
try{
 const game=window.game,phase=new URL(location.href).searchParams.get('expected'),row=document.body.dataset.row;
 const renderer=game.renderer,camera=game.camera,scene=game.scene,terrain=game.geometry,feature=game.feature;
 check('one renderer and no hidden initial loop',monitor.contexts()===1&&monitor.frames()===0&&document.querySelectorAll('canvas').length===1);
 check('original input owner retained',monitor.listeners()===2);
 if(phase==='integrated')checkFeature(feature,row,check);else check('unchanged plain landmark baseline',feature.geometry.type==='BoxGeometry'&&scene.children.includes(feature.mesh));
 const callbacks=new Map();let serial=0;const request=window.requestAnimationFrame,cancel=window.cancelAnimationFrame;
 window.requestAnimationFrame=fn=>{callbacks.set(++serial,fn);return serial;};window.cancelAnimationFrame=id=>callbacks.delete(id);
 const tick=()=>{const values=[...callbacks.values()];callbacks.clear();for(const fn of values)fn(16);};
 game.start();game.start();check('idempotent single existing frame scheduler',callbacks.size===1);
 window.dispatchEvent(new KeyboardEvent('keydown',{code:'ArrowRight'}));tick();window.dispatchEvent(new KeyboardEvent('keyup',{code:'ArrowRight'}));check('existing explorer movement preserved',game.snapshot().playerX>.09);
 const x=game.snapshot().playerX;tick();check('keyup stops original movement',game.snapshot().playerX===x);
 game.pause();const paused=game.snapshot().ticks;tick();game.update();check('pause freezes loop and simulation',callbacks.size===0&&game.snapshot().ticks===paused);
 game.reset();check('reset restores original explorer and seed',game.snapshot().playerX===0&&game.snapshot().ticks===0&&game.snapshot().seed===7);
 check('original renderer camera scene terrain owners preserved',renderer===game.renderer&&camera===game.camera&&scene===game.scene&&terrain===game.geometry);
 // Adapter teardown before target teardown must release only its resources.
 let originalDisposed=0;terrain.addEventListener('dispose',()=>originalDisposed++);
 const resources=new Set(feature.owned||[feature.geometry,feature.material]),disposals=new Map([...resources].map(x=>[x,0]));
 for(const resource of resources)resource.addEventListener('dispose',()=>disposals.set(resource,disposals.get(resource)+1));
 feature.dispose();feature.dispose();check('feature disposes all owned resources exactly once',[...disposals.values()].every(x=>x===1));
 check('feature cleanup preserves original world',originalDisposed===0&&scene.children.includes(game.terrain)&&feature.objects.every(x=>!scene.children.includes(x)));
 game.start();tick();check('original world remains usable after feature disposal',game.snapshot().ticks>0&&callbacks.size===1);
 game.dispose();game.dispose();check('target teardown removes listeners and frames',monitor.listeners()===0&&callbacks.size===0&&originalDisposed===1);
 let rejected=false;try{game.start();}catch{rejected=true;}check('disposed target refuses restart',rejected);
 window.requestAnimationFrame=request;window.cancelAnimationFrame=cancel;
 // Repeated full mount/unmount, then a stationary fresh scene for capture.
 const again=createGame(document.querySelector('canvas'));again.start();again.pause();again.reset();again.dispose();check('repeated mount cleanup returns baseline listeners',monitor.listeners()===0&&monitor.frames()===0);
 window.game=createGame(document.querySelector('canvas'));report.result='PASS';report.phase=phase;report.row=row;
}catch(error){report.error=String(error.message);}
document.getElementById('result').textContent=JSON.stringify(report);document.documentElement.dataset.result=report.result;
