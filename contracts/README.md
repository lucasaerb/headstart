# Metadata contracts v0.2

`entity.schema.json` defines the immutable `{schema_version, entity_type, id, version, data}` envelope and seventeen separate entity types. Import `contracts.validate.validate_record` at write boundaries; it raises `ValueError`. `validate_bundle` additionally resolves version references and checks a component's source against its parent snapshot. JSON Schema alone is insufficient for publication and tested-state gates. Install the root `requirements-dev.txt` and run `python3 -m unittest discover -s contracts/tests -v`.

Project identity and immutable project versions remain separate. Optional project/provider/ingestion metadata records observations as they become known; absence does not claim a measurement or support status. A version always pins a 40-character source commit. Unpinned research stays in the research store. Components, demos/checks, assets, scoped rights, claims, dependencies, recipes and integration evidence have separate contracts. GameBrief, StyleProfile, ReviewFinding, BenchmarkRun and Recommendation cover the v0.4 additions. References always contain both ID and version; mutable URLs are never version references.

## Evidence and invalidation

Every canonical evidence claim carries a relative safe path, SHA-256 content digest, source commit, exact legacy origin, declared/editorial/inspected/measured type, named reviewer and observation timestamp. Unknown numeric measurements are `null`; zero means an actual zero. Schemas validate syntax, not evidence truth or reviewer authority. The ingestion/curation service must resolve bytes, verify digests and establish an authorized reviewer before publication. This library performs no network calls or source execution.

Source/demo relation (`proven`, `maintainer_claimed`, `unknown`), demo health (`unverified`, `reachable`, `interactive`, `broken`, `embed_blocked`), scoped rights and readiness retain their independent legacy vocabulary. HTTP reachability cannot establish interactive success. A measured claim requires an executed-test origin. Reviewed components require cleared rights covering each required file, source inspection evidence and matching source commits. Isolated/tested status requires its own passing execution record. Tested recipes require their own source/target/digest-matched verification; tested ingredients cannot promote an assembled recipe.

Any change to source commit, target commit, recipe digest or scope requires a new immutable version and fresh applicable evidence. Historical records stay intact. `validate_bundle` does not perform tenant authorization, establish evidence truth, or grant rights/reuse access. Persistence must enforce immutable inserts, scoped ownership and foreign keys; review/publication must fail closed until bytes and review authority are checked. Never use shape validation as a verified-reuse attestation.

## Ontology and research migration

`ontology.json` contains stable IDs, separate facets, parent IDs, aliases, deprecation targets and append-only migration/change records. Genre, capability, style, runtime and authoring-tool labels remain separate; input/platform/physics/camera facets are also separate. The eighteen existing v0.1 capability IDs are retained verbatim and explicitly mapped. New research aliases are namespaced by facet. Alias collisions across facets do not merge hard filters. A future merge/deprecation requires a new ontology version and curator review; historical evidence must not be rewritten.

`research-mapping.json` accounts for every observed leaf and collection field in the current `research-0.1` export. Identity/title/repository/commit can feed canonical fields after validation. All other observations are explicitly retained under `research_only` pending scope review rather than silently converted into cleared rights, tested support or publication. New research fields fail the coverage test until a mapping decision is added. This is intentionally a lossless research retention mapping, not a production promotion script.

Legacy `catalog-record.schema.json`, `catalog-record.example.json` and `seed-catalog.json` remain v0.1 at both package and plugin locations, byte-identical and unchanged. v0.2 is an incompatible normalized contract, not an in-place rewrite of the six unresolved seeds. Existing plugin releases continue consuming their v0.1 snapshot. Publishing the new contracts does not declare a new client-verified plugin release.

## Validation boundaries

Synthetic tests exercise allowed candidate and evidenced shapes, forbidden false promotion, stale source/recipe checks, unsafe paths, incompatible versions, reference resolution, null versus zero and research-mapping coverage. Synthetic evidence is never copied into the catalog. UI screenshots are not applicable to this data-only issue. Independent review remains required before closing issue #3.
