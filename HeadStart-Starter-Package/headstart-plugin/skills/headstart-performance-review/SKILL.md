---
name: headstart-performance-review
description: Separate game-performance hypotheses from actual measurements, define reproducible workloads, and review compatible BenchmarkRun evidence before bounded optimization.
---

# Performance review

Read [the shared review rubric](../../references/review-rubric.md), its measurement section and the versioned rubric JSON. Bind the review to the selected brief, source/component versions, target revision and integration record. Use actual available host profilers or timers; there is no HeadStart profiling service. First inventory the tools and permissions. An unavailable profiler leaves a measurement plan and explicit not-run result, never invented timings.

Inspect source for candidate causes such as duplicate simulation/render ownership, leaked listeners, per-frame allocation, asset transfer cost and shader/texture work. Cite source lines and call these **hypotheses** until measured. A repeated callback observed after disposal can be a measured correctness event; it does not by itself prove a frame-time regression. Stars, bundle guesses and a README's FPS number are not runtime measurements.

Write a reproducible plan specifying source/target revisions, workload and seed/input trace, device/CPU/GPU where relevant, OS, runtime/browser versions, viewport/resolution/DPR, quality settings, warmup, sample count/duration, sampling method, metric/unit, baseline and change under test. Separate catalog loading from gameplay and CPU microbenchmarks from rendering/frame pacing. State thermal/background-load and instrumentation limitations. Define acceptable regressions from the user's budgets; do not invent them.

Emit a canonical `benchmark_run` only after executing the measurement: retain raw samples, digest and full profile, with `raw_results.claim_type=measured` and `origin=executed_test`. Use [review evidence](../../scripts/review_evidence.py) to reject missing/tampered raw data or incompatible comparisons. Read [record mapping](../../references/review-records.md) for the existing BenchmarkRun envelope. Empty or unavailable values remain unknown; zero is an observed value. Hash verification is not proof of trusted measurement authorship.

Compare only identical workload/device/runtime/resolution/settings/warmup/sampling profiles with the expected before/after target states. A mismatched run is rejected rather than normalized silently. Report distributions and uncertainty; a single sample does not establish general speedup. If only source inspection was done, return the plan and hypotheses, not a BenchmarkRun or FPS promise.

Review-only requests do not edit target code. For an authorized bounded optimization, preserve existing ownership and behavior, apply the selected change, repeat the same workload and checks, then report actual benefits, regressions and limits. Keep private source, traces and captures local; do not upload to a profiler or service as a permissions workaround.


When a `headstart-local-integration-1` record is available, run the packaged read-only helper with the actual selected `plan.json` and `packet.json`:

```sh
python3 scripts/integration_review_context.py /selected/job/plan.json /selected/job/packet.json --brief-revision CURRENT_REVISION
```

Resolve the script relative to this plugin, and replace the selected paths/revision with actual local context. Carry its same `headstart-review-context-1` object into this review and any companion art/code/performance reviews. It verifies plan/packet/brief continuity, not current target state or successful integration. Inspect current target files and modes, validation/evidence and the independent reviewer result using the checkout workflow when present. Changed state requires fresh review; historical plugin versions stay labeled. Keep this context local. Use `--authorization bounded_improvement` only for already authorized target changes; the flag itself grants no permission.
