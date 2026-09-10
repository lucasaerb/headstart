# Game and building-block research database

The research index now contains **76 entries and 153 candidate building blocks**; 147 blocks are source-inspected and six are official-description leads without public source. The [browser-first expansion](BROWSER-EXPANSION.md) contains 33 additions, including three official OpenAI Sites showcases and 25 Three.js examples, with explicit creator-attribution evidence for Astra, Fable 5 and Fable 5.1. The historical first pass contained 43 entries and 87 blocks across 40 repositories. **43 authentic previews** have record-specific local-display scopes: 12 historical images, 28 source-project expansion images and three official OpenAI article images whose broader reuse rights remain unresolved. The current dashboard projects this image-backed subset; 33 research candidates still need authentic, display-scoped images before they can join it.

This is a working local research index, independent of the unfinished website design. The source slices have not been extracted, executed, benchmarked or tested in a target game. Browser destinations are not play attestations. A separate dated browser observation confirms one bounded CityMaker session; it does not change source or integration readiness. Code, media, source/demo matching and integration readiness remain separate.

## Browse the results

- [Browser expansion and model-attribution evidence](BROWSER-EXPANSION.md)
- [Full readable index](INDEX.md)
- [Twelve-project shortlist and adaptation considerations](SHORTLIST.md)
- [Gaps, conflicting rights, and next research priorities](GAPS.md)
- [43-image preview contact sheet](contact-sheet.jpg) and [full image credits](media-credits.md)
- [Exact dashboard image gap backlog](IMAGE-GAPS.md)
- [Structured JSON](catalog.json), [CSV](catalog.csv), and [SQLite database](catalog.sqlite)
- [Coverage and per-field completeness](coverage.json)
- [Bounded internal-reference assessment](internal-discovery-review.json)
- [HTTP link audit](evidence/link-checks.json)
- [Dated browser play observations](play-observations.json)

Source record arrays under `records/` are authoritative; generated exports are reproducible. Stable IDs and explicit unknowns support a later migration to production catalog contracts. [RESEARCH-CONTRACT.md](RESEARCH-CONTRACT.md) and [DATA-DICTIONARY.md](DATA-DICTIONARY.md) explain the fields.

## Query and rebuild locally

Python 3.10+ with SQLite FTS5 is sufficient for the index and audits; no cloud account, database service or application framework is required.

```sh
python3 research/catalog/scripts/catalog.py validate
python3 research/catalog/scripts/catalog.py build
python3 research/catalog/scripts/catalog.py search "chase camera"
python3 research/catalog/scripts/catalog.py search "economy" --kind game
python3 research/catalog/scripts/catalog.py search "pathfinding" --runtime Godot --json
python3 -m unittest discover -s research/catalog/scripts -p 'test_*.py' -v
python3 research/catalog/scripts/check_links.py
```

Search uses local lexical full-text matching with exact runtime/kind filters. It is not the future semantic recommendation engine. Use the exact runtime labels in `coverage.json`; a filter with no matching runtime returns no results rather than silently relaxing it.

The SQLite database contains `projects`, `building_blocks`, `media`, and a full-text `search` table. Each project retains its full JSON record. Failed validation or SQLite construction preserves the previous database; the subsequent JSON/CSV/Markdown exports are separate writes and can be regenerated. Imports deduplicate repository/provider identity plus subproject path. The CSV protects formula-like leading characters when opened in spreadsheet software.

To refresh the bounded browser preview set and regenerate the image contact sheet, install the optional pinned media dependency in an isolated environment and run:

```sh
python3 -m venv research/catalog/.venv
research/catalog/.venv/bin/python -m pip install -r research/catalog/requirements-media.txt
research/catalog/.venv/bin/python research/catalog/scripts/collect_browser_previews.py --apply
research/catalog/.venv/bin/python research/catalog/scripts/media_contact_sheet.py
```

The collected originals remain unchanged. The contact sheet only scales copies to fit and samples a representative frame from animated images. Keep the image credits, manifest, license notices and original/source references with distributed media; do not infer permission for other game artwork from these 43 files. Browser-expansion permissions are intentionally limited to the local prototype where stated; they do not establish public-site or in-game reuse rights. The three OpenAI article images have an explicit unresolved-rights expression and user-directed local-display scope, not an inferred image license.

## Evidence boundaries

Every record has a full source commit, provider ID, author and timestamp, primary-source evidence, an inspected implementation entry point and coupling notes. Canonical sources include Gitea for 0 A.D. and GitLab for Veloren; the Veloren record explains the pinned official backup-mirror inspection.

The internal-reference assessment concerns original summaries and source/demo links, plus only the explicitly reviewed images. It does not approve production publication, source downloads, extraction, asset reuse or tested compatibility. The four candidate-only entries are 3d.city, Clumsy Bird, Gather It and HexGL. Other records still require selected-scope review before source reuse.

The HTTP audit records reachability separately from play, follows bounded redirects, limits downloaded response bytes, and records blocked/restricted/failing URLs honestly. It is a local curated-data helper, not the future public ingestion service. Repeat observations can differ across time and network environments; retain the newer report and investigate disagreements. Native download links are not browser demos. No performance or royalty agreement is inferred from this research.

Optional creator model attribution is recorded independently from readiness and rights; see [the dictionary](DATA-DICTIONARY.md). Search with `--model 'GPT-6 Astra'` to require that exact creator-attributed model. Missing attribution remains unknown, and unverified claims do not satisfy this filter.

The pure frontend projection helper is `scripts/build_site_catalog.py`. By default it prints a static catalog JSON assignment; it does not change the site or copy assets. Pass `--existing-catalog` to preserve only record-matched local previews with matching hashes, `--require-previews` for the dashboard projection that omits every record without an explicit local-display scope, and an explicit `--output` when the site owner is ready to update the application. Dashboard builds also pass `--site-index HeadStart-Starter-Package/site/dist/index.html` so the visible total and cache-busting catalog URL update atomically with the projection. The current dashboard uses `--require-previews`; showing all 76 entries requires collecting authentic, record-specific, display-scoped images for the remaining 33 rather than introducing generic placeholders. The broader research database and plugin retain link-only candidates. Creator-attributed preferred models with browser targets sort first, followed by Three.js browser candidates and other browser references. This discovery order is not a quality or integration-readiness score.

## GitHub popularity snapshot

[github-popularity.json](github-popularity.json) stores observed repository star counts with timestamps and public API evidence. Subprojects share their repository's count. Stars measure repository popularity, not gameplay quality, model performance, rights clearance or target compatibility. Missing API results and non-GitHub repositories stay null rather than becoming zero.

Refresh from the public API when a newer observation is needed:

```sh
python3 research/catalog/scripts/refresh_popularity.py
python3 -m unittest discover -s research/catalog/scripts -p 'test_refresh_popularity.py' -v
```

The refresh deduplicates repository URLs, uses at most four workers, 20-second request timeouts and 1 MiB response limits, and disables redirects. Only validated GitHub owner/repository names reach the fixed GitHub API host; no game source runs. The snapshot is replaced atomically after collection; individual network failures are recorded as unavailable with null counts. The audit is a separate atomic file, so compare its completion timestamp with the snapshot after a filesystem failure. The initial 10 September observation used the same public endpoint and identity check; the reusable command was added afterward without re-fetching unchanged observations.
