# Game and building-block research database

The first research pass indexes **43 entries across 40 repositories**: 26 games, 8 toolkits, 5 demos and 4 engines, including four separate Godot subprojects. It identifies **87 source-inspected candidate systems** and includes **12 authentic historical preview images** with file-specific credits and license evidence.

This is a working local research index, independent of the unfinished website design. The source slices have not been extracted, executed, benchmarked or tested in a target game. Browser destinations are not play attestations. Code, media, source/demo matching and integration readiness remain separate.

## Browse the results

- [Full readable index](INDEX.md)
- [Twelve-project shortlist and adaptation considerations](SHORTLIST.md)
- [Gaps, conflicting rights, and next research priorities](GAPS.md)
- [Preview contact sheet](contact-sheet.jpg) and [full image credits](media-credits.md)
- [Structured JSON](catalog.json), [CSV](catalog.csv), and [SQLite database](catalog.sqlite)
- [Coverage and per-field completeness](coverage.json)
- [Bounded internal-reference assessment](internal-discovery-review.json)
- [HTTP link audit](evidence/link-checks.json)

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

To regenerate the image contact sheet, install the optional pinned media dependency in an isolated environment and run:

```sh
python3 -m venv research/catalog/.venv
research/catalog/.venv/bin/python -m pip install -r research/catalog/requirements-media.txt
research/catalog/.venv/bin/python research/catalog/scripts/media_contact_sheet.py
```

The original files remain unchanged. The contact sheet only scales copies to fit. Keep the image credits, manifest, license notices and original/source references with distributed media; do not infer permission for other game artwork from these twelve files.

## Evidence boundaries

Every record has a full source commit, provider ID, author and timestamp, primary-source evidence, an inspected implementation entry point and coupling notes. Canonical sources include Gitea for 0 A.D. and GitLab for Veloren; the Veloren record explains the pinned official backup-mirror inspection.

The internal-reference assessment concerns original summaries and source/demo links, plus only the explicitly reviewed images. It does not approve production publication, source downloads, extraction, asset reuse or tested compatibility. The four candidate-only entries are 3d.city, Clumsy Bird, Gather It and HexGL. Other records still require selected-scope review before source reuse.

The HTTP audit records reachability separately from play, follows bounded redirects, limits downloaded response bytes, and records blocked/restricted/failing URLs honestly. It is a local curated-data helper, not the future public ingestion service. Repeat observations can differ across time and network environments; retain the newer report and investigate disagreements. Native download links are not browser demos. No performance or royalty agreement is inferred from this research.
