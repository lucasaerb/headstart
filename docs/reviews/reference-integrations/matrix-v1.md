# Reference matrix v1 — planned, not yet tested

Author: reuse_mcp. This revision precedes execution and awaits issue16 prerequisite acceptance. Source for all rows: Three.js commit `5c5a575bd8cc0cf440026ce8dcf6a77862067684`, package0.186.0. Target: authored existing Three.js0.186.0 world, one WebGL renderer, one frame scheduler, existing keyboard explorer, Y-up meters and no physics engine. Its simulation/input/render ownership remains unchanged. Browser environment and source/target/recipe/plugin digests will be pinned per actual run; no R3F support is claimed.

The initial curation matrix's OrbitControls and PointerLockControls rows are replaced by ConvexGeometry and VertexTangentsHelper. The first supported boundary is world geometry, deterministic generation and visual debugging. Actual browser pointer-lock permissions and camera ownership need their own reviewed adapters; both camera rows remain untested. Parent and independent reviewer accepted this conditional scope before execution. This is ten different capabilities, not ten configurations of one utility.

| Row | Actual target integration | Independent behavior oracle |
| --- | --- | --- |
| SimplexNoise | Seeded rolling terrain within existing indexed world | Equal seed reproduces, another differs, nonconstant bounded values and graph connectivity; constant replacement fails. |
| ImprovedNoise | Coordinate-stable rolling terrain within the same generator interface | Known origin and nontrivial coordinates, repeated sampling and connected surface; constant replacement fails. Exact target MathUtils peer retained. |
| Capsule | Explorer proximity/collision-query overlay against a fixed world obstacle | Separated/touching/intersecting and translated capsule cases alter visible query state; no response, gravity or physics engine claimed. |
| OBB | Rotated world obstacle proximity overlay | Known intersecting/separated/rotated arrangements and translated query state; fixed boolean replacement fails. |
| RoundedBoxGeometry | Rounded landmark replaces target's plain landmark through its geometry slot | World bounds and radius produce vertices/normals distinct from sharp corners; sharp-box replacement fails. |
| ParametricGeometry | Target displays a curved parametric landmark | Independently specified callback samples, subdivision/UV/normal and bounds; flat/no-op substitution fails. |
| BoxLineGeometry | Visible subdivided construction frame around a target landmark | Expected endpoints/axis alignment/extents and segment positions; incorrect positions fail even if counts match. |
| VertexNormalsHelper | Toggleable surface-normal overlay on transformed target landmark | Known normal origins/directions/world lengths after transform; original mesh remains owned by target. |
| ConvexGeometry | Target landmark hull from authored extreme/interior points | All extreme points on hull, interior point excluded from boundary, face normals enclose all points and expected volume/bounds; complete ConvexHull closure. |
| VertexTangentsHelper | Tangent-direction overlay for target surface debugging | Transformed tangent origins and endpoints from known signed tangent attributes; original geometry/material survive overlay cleanup. |

Every row runs unchanged baseline and integrated scene at desktop/mobile, tests start/update/pause/reset/dispose and repeated mount/dispose, compares renderer/camera/input/loop ownership and retains source notices. No-op and missing-disposal mutants must fail capability/lifecycle checks. Common workflow regressions cover authorization, stale source/target/recipe, missing rights/dependencies, unrelated edits, instruction data, interruption and exact rollback. No numerical frame-time, loading or process-memory claim is planned.

Runs will use a local authorized source context with reviewed source scopes and exact preexisting engine peer bytes. This is separate from a platform handoff; synthetic fixture metadata must never be presented as verified-email identity. Catalog scope promotion remains blocked until independent reproduction and matching attestation acceptance.
