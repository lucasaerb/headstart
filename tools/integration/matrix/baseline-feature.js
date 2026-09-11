import * as T from 'three';
export function createFeature(scene) {
 const geometry=new T.BoxGeometry(4,4,4),material=new T.MeshNormalMaterial();
 const mesh=new T.Mesh(geometry,material);mesh.position.set(4,2,0);scene.add(mesh);
 let disposed=false;
 return {mesh,geometry,material,objects:[mesh],refresh(){},update(){},query(){return null;},dispose(){if(disposed)return;disposed=true;scene.remove(mesh);geometry.dispose();material.dispose();}};
}
