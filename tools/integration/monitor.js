// Trusted harness records actual listener identities and WebGL canvas ownership.
const active=[];const canvases=new Set();
const add=EventTarget.prototype.addEventListener,remove=EventTarget.prototype.removeEventListener,getContext=HTMLCanvasElement.prototype.getContext;
const capture=options=>typeof options==='boolean'?options:!!options?.capture;
EventTarget.prototype.addEventListener=function(type,listener,options){if(this===window&&['keydown','keyup'].includes(type)&&!active.some(r=>r.type===type&&r.listener===listener&&r.capture===capture(options)))active.push({type,listener,capture:capture(options)});return add.call(this,type,listener,options);};
EventTarget.prototype.removeEventListener=function(type,listener,options){if(this===window){const index=active.findIndex(r=>r.type===type&&r.listener===listener&&r.capture===capture(options));if(index>=0)active.splice(index,1);}return remove.call(this,type,listener,options);};
HTMLCanvasElement.prototype.getContext=function(type,...args){const result=getContext.call(this,type,...args);if(result&&['webgl','webgl2','experimental-webgl'].includes(type))canvases.add(this);return result;};
export const monitor={listeners:()=>active.length,contexts:()=>canvases.size};
const pendingFrames=new Set();const request=window.requestAnimationFrame,cancel=window.cancelAnimationFrame;
window.requestAnimationFrame=callback=>{let key;key=request.call(window,time=>{pendingFrames.delete(key);callback(time);});pendingFrames.add(key);return key;};
window.cancelAnimationFrame=key=>{pendingFrames.delete(key);return cancel.call(window,key);};
monitor.frames=()=>pendingFrames.size;
