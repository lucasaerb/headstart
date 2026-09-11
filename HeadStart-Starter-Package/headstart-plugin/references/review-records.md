# Review record mapping — rubric version 1

Use the existing canonical entity envelope `{schema_version:"0.2", entity_type, id, version, data}`. A local review additionally retains the brief revision, source/component version, target revision/state, integration-record reference and authorization. This context does not promote a review to an integration attestation. Existing platform contracts remain authoritative; the local evidence checker is a focused extra check, not a complete schema validator.

- `review_finding.data`: `subject:{id,version}`, pinned `source_commit`, `rubric_version:"headstart-review-rubric-1"`, `category`, source-located `finding`, `impact`, `author_type`, named `reviewer`, `observed_at`, `evidence`, `assumptions`. Editorial art judgment uses curator/editorial evidence; source inspection uses inspected claims. Keep severity, location, minimal fix and reproduction in the finding, and retain unknowns in assumptions.
- `style_profile.data`: `ontology_version:"0.2"`, editable `palette`, `materials`, `geometry`, `animation`, `asset_scope`, evidence-backed `previews`, `reviewer`, `rationale`. The accompanying Markdown guide covers lighting, camera and 2D/3D/asset workflow without inventing fields in the canonical contract.
- `benchmark_run.data`: source/target commits, workload, device, OS, engine version, nullable browser version, resolution `{width,height}`, settings, warmup, sampling method, raw evidence, measurements and summary. Every measurement includes metric, value and unit. Do not emit a BenchmarkRun when only hypotheses or a measurement plan exist. Use an explicit not-run plan instead.

Each evidence reference uses safe relative path, SHA-256 digest, source commit, origin, claim type, reviewer, ISO timestamp and claim. Canonical validation alone proves shape, not the evidence's truth. Local raw sources remain private absent transfer authorization.

## Raw mean-sample profile

The optional `review_evidence.py` supports this explicit raw evidence format for mean-valued metrics:

```json
{"version":1,"source_commit":"<actual source commit>","target_commit":"<actual target commit>","profile":{"workload":"...","device":"...","os":"...","engine_version":"...","browser_version":null,"resolution":{"width":1,"height":1},"settings":"...","warmup":"...","sampling_method":"..."},"metrics":[{"metric":"cpu-update-batch-mean","unit":"ms","samples":[1.2,1.4]}]}
```

The values above are **format illustrations**, not measured results. A headless CPU-only workload may explicitly use a 1×1 non-rendered placeholder resolution with that limitation in settings; this cannot support gameplay FPS claims. Other metrics/statistics require their own explicit method and raw evidence rather than forcing them through this mean-sample checker. Missing artifacts, mismatched hashes/profiles/source/target state, bool/negative/nonfinite/empty samples or unsupported means are rejected.

```sh
python3 scripts/review_evidence.py /local/benchmark.json --root /selected/evidence/root
python3 scripts/review_evidence.py /local/before.json --root /selected/evidence/root --compare /local/after.json --before ACTUAL_BASE_COMMIT --after ACTUAL_RESULT_COMMIT
```

These commands read only the caller-selected evidence. A compatible result never establishes trusted authorship, causal speedup, public catalog readiness or permission to publish.
