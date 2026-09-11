# Issue 17 — independent reproduction plan

Reviewer: `reuse_handoff`; implementation author remains separate. This is a review outline, not an authored integration fixture or a passing attestation. It translates the complete frozen #17 issue and `services/curation/COMPATIBILITY.md` into anticipated checks. Actual #17 execution must wait for the needed #16 contract's independent acceptance.

## Evidence envelope for every successful row

Each of ten rows needs an individually runnable command and exact component/source commit/file digests, target unchanged base and resulting revision/digest, runtime and lockfile versions, physics ownership/version or explicit none, adapter/recipe/settings digest, plugin/brief versions, notices, and environment/container/browser/device details. Record actual build/runtime/check logs and before/after visual captures. A descriptive matrix or a build that imports ten classes is not ten working integrations.

Existing catalog execution evidence is `headstart-execution-0.1`: the attestation binds source commit, target commit, recipe and scope digest, recipe and target immutable references, result, runner/environment/time and named check results with log digests. The catalog store verifies matching context and log bytes. Any new #16 execution record must map these concepts explicitly; a synthetic test fixture cannot be relabeled a real measured run. Catalog promotion is limited to the exact successful source/target/recipe matrix, not the entire upstream game or every Three/R3F version.

A reviewer reproduction will start from fresh disposable, CPU/memory/time-bounded environments without platform credentials. It will inspect the bounded source/target inputs and command before execution, run the unchanged baseline and integration, retain outputs separately from author evidence and compare their actual behavior. Browser captures describe the declared target game's own brief; HeadStart's C4 is not the art requirement for these target games.

## Proposed capability-specific probes

The first-ten curation matrix is a starting set, not permission to weaken any missing behavior. A different reviewed capability can replace a row only with a comparably specific target test and declared reason.

| Candidate | Independent behavior oracle and target use | Preserved/lifecycle probe |
|---|---|---|
| ImprovedNoise | Repeated fixed coordinates agree; distinct nontrivial coordinates have nonconstant finite output. Sample a real target terrain/data surface and assert an independently specified range/feature, not only module construction. Resolve its actual `three` MathUtils peer at this source revision. | Reset reproduces declared sampling state. Paused target does not advance its simulation. Existing target generator/seed policy and render loop remain authoritative. |
| SimplexNoise | Two freshly seeded RNG instances generate equal selected samples; another seed changes the result. A constant-output stub must fail. If the integration claims traversable/generated paths, test connectivity with an independent graph walk between declared anchors. | Reset and repeated create/dispose preserve target seed/input ownership and release adapter state. Connectivity may be explicitly N/A only when no topology is represented by that integration. |
| Capsule | Known separated/touching/intersecting capsule-box arrangements, translated positions and units produce independently expected results in a target collision/debug flow. Query geometry does not claim a complete physics engine. | Preserve the original physics world/timestep, including its baseline behavior; creating the adapter must not allocate another world. |
| OBB | Rotated intersecting and separating boxes, moved target meshes and known noncollision cases yield expected booleans. A fixed-true/false replacement must fail. | Preserve mesh transforms and physics authority through pause/reset; release adapter-owned debug geometry only. |
| RoundedBoxGeometry | Target mesh renders with expected extents and rounded corner/normal characteristics; a sharp-box substitution should fail the specific rounded-feature check. | Repeated mount/update/dispose returns owned geometry/material counts to baseline and leaves original target geometry intact. |
| ParametricGeometry | An independently specified plane/surface callback yields known sample coordinates, subdivisions, normals/UVs and world bounds in the target scene. | Callback and scene ownership remain with the target; reset/rebuild disposes the previous adapter geometry. |
| BoxLineGeometry | Known dimensions/segments produce expected endpoints/bounds and visible line behavior; line-count-only checks are insufficient if positions are wrong. | Dispose only adapter geometry/material; baseline mesh/material and animation remain usable. |
| OrbitControls | Real DOM pointer drag/pan/wheel changes the intended camera in the expected direction; controls disabled or paused do not consume/update target control improperly; update is driven by the existing frame loop. | Capture listener add/remove identity and capture flags on all affected targets; repeated mount/unmount restores baseline. Keep one camera input owner and one renderer/loop. |
| PointerLockControls | Real user-gesture lock, mouse look/clamps and actual lock loss/escape on a declared supported browser. Defining fake `pointerLockElement` or manually dispatching a success event does not prove browser pointer lock. | Denied lock is a tested honest error/fallback, not a counted successful lock. Disconnect/dispose removes listeners and restores the target's original input/camera ownership; no movement collision behavior is inferred from look-only controls. |
| VertexNormalsHelper | Known transformed target geometry produces correct origin/direction/length for helper normals after update; the original mesh's rendered behavior is preserved. | Helper cleanup releases its resources without disposing caller geometry or changing the target's material; repeat create/update/dispose. |

For every row, explicitly cover **start, update, pause, reset and dispose** at the adapter/target level. Pure math classes need no invented listener lifecycle; exercise how their adapter participates in the target's lifecycle and prove it adds no listener/renderer/physics ownership. State honest N/A fields with source-based reasons rather than pretending a no-op exercises behavior the source does not have.

## Negative and entangled cases

The reviewer will look for checks that fail when the adapter is a no-op or returns a constant, drops disposal, leaks a listener, duplicates the render loop/renderer/physics world, changes a preserved target camera, supplies unresolved assets/dependencies, or uses a stale source/target/recipe state. Assertions should compare externally observable outcomes or independently specified geometry/math facts. Merely checking the test's own counters, class names or saved JSON flags cannot establish capability reuse.

Source/target drift must invalidate the old plan before applying writes. Unrelated target edits and instructions survive cancellation/failure; rollback restores only the bounded patch and preserves original baseline evidence. Rights or dependency gaps fail the affected scope. A failed or unavailable browser/device row stays failed/untested and cannot count toward the ten successes.

## Visual and measurement review

Retain desktop/mobile baseline and integrated captures for each material visual state, with camera/viewport/browser and test revision. Inspect alignment, clipping, interactions, input ownership and meaningful visual change; mobile inability is an explicit matrix limitation, not silent desktop-only evidence. For temporal behavior, a short actual captured sequence or meaningful before/after event trace may supplement screenshots. Never substitute generated mockups for execution captures.

No frame-time/loading/memory number is required merely to look complete. Any reported number needs measured workload, warmup/sampling, device/renderer/settings and comparable baseline/integrated conditions. `renderer.info` resource counters are useful cleanup evidence but are not total process memory or a universal performance score.

Final #17 verdict follows independent reproduction of all ten successful rows and the negative/failure cases, with exact source/target/recipe/log/capture hashes. This plan establishes no current successful integration.
