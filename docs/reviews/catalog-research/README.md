# Issue #1 independent review

**Final verdict: PASS for the research-database issue.** This approves the bounded research deliverables, not production catalog publication, source extraction, integration, or current playability.

Authors: `/root` (index, contracts, media and consolidation), `/root/research_web` (web records, shortlist and gaps), and `/root/design_flex_author` (native/Godot records and bounded link checker). Independent critical reviewer: `/root/design_flex_reviewer`. The reviewer did not author implementation or research claims. After acceptance, the coordinator explicitly authorized the reviewer to record verdict metadata, regenerate affected exports, and write this review receipt.

Reviewed research-tree digest: `8ba2ac6de3439df520d9b4f40c323c147fa5e1deeedc2de5ccc94ac4c5101322` across 46 files. [Reviewed file hashes](reviewed-files.json) define the exact scope and hashing method. Unrelated mockups, frontend work and AGENTS edits are excluded from this research verdict.

## Acceptance evidence

| Required outcome | Independently checked result |
| --- | --- |
| At least 30 distinct repositories or useful subprojects | 43 records across 40 repositories; four Godot records identify distinct subprojects. 26 games, 8 toolkits, 5 demos and 4 engines remain distinguishable. |
| At least 20 eligible internal discovery examples | Every record's proposed decision was reviewed: 39 approved for original factual summaries and links, with only specifically cleared images; four remain candidate-only. This is explicitly separate from public publication or source reuse. |
| Identity, revisions and primary evidence | All 43 records have full source revisions and provider IDs. The reviewer independently fetched 211 immutable source/README/license files; all matched the authors' SHA256 evidence. [Replay receipts](primary-refetch-checks.json) cover 116 web and 95 native files. Two documented historical missing-path attempts were not successful evidence and were excluded from replay. |
| Honest demo status | All records retain `not_tested` interactive status. The 125-URL audit matches current record references: 119 reachable, one blocked, one restricted and four errors. The report's 146 attempts and 4,096 body bytes are consistent with its boundaries. Newer failures remain visible in GAPS. |
| Source-backed categories and systems | Inspected the relevant declarations and behavior excerpts for all 87 proposed systems across all 43 entries, including coupling and runtime limitations. Source inspection is not isolation, correctness testing or integration. Editorial genre/style classifications remain identified as such. |
| Authentic, licensed image set | Visually reviewed all 12 previews in the contact sheet and checked their exact file-page licenses, image identity, credit and historical caveats. All 12 files decode with matching dimensions, SHA256 and upstream SHA1. Platforming, racing, transport/management, strategy, sandbox, puzzle and other categories exceed the four-category minimum. |
| Rights and notices | Code, selected-file exceptions, assets and preview licenses remain separate. Actual image notice texts are bundled. 3d.city, Clumsy Bird, Gather It and HexGL remain candidate-only for documented conflicts, missing permission or noncommercial exceptions. No source extraction or economic agreement is approved. |
| Useful shortlist | Twelve distinct research priorities include exact source paths, adaptation costs and unknowns. Three-game hypotheses are explicitly untested; toolkits/generators are not silently counted as complete games. |
| Repeatable audit and completeness | The validated JSON sources generate SQLite, CSV, Markdown and JSON exports. Full completeness covers 48 leaf fields, including intentional empty/null values. Link checks retain failures and redact transient credential-bearing redirects. |
| First-ten source-review effort estimate | Ten explicit planning ranges identify the first ten web records, review drivers, human-curator/agent-assisted scope and exclusions. Arithmetic independently checked: 515–1,185 active minutes. These are unvalidated planning judgments, kept separate from measured concurrent fetch-batch time. |

## Verification performed

Environment: local macOS workspace, Python 3.14.7 and standard-library SQLite/FTS5. No upstream game code was executed.

```sh
python3 -W error::ResourceWarning -m unittest discover -s research/catalog/scripts -p 'test_*.py' -v
python3 research/catalog/scripts/catalog.py validate
```

All 22 tests passed without resource warnings. Validation passed for 43 records and 12 checked image files. Tests cover malformed structures, missing evidence, false tested status, unsafe paths and aliases, repository/provider duplicates, nonfinite values, hard search filters, query injection, failed-validation database preservation, CSV formula protection, public-address checks, redirect revalidation, pinned connections, bounded reads, fallback behavior and credential redaction.

The reviewer additionally copied the authoritative records and media to an isolated temporary directory, rebuilt every export, compared it byte-for-byte with the delivered exports, then rebuilt again. SQLite, JSON, CSV, INDEX and coverage were identical. Real racing, economy, pathfinding and simulation-clock queries returned appropriate recorded candidates; an impossible runtime filter remained empty. All local Markdown artifact links resolve.

The contact sheet was inspected after correcting the Mindustry label to `GPL-3.0-only`. It preserves uncropped image proportions, clear titles/license labels and an explicit historical-image disclaimer. Desktop/mobile application screenshots are **N/A**: this issue introduces research data, CLI tools and a static evidence contact sheet, not website UI. The contact sheet itself was reviewed as required research-image evidence.

## Findings and corrections

The review used repeated author-fix/reviewer-check rounds. Blocking findings were returned to their authors rather than fixed and self-approved by the reviewer:

- Nested fields originally passed validation before failing during build; malformed types could crash validation. Required shapes, types, dates, states and downstream media fields are now checked before use.
- Repository `.git` aliases/provider renames and subproject dot aliases could evade deduplication. Provider-scoped identity and canonical path checks now reject them. Nonfinite effort values are also rejected.
- Clumsy Bird's package MIT declaration contradicted its GPL license file. Both sources are now cited and its code status remains unresolved.
- The Mindustry image page specified GPLv3-only, while the first manifest allowed later versions. Manifest, credits and contact sheet now use the exact narrower grant.
- The initial image bundle lacked actual license notice texts; MIT/GPL/CC notices are now included with specific credits and retained original files.
- SQLite transaction contexts did not close connections. Explicit closing now passes checks with resource warnings treated as errors.
- Broader completeness, latest HTTP failures and a real first-ten planning estimate were initially absent or incomplete. Final reports now include them without claiming measured review time or successful gameplay.
- Signed asset-redirect query data was removed from the durable HTTP report; redaction locations and observed statuses remain recorded.

No blocking findings remain for this research scope. The reviewer recorded scoped PASS metadata for all 43 discovery decisions and all 12 image reviews and regenerated affected exports.

## Concrete limits

The collection has no verified geospatial source project yet; the San Francisco example is a documented lead without an established repository. Contemporary browser-first previews still need image-specific permission work. Several external destinations fail or are restricted. None of the 87 systems has been extracted, built, played, benchmarked or tested in a target by this research pass. Source/demo revision matching, complete dependency and asset rights, production publication and royalty terms remain unresolved follow-up work, as documented in the research records and GAPS.

Final formatting re-review: normalized whitespace only in rendered image-credit paragraphs; original credit metadata and image bytes remain unchanged. The CSV CRLF whitespace attribute does not alter its data.
