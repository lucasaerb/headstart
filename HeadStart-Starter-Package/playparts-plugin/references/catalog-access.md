# Catalog access

This package is a starter. No live Playparts API, MCP server or authentication endpoint is configured. Do not invent one or report a connection as active. When a future release provides catalog tools, inspect their actual schemas before using them.

Proposed read-only tool contracts:
- search_components: query, typed filters and optional target profile; returns project/component IDs, versions, reasons and readiness.
- get_component: stable ID and immutable version; returns source map, evidence, dependencies, rights and recipes.
- prepare_handoff: selected version, target profile and intent; returns a versioned packet. It performs no target writes.

If unavailable, use seed-catalog.json only as a research starting point. Browse the real repository and demo where appropriate. Report the lack of a reviewed catalog record and inspect any chosen source before reuse. Do not confuse an HTTP response with interactive demo verification. Public discovery must not require a private repository credential.
