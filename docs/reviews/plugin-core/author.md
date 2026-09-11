# Issue 15 — connected plugin author evidence

Authors: `reuse_plugin` (package, skills, configuration and Codex client), `reuse_mcp` (setup browser validation). Dependency #14's independently accepted interface is recorded in `../reuse-batches/mcp-prerequisite.md`; final batch review is separate. **Author checks pass; this is not an independent acceptance verdict.**

Candidate: HeadStart **0.5.0**, nine skills. Final archive SHA-256 `af4f44b9367e95f44900fc5e932f18f9a3ee7ec46a4609c9dd602762dc4301fd`, 35 files. Its manifest records every payload digest. The installed client receipt includes exact runtime/skill hashes, including the strict selected-bag validator. The original 0.3.0 archive remains available for rollback. No deployment, real email delivery, source-code delivery, hosted integration or royalty implementation is claimed.

## Actual supported-client check

Codex CLI **0.154.0**, macOS, Python 3. Source contracts were checked against installed CLI help and generated experimental app-server JSON schemas (`codex app-server generate-json-schema --experimental`). [Official plugin packaging](https://developers.openai.com/plugins/build/plugins) was consulted on 10 September 2026.

A distinct disposable `headstart-review15` marketplace was scaffolded using the installed plugin-creator helper, registered with `codex plugin marketplace add`, and the candidate installed with `codex plugin add headstart-plugin@headstart-review15 --json`. The actual CLI returned its installed cache path, plugin ID and version. The existing `headstart-plugin@personal` installation was not replaced. To prevent equal MCP names resolving to the existing plugin, **only the test MCP registry key** was renamed from `headstart` to `headstart-release-test`; packaged executable and skill bytes remained unchanged and were compared to the actual installed cache. Local configuration intentionally sets nonsecret origin/file-path fields and changes the two manifest cache versions.

Reproduce after scaffolding/registering a distinct disposable test marketplace:

```sh
.venv/bin/python tools/plugin/check_codex_client.py --marketplace /absolute/disposable/marketplace --output /tmp/headstart-client-evidence.json
```

The real app-server loads a fresh thread and returns nine enabled skills, the connected candidate's version, and five actual service-mode tools. Its real `mcpServer/tool/call` calls establish:

- Public lexical search and exact component/version detail without identity; unpaired selected-bag access denied.
- A synthetic local verified account and approved bridge, with credential contents confined to a temporary private file. A prepared selection is posted through the actual Node/Python `/v1/handoffs` browser route using its session and CSRF boundary.
- Automatic `get_selected_bag {}` retrieves that account's prepared immutable revision. `prepare_handoff {}` preserves the exact source/component version, explicit brief constraint, intent and packet digest. No source URLs or bag digest were manually pasted into these tool calls.
- Missing component version, revoked pairing and stopped service return errors. Stopping the service does not substitute snapshot results.
- Explicit offline reconfiguration/reinstallation successfully retrieves the labeled 52-reference snapshot. Installing the preserved 0.3.0 archive then retrieves its real offline catalog, demonstrating package rollback.

`codex-client.json` retains sanitized actual responses, install acknowledgments and runtime/skill hashes. The account and browser verification/bridge records are synthetic test fixtures; no remote inbox or production service was involved. This is a real client/tool check, not an LLM gameplay/integration run. The website browser journey has separate actual UI coverage under `../plugin-setup/` and the handoff/auth issue evidence.

## A real client limitation fixed

Observed Codex does not automatically forward parent `HEADSTART_*` shell variables into its plugin subprocess, and arbitrary `${HEADSTART_CATALOG_ORIGIN}` in plugin `env` is not expanded. The first attempt correctly returned a configuration error rather than live success. The packaged **configure_connection.py** writes literal validated numeric-loopback origin and private credential **path**, never its contents, to the extracted plugin's `mcp.json`. It writes local manifest cache versions so re-adding cannot silently retain stale configuration. The helper never edits the user's Codex config. Offline mode deliberately removes those environment values. Instructions explicitly require the separate source checkout for auth preview/pairing, and a re-add/new-thread step for client pickup.

The helper is tested for valid setup, deterministic versioning, offline rollback, invalid origin, unsafe credential mode/symlink, absence of credential contents in output, and restoration after interrupted file replacement. Original archive checksums apply before intentional local configuration; the instructions explain changed local manifests/configuration.

## Checks and design

```sh
python3 -m unittest discover -s tools/plugin -v
python3 -m unittest discover -s HeadStart-Starter-Package/headstart-plugin/tests -v
python3 /path/to/plugin-creator/scripts/validate_plugin.py HeadStart-Starter-Package/headstart-plugin
HEADSTART_CHROME_CHANNEL=chrome node tests/plugin-setup-ui.mjs
```

Author outcomes: 13 distribution/configuration tests and 16 snapshot protocol tests pass; plugin validator passes. Actual service/MCP protocol validation is owned by #14. The setup page retains the existing pale-sky/blue typography and white panels; the C4 landing world is untouched. Desktop/mobile setup, successful service-only probe, failed/unsupported service and fallback captures are indexed in `../plugin-setup/captures.json`. No website label claims a locally installed/connected client from a download or HTTP probe. The unsupported-client Markdown/JSON fallback remains behind the real per-download auth/scope check; the anonymous Gauntlet prompt stays public metadata only.

Limits: localhost development verification does not establish hosted inbox control; anonymous research-game bags are not synchronized. The demonstrated automatic context is an explicitly prepared eligible scoped selection, not the full three-game remix target. Skills preserve the packet through planning/authorized local work but this issue does not create an integration adapter or validate gameplay. Workspace denial is an actionable preserved-plan boundary in the skills; there is no hidden permissions escalation or hosted workaround.
