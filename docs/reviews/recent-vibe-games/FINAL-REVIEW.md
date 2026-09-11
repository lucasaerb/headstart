# Independent review — recent vibe-coded browser games

**Verdict: CHANGES REQUESTED**

**Reviewer:** `/root/critical_review`

**Reviewed revision:** `57a9ad41c7165d4ca07d98dbde80dd4ea6663222`

**Review date:** 10 September 2026 EDT / 11 September 2026 UTC

## Blocking findings

### 1. P(DOOM) passes the gameplay-media gate with a logo and a false alt description

Severity: blocking data/evidence integrity.

[`research/catalog/media/p-doom.jpg`](../../../research/catalog/media/p-doom.jpg) is a 1600 × 540 title banner containing the P(DOOM) logo and “The Alignment Problem.” It does not depict the “First-person combat in P(DOOM)’s breached frontier laboratory” asserted by the corresponding `alt` field in [`media-manifest.json`](../../../research/catalog/media-manifest.json). Nevertheless, `p-doom` is marked `authentic_reviewed_media: true` in [`strict-gate-audit.json`](../../../research/catalog/exclusions/strict-gate-audit.json) and appears in the API/site.

Replace this media row and bytes with an authentic, record-specific gameplay screenshot or clip whose visible content matches its alt text and whose source, exact-image rights, credit, digest, and version relation are recorded. If that evidence cannot be established, fail the record closed into the exclusion audit and regenerate every downstream artifact.

The regression check must inspect more than a nonempty alt string. The current test at `research/catalog/scripts/test_ai_provenance.py` accepts any nonblank text, so this materially false description passes.

### 2. The 16 new media rows bypass the established independent-review gate

Severity: blocking workflow/publication gate.

All 16 rows introduced by `records/recent-vibe.json` lack `independent_reviewed_at` and `independent_review_verdict`. The strict publication check at `research/catalog/scripts/catalog.py:327-332` treats `rights_status == reviewed_for_catalog_display` alone as “authentic reviewed media,” and `catalog_asset_src()` likewise allows that status without an independent decision. This lets author-authored manifest status publish bytes before the separate critical review required by `AGENTS.md` and `docs/development-workflow.md`.

Restore a fail-closed approval contract for the exact 16-record set (or an equivalent independently auditable mechanism), require a named independent reviewer, timezone-aware timestamp, and PASS verdict before site/API projection, and add a negative test proving unstamped new media cannot publish. Because finding 1 prevents this review from passing, this review does not approve or stamp the other 15 rows.

### 3. The canonical media review bundle is stale and contradicts the 41-record release

Severity: blocking reproducibility and review evidence.

The current [`media-manifest.json`](../../../research/catalog/media-manifest.json) has 41 rows, but [`contact-sheet.jpg`](../../../research/catalog/contact-sheet.jpg) remains the prior 69-image sheet (1500 × 8650 rather than the 5320 px height produced for 41 rows), ends with Vesper Street, and contains none of the 16 recent images. [`media-credits.md`](../../../research/catalog/media-credits.md) also still has 69 entries and omits all 16 additions. [`README.md`](../../../research/catalog/README.md) still links a “69-image” sheet and describes “these 69 files” at lines 14 and 55. [`IMAGE-GAPS.md`](../../../research/catalog/IMAGE-GAPS.md) still claims a 76-record research catalog, 69 displayed images, and seven gaps.

Regenerate the contact sheet and credits from the approved 41-row manifest, update the README and image-gap documentation to the strict 41-record publication model, and add a reproduction test that detects manifest/contact-sheet/credit-count drift. Review the regenerated animated middle frames as well as static images.

## Criteria that passed

- The authoritative catalog, site projection, `/api/research`, ranking file, and strict-gate listed set each contain exactly 41 matching IDs. The recent source file contains exactly 16 IDs, all active. Fifty-one excluded records remain in the audit/archive and are absent from API search, selected-ID responses, facets, site rows, and counts.
- Every active row has a 40-character pinned commit, pinned source and license evidence, `code_status: inspected`, a non-`LicenseRef` code license, a browser demo, positive dated GitHub stars, and a demo URL recorded reachable. My independent bounded link audit checked 111 unique active-record URLs and returned 111 reachable.
- Glenn Explore alone contains a typed player metric: 47,093 `unique_players`, publisher-reported, dated and caveated. All other active records preserve unknown player usage.
- Recent interface-language data is English for 15 additions; Little Flock is explicitly `zh-CN`/Simplified Chinese and is placed at editorial position 26 below the English alternatives with comparable small-star/model signals.
- Creator model labels project only `creator_attributed` claims. Unverified collection membership remains model-unknown. Protocol 99 is exactly `GPT-6 (user-declared) × Codex`, with explicit text that it does not establish Astra.
- Recommended browsing is deterministic and game-first: Glenn Explore is #1, playable game/demo rows precede reusable toolkits, positions are contiguous 1–41, cards show rank, and details expose the dated rationale. Text search retains lexical/relevance order. Multiplayer, FPS, platformer, and top-down coverage is present.
- Native Chrome confirmed 41/41 counts, visible rank, stars, player/model/language labels, a Little Flock search result and detailed pinned source/media/model rationale, and the empty-state recovery. The supplied desktop/mobile catalog and empty-state screenshots are readable and responsive; the 400 px card layout and filter toggle remain usable. External play/source targets are exposed as labeled links. HTTP reachability remains correctly disclosed as distinct from a playtest.

## Checks run

```text
python3 -m unittest discover -s research/catalog/scripts -p 'test_*.py' -v
49 passed

.venv/bin/python -m unittest discover -s services/catalog/tests -v
31 passed

.venv/bin/python -m unittest discover -s services/retrieval/tests -v
5 passed, 3 skipped (optional local inference model unavailable)

npm test
40 passed

npm run build
passed; .local-build created with static assets and server APIs excluded

python3 research/catalog/scripts/check_links.py --records research/catalog/records --output /tmp/reviewer-vibe-link-checks.json --workers 4
111/111 unique URLs reachable
```

The first catalog-service invocation with system Python failed because that interpreter lacks `jsonschema`; rerunning with the repository `.venv` passed. This is an environment dependency, not an implementation failure.

No files outside this review record were changed. No merge, push, deployment, or external publication was performed.
