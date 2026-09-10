# Provisional research record contract

Research data, not the production catalog schema. One UTF-8 JSON array per author under `records/`; tooling merges these without overwriting originals. Do not execute upstream source.

Each record requires:
- `id`: stable kebab-case; `title`, `repo_url` (canonical HTTPS), `project_url`, `creator`, `summary` (original concise prose).
- `subproject_path`: string (empty for repo root).
- `content_kind`: game | toolkit | demo | engine | asset-library.
- `genres`, `capability_tags`, `visual_style`: arrays of separate descriptive strings.
- `dimension`: 2d | 3d | mixed | unknown; `camera`: array; `runtime`: {name, language, version: string|null, version_status: inspected|declared|unknown}; `physics`: array; `platforms`, `controls`, `authoring_tools`: arrays.
- `demo`: {url: string|null, kind: browser|native-download|video|none, source_relation: maintainer_linked|unknown, interactive_status: not_tested, notes: string}. HTTP reachability is enriched separately; never say played without an actual recorded browser test.
- `source`: {commit: full SHA|null, provider_id: number|string|null, inspected_at: UTC ISO timestamp, evidence: array of {url, claim, kind: repository|readme|source|license|official-docs}}. Supply immutable evidence links when fetched; tooling can enrich metadata but not manufacture reviewed evidence.
- `rights`: {code_license: string|null, code_status: inspected|declared|unresolved, code_evidence_url: string|null, asset_status: scoped|mixed|unreviewed|not_applicable, asset_notes: string, scope_reuse_status: review_required, notes: string}. No assertion of integrated, commercially safe, or blanket reuse eligibility. If inspected code license, fetch actual LICENSE/COPYING and cite it.
- `building_blocks`: array of {name, category, evidence_url, source_path: string|null, status: source_inspected|maintainer_described|proposed, notes}. At least 2 meaningful candidate systems when feasible; only use source_inspected after inspecting actual matching source, and note coupling/adaptation limits.
- `preview`: {status: missing|upstream_reference, source_url: string|null, notes: string}. Central media manifest handles cleared/downloaded previews separately; no unsourced screenshot claim.
- `research`: {author, started_at, completed_at, elapsed_minutes, selection_reason, known_unknowns: array, integration_family: threejs-r3f-candidate|reference-only|other-web-candidate}.

Unknowns must remain explicit. Lists represent source-declared or editorial classifications, not tested platform support. Do not infer a source-demo revision match from a repository link. All initial scope reuse statuses remain review_required; internal discovery eligibility is a later documented review decision distinct from extraction and tested status.

Cleared local display media is keyed to the exact research `record_id`, with the canonical `repo_url` retained as a consistency check. A repository URL alone is not a safe image identity because independently useful monorepo subprojects can share one repository.

Dated browser sessions live in the separate `play-observations.json` enrichment so the immutable source-research claim remains distinct. Each observation names the record, status, timestamp, reviewer, environment, scenario, result, limitations and an explicit editorial-pick boolean. Only an `interactive_checked` observation may be a pick; incomplete loads never imply playability or fun.

### Optional creator model provenance

`ai_provenance` is a backward-compatible research-0.1 extension, independent of readiness and rights. When supplied, require `status`, `models`, `evidence` and `notes` as defined in DATA-DICTIONARY.md. A `creator_attributed` claim requires named models and a creator evidence URL/claim; `unknown` cannot name a model. Missing fields normalize to unknown in derived outputs. The validator checks structure, not whether a claim is true: the independent source reviewer must verify attribution before display as creator-attributed. Never label model authorship from repository appearance, a generic AI mention, or a model vendor alone.
