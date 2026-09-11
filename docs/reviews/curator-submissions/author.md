# #12 author evidence — independent review pending

Author: `/root/reuse_curator`. Separate batch reviewer has not yet accepted this issue. No issue closure or production deployment is claimed.

Prerequisites: #7 scoped source/detail and #9 bounded intake interfaces were independently accepted at `7eb0dce` in `docs/reviews/batches/batch2-review.md`. This implementation uses the immutable catalog version identities and its metadata/evidence boundary; it does not rerun upstream builds.

Implemented private immutable SQLite submission/review history, anonymous suggestion/correction/status receipts, duplicated-proposal linkage visible only to curators, exact-version/path rights reports and appeals, report-to-source-delivery freeze callable, repository-specific GitHub challenge verification, allowlisted verified curator auth with CSRF, conflict detection, evidence-required decisions and correction description revisions. Approved proposals do not automatically publish canonical catalog records. #13 consumes the freeze on actual source artifact generation/download.

Checks performed:

- `.venv/bin/python -m unittest discover -s services/submissions/tests`: **8 passed**. Covers unauthorized operations, receipt privacy/duplicates, malicious URLs/traversal/oversize, immutable history, missing evidence, stale edits including two concurrent connections, scope report/freeze/appeal/resolution, missing-policy fail-closed, ownership spoof rejection and pinned repository-specific challenge verification.
- `node services/submissions/tests/browser.mjs`: **PASS**, real Chrome, isolated temporary catalog/auth DB, port8895. HTTP wrong-origin/anonymous-curator/unsafe URL rejection; desktop1440×1100/mobile390×844 submission save, denied curator access, authenticated private queue/history, decision rejected until blocking fields/evidence are resolved, successful revision save, rights-report form and no initial horizontal overflow. No actual upstream proof repository was modified; control-verification test uses a bounded injected fetch fixture.
- `node --check services/submissions/handler.mjs`: passed. Parent owns combined tests/build.

Captures under `captures/`: desktop/mobile submission, saved, unauthorized, queue, immutable history, review error, rights report. All are synthetic test data. Receipt values visible in screenshots were invalidated when the temporary database was deleted. No real user contact or production credential was used.

Design comparison: selected C4b world baseline SHA256 `a3c9f03a9c41a4866586130c20c18ab2a5d01026c967d4f47ecd13b00e2403be` and C2 `bad898855647f1782220aa886e75247a8d5fd396bc2476ace09ae33176b97d6f`, references recorded in `docs/design-direction.md` / `docs/design/C4-FINAL-STORYBOARD.md`. This secondary contribution page reuses the existing plugin page's light blue backdrop, navy type, white rounded forms and blue action. C4 hero assets/layout remain unchanged. Author visually inspected desktop queue and mobile submission captures: readable label wrapping, contained form widths and consistent existing type; reviewer must independently critique all material states.

Limits: single local server/store, not production identity/storage. Auth delivery is #27 localhost preview. Curators require explicit operator allowlist IDs. GitHub repository-control evidence is separate from asset/code rights; other repository providers remain unverified. Canonical catalog publication is an explicit trusted import with the existing evidence gate after proposal approval. No outbound email, automatic source execution, hosted remix, economics or commercial publication was implemented.
