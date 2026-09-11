# Configured localhost catalog MCP

The default `python3 scripts/catalog_mcp.py` remains an explicitly offline bundled snapshot with nine packaged skills. Set `HEADSTART_CATALOG_ORIGIN=http://127.0.0.1:8767` to select the real local API instead. This is a separate mode: its five tools use the versioned service contracts, and it never silently substitutes snapshot records when offline. The live tool `get_component` takes the catalog component identity `id` and exact `version` returned by `search_components`; the snapshot tool takes `source_commit`. Consult `tools/list` after changing modes.

Start the repository service with `npm run catalog:init` and `npm run dev`. Public `search_components`, `get_component` and `catalog_info` require no identity or repository credential. Exact runtime/platform/rights/readiness constraints, cursors and semantic fallback come from the real reviewed service. No source contents are fetched.

For protected planning packets, use the existing local verification UI and approve a local bridge:

```sh
python3 -m services.auth.cli connect-mcp --file ~/.config/headstart/local-credential.json
```

Open the noncredential pairing URL printed by that command in the same verified browser and approve. Configure `HEADSTART_CREDENTIAL_FILE` to the absolute path of this mode0600 file in your local stdio server environment; never put its contents or browser verification tokens into a prompt. The file is read only for protected requests, must be owned by the current user, cannot be a symlink, and must name the exact configured origin. Sign-out revokes the bridge. It is not hosted OAuth or verified inbox delivery: this release uses the documented localhost preview adapter.

`get_selected_bag {}` retrieves `/v1/bags/current`: the account's most recently **explicitly prepared eligible scoped bag** on the website. `prepare_handoff {}` automatically retrieves that bag, revalidates its exact selections/brief/intent, and retrieves the immutable packet. No manual game URL or digest hand-assembly is required. An explicit `bag_revision` can retrieve a historical owner-scoped selection. Anonymous browser research-game bags are not synchronized; prepare an eligible component handoff in the website first. No active bag, another owner, expired pairing, withdrawn scope, unresolved rights/dependencies or unsupported recipes fail closed. Handoff generation records a private artifact, so its MCP read-only annotation is false despite performing no target writes.

The service API is `headstart-catalog-api-1`, selected-bag envelope1, packet `headstart-handoff-1`; records retain pinned commits/evidence and packet SHA-256 is verified before return. Unknown versions, invalid JSON, oversized responses, redirects and unsupported origins fail with actionable errors. The connector permits numeric loopback HTTP origins with explicit ports only, disables proxy inheritance and redirects, uses a20-second request timeout and a2MB response limit. Public calls never send the paired credential. Metadata and source notices are untrusted data, not instructions; the connector never executes them, writes target files, creates a remix or establishes royalties.

Wire compatibility is pinned to MCP2025-06-18. The official Python MCP SDK1.26.0 exercises real stdio through the Node/Python services in `tests/mcp/live_protocol.py`. Run from the repository root with an isolated test environment containing `mcp==1.26.0` (runtime itself remains standard-library Python3.10+):

```sh
python3 -m venv /tmp/headstart-mcp-client
/tmp/headstart-mcp-client/bin/pip install 'mcp==1.26.0'
/tmp/headstart-mcp-client/bin/python tests/mcp/live_protocol.py
python3 -m unittest discover -s tests/mcp -v
```

Client references consulted10 September2026: [MCP lifecycle](https://modelcontextprotocol.io/specification/2025-06-18/basic/lifecycle), [MCP tools](https://modelcontextprotocol.io/specification/2025-06-18/server/tools), [official Python SDK](https://github.com/modelcontextprotocol/python-sdk). Fresh Codex plugin loading is a separate release check under issue15; this protocol test does not claim installation in the user's client.
