# Local catalog operations — independent foundation

Issue #20 work is staged here. It is not yet wired into HTTP routes, public browsing, MCP, scheduled jobs or an operations screen. No production cron or telemetry collection is enabled.

`events.py` accepts a fixed interaction vocabulary: search, detail, demo, public source visit, handoff, plugin lookup, first plan and self-reported reuse. A caller must enable collection and supply an explicit boolean opt-in. Demo email collection is separate and does not confer telemetry consent. Unknown fields are rejected without storing them. Queries, emails, IPs, user agents, source code, target paths, credentials and captures have no storage field. Optional catalog IDs must belong to the caller's public catalog allowlist.

A browser-generated random 32-byte deletion token is HMACed with a local database salt. Only that pseudonymous digest is stored. It permits deletion without storing identity; possession permits deleting those events. There is no cross-device identity or claim that browser tokens count unique developers. The event ID is also a random 32-byte token and makes retries idempotent. Reusing an ID with changed content is rejected. Events expire after 30 days and are pruned during collection or aggregation. Local collections must remain independent of whether this optional service is enabled. Database access must stay private; future API wiring must never expose event rows or the salt.

Verified reuse is deliberately not accepted as a client event. Its metric currently remains null with an explicit unavailable-adapter status. Activation requires the independently accepted #17 evidence contract; downloads, plans, self-reports and passing builds do not establish verified reuse. Production consent UI, server rate limits, durable storage configuration and scheduled retention are not implemented by this module.

```sh
.venv/bin/python -m unittest discover -s services/operations/tests -v
```
