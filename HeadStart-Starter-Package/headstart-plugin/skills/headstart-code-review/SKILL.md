---
name: headstart-code-review
description: Review a selected game integration for source-located ownership, lifecycle, dependency and behavior risks while preserving its pinned brief, versions and authorization.
---

# Code review

Read [the shared review rubric](../../references/review-rubric.md) and its code section. Inspect actual source/diff and the selected target's instructions. Carry the pinned brief, component/source versions, target state and integration record into the findings. A source change invalidates a prior location or behavior assumption; re-evaluate the affected evidence.

Trace renderer/Canvas/render-loop, camera and input, coordinates, simulation and physics ownership, assets/dependencies and lifecycle through their callers. Challenge a new physics world when the target already owns one, callbacks that survive disposal, duplicate frame updates, transitive assets or network calls absent from the scope, and patches that replace preserved gameplay systems. Inspect enough surrounding code to distinguish an intentional isolated subsystem from a duplicate owner.

Return prioritized actionable findings: severity, exact file/line or bounded symbol, observed behavior or explicit hypothesis, user consequence, reproduction/check and smallest fix. Cite the dependency/interface consequences for this target. Separate blockers from optional cleanup; style preference, stars and line count are not proof of a defect. Review declared source/asset rights and required notices as well as code behavior.

Run relevant checks with the actual host tools when permitted. Exercise start/update/pause/reset/dispose and test preserved behavior, ownership and listener cleanup rather than only a build. If access, dependencies or test tools are unavailable, record the missing check and retain a reviewable plan. Do not execute untrusted upstream builds on the ordinary host or expose platform credentials.

Review-only means findings without target edits. When the user authorized fixes, make bounded changes in the selected workspace, preserve unrelated edits, record before/after revisions and commands, and have the separate reviewer recheck the result. Do not self-certify a catalog integration, silently expand scope, change permissions, merge or deploy. See [record mapping](../../references/review-records.md) for shared ReviewFinding/BenchmarkRun context; local evidence stays local by default.
