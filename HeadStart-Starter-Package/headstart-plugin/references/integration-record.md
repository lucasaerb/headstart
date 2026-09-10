# Integration record

A portable plan/report should contain:
- schema_version and plugin_version
- source repository, immutable commit, component ID/version and exact evidence
- target runtime and base revision or local state fingerprint
- requested behavior and systems to preserve
- selected files, assets, dependencies, interfaces and exclusions
- code/asset rights evidence and notice bundle
- change plan, applied patch or changed files, result revision
- validation checks with actual outcomes, environment and untested conditions
- rollback approach and provenance relationships

Use source_reviewed only after evidence review. Use integration_tested only with a passing, reproducible result for the stated source/target/recipe versions. The starter's schema example is a candidate and is intentionally ineligible for publication or a tested label.

Never include tokens, credentials or unrelated private source. Publishing a private target or graph is a separate user action. A source revision change or target base change requires compatibility and plan re-evaluation.
