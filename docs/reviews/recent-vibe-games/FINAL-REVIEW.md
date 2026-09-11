# Independent review — recent vibe-coded browser games

**Verdict: PASS**

**Reviewer:** `/root/critical_review`

**Reviewed revision:** `588397c6f46caaff3c6e668dd1575bb6264e347c`

**Review date:** 10 September 2026 EDT / 11 September 2026 UTC

## Decision

Revision `588397c6f46caaff3c6e668dd1575bb6264e347c` satisfies the bounded catalog-expansion acceptance criteria. The published research index, catalog API, frontend projection, strict-gate audit, editorial ranking and media manifest contain the same 41 active record IDs. The exact 16-record recent batch is present, and 51 rejected candidates remain in the exclusion archive and strict audit without appearing in the active API, site projection, facets, counts or selected-record behavior.

Every active record has an immutable 40-character source revision, source evidence containing that revision, an inspected OSI/open code-license expression rather than `LicenseRef-*`, a pinned license evidence URL, a browser demo, a positive dated GitHub-star observation, a reachable live-play URL and authentic local media. All 111 unique active-record URLs passed a fresh bounded reachability audit. Reachability is disclosed separately from a gameplay test and source/deployment attestation.

The 16 new media rows carry the exact independent decision from revision `d9cf6065dc35bc1a154c861a2da94f37a1852a80`: reviewer `/root/critical_review`, timestamp `2026-09-11T02:09:29Z`, and a PASS verdict. Their canonical and site asset bytes match the manifest SHA-256 values. P(DOOM) now uses the project’s real `arrival.jpg` first-person gameplay frame, and its visible HUD, weapon, enemies and Arrival Platform agree with the record-specific alt text. The 41-entry contact sheet is 1500 × 5320, the credits contain 41 project sections, and the catalog documentation uses the current 41-record publication scope.

## Review rounds

1. Revision `57a9ad41c7165d4ca07d98dbde80dd4ea6663222` received **CHANGES REQUESTED** for a P(DOOM) logo mislabeled as gameplay, a publication path that did not require independent approval for the 16 new media rows, and stale 69/76 media-review artifacts.
2. At revision `d73d2753222c5eda74b91eb0a08c3dd6d91022ec`, I reviewed all 16 requested assets against local bytes, immutable source pages, rights evidence, identity, alt, credit and digest. I inspected the beginning, middle and end of the three animated assets and confirmed the corrected P(DOOM) frame. The exact-set media decision was committed separately as `d9cf6065dc35bc1a154c861a2da94f37a1852a80` for author consumption.
3. Revision `588397c6f46caaff3c6e668dd1575bb6264e347c` passes the final review. The author consumed the independent decision through the fail-closed approval script, regenerated the active artifacts, refreshed visual evidence and aligned the tests with the approved 41-row state.

## Data and product findings

- Recommended order is deterministic and game-first, with contiguous positions 1–41. Glenn Explore is #1; the first reusable toolkit appears after the playable game/demo group. Search continues to use lexical relevance rather than editorial position. Each card shows its rank and each detail view explains the dated rationale.
- Fifteen recent additions include English in their interface-language evidence. Little Flock is labeled Simplified Chinese (`zh-CN`) and is lower at position 26. Older records with no defensible language evidence remain explicitly unknown.
- Glenn Explore alone has a player metric: 47,093 `unique_players`, publisher-reported, dated, scoped and caveated. All other active records keep player usage unknown rather than converting missing evidence to zero.
- Exact model names appear only for `creator_attributed` claims with linked evidence. Unverified collection membership remains model-unknown. Protocol 99 is exactly `GPT-6 (user-declared) × Codex`, with an explicit statement that this does not establish GPT-6 Astra.
- Active coverage includes multiplayer (Glenn Explore, Little Flock and NeoMud), FPS (Cadle and Operation Ironhold), platformers (the two Godot platformers, LittleJS and SkySprout), and top-down play (Protocol 99). Category, platform, runtime and model controls remain present.
- The three source-less OpenAI Sites showcases, zero-star projects, non-open `LicenseRef-*` candidates and other failed rows remain auditable but unpublished. The Toy2Game noncommercial rows do not enter the active open-source set.

## Interface and evidence review

I visually reviewed all nine final screenshots in `docs/reviews/recent-vibe-games/final-screenshots/`: desktop and mobile landing pages, desktop and mobile catalog views, desktop and mobile empty states, desktop and mobile unavailable-email states, and the desktop detail dialog. At 1440 × 1000 and 390 × 844, navigation, filter disclosure, cards, images, source/play actions, counts, empty-state recovery and dialog content are readable without horizontal overflow. The mobile bag control remains reachable above the content.

A fresh native Chrome pass against the reviewed revision confirmed 41 matching projects and 12 cards on page one; image alt text on every visible card; rank, stars, date, language, player and model labels; usable search and clear-filter recovery; labeled external demo links; source/image detail controls; and native accessible roles for search, dropdowns, layout toggles, disclosure controls, links, dialogs and bag actions. Searching `P(DOOM)` returned one record with its corrected gameplay alt, 6 dated stars, English label, rank #25 and creator-reported GPT-6 Astra label. The checked empty state preserved its query in the URL and returned to the full catalog through Clear filters. The supplied detail capture shows the pinned revision, external demo/source actions, reuse caveats and inspected systems.

## Independent checks

```text
python3 -m unittest discover -s research/catalog/scripts -p 'test_*.py' -v
53 passed

.venv/bin/python -m unittest discover -s services/catalog/tests -v
31 passed

.venv/bin/python -m unittest discover -s services/retrieval/tests -v
5 passed, 3 skipped (optional local inference model unavailable)

npm test
40 passed

npm run build
passed; isolated static build created successfully

python3 research/catalog/scripts/catalog.py validate
PASS: 41 research records; 41 checked image files

python3 research/catalog/scripts/build_site_catalog.py --root research/catalog \
  --existing-catalog HeadStart-Starter-Package/site/dist/catalog.js \
  --output /tmp/reviewer-site-catalog-final-588397c.js --require-previews
byte-identical to the committed catalog.js; SHA-256
df0d4de48838dcda87add1c7741874a5f1aef1b1c7c6c4314fd33a2ab824ad34

python3 research/catalog/scripts/check_links.py --records research/catalog/records \
  --output /tmp/reviewer-vibe-link-checks-final.json --workers 4
111/111 unique URLs reachable
```

A separate invariant audit checked source/license/star/demo gates, approval fields, local and frontend image hashes, API/site/source/audit/rank ID parity, exclusions, languages, model claims, player metrics, category coverage, credit count and contact-sheet dimensions. It passed with 41 active, 16 recent, 51 excluded, 41 media rows, 41 credit sections and no mismatches.

## Nonblocking limits

- HTTP success establishes current URL reachability only. Most demos remain honestly labeled “not yet tested”; LAAS and Poimandres retain their dated incomplete-load disclosures. The active records do not claim that a live deployment is byte-identical to its pinned source revision.
- Media approval is narrow catalog-display review. It does not clear all upstream game assets, dependencies or downstream reuse; the UI retains those scope-specific caveats.
- Three retrieval tests requiring an optional local inference model were skipped. The lexical fallback, hard-filter boundary and recommendation/search-order behavior passed.

No production files were changed in this final review. No merge, push, deployment or Sites invocation was performed.
