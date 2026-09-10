# Batch 2 review fixes — dependency display and malformed recovery

Author: batch2_brief. Fixes the reviewer's P2 findings for #7/#8; pending independent re-review.

## Real canonical compatibility and dependencies

`public_documents` now adds a separate `compatibility` / `resolvedDependencies` display projection. The immutable canonical data/schema and embedding text projection remain unchanged. External dependency edges resolve only when the exact dependency revision points from the publicly eligible owner version and has no private/internal target. Missing/tombstoned, private, wrong-owner or internal target edges remain Unknown, preventing raw unpublished target metadata from being exposed. The external package, required/optional role, pinned constraint, unknown installed/resolved version, selected-scope note and immutable manifest evidence link are visible. Internal targets remain conservatively unresolved until they have a dedicated public evidence projection.

The detail panel renders readable dependency metadata and a pinned manifest link. Saved comparison snapshots read the real compatibility tuples: OrbitControls is **Three.js 0.186.0 · reference only**, **React Three Fiber version unknown · reference only**. Its external `three` peer constraint is readable and resolved version remains Unknown. Existing older saved metadata is not silently rewritten.

Validation:

- `python -m unittest services.catalog.tests.test_dependency_projection services.catalog.tests.test_api`: **12 PASS**. Actual curated OrbitControls metadata, deleted dependency, private/unpublished target withholding, and equality of semantic input text with/without new display projection are covered.
- `HEADSTART_CHROME_CHANNEL=chrome node tests/dependency-details-ui.mjs`: **PASS** desktop 1440×1000 / mobile 390×844. Real OrbitControls source detail, pinned dependency manifest link and saved comparison validate runtime, version/support, required external package constraint and unknown resolved version. Captures `docs/reviews/batches/evidence/dependency-fix/`. Root `test:detail` now also runs this regression in CI.
- Frozen evaluation corpus, labels, model and ranking code are unchanged. This additive API metadata changes the live response/index fingerprint as expected; prior frozen-corpus results are retained as dated evidence, not relabeled as a new measurement.

## Nested malformed browser data

`valid` now guards nullable history and saved entries before reading their fields. Validation is nonthrowing for arbitrary JSON values; invalid nested JSON reaches the schema-invalid recovery branch with the original raw bytes retained. Saving a working brief cannot overwrite that recovery copy before explicit reset.

- `node --test tools/site/brief-store.test.mjs`: **5 PASS**, including null history entry, saved entry, brief, facts and constraint values, plus primitive/array roots.
- The brief desktop/mobile browser regression seeds `{history:[null]}`, edits/saves a working brief, verifies the original browser bytes remain identical, downloads the actual recovery file and compares its content to the original raw JSON. Additional captures `*-nested-recovery-preserved.png`.
