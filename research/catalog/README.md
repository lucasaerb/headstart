# Game and building-block research database

The discovery index contains **92 research references and 180 candidate building blocks**. The previously visible 41 retain their order; all 51 removed references are restored below them at the user’s request on 11 September 2026. Native games, unavailable demos, unresolved rights and unknown stars remain visible with their original evidence limits. Research listing does not establish reusable scope or compatibility. The exclusion archive preserves the earlier decision as history.


This is a working local research index, independent of the unfinished website design. The source slices have not been extracted, executed, benchmarked or tested in a target game. Browser destinations are not play attestations. A separate dated browser observation confirms one bounded CityMaker session; it does not change source or integration readiness. Code, media, source/demo matching and integration readiness remain separate.

## Browse the results

- [Browser expansion and model-attribution evidence](BROWSER-EXPANSION.md)
- [Full readable index](INDEX.md)
- [Twelve-project shortlist and adaptation considerations](SHORTLIST.md)
- [Gaps, conflicting rights, and next research priorities](GAPS.md)
- [79-image provenance contact sheet](contact-sheet.jpg) and [full image credits](media-credits.md)
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

To regenerate the exact current media review bundle, install the optional pinned media dependency and run:

```sh
python3 -m venv research/catalog/.venv
research/catalog/.venv/bin/python -m pip install -r research/catalog/requirements-media.txt
research/catalog/.venv/bin/python research/catalog/scripts/media_contact_sheet.py
```

All 41 rows have independent narrow local-display decisions. The 16 recent decisions are recorded as an exact set in [the completed approval file](../../docs/reviews/recent-vibe-games/media-approval-request.json), with reviewer, timezone-aware timestamp, and `PASS` verdict. The gate continues to reject missing, extra, duplicate, rejected, blank, self-authored, non-`PASS`, or timezone-less decisions. The contact sheet samples the middle frame of animated media and the reproduction test checks its dimensions, credit count, and animated-frame readability.

The collected originals remain unchanged. The contact sheet only scales copies to fit. Keep the image credits, manifest, license notices and source references with distributed media; local display approval does not establish broader asset reuse rights.

## Evidence boundaries

All 41 research rows have pinned public source revisions, inspected open-source code licenses, authentic record-specific media, positive dated GitHub-star observations and reachable browser play URLs. Research inclusion remains distinct from independent dashboard-media approval; all 41 current images now carry independent review stamps and project. Source slices remain untested for integration and demo reachability is not a play attestation.

The HTTP audit records reachability separately from play, follows bounded redirects, limits downloaded response bytes, and records blocked/restricted/failing URLs honestly. It is a local curated-data helper, not the future public ingestion service. Repeat observations can differ across time and network environments; retain the newer report and investigate disagreements. Native download links are not browser demos. No performance or royalty agreement is inferred from this research.

Optional creator model attribution is recorded independently from readiness and rights; see [the dictionary](DATA-DICTIONARY.md). Search with `--model 'GPT-6 Astra'` to require that exact creator-attributed model. Missing attribution remains unknown, and unverified claims do not satisfy this filter.

The pure frontend projection helper is `scripts/build_site_catalog.py`. The dashboard uses the strict 41-row research set and record-matched local media. `editorial-ranking.json` supplies a dated, transparent browse order: verified usage evidence first, playable games before toolkits, then observed stars, English interface evidence, breadth, and explicit model provenance. It is an editorial discovery order, not an objective quality score. Empty-query `sort=recommended` honors it; text queries retain lexical/semantic relevance.


## GitHub popularity snapshot

[github-popularity.json](github-popularity.json) stores observed repository star counts with timestamps and public API evidence. Subprojects share their repository's count. Stars measure repository popularity, not gameplay quality, model performance, rights clearance or target compatibility. Missing API results and non-GitHub repositories stay null rather than becoming zero.

Refresh from the public API when a newer observation is needed:

```sh
python3 research/catalog/scripts/refresh_popularity.py
python3 -m unittest discover -s research/catalog/scripts -p 'test_refresh_popularity.py' -v
```

The refresh deduplicates repository URLs, uses at most four workers, 20-second request timeouts and 1 MiB response limits, and disables redirects. Only validated GitHub owner/repository names reach the fixed GitHub API host; no game source runs. The snapshot is replaced atomically after collection; individual network failures are recorded as unavailable with null counts. The audit is a separate atomic file, so compare its completion timestamp with the snapshot after a filesystem failure. The initial 10 September observation used the same public endpoint and identity check; the reusable command was added afterward without re-fetching unchanged observations.
