# Batch 1 independent review checklist

Target: issues #2–#6, exact acceptance bodies in `docs/planning/batches/issues-snapshot.json`. Read each complete issue; this checklist highlights cross-issue risks and does not replace criteria.

- Reproduce clean installation, Python setup, startup, Node/Python tests, build and browser checks. Inspect CI actually runs new suites. No production email credentials or fake success in development.
- Trace one real source-reviewed component to pinned bytes and its full notices. Confirm only reviewed files are represented; research catalog is explicitly separate and cannot become published/tested through a label or search setting.
- Challenge version references, source/target/recipe evidence, scoped rights, transitive dependencies, immutability, tombstone propagation, evidence path/digest safety and rollback/backup behavior. Synthetic testing fixtures must never enter app results.
- Exercise API exact title/repository/alias, hard filters, empty results, pagination/cursor tampering, missing/private/tombstoned details, errors and cache versioning. Validate actual JSON against documented contracts.
- Exercise desktop/mobile browsing, grouping, facets, URL/back state, reset, pagination, loading, API error/retry and unsupported filters; retain existing bag, plugin CTA and email-gated demo flow.
- Visually inspect captures against the selected C4/C4b/C2/C3 design and branch baseline. Confirm new elements inherit current design. Missing unapproved game imagery should be honest; the first-party hero/world must remain unchanged.

Reviewer must be distinct from all builders, inspect actual files and run checks independently. Record exact changed-file digest, commands/results, concrete blocking findings, fixes, and final PASS or CHANGES REQUESTED for each issue and the combined batch. Do not close an issue with unmet criteria. Screenshots must be viewed, not just listed. The parent coordinates fixes; reviewer does not implement and self-approve.
