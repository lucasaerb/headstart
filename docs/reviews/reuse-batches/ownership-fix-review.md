# Issue 12 repository-control correction review

Independent reviewer: `reuse_handoff`; correction author: `reuse_mcp`, original submission author: `reuse_curator`. Reviewed correction `477af9b7377dbedf0d4823e3d88f519f71f21fdf` against the preliminary finding in `prerequisites.md`.

Narrow correction verdict: **PASS**. This resolves the specific commit-only ownership proof blocker; full issue-12 submission/curator UI and batch acceptance remain separate.

I inspected the actual resolver, pinned TLS transport and queue mutation. The claimed canonical GitHub repository is resolved from public API metadata, including repository identity and default-branch name. The branch reference is fetched independently and pins its exact commit; an optional supplied commit must match this resolved HEAD before any raw challenge fetch. The per-submission challenge is then checked only at that commit. Wrong repository identities, malformed/default-reference responses, commit-only challenge responses and a matching challenge offered at an unrelated fork commit are rejected. Successful proof adds an immutable audit revision containing repository ID, branch, exact source commit, reference URL/hash and check time; it leaves the proposal pending with its review blockers.

The fetcher accepts only API/raw GitHub HTTPS destinations, validates all DNS results as public and connects to the selected address with hostname-verifying TLS. No proxy, authorization header or redirect is used. Responses have explicit time/byte limits, reject compressed bodies, and close the socket. These are mocked transport checks, not a claim that an actual repository ownership challenge was published or modified during this review.

Independent command: `.venv/bin/python -m unittest discover -s services/submissions/tests -v` — **11 passed**. This includes fork-only/mismatched-commit rejection before raw fetch, wrong identity/malformed reference, scoped rights freeze/appeal/resolution, private receipts, stale/concurrent mutation, immutable history and transport destination/redirect/size checks.

Screenshots: N/A for this correction; no UI changed. Full submission/queue captures will be reviewed in the combined batch.

Exact reviewed source SHA-256:

- `services/submissions/store.py`: `b4a0ffe25d2e7f5cdf5a058f15f38334575c254c740bc2a261c52ac593df9eed`.

- `services/submissions/api.py`: `2f22e7a19577f58e9b9c7efd3dcdbaa1c9ff88bc051886dc13d2579733b5bff3`.
