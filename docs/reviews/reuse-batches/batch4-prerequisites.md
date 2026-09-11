# Batch 4 dependency reviews

Independent reviewer: `reuse_handoff`. The reviewer will not author implementations #16–#20. These are narrow checks of prerequisite behavior, not full acceptance of unfinished downstream issues. Batch 3 full acceptance is recorded in `batch3-review.md`; this new five-author batch still requires its own combined final review/fix loop.

## #10 and #15 inputs for #16 — PASS

Accepted #10 source curation is independently documented at `7eb0dce` in `docs/reviews/batches/batch2-review.md`; #15 package/client is fully accepted at `46964ab` in `batch3-subset-review.md`. I inspected the exact current frozen curation loader/manifest, compatibility matrix and selected-source evidence contracts and reran `.venv/bin/python -m unittest discover -s services/curation/tests -v`: **2 passed**, covering all 30 component scopes, frozen source pins/digests, local dependency closure, repeat import and false promotion rejection. The original independent review traced all 33 underlying new source/license/manifest byte digests to upstream; this narrow rerun checks the unchanged frozen files, not a new network/source review.

The available initial source baseline is Three.js commit `5c5a575bd8cc0cf440026ce8dcf6a77862067684`, package manifest 0.186.0. Thirty source-reviewed components comprise 29 addons and the 2048 tile scope. Full engine implementation, caller assets and target dependencies are excluded from the addon extraction scopes. SimplexNoise has no engine dependency; ImprovedNoise imports the target's Three MathUtils and cannot be treated as dependency-free. The source loader preserves root MIT and inline contributor/algorithm references. Water2 remains withheld. These are source-reviewed inputs, not executed integrations or universal compatibility ranges.

The accepted 0.5.0 plugin archive (`af4f44b9367e95f44900fc5e932f18f9a3ee7ec46a4609c9dd602762dc4301fd`) provides Find/Inspect/Plan/Integrate/Validate/Credit plus three companion skills, local inspection guidance, exact selected-bag/packet retrieval, explicit workspace authorization boundaries and actual Codex 0.154.0 installation/lookup evidence. Its existing local handoff does not deliver source bytes or resolve every external engine peer. #16 must independently inspect the chosen target, resolve applicable source/peer rights and runtime versions, create bounded adapters and produce actual state/lifecycle validation. No target write, second renderer/physics world or tested-state promotion follows from this prerequisite PASS.

**Permitted dependency use:** #16 may now implement and test its bounded local-agent integration contract against these pinned inputs and the accepted plugin interfaces. The source/target/recipe drift and actual runtime evidence gates remain new #16 work.

## #3 and #15 inputs for independent #18 work — PASS; #16 still pending

Accepted #3 is recorded at `9a85fde` in `docs/reviews/batches/batch1-review.md`. I inspected the current normalized entity v0.2/ontology v0.2 contracts and semantic validators; `.venv/bin/python -m unittest discover -s contracts/tests -v`: **13 passed**. Publication, measured claims, exact source/target/recipe/scope links, bundle references, unknown measurements versus zero and legacy bundled copies remain checked.

Relevant existing shapes are GameBrief, StyleProfile, ReviewFinding and BenchmarkRun. A ReviewFinding requires its exact subject/source, rubric version/category/impact, reviewer/author type/date, evidence and assumptions. BenchmarkRun requires source/target, workload, device/OS/runtime/browser/resolution/settings, warmup/sampling, raw results, measurements and summary. Shape validation cannot establish that a measurement or review actually occurred. Static performance suspicions must not be emitted as measured results; recipes cannot inherit an ingredient's tested status. Source/evidence bytes and reviewer authority remain separate validation responsibilities.

#15 provides the reviewed nine-skill package/discovery mechanism and exact client setup path. #18 may independently author its three focused review rubrics, versioned contracts/fixtures and review-only guidance now. **Do not claim or wire integration-record continuity until the needed #16 contract passes independent review.** Actual before/after art or performance evidence must concern the declared target game's own brief; C4 governs HeadStart website controls, not every integrated game's art direction.

Exact current baseline digests are in `batch4-baseline-digests.json`. Screenshots N/A for these data/interface-only prerequisite checks; actual downstream visual/runtime work remains subject to independent desktop/mobile and source/evidence review.

## Remaining dependency gates

- #16 → #17/#18: pending actual authored integration interface and independent check.
- #17/#18 → #19 and applicable #20 inputs: pending authored evidence/interfaces and independent checks.
- Final #16–#20 acceptance: pending five completed author handoffs, independent full review, fixes and explicit PASS.
