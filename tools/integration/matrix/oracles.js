import * as T from 'three';
const near=(a,b,e=1e-5)=>Math.abs(a-b)<e;
const vector=(attribute,i)=>new T.Vector3().fromBufferAttribute(attribute,i);
export function checkFeature(feature,row,check){
 const g=feature.geometry,p=g.attributes.position;
 g.computeBoundingBox();const extent=g.boundingBox.getSize(new T.Vector3());
 if(row==='roundedboxgeometry'){
  check('rounded landmark extents',near(extent.x,4)&&near(extent.y,4)&&near(extent.z,4));
  check('rounded landmark excludes sharp corners',Array.from({length:p.count},(_,i)=>vector(p,i)).every(v=>v.length()<Math.sqrt(12)-.05));
  const n=g.attributes.normal;check('rounded surface has blended normals',Array.from({length:n.count},(_,i)=>vector(n,i)).some(v=>Math.abs(v.x)>.1&&Math.abs(v.y)>.1&&Math.abs(v.z)>.1));
 }
 if(row==='parametricgeometry'){
  check('parametric subdivisions',p.count===63&&g.index.count===288);
  let valid=true;for(let y=0;y<=6;y++)for(let x=0;x<=8;x++){const i=y*9+x,v=vector(p,i),u=x/8,w=y/6;valid&&=near(v.x,(u-.5)*6)&&near(v.y,2*u*u+w)&&near(v.z,(w-.5)*6);}
  check('independent parametric samples',valid);check('parametric UV endpoints',near(g.attributes.uv.getX(62),1)&&near(g.attributes.uv.getY(62),1));
  check('parametric nonzero normalized normals',Array.from({length:g.attributes.normal.count},(_,i)=>vector(g.attributes.normal,i).length()).every(x=>near(x,1)));
 }
 if(row==='boxlinegeometry'){
  check('construction frame exact extents',near(extent.x,4)&&near(extent.y,6)&&near(extent.z,8));
  const edges=new Set();let valid=true;
  for(let i=0;i<p.count;i+=2){const a=vector(p,i),b=vector(p,i+1),d=b.clone().sub(a);valid&&=[d.x,d.y,d.z].filter(x=>Math.abs(x)>1e-6).length===1;valid&&=[a,b].every(v=>near((v.x+2)/2,Math.round((v.x+2)/2))&&near((v.y+3)/2,Math.round((v.y+3)/2))&&near((v.z+4)/2,Math.round((v.z+4)/2)));edges.add([a.toArray().join(','),b.toArray().join(',')].sort().join('|'));}
  check('construction frame axis aligned grid endpoints',valid);check('construction frame spans corner-to-corner edges',edges.has('-2,-3,-4|-2,-3,4') && edges.has('0,-3,-4|0,3,-4') && edges.has('-2,-1,-4|2,-1,-4') && p.count===96);
 }
 if(row==='convexgeometry'){
  const points=[new T.Vector3(-2,-2,-2),new T.Vector3(2,-2,-2),new T.Vector3(0,2,-2),new T.Vector3(0,0,2)];
  const vertices=Array.from({length:p.count},(_,i)=>vector(p,i));check('convex hull retains every extreme point',points.every(a=>vertices.some(b=>a.distanceTo(b)<1e-6)));
  check('convex hull excludes interior point',vertices.every(v=>v.length()>1));let encloses=true,volume=0;
  for(let i=0;i<p.count;i+=3){const a=vertices[i],b=vertices[i+1],c=vertices[i+2],normal=b.clone().sub(a).cross(c.clone().sub(a)).normalize();encloses&&=points.every(v=>normal.dot(v.clone().sub(a))<=1e-5);volume+=a.dot(b.clone().cross(c))/6;}
  check('convex outward faces contain all source points',encloses);check('convex tetrahedron volume',near(Math.abs(volume),32/3));
 }
 if(['vertexnormalshelper','vertextangentshelper'].includes(row)){
  const helper=feature.helper,position=helper.geometry.attributes.position,mesh=feature.mesh;mesh.position.x=1.25;mesh.updateMatrixWorld(true);helper.update();
  let valid=true;const directionAttribute=g.attributes[row==='vertexnormalshelper'?'normal':'tangent'];
  for(let i=0;i<p.count;i++){const start=vector(p,i).applyMatrix4(mesh.matrixWorld),direction=vector(directionAttribute,i);if(row==='vertexnormalshelper')direction.applyMatrix3(new T.Matrix3().getNormalMatrix(mesh.matrixWorld)).normalize();else direction.transformDirection(mesh.matrixWorld);const end=start.clone().addScaledVector(direction,1.5);valid&&=vector(position,2*i).distanceTo(start)<1e-5&&vector(position,2*i+1).distanceTo(end)<1e-5;}
  check('transformed '+row+' endpoints and world length',valid);check('helper retains caller geometry material',mesh.geometry===g&&mesh.material===feature.material);
 }
 if(['capsule','obb'].includes(row)){
  check('query intersects target obstacle',feature.query(0)===true);check('query separates from target obstacle',feature.query(10)===false);
  if(row==='capsule')check('capsule strict overlap excludes tangency',feature.query(2.49)===true&&feature.query(2.5)===false&&feature.query(2.51)===false);
  else check('rotated box intersection boundary',feature.query(3.2,Math.PI/4)===true&&feature.query(3.5,Math.PI/4)===false);
  feature.update(0);check('query visible overlap state',feature.mesh.visible);feature.update(10);check('query visible separated state',!feature.mesh.visible);feature.update(0);
 }
 if(['simplexnoise','improvednoise'].includes(row)){
  feature.refresh(7);const a=Array.from(p.array);feature.refresh(7);check('terrain repeatable seed coordinates',JSON.stringify(a)===JSON.stringify(Array.from(p.array)));feature.refresh(18);check('terrain changed seed changes actual mesh',JSON.stringify(a)!==JSON.stringify(Array.from(p.array)));
  const heights=Array.from({length:p.count},(_,i)=>p.getY(i));check('terrain finite nonconstant bounds',heights.every(x=>Number.isFinite(x)&&Math.abs(x)<2)&&new Set(heights.map(x=>x.toFixed(4))).size>100);
  const adjacency=Array.from({length:p.count},()=>new Set());const index=g.index.array;for(let i=0;i<index.length;i+=3)for(const a of index.slice(i,i+3))for(const b of index.slice(i,i+3))adjacency[a].add(b);const seen=new Set([0]),queue=[0];while(queue.length)for(const v of adjacency[queue.pop()])if(!seen.has(v)){seen.add(v);queue.push(v);}check('generated terrain connected topology',seen.size===p.count);
 }
}
