# Batch 4 independent acceptance checklist

Full issue bodies remain in `issues-snapshot.json`. Begin after full batch 3 PASS; independently check dependency interfaces before activation.

## 16 · Implement bounded Three.js/R3F inspection, planning, edits and rollback

- [x] Inspect target instructions, manifests/lockfiles, source revision, unrelated edits, renderer/Canvas/render-loop, camera/input, coordinates, lifecycle and physics ownership; cache non-sensitive context by target state.
- [x] Plan a bounded adapter/slice with dependency changes, source rights, preserved behaviors, explicit assumptions and rollback; source/target/recipe drift invalidates the plan.
- [x] Apply only authorized scoped local changes and notices without adding conflicting renderers, loops or physics worlds; missing rights or contradictory constraints stops the affected operation.
- [x] Model real progress and failures through inspect/plan/apply/validate/review states; cancellation and failure preserve reviewable evidence and the original target base.
- [x] Integration record captures source/target/recipe/plugin/brief versions, changed files, credits, actual checks, limitations and rollback; integrated status requires matching validated result.

## 17 · Reproduce ten reference integrations across a declared Three.js/R3F matrix

- [x] Publish exact supported source/target/runtime/physics/recipe versions and a repeatable command for each of ten successful integrations; failures remain documented and untested.
- [x] Each run tests capability-specific behavior and preserved target systems, plus start/update/pause/reset/dispose and listener/render-loop cleanup.
- [x] Controller/camera cases exercise input, collisions and ownership; generator cases exercise determinism/connectivity; choose analogous meaningful checks for other capabilities.
- [x] Record unchanged baseline and integrated behavior, build/runtime logs, visual captures, notices and source/target/recipe digests in passing attestations.
- [x] Independent reviewer reproduces results on the declared matrix; only matching passing runs promote that scope to integration-tested.

## 18 · Add art direction, performance review and code review skills with evidence rubrics

- [x] All three skills load in the supported client and share the pinned brief, source versions and integration record.
- [x] Art direction outputs an editable guide for palette, geometry, lighting, materials/textures, animation and 2D/3D/asset workflow with coherent choices, concrete mismatches, reference evidence and labeled subjective judgment.
- [x] Performance review separates static hypotheses from measured results, defines workload/device/settings/warmup/sampling and emits BenchmarkRun-compatible records only when actual measurements are available; unknown remains unknown.
- [x] Code review cites source locations, dependency/interface/lifecycle consequences for the selected target and prioritized actionable findings; stars and line count do not substitute for review.
- [x] Review-only requests return findings; authorized improvement requests may make bounded local changes and compare results, preserving unrelated edits and rights.
- [x] Reject fabricated evidence, unavailable profilers and mismatched benchmark profiles; local source and raw captures remain local absent explicit transfer authorization.

## 19 · Publish curated recipes and target-aware recommendations with alternatives

- [x] Each recipe pins components/assets/settings/adapters, intended brief, dependencies, compatibility assumptions, scope rights, provenance and combination validation status.
- [x] Recommended results give two or three concise evidence-backed reasons plus an alternative and tradeoffs, separating semantic fit, preference, inspected fact, readiness and measured behavior.
- [x] Changing meaningful brief constraints changes eligible choices or rationale in a traceable way; explicit hard filters still apply first.
- [x] Unknown performance stays unknown, incompatible benchmark profiles do not become evidence of target suitability, and individually tested parts do not imply a tested recipe.
- [x] Carry recipe/recommendation/brief versions and rationale into the real handoff and local integration record; show stale findings honestly.

## 20 · Track demo freshness, catalog health and privacy-preserving reuse outcomes

- [x] Demo reachability and interactive checks have distinct dated records, proposed daily/weekly cadence, host backoff and actionable failure categories.
- [x] Source/license changes create new candidate revisions and review queue items; old tested evidence remains pinned and does not transfer to new versions.
- [x] Measure search/detail/demo/source/handoff/plugin lookup/first-plan events separately from self-reported and verified reuse; verified outcomes require matching reviewed evidence.
- [x] Store only necessary event data with documented consent/retention/deletion choices and no secret/raw target identifiers; local collection still works when telemetry is disabled.
- [x] Expose job failures, stale evidence, blocked exports and completeness counts with alertable conditions and real status; previous working index remains available during rebuild.


## Independent acceptance

All criteria accepted by `reuse_handoff` at final11bb204, after five author handoffs and repeated correction/re-review. [Full review](../../reviews/reuse-batches/batch4-review.md) maps each checked criterion to actual evidence and limits. The matrix’s controller/camera clause is conditional: the frozen ten rows cover geometry/query/generation/debug, with analogous behavior checks; camera controllers and R3F are explicitly untested. Recipe compositions remain candidate, local wrappers are opt-in, and production scheduling/hosted execution are not claimed.
