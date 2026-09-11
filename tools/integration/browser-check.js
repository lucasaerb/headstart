import {monitor} from './monitor.js';
import {createGame} from '/app/src/game.js';
function connected(indices,count){const edges=Array.from({length:count},()=>new Set());for(let i=0;i<indices.length;i+=3){const triangle=Array.from(indices.slice(i,i+3));for(const a of triangle)for(const b of triangle){if(a<0||a>=count||b<0||b>=count)return false;edges[a].add(b);}}const seen=new Set([0]),pending=[0];while(pending.length){for(const next of edges[pending.pop()])if(!seen.has(next)){seen.add(next);pending.push(next);}}return seen.size===count;}
const report={schemaVersion:1,result:'FAIL',checks:[]};
const check=(name,value)=>{if(!value)throw new Error(name);report.checks.push(name);};
try {
 const game=window.game, initial=game.snapshot(), expected=new URL(location.href).searchParams.get('expected');
 const renderer=game.renderer,camera=game.camera,scene=game.scene;
 check('no hidden initial frame scheduler',monitor.frames()===0);
 check('one canvas and owned renderer',document.querySelectorAll('canvas').length===1 && monitor.contexts()===1);
 check('exact target topology',initial.vertices===576 && game.geometry.index.count===3174);
 check('actual input listeners registered',monitor.listeners()===2);
 const original=initial.height.slice();game.regenerate(7);check('same seed repeats exactly',JSON.stringify(original)===JSON.stringify(game.snapshot().height));
 game.regenerate(18);const changed=game.snapshot().height;
 check('capability behavior matches phase',expected==='baseline' ? changed.every(x=>x===0) : new Set(changed.map(x=>x.toFixed(4))).size>100 && JSON.stringify(original)!==JSON.stringify(changed));
 check('finite bounded heights',changed.every(x=>Number.isFinite(x)&&Math.abs(x)<2));
 // Every adjacent grid cell shares indexed vertices; no detached islands added.
 const indices=game.geometry.index.array;check('connected grid topology',connected(indices,576));
 check('disconnected fully covered topology is rejected',!connected([0,1,2,3,4,5],6));
 const callbacks=new Map();let id=0;const realRequest=window.requestAnimationFrame,realCancel=window.cancelAnimationFrame;
 window.requestAnimationFrame=callback=>{callbacks.set(++id,callback);return id;};window.cancelAnimationFrame=key=>callbacks.delete(key);
 game.start();game.start();check('idempotent single loop',callbacks.size===1);
 const advance=()=>{const pending=[...callbacks.values()];callbacks.clear();for(const callback of pending)callback(16);};
 window.dispatchEvent(new KeyboardEvent('keydown',{code:'ArrowRight'}));advance();window.dispatchEvent(new KeyboardEvent('keyup',{code:'ArrowRight'}));
 check('existing keyboard movement',game.snapshot().playerX>.09 && callbacks.size===1);
 const x=game.snapshot().playerX;advance();check('keyup stops movement',game.snapshot().playerX===x);
 game.pause();const paused=game.snapshot();advance();game.update();check('pause cancels loop and updates',callbacks.size===0 && game.snapshot().ticks===paused.ticks);
 game.reset();check('reset restores player seed and state',game.snapshot().playerX===0 && game.snapshot().seed===7 && game.snapshot().ticks===0);
 check('renderer camera scene ownership preserved',game.renderer===renderer && game.camera===camera && game.scene===scene);
 let geometryDisposals=0,materialDisposals=0;
 game.geometry.addEventListener('dispose',()=>geometryDisposals++);game.terrain.material.addEventListener('dispose',()=>materialDisposals++);
 game.start();game.dispose();game.dispose();window.dispatchEvent(new KeyboardEvent('keydown',{code:'ArrowRight'}));advance();
 check('dispose removes loops and listeners',callbacks.size===0 && game.snapshot().listeners===0 && monitor.listeners()===0 && game.snapshot().disposed);
 check('dispose resources exactly once',geometryDisposals===1 && materialDisposals===1);
 let rejected=false;try{game.start();}catch{rejected=true;}check('disposed instance cannot restart',rejected);
 window.requestAnimationFrame=realRequest;window.cancelAnimationFrame=realCancel;
 // Fresh instance is stationary for actual rendered before/after capture.
 window.game=createGame(document.querySelector('canvas'));report.result='PASS';report.phase=expected;report.capability=window.game.snapshot().capability;report.heightRange=[Math.min(...window.game.snapshot().height),Math.max(...window.game.snapshot().height)];
} catch(error){report.error=String(error.message);}
document.getElementById('result').textContent=JSON.stringify(report);document.documentElement.dataset.result=report.result;
