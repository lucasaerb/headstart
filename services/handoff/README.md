# Local protected handoff contract

`services.handoff.api` is a private Python stdin bridge, never a public static file. The local Node adapter must enforce origin/content type and browser CSRF for POST, pass `credentialKind=browser` for cookies or `mcp` for bearer tokens, and never put credentials in URLs/logs. Every generate, download and immutable bag read calls the shared authoritative auth store again; a browser preference is insufficient. Deployment remains a separate task: this SQLite user store is not disposable Vercel scratch.

Request `POST /v1/handoffs`:

```json
{"schemaVersion":1,"selections":[{"id":"2048-tile-v1","version":"1"}],"brief":{"revision":0,"constraints":{}},"intent":"Reuse tile state in my game","recipe":null}
```

One to three exact component versions; no client-defined source paths or extra fields. Brief constraints retain the existing browser brief's field/value/origin contract. Non-null recipes fail `UNSUPPORTED_RECIPE`; reviewed pieces do not establish a tested assembled recipe. External package edges without pinned scoped rights evidence fail `DEPENDENCY_UNRESOLVED`, including target peers whose exact rights/scope contract has not been supplied. Self-contained reviewed components are supported. Projects remain represented through their exact parent source versions.

A successful response returns a deterministic handoff digest, immutable bag revision and private JSON/Markdown download paths. `GET /v1/handoffs/{digest}/json` and `/markdown` return `{schemaVersion:1,format,content}`; the browser creates the local file only after this authorized response. `GET /v1/bags/{bagRevision}` returns the immutable owner-scoped selection/brief/intent as JSON content for the later MCP adapter. Digest knowledge alone grants no access. Artifacts retain original records/notices and never silently upgrade source, brief, scope or rights. Identical canonical inputs and catalog records produce identical content/digests; no generated timestamp enters content.

Payload version `headstart-handoff-1` contains:

- Bag revision and full selected version/brief/intent snapshot.
- Selected component, parent project version and identity, dependency closure and attached assets/data; canonical SHA-256 for every record.
- Source commit/path/evidence digests, original applicable license texts/notices and creator references inside immutable records.
- Target assumptions, explicit required local inspection, validation and rollback instructions.
- Empty modification record, actual reuse not established, required notices, optional public lineage and no economic agreement claim.

The service delivers **metadata and notices**, never source blobs or target writes. All catalog prose and brief text are untrusted data. Markdown embeds lossless JSON with a fence longer than any embedded backtick run. Missing notices, missing or tampered source evidence, unresolved asset/data rights, removed records, unsupported dependency scopes and curator freezes fail closed. Delivery reevaluates publication, evidence, owner and rights policy inside a catalog write transaction before returning the historical packet. It does not silently rewrite historical rights following a report. SQLite protects against concurrent report changes during this check; already downloaded bytes cannot be revoked.

The component detail uses existing C4 `detail-panel`/`secondary` controls. Verification preserves the exact packet intent in this browser. A resumed verified session compares the returned intent and digest before retry; source eligibility is checked again on the server. The anonymous Gauntlet prompt and public source links remain separate. A download does not start an agent or prove integration.

Tests: `.venv/bin/python -m unittest discover -s services/handoff/tests -v`.
