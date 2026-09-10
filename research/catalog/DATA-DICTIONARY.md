# Provisional research data dictionary

Schema identifier: `research-0.1`. This is a research interchange format, not a production database migration. All dates are observations, not proof of current upstream state.

| Field | Meaning and limits |
| --- | --- |
| `id`, `title`, `creator`, `summary` | Stable research identity and original concise description. Creator names are credited source maintainers, not inferred sole authors. |
| `repo_url`, `project_url`, `subproject_path` | Canonical source and project URLs; empty subproject path means repository root. Distinct useful subprojects can share a repository. |
| `content_kind` | Game, demo, toolkit, engine or asset library. A toolkit does not count as a complete game in a three-game demonstration. |
| `genres` | Provisional genre/intent vocabulary. Includes editorial discovery intents for toolkits; normalize to the production ontology later. |
| `capability_tags` | Candidate systems such as simulation clocks, worker logistics, navigation, cameras and procedural generation. Evidence and limitations live in `building_blocks`. |
| `visual_style`, `dimension`, `camera` | Editorial presentation descriptors supported by source descriptions or inspected preview references. They are not performance or objective art-quality scores. |
| `runtime` | Runtime family, source language, declared/inspected version and its evidence status. Version ranges are not tested compatibility ranges. `null` means no version established. |
| `physics`, `platforms`, `controls`, `authoring_tools` | Separate source-declared technology/support descriptors. Empty arrays mean unspecified/not established in this pass; they do not establish unsupported behavior. Blender belongs to authoring tools. |
| `demo.url`, `demo.kind` | Browser destination, native download, video, or none. A linked showcase for a toolkit can contain several examples. |
| `demo.source_relation` | `maintainer_linked` means the maintainer points to the destination; it does not prove which source revision it runs. |
| `demo.interactive_status` | `not_tested` throughout this source-research pass. HTTP observations are in the separate link audit; no HTTP 200 is promoted to play success. |
| `source.commit`, `source.provider_id` | Full immutable revision and repository provider identifier. Provider identifiers are scoped to the host; mirror exceptions are documented. |
| `source.inspected_at`, `source.evidence` | Dated primary URLs with short claims and source type. Evidence fetch hashes are preserved under `evidence/`. |
| `rights.code_license`, `rights.code_status`, `rights.code_evidence_url` | Inspected or declared license evidence, including uncertainty and file-level exceptions. `inspected` records work done, not universal rights clearance. |
| `rights.asset_status`, `rights.asset_notes` | Separate treatment of original-game graphics/audio, models, fonts, datasets and screenshot rights. A code license alone does not clear assets. |
| `rights.scope_reuse_status` | `review_required` for every row. No extraction/export or integration-tested status is earned here. |
| `building_blocks[]` | Named candidate system, category, pinned evidence URL, actual source path, inspection level and coupling/adaptation notes. These are source leads, not independently packaged components. |
| `preview` | Upstream media reference or justified missing state. Upstream reference does not authorize redistribution. Locally collected images use the separate image manifest. |
| `research` | Author, batch start/end, selection reason, unknowns and initial integration-family assessment. Null individual effort prevents fabricated per-record timings. |

## Media and observations

`media-manifest.json` maps each specific preview to its canonical research repository, original file, file-page revision, declared capture date, download time, original hash/dimensions, credit, exact license expression, allowed scope and transformations. Capture date can remain unknown while upload date is known. Historical images do not attest the indexed source commit. `media-credits.md` and `media/licenses/` carry notices; `evidence/media-source-metadata.json` preserves the inspected Commons metadata.

`evidence/link-checks.json` contains dated HTTP probes, errors and redirect results. Source-file audits preserve immutable URLs, fetch outcomes and hashes. Reports must not contain credentials, signed URL secrets or unrelated local/private data.

`internal-discovery-review.json` is a separate, narrowly scoped review: factual internal research display and links, with only explicitly licensed media. It must not be interpreted as public catalog publication or permission to download/merge upstream code. Verified-email access to platform-controlled reuse actions is planned separately.

## Completeness and derived exports

`coverage.json` reports record, repository-kind, runtime, genre/intent, dimension, image and block counts. Its `all_contract_field_completeness` reports populated versus null/empty/missing values for every leaf contract field. Empty root `subproject_path` is known, not missing; an actual numeric zero is not treated as unknown. Evidence/block arrays also have meaningful count summaries. Empty or null values may be intentional, so completeness is not a quality or eligibility score.

`catalog.json`, `catalog.csv`, `catalog.sqlite`, `INDEX.md` and `coverage.json` are generated from sorted source records. The JSON export records source-file hashes. Search indexes descriptions, taxonomy and candidate-block notes; source JSON retains the original separate facets.
