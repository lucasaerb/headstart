# Local catalog review operations (#12)

`submissions.html` offers suggestions, corrections, scoped rights reports and appeals. Submitted repository URLs are metadata only: this service never runs repository code, clones repositories or publishes a catalog entry. GitHub control verification fetches only one bounded challenge file from an exact immutable commit on `raw.githubusercontent.com`, rejects redirects and compares the random per-submission challenge. GitLab/Codeberg claims remain unverified. Verified control never resolves code/asset rights or bypasses curator review.

The SQLite database specified by `HEADSTART_CATALOG_DB` (default `.local/catalog.sqlite3`) contains an append-only `submission_events` table and private contact/receipt hashes. It is chmod 0600. It is not a hosted durable-user store. Do not put this database in public downloads or deploy a local submissions runtime snapshot. The catalog's metadata export allowlist does not include this table. Events retain old proposals, decisions and evidence references; the public receipt response contains only review status and next action. Duplicate proposals receive independent private receipts, while the curator queue links duplicates.

Local authentication is supplied by #27. Set `HEADSTART_AUTH_ORIGIN` to the exact localhost origin and `HEADSTART_CURATOR_ACCOUNTS` to a comma-separated list of authorized account IDs after explicit operator approval. Verified email alone grants no curator permissions. No arbitrary account or token from a request body is trusted. Curator reads require the authenticated allowlisted account; PATCH additionally requires same-origin and session CSRF token. Anonymous POST requests are same-origin JSON, size bounded and rate limited to 30 per IP per minute in the single local Node process. There is no production authentication or distributed rate-limit claim.

Reviewing an item accepts the scoped proposal, not an automatic catalog publication. The curator can revise the description and record evidence, blockers and next action. Approved model-tag proposals are explicitly recorded as accepted; original proposal/history remains immutable. Applying source/rights changes to the canonical catalog still goes through CatalogStore's versioned contracts/evidence gate and an explicit local curator import. Do not relabel suggested source as integration tested.

Rights reports reference existing exact project/component versions and optional exact file paths. Pending/changes-requested reports freeze new platform source delivery immediately. A report resolution or rejection requires authenticated curator evidence and no unresolved blockers. An appeal never silently clears the original freeze. Historical notices and previous events remain intact.

Handoff generation AND download must call `assert_export_allowed(catalog_store, records)` on the entire selected/dependency closure in the same transaction as delivery. Initialize operations via `setup(store.db)` before that transaction. Missing policy tables fail closed. Metadata search and public upstream links remain open. These checks are consumed by #13; its integration tests establish real artifact delivery behavior rather than this service claiming success alone.

Routes: POST `/api/submissions`, `/api/corrections`, `/api/rights-reports`, `/api/appeals`; POST `/api/submissions/status` with private `id,receipt`; POST `/api/submissions/ownership` with `id,receipt,commit`; authenticated GET `/api/curator/submissions`, GET `/api/curator/submissions/:id` history, PATCH `/api/curator/submissions/:id` with current integer `revision`, `status`, `description` (optional), `blockingFields`, `reviewEvidence`, `nextAction`. Concurrent stale updates return 409. No public list or public reporter endpoint exists.

Checks:

```sh
.venv/bin/python -m unittest discover -s services/submissions/tests
node services/submissions/tests/browser.mjs
```

Browser tests use a disposable copy of initialized catalog metadata, a synthetic local verified curator session and Chrome (`HEADSTART_CHROME_CHANNEL`, default `chrome`), port 8895. They never use production credentials or real contact data. Screenshots are synthetic review evidence, with ephemeral receipts invalid after the test database is deleted.
