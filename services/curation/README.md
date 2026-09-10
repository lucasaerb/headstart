# Source-reviewed addon curation

`seed_curated_capabilities(store)` loads 29 Three.js addon capabilities. Combined with `seed_reviewed_tile(store)` there are **30 components across 14 categories including tile state**, from two parent projects. Every new capability is `source_reviewed`; none is integration-tested. `npm run catalog:init` calls both loaders. Complete starters retain their existing research entries.

`reviewed-source-maps.json` is the frozen author manifest: exact commit, source file digests, ranges, symbols, direct and transitive local addon dependencies, rights scope, creator, reviewer/date, coupling, lifecycle, exclusions and proposed behavior checks. `fixtures/threejs/` retains exact pinned source bytes and original MIT notice. Loader rejects modified source/manifests. Source URLs and selected-tree intake results are in `threejs-snapshot.json` and `threejs-lightprobe-snapshot.json`. Bytes were fetched through #9 intake with no install/build/code execution.

## Scope index

| ID | Category | Primary source | Symbols | Local source files |
|---|---|---|---|---|
| `three-improvednoise` | generation | [examples/jsm/math/ImprovedNoise.js](fixtures/threejs/examples/jsm/math/ImprovedNoise.js) | fade, grad, ImprovedNoise | 1 |
| `three-simplexnoise` | generation | [examples/jsm/math/SimplexNoise.js](fixtures/threejs/examples/jsm/math/SimplexNoise.js) | SimplexNoise | 1 |
| `three-capsule` | collision | [examples/jsm/math/Capsule.js](fixtures/threejs/examples/jsm/math/Capsule.js) | Capsule, checkAABBAxis | 1 |
| `three-obb` | collision | [examples/jsm/math/OBB.js](fixtures/threejs/examples/jsm/math/OBB.js) | OBB | 1 |
| `three-colorconverter` | materials | [examples/jsm/math/ColorConverter.js](fixtures/threejs/examples/jsm/math/ColorConverter.js) | ColorConverter | 1 |
| `three-orbitcontrols` | camera | [examples/jsm/controls/OrbitControls.js](fixtures/threejs/examples/jsm/controls/OrbitControls.js) | OrbitControls, onPointerDown, onPointerMove, onPointerUp, onMouseDown, onMouseMove | 1 |
| `three-mapcontrols` | camera | [examples/jsm/controls/MapControls.js](fixtures/threejs/examples/jsm/controls/MapControls.js) | MapControls | 2 |
| `three-trackballcontrols` | camera | [examples/jsm/controls/TrackballControls.js](fixtures/threejs/examples/jsm/controls/TrackballControls.js) | TrackballControls, onPointerDown, onPointerMove, onPointerUp, onPointerCancel, onKeyUp | 1 |
| `three-flycontrols` | camera | [examples/jsm/controls/FlyControls.js](fixtures/threejs/examples/jsm/controls/FlyControls.js) | FlyControls, onKeyDown, onKeyUp, onPointerDown, onPointerMove, onPointerUp | 1 |
| `three-firstpersoncontrols` | camera | [examples/jsm/controls/FirstPersonControls.js](fixtures/threejs/examples/jsm/controls/FirstPersonControls.js) | FirstPersonControls, onPointerDown, onPointerUp, onPointerMove, onKeyDown, onKeyUp | 1 |
| `three-pointerlockcontrols` | camera | [examples/jsm/controls/PointerLockControls.js](fixtures/threejs/examples/jsm/controls/PointerLockControls.js) | PointerLockControls, onMouseMove, onPointerlockChange, onPointerlockError | 1 |
| `three-roundedboxgeometry` | geometry | [examples/jsm/geometries/RoundedBoxGeometry.js](fixtures/threejs/examples/jsm/geometries/RoundedBoxGeometry.js) | getUv, RoundedBoxGeometry | 1 |
| `three-decalgeometry` | geometry | [examples/jsm/geometries/DecalGeometry.js](fixtures/threejs/examples/jsm/geometries/DecalGeometry.js) | DecalGeometry, DecalVertex | 1 |
| `three-convexgeometry` | geometry | [examples/jsm/geometries/ConvexGeometry.js](fixtures/threejs/examples/jsm/geometries/ConvexGeometry.js) | ConvexGeometry | 2 |
| `three-parametricgeometry` | geometry | [examples/jsm/geometries/ParametricGeometry.js](fixtures/threejs/examples/jsm/geometries/ParametricGeometry.js) | ParametricGeometry | 1 |
| `three-boxlinegeometry` | geometry | [examples/jsm/geometries/BoxLineGeometry.js](fixtures/threejs/examples/jsm/geometries/BoxLineGeometry.js) | BoxLineGeometry | 1 |
| `three-positionalaudiohelper` | audio | [examples/jsm/helpers/PositionalAudioHelper.js](fixtures/threejs/examples/jsm/helpers/PositionalAudioHelper.js) | PositionalAudioHelper | 1 |
| `three-vertexnormalshelper` | debug | [examples/jsm/helpers/VertexNormalsHelper.js](fixtures/threejs/examples/jsm/helpers/VertexNormalsHelper.js) | VertexNormalsHelper | 1 |
| `three-vertextangentshelper` | debug | [examples/jsm/helpers/VertexTangentsHelper.js](fixtures/threejs/examples/jsm/helpers/VertexTangentsHelper.js) | VertexTangentsHelper | 1 |
| `three-lightprobehelper` | lighting | [examples/jsm/helpers/LightProbeHelper.js](fixtures/threejs/examples/jsm/helpers/LightProbeHelper.js) | LightProbeHelper | 1 |
| `three-camerautils` | camera | [examples/jsm/utils/CameraUtils.js](fixtures/threejs/examples/jsm/utils/CameraUtils.js) | frameCorners | 1 |
| `three-sceneutils` | scene | [examples/jsm/utils/SceneUtils.js](fixtures/threejs/examples/jsm/utils/SceneUtils.js) | createMeshesFromInstancedMesh, createMeshesFromMultiMaterialMesh, createMultiMaterialObject, reduceVertices, sortInstancedMesh | 2 |
| `three-skeletonutils` | animation | [examples/jsm/utils/SkeletonUtils.js](fixtures/threejs/examples/jsm/utils/SkeletonUtils.js) | getBoneName, retarget, retargetClip, clone, getBoneByName, getBones | 1 |
| `three-reflector` | rendering | [examples/jsm/objects/Reflector.js](fixtures/threejs/examples/jsm/objects/Reflector.js) | Reflector | 1 |
| `three-refractor` | rendering | [examples/jsm/objects/Refractor.js](fixtures/threejs/examples/jsm/objects/Refractor.js) | Refractor | 1 |
| `three-sky` | world | [examples/jsm/objects/Sky.js](fixtures/threejs/examples/jsm/objects/Sky.js) | Sky | 1 |
| `three-water` | world | [examples/jsm/objects/Water.js](fixtures/threejs/examples/jsm/objects/Water.js) | Water | 1 |
| `three-css2drenderer` | ui | [examples/jsm/renderers/CSS2DRenderer.js](fixtures/threejs/examples/jsm/renderers/CSS2DRenderer.js) | CSS2DObject, CSS2DRenderer | 1 |
| `three-css3drenderer` | ui | [examples/jsm/renderers/CSS3DRenderer.js](fixtures/threejs/examples/jsm/renderers/CSS3DRenderer.js) | CSS3DObject, CSS3DSprite, CSS3DRenderer | 1 |

The existing `2048-tile` source map and full MIT notice remain under `services/catalog/fixtures/2048/` and `services/catalog/seed.py`. Source-reviewed boundaries clear selected source files only; caller textures, audio, fonts, clips and model content are excluded. Root MIT and inline creator/algorithm notices are preserved. No payment/royalty obligation is inferred.

External engine boundary: addon imports of `three` resolve to the target engine peer. Its declared version at the pinned source is 0.186.0; core implementation is not copied by these components and target transitive dependencies must be checked when integrating. Local addon imports are recursively included (MapControls→OrbitControls; ConvexGeometry→ConvexHull; SceneUtils→BufferGeometryUtils). SimplexNoise has no engine import and no dependency edge. Runtime-provided callbacks, textures, geometries and skeletons are explicit caller-owned inputs.

[Compatibility matrix and first ten](COMPATIBILITY.md) provides effort bands, assumptions, pass/fail targets and withheld Water2 rationale. Renderer ownership, cleanup and unknown compatibility remain explicit. Tests: `.venv/bin/python -m unittest discover -s services/curation/tests -v` (or the configured Python environment with jsonschema). They validate 30 real components, ≥6 categories, every pinned source digest/reference/rights scope, recursive addon closures, idempotent imports and rejection of unsupported tested promotion.

Independent review remains required before issue acceptance. This is agent-authored static inspection, not a human approval or executed gameplay result.
