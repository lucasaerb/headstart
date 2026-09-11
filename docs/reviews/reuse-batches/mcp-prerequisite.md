# Issue 14 MCP prerequisite review

Reviewer: `reuse_handoff`, distinct from MCP author `reuse_mcp`. This reviewer authored issue 13's handoff service; issue 13 itself was separately accepted by `reuse_reviewer`. This review covers only the new MCP transport/protocol adapter and its dependency interface for issue 15, not a new self-review of issue 13 and not the full five-issue batch.

Reviewed revision: `a436e854e37ba78fbf9c6d1ff691e58d4e27211c`.

## Round 1 — CHANGES REQUESTED

Independent commands from `/tmp/headstart-reuse`:

- `/tmp/headstart-mcp-client/bin/python -m unittest discover -s tests/mcp -v`: **7 passed**.
- `/tmp/headstart-mcp-client/bin/python tests/mcp/live_protocol.py`: **PASS**, official MCP Python SDK 1.26.0, negotiated 2025-06-18; actual local Node/Python server, public search/exact details/missing version, anonymous denial, approved typed MCP credential, automatic current website bag, immutable handoff, browser-parent revocation, offline structured error, unchanged target marker/files.
- Independent malformed-response probes: both integer `data.source_commit` in a public result and integer prepared handoff `digest` raised uncaught `TypeError`, rather than `ToolError`.

### Blocking finding

`live_catalog.py` validates several untrusted response fields with regex before confirming they are strings. `public()` calls `re.fullmatch(..., r['data'].get('source_commit',''))`; `call('prepare_handoff')` does the same for `result.digest`. A malformed service result containing `123` raises `TypeError`. The stdio `catalog_mcp.py` dispatcher handles only `ToolError` at that layer, and `main` does not catch `TypeError`, so this terminates the MCP process and loses subsequent requests. Likewise, an HTTP error body with `error: []` raises `AttributeError` at `value.get('error',{}).get(...)`. This violates the required honest structured error behavior for unsupported/malformed service contracts.

Required fix: validate response member types before regex/member access and map malformed data to `ToolError('unsupported_contract', ...)`; include regressions through the dispatcher or actual stdio to establish the next valid tool request still succeeds in the same session. Do not echo untrusted service errors into instruction text.

### Other inspected boundaries

Numeric loopback origins with exact port, no credentials/path/query/fragment; environment proxy disabled; redirects explicitly rejected. Public reads send no configured credential. Private credentials are opened with no-follow/nonblocking flags, must be regular owner-owned mode-0600 bounded JSON files and match exact origin/version/token shape. Typed MCP credentials are checked by the server; caller receives no source bytes and no target write interface. Version substitution is rejected for exact component details. Current bag digest and full handoff digest bind their returned data; unknown configuration does not silently fall back to bundled data. Mutating preparation is annotated as not read-only. The preceding successful SDK run establishes the actual happy path and revocation behavior, but cannot waive the malformed-response blocker.

Screenshots: not applicable to this bounded adapter review; no MCP UI was introduced. Full batch browser/design review remains separate.

Final narrow verdict: **CHANGES REQUESTED** pending author fix and independent rerun. Issue 15 should not yet rely on this adapter's malformed-response behavior.

Reviewed source digests at `a436e85`:

- `scripts/live_catalog.py`: `9cd2826c1b208a8874ad0830a8e3dfe065deab078d6ed0dd5186ade4a883a738`.
- `scripts/catalog_mcp.py`: `cfbb8542100f174bbe9b9b131cc1c498c5c02fcd2398880e522a8975f44e90d5`.


## Round 2 — narrow prerequisite PASS

Author fix: `840c4b457e187d5952b4a2927a369c9c92303cb7`. Reviewed `live_catalog.py` SHA-256: `f989fab1efdf1877808a01859f6fc5efe34eba48ed0d132c7f2522ce0c567a09`.

The author added explicit string/object checks at the identified boundaries and contains malformed external shapes as a structured `unsupported_contract` ToolError. The original protocol/transport behavior remains intact; no unrelated exceptions or error text are exposed. A new initialized-dispatcher regression independently exercises integer source commit, integer prepared digest and malformed error object, and makes a subsequent valid tool call after each failure.

Independent reruns:

- `/tmp/headstart-mcp-client/bin/python -m unittest discover -s tests/mcp -v`: **8 passed**, including same-session recovery after all reported malformed shapes.
- `/tmp/headstart-mcp-client/bin/python tests/mcp/live_protocol.py`: **PASS** against actual local services using official MCP SDK 1.26.0, including negotiation, discovery, protected automatic bag/handoff retrieval, denial and parent-session revocation, offline behavior and unchanged target files.

Final narrow verdict: **PASS** for the issue 14 transport/protocol and protected current-bag dependency interface required by issue 15. The round-1 blocker is resolved. This does not approve the separate issue-15 installed-client workflow, the full five-issue batch, a production deployment, arbitrary source execution, or a playable remix.
