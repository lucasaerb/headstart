# Operations author checkpoint

Issue #20 adds the C4-aligned secondary health/privacy page and curator aggregate view, exact API routes/static allowlists, explicit local CLI, source-monitor scheduling state and immutable interactive reports. The homepage adds only a footer link and optional instrumentation. The original C4/C2 design artifacts remain unchanged; their exact digests are recorded in ../recipes-recommendations/author.md. Actual desktop/mobile health captures were inspected for typography, spacing, readable stale/unchecked separation and no horizontal overflow.

Actual evidence:

- `browser.json`: real pinned Docker browser, network disabled, first-party controlled HTML only. A click changes the counter, a private resource is denied, and a wrong expected result fails. This does not claim any external catalog game was played.
- `captures/`: actual local HTTP health/privacy flows, stale broken fixture, separate unchecked interaction, optional consent and denied curator access. The browser suite also verifies an actual curator session, aggregate response, server event collection/deletion and service error states at desktop/mobile sizes.
- Operations unit suite covers source/license candidate continuity, retries, concurrent queue claims, privacy/retention/dedup, strict broker URL/DNS/redirect bounds, report matching, weekly stale state and accepted reference reuse.
- Parent's `eee9a10` repairs migration writes blocking read requests during rebuild. Real subprocess interruption and concurrent published-search tests are in `services/operations/tests/test_catalog_recovery.py`.

Local operations are available; production cron and durable hosted telemetry storage are not configured. An optional checkout-only wrapper now observes successful real MCP lookups and accepted, written local plans, with separate private local consent/deletion and focused actual workflow tests; the default packaged plugin remains uninstrumented. Failed actions and ordinary client assertions cannot increment these outcomes. Verified metrics count independently reviewed reference integrations, not adoption by users. URL queries are explicitly unsupported by the bounded broker. Hash-checked local reports are not externally authenticated attestations.

Independent review is required before issue acceptance.
