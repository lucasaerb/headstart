import * as THREE from '../vendor/three.module.js';
import { heights, capability } from './terrain.js';
export function createGame(canvas, scheduler = window) {
  const renderer = new THREE.WebGLRenderer({canvas, antialias:true});
  renderer.setSize(canvas.clientWidth || 800, canvas.clientHeight || 480, false);
  const scene = new THREE.Scene(); scene.background = new THREE.Color('#c4e6ea');
  const camera = new THREE.PerspectiveCamera(45,canvas.width/canvas.height,.1,100);
  camera.position.set(16,14,20);camera.lookAt(0,0,0);
  const geometry = new THREE.PlaneGeometry(20,20,23,23);geometry.rotateX(-Math.PI/2);
  const material=new THREE.MeshNormalMaterial({flatShading:true,wireframe:false});
  const terrain=new THREE.Mesh(geometry,material);scene.add(terrain);
  const playerGeometry=new THREE.BoxGeometry(.5,1,.5),playerMaterial=new THREE.MeshBasicMaterial({color:'#f1804e'});
  const player=new THREE.Mesh(playerGeometry,playerMaterial);player.position.y=3;scene.add(player);
  let seed=7,frame=null,running=false,disposed=false,ticks=0,listeners=0;
  const keys=new Set();
  function regenerate(value){seed=value;const values=heights(24,seed);for(let i=0;i<values.length;i++)geometry.attributes.position.setY(i,values[i]);geometry.attributes.position.needsUpdate=true;geometry.computeVertexNormals();}
  function down(event){keys.add(event.code);} function up(event){keys.delete(event.code);}
  window.addEventListener('keydown',down);window.addEventListener('keyup',up);listeners=2;
  function update(){if(disposed||!running)return;if(keys.has('ArrowRight'))player.position.x+=.1;ticks++;renderer.render(scene,camera);}
  function loop(){frame=null;if(!running||disposed)return;update();frame=scheduler.requestAnimationFrame(loop);}
  function start(){if(disposed)throw new Error('disposed');if(running)return;running=true;frame=scheduler.requestAnimationFrame(loop);}
  function pause(){running=false;if(frame!==null)scheduler.cancelAnimationFrame(frame);frame=null;}
  function reset(){pause();player.position.x=0;keys.clear();ticks=0;regenerate(7);renderer.render(scene,camera);}
  function dispose(){if(disposed)return;pause();disposed=true;window.removeEventListener('keydown',down);window.removeEventListener('keyup',up);listeners=0;geometry.dispose();material.dispose();playerGeometry.dispose();playerMaterial.dispose();renderer.dispose();}
  regenerate(seed);renderer.render(scene,camera);
  return {start,pause,reset,dispose,update,regenerate,scene,camera,renderer,terrain,player,geometry,
    snapshot(){return {capability,seed,ticks,listeners,running,disposed,framePending:frame!==null,vertices:geometry.attributes.position.count,height:Array.from(geometry.attributes.position.array).filter((_,i)=>i%3===1),playerX:player.position.x};}};
}
