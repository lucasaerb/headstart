# GitHub header button — independent review

## Review identity and revision

- Issue contract: `docs/planning/github-header-button.md`
- Coder/author: `/root/github_button_author`
- Critical reviewer: `/root/hero_email_reviewer` (independent from the author)
- Initial implementation: `bd8708af859cfd5a2fbbf3b179ca67ab55514e33`
- Narrow-layout correction: `9131c23da24059f91b779f0e5b1f9a45ef27965c`
- Final author handoff: `f12ff21098102ecbdf12b96bb0b8f978f8059e3c`

The reviewer inspected the actual commits, source, focused tests and rendered site rather than accepting the author summary. Final reviewed hashes:

- `HeadStart-Starter-Package/site/dist/index.html`: `992cb75daebf0950bcf8f57c28daf3191877cfb5856285ba63a24cc69c005a1a`
- `HeadStart-Starter-Package/site/dist/styles.css`: `65bc9044bade564506101fc0e247dd2f171d2e7ac7f6828a0119e5a9e2bfd26f`
- `tools/site/github-header-button.test.mjs`: `9c5f90bf9d37bff1947aa8a20bebbde37bc51b7edae2ecc5a793f0167da6f24c`
- `docs/planning/github-header-button.md`: `b3fe089cae15279f2d31487385b08086f35ddfed282c334ac4edd21960c6e8c0`

The concurrently modified `HeadStart-Starter-Package/site/README.md` is unrelated to this review and is excluded from this record and review commit.

## Acceptance coverage

| Criterion | Independent evidence | Result |
| --- | --- | --- |
| Visible GitHub action immediately beside Get the plugin | DOM inspection confirms the two anchors are adjacent siblings in `.header-project-actions`; all three fresh captures show their complete labels together | PASS |
| Exact canonical repository URL | Rendered `href` is exactly `https://github.com/lucasaerb/headstart`; `git remote get-url origin` is `https://github.com/lucasaerb/headstart.git` | PASS |
| Safe, accessible new-tab behavior | Rendered link has `target="_blank"`, `rel="noopener noreferrer"`, and accessible name `View HeadStart on GitHub (opens in a new tab)`; Chrome accessibility inspection exposed that exact name and destination | PASS |
| Keyboard focus and target size | Native Chrome Tab navigation moved from Get the plugin to GitHub and visibly rendered the existing blue focus ring. Desktop target is 114.4×48 px; 700/390/320 targets are at least 85×40 px | PASS |
| Plugin remains primary and GitHub secondary | Computed desktop styling: plugin uses solid `rgb(7, 21, 62)` with white text; GitHub uses translucent pale blue with dark text and an outline. Fresh captures show the intended hierarchy | PASS |
| No header clipping or hidden controls | Every measured brand, Games, action-pair, plugin, GitHub and Bag rectangle stays between viewport left/right at 1440, 700, 390 and 320 CSS px. At 320 the pair occupies x=16..304, plugin x=16..176.84, GitHub x=184.84..304, and Bag x=217.84..304; document width equals viewport width | PASS |
| Existing navigation/discovery behavior remains | Browser Browse all games activation focused `#library-title`; real catalog search produced the 0-result state and reset to 69 cards; Bag opened with three persisted selections, its remix brief, enabled download and enabled Astra continuation | PASS |
| Existing email/plugin/Astra contracts remain | Full focused suite covers successful/failed/timeout email saves, storage fallback, explicit marketing opt-in, plugin action contract and Astra action outcomes; all tests passed | PASS |
| Responsive C4/C4b visual quality | Fresh 1440×1000, 390×844 and 320×844 captures were inspected against the selected C4/C4b direction. The third-row mobile adaptation preserves readable labels and the living-world hierarchy without collision with hero copy, Bag, Games, bridge or companion | PASS |

## Checks run and outcomes

- `node --test tools/site/github-header-button.test.mjs tools/site/hero-cleanup.test.mjs tools/signup/client.test.mjs tools/signup/subscribe.test.mjs HeadStart-Starter-Package/site/dist/astra-action.test.mjs` — **30/30 passed**.
- `node tools/bag-prompt/test_gauntlet_prompt.js` — **6/6 passed**.
- `node --check` for `app.js`, `signup.js`, `astra-action.js`, and `github-header-button.test.mjs` — passed.
- `node build.mjs` from `HeadStart-Starter-Package/site/dist` — passed without error.
- `git diff --check` — passed.
- Baseline digests verified: C4 `81f0dd99b3891c0ecd33605544e99617c5eaf8a803baf737c4b1597e44f0a8f9`; C4b `a3c9f03a9c41a4866586130c20c18ab2a5d01026c967d4f47ecd13b00e2403be`.
- Browser exercises used local Chrome/Puppeteer at `http://127.0.0.1:8765/site/dist/`; browser console output during the reviewed actions contained no page errors.

## Visual evidence

- `evidence/desktop-1440x1000.png` — SHA-256 `28ac839b88f0883c7f0add452cfd829de223ffcaec799d90eb9169f9d75d1e30`
- `evidence/mobile-390x844.png` — SHA-256 `04edf66c0d45bcad907cdcbe1bf69d5764e9c31d56fb64b227c351e1ab19b99e`
- `evidence/mobile-320x844.png` — SHA-256 `c3a3bdb7e627aaa3931dcdb5482156d4eb8e0c20c79ba73bdfc6224d97a5aefe`

These are fresh captures after correction `9131c23`. Desktop keeps the project actions inline with the primary navigation. At 390 and 320, the adjacent pair spans its own row, preserving the full labels and comfortable separation. GitHub remains visually quieter than the plugin button.

## Review rounds and findings

### Round 1 — CHANGES REQUESTED

At initial revision `bd8708a`, the 320px screenshot visibly clipped GitHub and Bag. Measured right edges were 366.55px against a 320px viewport. The hero's `overflow:hidden` masked this from `documentElement.scrollWidth`, demonstrating why rectangle checks were necessary. This was a blocking responsive and accessibility failure.

### Round 2 — resolved

Correction `9131c23` gives the adjacent action pair a dedicated full-width third row at 420px and below. Fresh 320/390 captures and element-bound measurements confirm complete labels, visible Bag and Games controls, 40px targets, and no clipping. No blocking findings remain.

## Final verdict

**PASS** — the GitHub header action and all retained focused behavior satisfy the issue contract at the final source hashes above.

Known nonblocking adaptation: narrow screens use a third header row, increasing header height by 44px. This is an intentional tradeoff that preserves labels, target sizes and hierarchy; the hero remains balanced in the selected mobile captures.
