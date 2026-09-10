# Local catalog persistence

Issue #4 uses Python SQLite from the standard library for a single-process local workspace. Canonical v0.2 writes also require the root `jsonschema` dependency. Research and published metadata never share a listing view. This service does not perform network fetching, source export, authentication, target writes, or public hosting.

```sh
python3 -m services.catalog migrate
python3 -m services.catalog import-research research/catalog/catalog.json
python3 -m services.catalog export /tmp/headstart-catalog-export.json
python3 -m services.catalog backup /tmp/headstart-catalog-backup.sqlite3
python3 -m unittest discover -s services/catalog/tests -v
# Destructive local-only reset, retain evidence for audit/reimport:
python3 -m services.catalog reset --confirm-local-reset
```

Default local storage is `.local/catalog.sqlite3` and `.local/evidence/`. Metadata backups use SQLite's consistent backup API; copy the content-addressed evidence directory separately and verify digests on restore. Restore while the local server is stopped by copying the backup to the configured database path and copying the evidence directory. Export is audit JSON, not a reusable source handoff. Reset never deletes evidence. Do not run reset against a live database.

`CatalogStore(database, evidence_root)` exposes idempotent `import_research(path)`, explicit `research_records()` (`eligibility=research_only`), strict `records(published_only=True)`, `put_record(v0.2_envelope)`, `tombstone(entity,id,reason)`, dated `record_demo_check`, `put_blob(bytes,expected_digest,display_rights=None)` and verified `get_blob(digest,for_display=False)`. Blob display requires an explicit approval object `{status: "approved", evidence: "review reference", reviewer: "reviewer identity"}` from the trusted local curator. This is a local trusted-author interface, not an unauthenticated HTTP mutation endpoint. Blob reads reject symlinks, traversal, tampered content and unresolved display rights.

All canonical versions are append-only (including drafts); corrections use a new version. Evidence references must resolve to registered digest-verified local bytes. Contract validation plus immutable-reference resolution applies before the write transaction. Raw research preserves provider ID, subproject and original JSON; repository path is only a fallback when provider identity is unknown. Prior revisions and import file digest remain in history. Demo observations append independently and do not erase source listings. Tombstones retain records, notices and audit. No seed is promoted automatically.

## Local SQLite decision and Postgres migration

The PRD's production direction remains Postgres. SQLite avoids introducing a cloud dependency for local progress. Migration maps JSON payloads to JSONB, stable entity/id/version keys to composite unique keys, research identity to provider/subproject unique constraints, tombstones to append-only moderation records, and immutable-version triggers to Postgres triggers. Preserve transaction semantics and write-boundary semantic validation; add typed foreign-key columns/indexes and a restricted mutation role before multi-user production use. Evidence stays content-addressed in an object store with an authenticated fetch adapter. SQLite files must not be used as mutable state on Vercel's ephemeral filesystem. There is no production catalog database in this change.

### Execution evidence and atomic graph updates

`put_records([...])` validates the final graph and inserts the whole batch atomically, allowing component/dependency cycles without disabling reference checks. `put_record` delegates to this interface. Dependency ownership and endpoint kinds are validated.

Tested/isolated verification must identify an immutable recipe and target source version, source/target commits, recipe digest and a canonical SHA-256 scope digest. Recipe inputs must match the represented component and scope; assembled recipe verification references its own composition. Every verification evidence blob must be JSON with exact keys: `schema_version: "headstart-execution-0.1"`, `source_commit`, `target_commit`, `recipe_digest`, `scope_digest`, `recipe`, `target`, `result`, `runner`, `environment`, timezone-aware `executed_at`, and nonempty `checks`. Each check has `name`, `result: "passed"`, and a registered nonempty `log_digest`. Context and check names must match the verification envelope. Arbitrary source bytes labeled `executed_test` are rejected. This local trusted-curator interface validates structured reports and bindings; it does not cryptographically authenticate an external runner or prove an untrusted report is truthful. No public report submission endpoint is provided, and no real integration-tested fixture is seeded.
