import * as T from 'three';
import {CAPABILITY_CLASS} from './SOURCE_PATH';
const ROW='ROW_ID';
export function createFeature(scene) {
 let seed=7,disposed=false;
 const material=new T.MeshNormalMaterial({side:T.DoubleSide}),lineMaterial=new T.LineBasicMaterial({color:0x183768});
 let geometry,mesh,helper,query=()=>null;
 const objects=[],owned=[];
 if(ROW==='roundedboxgeometry')geometry=new CAPABILITY_CLASS(4,4,4,3,.5);
 if(ROW==='parametricgeometry')geometry=new CAPABILITY_CLASS((u,v,out)=>out.set((u-.5)*6,2*Math.sin(Math.PI*u)*Math.sin(Math.PI*v),(v-.5)*6),8,6);
 if(ROW==='boxlinegeometry')geometry=new CAPABILITY_CLASS(4,6,8,2,3,4);
 if(ROW==='convexgeometry')geometry=new CAPABILITY_CLASS([new T.Vector3(-2,-2,-2),new T.Vector3(2,-2,-2),new T.Vector3(0,2,-2),new T.Vector3(0,0,2),new T.Vector3(0,0,0)]);
 if(['vertexnormalshelper','vertextangentshelper'].includes(ROW)){
  geometry=new T.PlaneGeometry(4,4,2,2);geometry.computeTangents();
 }
 if(['capsule','obb'].includes(ROW)){geometry=new T.BoxGeometry(4,4,4);material.wireframe=true;}
 if(['simplexnoise','improvednoise'].includes(ROW)){geometry=new T.PlaneGeometry(12,12,15,15);geometry.rotateX(-Math.PI/2);}
 mesh=ROW==='boxlinegeometry'?new T.LineSegments(geometry,lineMaterial):new T.Mesh(geometry,material);mesh.position.set(4,2,0);scene.add(mesh);objects.push(mesh);owned.push(geometry,material,lineMaterial);
 if(['vertexnormalshelper','vertextangentshelper'].includes(ROW)){
  mesh.rotation.y=.4;mesh.rotation.z=.2;mesh.updateMatrixWorld(true);helper=new CAPABILITY_CLASS(mesh,1.5,0x183768);scene.add(helper);objects.push(helper);owned.push(helper.geometry,helper.material);
 }
 if(ROW==='capsule')query=x=>new CAPABILITY_CLASS(new T.Vector3(x,0,0),new T.Vector3(x,2,0),.5).intersectsBox(new T.Box3(new T.Vector3(-2,-2,-2),new T.Vector3(2,2,2)));
 if(ROW==='obb')query=(x,rotation=0)=>new CAPABILITY_CLASS(new T.Vector3(x,0,0),new T.Vector3(1,1,1),new T.Matrix3().setFromMatrix4(new T.Matrix4().makeRotationY(rotation))).intersectsOBB(new CAPABILITY_CLASS(new T.Vector3(),new T.Vector3(2,2,2)));
 function refresh(next=7){
  seed=next;
  if(['simplexnoise','improvednoise'].includes(ROW)){
   let state=seed>>>0;const rng={random(){state=(1664525*state+1013904223)>>>0;return state/4294967296;}};
   const generator=new CAPABILITY_CLASS(rng),position=geometry.attributes.position;
   for(let i=0;i<position.count;i++){const x=position.getX(i),z=position.getZ(i);position.setY(i,ROW==='simplexnoise'?generator.noise(x*.35,z*.35)*1.5:generator.noise(x*.35+seed,z*.35,0.5)*1.5);}
   position.needsUpdate=true;geometry.computeVertexNormals();
  }
  helper?.update();
 }
 function update(playerX){if(disposed)return;if(['capsule','obb'].includes(ROW))mesh.visible=query(playerX-mesh.position.x);helper?.update();}
 refresh();
 return {row:ROW,mesh,geometry,material,helper,objects,owned,query,refresh,update,get seed(){return seed;},dispose(){if(disposed)return;disposed=true;for(const object of objects)scene.remove(object);for(const resource of new Set(owned))resource.dispose();}};
}
