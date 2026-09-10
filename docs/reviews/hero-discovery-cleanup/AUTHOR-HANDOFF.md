# Hero discovery cleanup — author handoff

## Scope and acceptance

Contract: `docs/planning/hero-discovery-cleanup.md`. Author agent: `/root/hero_search_author`. Independent reviewer: pending assignment by `/root`; this record does not claim PASS.

Combined implementation source revision: `914e0a0`. Source SHA-256 values reviewed after the Astra/footer conflict resolution:

- `index.html`: `d444b2bd94a71dc0ba358f327ddf0445df4ef9d041531c1097e3fc9897d71915`
- `app.js`: `d48791e61b157e467afe51526a7b643b7db334765a620b42a3394bc6ff7e6c9e`
- `signup.js`: `39fc7b7faa25b731900ff92fad35771bc5c8daafad0672f73eaa0e197890bd9a`
- `styles.css`: `9b592d0ca219741066657b6d808dfd36242004e4f66c0351760b0c477d0bbe9f`
- `astra-action.js`: `4190e2b33d2c15f9acb28adc379f21819f131db3010f45a599ac0bc2232bd58a`

## Changed behavior

- `site/dist/index.html`: replaces the broken hero idea form with one Browse all games CTA; removes the orphaned idea strip and homepage update signup; preserves the incoming Astra action and adds a footer remembered-email disclosure with Forget email.
- `site/dist/app.js`: deletes hero idea/filter mapping and edit behavior; CTA uses the established accessible library navigation; bag-only `remix-idea` remains authoritative.
- `site/dist/signup.js`: remembers normalized email only after confirmed demo-access success; reload surfaces it in the footer; later demo links bypass prompting; failure/timeout/corrupt/blocked storage and Forget email are handled; the demo marketing checkbox remains explicit.
- `site/dist/styles.css`: removes dead hero-form/idea-strip CSS and rebalances the simplified C4/C4b hero at desktop/mobile sizes.
- `tools/signup/client.test.mjs`: client-state coverage for remembered, fresh, success, failure, bypass, forget, corrupt/blocked storage and unchecked demo marketing consent.

## Checks run

- `node --test tools/site/hero-cleanup.test.mjs tools/signup/client.test.mjs tools/signup/subscribe.test.mjs HeadStart-Starter-Package/site/dist/astra-action.test.mjs`: 26/26 pass (three focused hero regressions, eight client preference tests, eleven existing server contract tests and four incoming Astra-action tests).
- `node tools/bag-prompt/test_gauntlet_prompt.js`: 6/6 pass, confirming the retained bag brief/export contract.
- `node --check site/dist/app.js`, `signup.js` and `astra-action.js`: pass.
- `node build.mjs` from `HeadStart-Starter-Package/site/dist`: pass.
- `git diff --check`: pass.
- Dead-reference scan for `What are you making`, `start-form`, `edit-idea`, `brief-strip`, `start-card`, and hero `idea`: clean after CSS cleanup.
- Native Chrome accessibility inspection on `http://127.0.0.1:8765/site/dist/`: hero exposes Browse all games, no hero idea field, the catalog exposes its real search, and the bag/remix controls remain in the document tree. Chrome's captured bitmap was blank despite a complete accessibility tree, and no responsive browser surface was exposed, so durable desktop/mobile screenshot files remain a required reviewer gap rather than fabricated evidence.

## Design reference

Selected C4 plus requested C4b refinement; exact paths and digests are in the issue contract. Current user direction intentionally removes the form shown in those references. C2 catalog search, C3 bag/brief, C5 mobile/motion remain applicable.

## Reviewer checklist

Inspect the actual combined diff and rerun the checks. Prior screenshots predate the incoming Astra/footer merge and are invalidated. Obtain new desktop and mobile screenshots; verify overflow, art crop, CTA hierarchy/focus, absent homepage signup, footer remembered/forget states, and Astra controls. Exercise fresh success, failed save, reload, exact later-demo bypass, forget, localStorage-disabled behavior, unchecked/checked demo marketing consent, catalog query/empty reset, and a three-game bag with a persisted `remix-idea`. Confirm no console errors. Return explicit PASS or CHANGES REQUESTED; this author handoff is not approval.
