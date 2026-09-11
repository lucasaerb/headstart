# Issue 13 author evidence

Author: reuse_handoff. Independent review pending; this document is not approval.

The private handoff service creates deterministic metadata/notice packets from exact reviewed component versions, preserves the selected brief and intent, and gives every retained source record a digest. Scope, evidence, notices, dependency closure, current withdrawal/rights reports and verified session ownership are checked again on retrieval. JSON and Markdown contain the same manifest. Missing peer rights and unsupported recipes are blocked rather than represented as tested reuse. Three.js SimplexNoise is a supported pinned source; ImprovedNoise currently requires an unresolved external engine peer contract.

`services/handoff/README.md` describes the API/contract. The local Node adapter must enforce request origin and CSRF before bridging browser requests, and distinguish MCP credentials from browser cookies. Private persistence uses the existing local catalog SQLite database; this change is not a Vercel deployment or live identity system.

Author checks at this draft:

- `.venv/bin/python -m unittest discover -s services/handoff/tests -v`: 13 passed. Real local auth verification, expiry and revocation; owner isolation; exact deterministic JSON/Markdown roundtrip; notices and absence of source body; stale versions; digest tamper; withdrawn scope; unsupported recipe; malformed extra source fields; active rights report/resolution; unresolved attached dataset rights; exact Three.js source revision.
- `node --check HeadStart-Starter-Package/site/dist/handoff.js` and `node --check tests/handoff-ui.mjs`: passed.
- `tests/handoff-ui.mjs`: authored real desktop/mobile local-preview verification, restored intent, download, logout and blocked retained download. Execution/captures pending auth prerequisite review and route registration.

Design: existing C4 baseline, component details use the existing `detail-panel` and `secondary` tokens. Hero, assets, companion, catalog layout and anonymous Gauntlet prompt remain intact. New UI has a labeled behavior field, prepare action, live status, and JSON/Markdown downloads; no connected-client or integration-success claim. Final visual evidence remains pending actual browser execution and independent review.
