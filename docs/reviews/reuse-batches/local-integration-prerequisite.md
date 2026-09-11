# #16 bounded integration prerequisite review

Verdict: **CHANGES REQUESTED**, first source checkpoint `f3aaa3c20b3a9c58f9d7cdafde6c4d8fcb75923c`. Reviewer `reuse_handoff`; author `reuse_mcp`. No dependent runtime/continuity gate is approved yet.

Independent checks at that checkpoint:

- Ten workflow tests PASS.
- Fresh isolated baseline and integrated execution at 1280×800 and 390×844: all four phases PASS, 18 checks each. Exact image `sha256:c7acddd94000df88bc95cef1c1519bca02865e6607ab9ba496a1f608410decd5`; recipe digest `c1b6b376697b27f3090649a4c221e4637bcb9a154bf78b4461bf5ba6c0a96ebd`. Evidence retained at `/tmp/headstart-review-integration-f3aaa3c/job`.
- Fresh offline runtime mutants rejected: no-op terrain at capability behavior, leaked input listeners at disposal, second renderer at ownership. Evidence `/tmp/headstart-review-integration-mutants-f3aaa3c`.
- Inspected actual baseline desktop and integrated mobile captures: flat target becomes a connected varied terrain surface while the orange explorer and existing controls remain visible. This is a controlled Three.js fixture, not a C4 redesign or R3F/physics claim.

## Blocking findings

1. **P1 — target Git attributes can execute code on the host.** `snapshot()` rejects only the root `.gitattributes`, allowing `src/.gitattributes`. On a disposable first-party fixture I added `terrain.js filter=reviewprobe` there and configured a local smudge filter to run a harmless Python marker script. `plan()` then `apply()` succeeded and `git worktree add` ran the script on the ordinary host. No upstream source was executed in this proof. Cover every nested attribute/module file and effective repository `info/attributes`/configured attribute sources before any Git operation that may invoke filters; inspect/status can also clean-filter modified files. Add real marker-based rejection regressions. Disabling hooks alone does not disable filters.
2. **P1 — final review accepted altered runtime evidence.** After a real successful validation I changed a listed log, then called `review()` with the original validation digest. It returned `integration_tested`. The probe suppressed event writing and restored the log, so no false review record was retained. Fix must verify the exact retained evidence set, safe bounded regular files and each digest before transition. Author fix `afd7e9f` adds those guards and rejection cases; final stable rerun remains pending while finding 1 is addressed.

Earlier pre-checkpoint feedback was addressed in `f3aaa3c`: mandatory rights and exact parent/version closure, recipe/source/packet drift at final review, actual index-graph connectivity and initial frame instrumentation. Their passing tests do not waive the remaining findings. A new source/recipe digest requires a fresh full reference execution before the prerequisite verdict can change.

## Fix round at `dff2046`

`afd7e9f` rechecks the exact retained evidence set and bytes at final review. `dff2046` rejects nested attributes/modules, effective filter/config and repository info attributes before status; worktree materialization now uses `--no-checkout`, index-only `read-tree` and verified Python file copies. The actual marker-based exploit is rejected without host execution. Independent twelve workflow tests PASS.

A new **P2** remains: materialization copies bytes but loses unrelated executable modes. Adding and committing an unrelated `helper.sh` with mode0755, then planning/applying, yields0644 in the worktree. Byte-only snapshots do not include this undeclared change. Preserve the relevant file mode and bind mode drift in state/validation; include a regression for preserved executables and stale mode.

Fresh final runtime attempt `/tmp/headstart-review-integration-dff2046` timed out on the first baseline after60 seconds while another Docker run was active. It is a failed attempt, not new passing evidence or proof of a product regression. A sequential fresh run is required after the mode fix. Earlier exact-checkpoint runtime results remain historical evidence only.
