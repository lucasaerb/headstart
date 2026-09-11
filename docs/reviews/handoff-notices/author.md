# Issue 13 author evidence

Author: reuse_handoff. Independent review pending; this document is not approval.

The private handoff service creates deterministic metadata/notice packets from exact reviewed component versions, preserves the selected brief and intent, and gives every retained source record a digest. Scope, evidence, notices, dependency closure, current withdrawal/rights reports and verified session ownership are checked again on retrieval. JSON and Markdown contain the same manifest. Missing peer rights and unsupported recipes are blocked rather than represented as tested reuse. Three.js SimplexNoise is a supported pinned source; ImprovedNoise currently requires an unresolved external engine peer contract.

`services/handoff/README.md` describes the API/contract. The local Node adapter must enforce request origin and CSRF before bridging browser requests, and distinguish MCP credentials from browser cookies. Private persistence uses the existing local catalog SQLite database; this change is not a Vercel deployment or live identity system.

Author checks at this draft:

- `.venv/bin/python -m unittest discover -s services/handoff/tests -v`: 15 passed. Real local auth verification, expiry and revocation; owner isolation; exact deterministic JSON/Markdown roundtrip; notices and absence of source body; stale versions; digest tamper; withdrawn scope; unsupported recipe; malformed extra source fields; active rights report/resolution; unresolved attached dataset rights; exact Three.js source revision.
- `node --check HeadStart-Starter-Package/site/dist/handoff.js` and `node --check tests/handoff-ui.mjs`: passed.
- `HEADSTART_CHROME_CHANNEL=chrome node tests/handoff-ui.mjs`: passed. Real desktop (1440×1000) and mobile (390×844) Chromium/Chrome local-preview verification, exact restored intent, JSON content, logout and blocked retained download; six PNGs in `evidence/`. The test deliberately delays the handoff script to verify recovery waits for all deferred consumers. Initial run exposed a deferred-script event race, fixed by dispatching after DOMContentLoaded and retaining recovery until successful preparation.
- Current prepared-bag pointer tests cover explicit owner scoping, no arbitrary historical fallback, reselecting an existing digest, and current rights/withdrawal checks.

Design: existing C4 baseline, component details use the existing `detail-panel` and `secondary` tokens. Hero, assets, companion, catalog layout and anonymous Gauntlet prompt remain intact. New UI has a labeled behavior field, prepare action, live status, and JSON/Markdown downloads; no connected-client or integration-success claim. Author inspected desktop/mobile ready and blocked captures: existing white dialog, navy text and blue actions are preserved; downloads wrap with an 8px gap. No horizontal overflow. This new detail action has no exact supplied screen, so it adapts the selected C2 library/C1 concise handoff vocabulary. Reference C4 `81f0dd99b3891c0ecd33605544e99617c5eaf8a803baf737c4b1597e44f0a8f9`, C2 `bad898855647f1782220aa886e75247a8d5fd396bc2476ace09ae33176b97d6f`, paths in `docs/design/C4-FINAL-STORYBOARD.md`. Independent visual acceptance remains the reviewer’s responsibility.

Auth prerequisite PASS is recorded in `docs/reviews/reuse-batches/prerequisites.md`; only after that gate was the existing CSRF/kind-aware `handoffHandler` activated in the local route resolver. Private catalog DB permissions are reduced to 0600 before storing brief/intent artifacts. These local routes do not change production deployment.
