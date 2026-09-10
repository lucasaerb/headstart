# GitHub header button — author handoff

## Scope and revision

Contract: `docs/planning/github-header-button.md`. Author agent: `/root/github_button_author`. Independent reviewer: pending assignment by `/root`; this record does not claim PASS.

Implementation revision: `bd8708af859cfd5a2fbbf3b179ca67ab55514e33`.

Reviewed source SHA-256 values:

- `HeadStart-Starter-Package/site/dist/index.html`: `992cb75daebf0950bcf8f57c28daf3191877cfb5856285ba63a24cc69c005a1a`
- `HeadStart-Starter-Package/site/dist/styles.css`: `f770b29fa0595a655121b60c432d0cd7f1048178b9d56f707682c8e2acf2947b`
- `tools/site/github-header-button.test.mjs`: `cec85b1bcc23c5b0d3ed5d858adb7df69d48bb574ab1205302a145aa3b7895c6`
- `docs/planning/github-header-button.md`: `b3fe089cae15279f2d31487385b08086f35ddfed282c334ac4edd21960c6e8c0`

## Changed behavior

- Groups **Get the plugin** and the new **GitHub** link as adjacent project actions in the main navigation.
- Opens the checkout's canonical `https://github.com/lucasaerb/headstart` repository in a new tab using `noopener noreferrer`; the accessible name states the new-tab behavior.
- Keeps the filled plugin action visually primary and uses a restrained translucent outline for GitHub, reusing the C4/C4b header language and existing focus treatment.
- Switches the header to its two-row responsive arrangement at 700px so both labels remain visible, with 40px minimum action targets and compact spacing on mobile.
- Leaves hero discovery, catalog search, bag, Astra, plugin route and remembered-email code unchanged.

## Design plan and reference

The focused plan preserved the existing HeadStart token palette (`--ink`, the pale translucent sky surface and the existing blue focus ring), Avenir typography, pill-shaped header controls and left/right header alignment. The GitHub action is deliberately secondary to the plugin action; no new iconography, gradient, typeface or decorative system was added.

Selected references:

- C4: `HeadStart-Starter-Package/design-explorations/2026-09-simplicity/C4-living-world-landing.png`, SHA-256 `81f0dd99b3891c0ecd33605544e99617c5eaf8a803baf737c4b1597e44f0a8f9`.
- C4b: `HeadStart-Starter-Package/design-explorations/2026-09-simplicity/C4b-living-world-bridge.png`, SHA-256 `a3c9f03a9c41a4866586130c20c18ab2a5d01026c967d4f47ecd13b00e2403be`.

The additional repository action is an intentional adaptation because those boards predate it.

## Checks run

- `git remote -v`: both fetch and push identify `https://github.com/lucasaerb/headstart.git` as `origin`.
- `node --test tools/site/github-header-button.test.mjs tools/site/hero-cleanup.test.mjs tools/signup/client.test.mjs tools/signup/subscribe.test.mjs HeadStart-Starter-Package/site/dist/astra-action.test.mjs`: 29/29 pass, including three new header-link/responsive-contract tests.
- `node tools/bag-prompt/test_gauntlet_prompt.js`: 6/6 pass.
- `node --check` for `app.js`, `signup.js`, `astra-action.js` and the new test: pass.
- `node build.mjs` from `HeadStart-Starter-Package/site/dist`: pass.
- `git diff --check`: pass.

Native Chrome exposed the pre-reload accessibility tree during an author inspection, but browser ownership changed during reload, so the author recorded no stale screenshot as evidence. Fresh desktop 1440×1000 and mobile 390×844/320×844 captures, overflow measurements and keyboard interaction remain required reviewer evidence.

## Reviewer checklist

Inspect revision `bd8708a` and the actual files, rerun the focused and retained regressions, and verify the final handoff commit changes documentation only. Capture the selected-reference desktop/mobile states fresh. Confirm the GitHub button is immediately beside Get the plugin; visually quieter but legible; keyboard focus is visible; its exact accessible name and safe new-tab behavior are present; navigation has no horizontal overflow at 1440, 700, 390 and 320 CSS pixels; and neither action is hidden. Confirm Games, Bag, plugin navigation, hero/catalog, Astra and email behavior remain usable. Return explicit **PASS** or **CHANGES REQUESTED** with concrete evidence.
