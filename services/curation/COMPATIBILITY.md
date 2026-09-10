# Proposed compatibility matrix and first ten integrations

All entries are statically source-reviewed, **not isolation-tested or integration-tested**. The proposed baseline is an existing Three.js WebGL target aligned with source commit `5c5a575bd8cc0cf440026ce8dcf6a77862067684` (package manifest `0.186.0`). R3F is a proposed adapter environment; its version must be inspected in the actual target. Preserve a single Canvas/WebGL renderer, camera ownership, render loop and physics owner. Do not install another engine copy or infer version-range compatibility from imports.

| Priority | Capability | Effort band | Target assumptions and pass/fail requirement |
|---|---|---|---|
| 1 | Improved Perlin noise (`three-improvednoise`) | small | Pure sampling; no lifecycle or render/input/physics ownership. Pass: Same coordinates return stable values; integrating sampler preserves caller terrain seed policy. Fail: any assertion fails, resources/listeners leak, or a preserved target system changes. |
| 2 | Seedable simplex noise (`three-simplexnoise`) | small | Construct once with seeded RNG for deterministic worlds; no rendering or physics. Pass: Equal seeded generators produce matching sample arrays; changed seed changes generated terrain. Fail: any assertion fails, resources/listeners leak, or a preserved target system changes. |
| 3 | Capsule bounds queries (`three-capsule`) | small | Mutable math data; no physics world, timestep, impulses or collision response. Pass: Known intersecting/disjoint capsule-box cases pass without creating a physics world. Fail: any assertion fails, resources/listeners leak, or a preserved target system changes. |
| 4 | Oriented box intersection queries (`three-obb`) | small | Pure query objects; preserve target physics ownership; no response integration. Pass: Rotated intersecting and separated boxes produce expected booleans; units remain consistent. Fail: any assertion fails, resources/listeners leak, or a preserved target system changes. |
| 5 | Rounded box mesh geometry (`three-roundedboxgeometry`) | small | Caller owns geometry disposal and material; no assets, renderer, input or physics. Pass: Expected bounds and rounded corners; repeated mount/unmount releases geometry. Fail: any assertion fails, resources/listeners leak, or a preserved target system changes. |
| 6 | Parametric surface geometry (`three-parametricgeometry`) | small | Callback code and geometry disposal caller-owned; no scene/input/runtime loop. Pass: Known plane callback creates expected vertices/normals/UVs; bounds and subdivisions match requested values. Fail: any assertion fails, resources/listeners leak, or a preserved target system changes. |
| 7 | Subdivided wire box geometry (`three-boxlinegeometry`) | small | Caller supplies line material and disposes geometry; world-unit dimensions. Pass: Expected wire bounds/segment counts; teardown disposes geometry/material owned by adapter. Fail: any assertion fails, resources/listeners leak, or a preserved target system changes. |
| 8 | Orbit camera controls (`three-orbitcontrols`) | medium | One owner of camera and DOM input; connect/disconnect/dispose listeners. Call update from existing loop; no new renderer. Pass: Orbit/pan/dolly work; disabling restores target control; unmount removes listeners; damping updates through existing frame loop. Fail: any assertion fails, resources/listeners leak, or a preserved target system changes. |
| 9 | Pointer-lock camera look (`three-pointerlockcontrols`) | medium | Request lock after user gesture; handle lock loss; disconnect/dispose; no position physics. Pass: Gesture locks, escape unlocks, mouse look clamps correctly, teardown removes document listeners. Fail: any assertion fails, resources/listeners leak, or a preserved target system changes. |
| 10 | Vertex normal visualization (`three-vertexnormalshelper`) | small | Call update after transform/geometry changes; dispose helper resources only; no target geometry disposal. Pass: Normals track object transforms and configured world length; helper cleanup preserves original mesh. Fail: any assertion fails, resources/listeners leak, or a preserved target system changes. |

Effort bands are editorial estimates: small = a bounded adapter and focused checks; medium = ownership/input/lifecycle wiring across existing systems; large = renderer passes or animation mapping with substantial validation. They are not durations or measured results.

## Remaining scopes and limits

- Camera controls: browser DOM input; target must choose one active controller; seconds-based delta only where source requires it. No collision/gravity supplied.
- Geometry/math: target-defined world units; caller geometry/material ownership, seeded RNG policy and degenerate-input guards remain integration work.
- Reflector/Refractor/Sky/Water/LightProbeHelper: Three WebGL APIs and inline shaders; WebGPU compatibility is not claimed. Budget additional reflection/refraction passes, preserve renderer state, and dispose every owned resource. Water needs a source adapter exposing its closure-held render target for cleanup.
- CSS2D/CSS3D: separate DOM overlay rendering synchronized with existing camera; no second WebGL renderer, but DOM positioning, zoom support and pointer arbitration require tests.
- Skeleton utilities: caller-owned skeletons/clips and explicit bone mapping. Assets and retarget quality are unverified.
- SceneUtils includes complete BufferGeometryUtils dependency. Unused exported computeMikkTSpaceTangents expects an external MikkTSpace implementation; that operation and its WASM/assets are excluded from the selected SceneUtils reuse path.
- Source-reviewed whole modules retain upstream inline algorithm references and root MIT notices. Three core remains an external target peer with its own retained license; imported engine implementation is not copied into component scope.
- Complete starters remain discoverable through the unchanged research catalog, with their existing readiness/rights status. The curated component set does not silently promote whole game starters.

## Withheld

Water2 remains reference-only: two default texture paths lack reviewed image rights, and its private reflector/refractor/timer lifecycle needs an adapter. Its bytes are retained in the intake snapshot for review but it is neither seeded nor counted.

Independent reviewer must trace all 30 (29 new addon scopes plus previously reviewed 2048 tile) before acceptance. No audience remix, gameplay test or royalty agreement is established by this matrix.
