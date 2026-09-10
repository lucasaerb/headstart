# Issues 29 and 30 — independent catalog review

Reviewer: `/root/plugin_reviewer`, 10 September 2026. **PASS** for the bounded browser/model expansion and GitHub popularity issues after the author fixed the findings below. Exact reviewed file digests are in `reviewed-files.json`. Concurrent hero work, auth, bag-to-agent connection, remixing and royalties are outside this verdict.

Research acceptance is documented in `RESEARCH-REVIEW.md`: 29 additions, 72 total records, 145 building blocks; 126 distinct independently re-fetched source URLs match all 144 retained citations. Model statements retain creator attribution and scope limits. Only 13 new records pass the narrower internal summary/public-link eligibility decision; none receives source reuse, image, gameplay or integration clearance.

Independent current checks: 38 research tests and 13 plugin tests pass. Actual Codex 0.2.1 installed-client calls are in `../plugin-discovery/codex-client-review-0.2.1.json`: 52 eligible references and 105 blocks, exact model filtering, unknown-model empty results without relaxation, and denied handoff/forged identity. The discovery plugin intentionally indexes fewer references than the research dashboard.

## Actual browser review

Native Brave desktop interaction first verified source details, keyboard Escape/focus restoration and anonymous bag selection. When the user resumed that browser, testing moved to the separate purpose-built Puppeteer headless browser on localhost. No user browser activity was overwritten. Captures are genuine rendered application screenshots, not mockups.

- Desktop 1440×1000: all 72 rows sorted by stars descending; deterministic title/ID ties; actual zero-star records precede the two non-GitHub nulls. The first rows are Three.js 115,380, Mindustry 28,946, Matter.js 18,399. See `desktop-stars.png`.
- Model plus browser plus star sort preserves 11 Astra results, descending from 477 to zero. Fable 5.1 yields four creator-attributed rows; Model unknown yields 54 unknown rows. Fable 5 plus Godot yields zero and keeps both constraints. Clear filters restores 72 while retaining the selected sort.
- Mobile 390 px: list and grid work, source controls remain visible, no horizontal document overflow. CityMaker details show immutable source paths, its geometry-only model claim, dated repository stars and evidence links. The dialog scrolls and closes. See `mobile-source.png`.
- Anonymous mobile Add to bag opens one-of-three CityMaker selection with an editable brief; see `mobile-bag.png`. This verifies selection only, not platform source export or agent connection.
- The initial mobile filter layout truncated the selected model and sort. Author changed it to two columns with full-width model/sort. A fresh cache-busted page recheck shows both complete labels and no overflow; see `mobile-filters-before.png` and `mobile-filters-final.png` (390×1000).

## Design comparison

Compared actual captures directly with selected C2 (`bad898855647f1782220aa886e75247a8d5fd396bc2476ace09ae33176b97d6f`), C3 (`dd9c24385fe96db0f11838b0ba43fb64d62ba81ff78a4dd985c04f45dd57397d`) and C5 (`2e4c2521027b296ab9555980c201edc87a2fcaa9d529de56454920d5ade5c2f6`) in `HeadStart-Starter-Package/design-explorations/2026-09-simplicity/`. The blue actions, pale catalog surface, clear heading, search/dropdowns, selectable grid/list and persistent bag retain the selected hierarchy. Source detail stays readable and secondary. Mobile explicitly displays filters instead of using the board's collapsed drawer; this makes new constraints inspectable at the cost of vertical space and passes this scope. Historical screenshots and explicit missing-preview placeholders intentionally replace fictional game art. Broader landing/hero acceptance belongs to its separate issue.

## Findings resolved

Provider-specific pinned URLs, video/platform conflation, missing-license wording, model-name sorting, mobile source visibility, duplicated attribution, and mobile filter truncation were corrected and rechecked. Non-GitHub popularity links now use Repository source. No blocking findings remain in these two bounded issues. Most new previews remain absent and demo gameplay untested, visibly disclosed; these are research limitations rather than fabricated readiness.
