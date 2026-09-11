# Local catalog operations

The public `operations.html` page shows dated reachability, separate interaction outcomes, stale results and optional privacy controls. Curator aggregate status requires a verified curator session. C4 landing visuals stay unchanged.

Run explicit bounded jobs against an initialized local catalog:

```sh
.venv/bin/python -m services.operations.cli register-demo --id demo-v1 --url https://example.com/game --featured
.venv/bin/python -m services.operations.cli reachability
.venv/bin/python -m services.operations.cli register-source --file source-monitor.json
.venv/bin/python -m services.operations.cli sources
.venv/bin/python -m services.operations.cli dispatch
.venv/bin/python -m services.operations.cli status
```

Source configuration: `{"repository":"https://github.com/owner/repo","paths":["src/game.js"],"licensePaths":["LICENSE"]}`. The collector resolves a branch commit, fetches bounded selected files at that revision and stores hashes. Daily reachability and weekly source jobs can be invoked by a local scheduler; no production cron is configured. Source scans claim five-minute leases, back off, and stop after three failures. Explicit `retry-source --id ID` and `retry-queue --id ID` recover exhausted jobs. Changed source/license creates a new suggested candidate plus correction queue item; previous publication and verification stay unchanged.

Reachability runs in a ten-second subprocess with daily due checks, per-host backoff, one request per host per batch, a 25-target cap and a 30-second start deadline. DNS destinations must all be public; TLS pins the checked address. Redirects and URL queries are explicitly rejected, including asset queries. Unsupported demos need review. A reachable response never implies gameplay.

A weekly featured interaction check uses `interactive --id demo-v1 --file probe.json --image sha256:IMAGE_DIGEST`. Plan: `{"url":"https://example.com/game","steps":[{"name":"counter increments","action":"click","input":"button","observe":"output","attribute":null,"before":"0","after":"1"}]}`. One to five declared outcomes must actually change. The Docker browser has no network, secrets or repository mount; only the worker and scoped Playwright runtime are mounted read-only. Its broker bounds public HTTPS resources, rejects private addresses/redirects, caps 40 requests/12 MB and cancels after 60 seconds. WebSockets, service workers, downloads and non-GET requests are blocked. Dated reports bind plan/image/capture digests. The local CLI is the trusted recording boundary; hashes do not authenticate external reports. Fixture evidence proves this worker, not a catalog game's playability.

Telemetry is off unless `HEADSTART_TELEMETRY=1`, plus explicit browser opt-in. POST event/deletion requires exact configured `HEADSTART_AUTH_ORIGIN`. Search, detail, demo, source, successful handoff, plugin lookup, first plan and self-reported reuse are separate categories. Browser hooks cover implemented site actions. The optional [local outcome wrapper](INSTRUMENTATION.md) observes actual successful MCP lookups and accepted, written plans with a separate private local consent file; ordinary client events cannot claim those outcomes. Normal plugin execution remains uninstrumented by default. Unknown fields reject query text, email, IP, source and private target details. Random event IDs deduplicate; browser deletion tokens are stored only as salted HMACs. Retention is30days, pruned on collection/aggregation. Local collections work independently. Failed deletion preserves its key for retry.

Reviewed reuse is a separate trusted local adapter, never a client event. Explicit `HEADSTART_TELEMETRY=1 .venv/bin/python -m services.operations.cli reviewed-references` checks the independently accepted ten reference integration records. The metric is labelled reference integrations, not user adoption; unknown remains null before activation. See [REVIEWED-REUSE.md](REVIEWED-REUSE.md).

Public catalog reads remain available during a transactional rebuild; interrupted imports roll back and previous content-addressed vector cache bytes remain available. Actual subprocess tests: `tests/test_catalog_recovery.py`. This local SQLite service is not durable production telemetry storage.

Verification: `.venv/bin/python -m unittest discover -s services/operations/tests`, `node tests/operations-ui.mjs`, and `HEADSTART_BROWSER_IMAGE=sha256:IMAGE_DIGEST .venv/bin/python -m tools.operations.check_browser`.
