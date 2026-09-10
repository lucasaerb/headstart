# Hero discovery cleanup — author handoff

## Scope and acceptance

Contract: `docs/planning/hero-discovery-cleanup.md`. Author agent: `/root/hero_search_author`. Independent reviewer: pending assignment by `/root`; this record does not claim PASS.

## Changed behavior

- `site/dist/index.html`: replaces the broken hero idea form with one Browse all games CTA; removes the orphaned idea strip; adds remembered-email disclosure and Forget email action without hiding update consent.
- `site/dist/app.js`: deletes hero idea/filter mapping and edit behavior; CTA uses the established accessible library navigation; bag-only `remix-idea` remains authoritative.
- `site/dist/signup.js`: remembers normalized email only after confirmed server success; reload prefills it; later demo links bypass prompting; failure/timeout/corrupt/blocked storage and Forget email are handled; homepage updates remain explicit.
- `site/dist/styles.css`: removes dead hero-form/idea-strip CSS and rebalances the simplified C4/C4b hero at desktop/mobile sizes.
- `tools/signup/client.test.mjs`: client-state coverage for remembered, fresh, success, failure, bypass, forget, corrupt/blocked storage and explicit update submission.

## Checks run

- `node --test tools/site/hero-cleanup.test.mjs tools/signup/client.test.mjs tools/signup/subscribe.test.mjs`: 21/21 pass (three focused hero regressions, seven client preference tests and eleven existing server contract tests).
- `node tools/bag-prompt/test_gauntlet_prompt.js`: 6/6 pass, confirming the retained bag brief/export contract.
- `node --check site/dist/app.js` and `node --check site/dist/signup.js`: pass.
- `node build.mjs` from `HeadStart-Starter-Package/site/dist`: pass.
- `git diff --check`: pass.
- Dead-reference scan for `What are you making`, `start-form`, `edit-idea`, `brief-strip`, `start-card`, and hero `idea`: clean after CSS cleanup.
- Native Chrome accessibility inspection on `http://127.0.0.1:8765/site/dist/`: hero exposes Browse all games, no hero idea field, the catalog exposes its real search, and the bag/remix controls remain in the document tree. Chrome's captured bitmap was blank despite a complete accessibility tree, and no responsive browser surface was exposed, so durable desktop/mobile screenshot files remain a required reviewer gap rather than fabricated evidence.

## Design reference

Selected C4 plus requested C4b refinement; exact paths and digests are in the issue contract. Current user direction intentionally removes the form shown in those references. C2 catalog search, C3 bag/brief, C5 mobile/motion remain applicable.

## Reviewer checklist

Inspect the actual diff and rerun the checks. Obtain real desktop and mobile screenshots if a functioning capture surface is available; verify overflow, art crop, CTA hierarchy/focus, signup and remembered/forget states. Exercise fresh success, failed save, reload, exact later-demo bypass, forget, localStorage-disabled behavior, catalog query/empty reset, and a three-game bag with a persisted `remix-idea`. Confirm no console errors. Return explicit PASS or CHANGES REQUESTED; this author handoff is not approval.
