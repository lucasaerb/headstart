# Browser and model-attribution expansion

Author: `plugin_packager`, 10 September 2026. Independent review pending. This adds **29 records / 58 statically inspected building-block entry points**: 20 games, six separately identified PhiloLabs world/cinematic demos, two flight-simulation demos and one physics toolkit. Each monorepo subproject has its own source path. These are not 29 unrelated repositories, and cinematic/world studies are not counted as completed games.

## Evidence and selection

The [MartinDelophy collection](https://github.com/MartinDelophy/awesome-gpt-6-astra) and [merged community list](https://github.com/xianyu110/awesome-gpt-6-astra) supplied leads. The [Fable 5 list](https://github.com/Anil-matcha/awesome-claude-fable-5) supplied further leads, not proof of source availability or model identity. All included records follow through to an actual repository and immutable source paths. The author retrieved repository metadata/tree, inspected relevant README, creation and license text, and read building-block declarations, representative implementation and dependencies. This is an entry-point inspection, not an audit of every line or dependency in each repository.

`astra-browser-source-audit.json` records 144 per-record citations (shared files can repeat), raw immutable URLs, content hashes and byte counts. `astra-browser-repositories.json` records bounded repository metadata. Upstream source bodies stay outside the project repository; none was executed. No screenshots were copied. Preview references identify files in pinned trees and explicitly remain unreviewed for visual accuracy and HeadStart display rights. External demo availability was not tested; the central link checker can independently enrich reachability, which still does not prove gameplay.

## Model attribution

18 records carry a bounded creator attribution: 11 GPT-6 Astra, four Fable 5.1 and three Fable 5. Eleven records remain unverified with an empty model list. Fable 5.1 is not silently relabeled Fable 5. The three Fable 5 prototypes have a repository-wide creator statement and explicit subproject mapping; no project-code license was established.

- CityMaker's creator specifically attributes procedural building geometry to Astra. This is not evidence that all game code came from Astra.
- The Three Kingdoms creation record separates Astra's iterative development role from bitmap artwork produced by a separate image-generation tool.
- PhiloLabs labels paired subprojects by model. The Kyoto Astra README also records influence from Sakura Crossing source and mismatches in the camera comparison. The catalog makes no comparative quality, one-shot timing or benchmark claim.
- [Vesper Street's author post](https://www.reddit.com/r/vibecoding/comments/1wayao9/vibecoded_horror_game_with_fable_51/) explicitly names Fable 5.1 MAX and links the repository. The Reddit account claims authorship; its linkage to the GitHub account is not independently authenticated. The record preserves this limit.
- Magic Carpet Wizard's maintainer-controlled repository description names GPT 6 Astra; that assertion is mutable, so its retrieved value is captured in the metadata snapshot.
- Sunjing and Apex Club creation records explicitly leave exact model identity unconfirmed. Toy2Game, Blackwater, Jelly Baby and Dwellcraft cannot acquire a model badge merely because they appear in a collection.

AI playing an existing game is not evidence that it generated that game. Pokemon/Slay the Spire playthroughs and examples without a source repository were therefore not promoted into records.

## Rights and adoption limits

Six Toy2Game records have a custom noncommercial source-available license; they are not OSI open source. Missing project-code licenses remain unresolved. The collection's CC0 license was applied to Thunderfall only because its own README explicitly applies it to the original game content; no such scope was inferred for the other contributed games. PhiloLabs geospatial worlds retain OSM/geodata and brand caveats; the trench scenes' recognizable fictional designs require separate rights review. Hit & Run reconstruction was not selected because its converted proprietary disc assets create a materially different scope from original reusable game examples.

This file records the original 29-entry research pass. The later LAAS addition brings the current expansion to 30 entries and the full catalog to 73 records; see [the current expansion summary](../BROWSER-EXPANSION.md). All expansion entries remain `scope_reuse_status: review_required`. No extraction, cross-engine adapter, build, gameplay, model performance, royalty agreement or working integration is claimed. Research timing is null per row because individual effort was not measured. The current validator result and media totals are recorded in the expansion summary and final review rather than retroactively represented as results of this earlier pass.

## Reviewer correction

The first source audit hashed a UTF-8 replacement-decoded copy of Magic Carpet Wizard’s README. The independent reviewer found three invalid UTF-8 bytes in the original. Its display-decoded text exactly matched the author copy; the durable audit now records the original-byte digest and 17,120-byte size with an explicit decoding note. All other initial 115 distinct source hashes matched the reviewer’s independent fetch. Additional Fable 5 citations await that review.

`nalbam/spaceship` was inspected as a further Fable lead, but its README does not establish model identity. It was not added merely from a topic tag.
