# HeadStart for Codex

Describe your dream game and find real codebase starting points without leaving your coding conversation. Version **0.5.0** combines nine skills with a local MCP catalog: **52 research references and 105 source-inspected building blocks**, including immutable source links, inspected paths and reuse limitations.

## Start here

Use the **top-level README in the portable HeadStart ZIP** to install its local marketplace and add `headstart-plugin`. The package, MCP server and all nine skill identifiers use HeadStart. Installation is a local Codex workflow; this package is not a public ChatGPT directory listing. Python **3.10 or newer** must be available as `python3` to the Codex process. No API key, server hosting or Python packages are needed for discovery.

Start a new Codex thread after adding the plugin. Try:

> Use headstart-find. I want a browser exploration game with a third-person camera and procedural terrain. Find a few real starting points and explain the tradeoffs.

The agent should first call `catalog_info`, search the actual snapshot, and show a small comparison with source links and inspected files. A successful tool response establishes the local connection. Reading this README or adding the package alone does not establish that connection.

For developers working from this repository, `tools/plugin/README.md` at the repository root documents the portable distribution build and install checks. That tooling is outside this plugin directory; the generated archive carries its own install instructions.

## Connect your local website selection

The default install stays offline. To use the local HeadStart website, follow [connected setup](references/connected-setup.md). The explicit localhost mode supports real catalog queries and automatically retrieves your account’s most recently prepared eligible system selection, including exact versions, brief and constraints. Anonymous research-game bags are not synchronized. Authentication uses the development preview and browser-approved local credential bridge; hosted email delivery is not available.

## What works

- **Find:** turn an idea into project/system searches and evidence-based comparisons.
- **Three.js starter:** select source-inspected Three.js/R3F starting projects and retain their exact repository, revision and reviewed preview reference when available.
- **Unity:** inspect Unity project fit and guide an explicitly requested connection to Unity Technologies' official Unity AI MCP without enabling editor control by default.
- **Blender:** assess asset-authoring/export fit and guide an explicitly requested, safety- and telemetry-reviewed connection to the third-party Blender MCP.
- **Inspect:** inspect the chosen source and an explicitly selected target workspace.
- **Plan / Integrate / Validate / Credit:** guide the host coding agent through authorized local work, actual checks and preserved notices. These are skill instructions, not a hosted execution service or pretested integration adapters.
- **Local MCP:** `catalog_info`, `search_components`, `get_component`, `get_starting_project`; pinned versions, bounded pagination and exact filters. `prepare_handoff` fails closed in snapshot mode. The explicitly configured localhost mode offers `get_selected_bag` and protected `prepare_handoff`; see connected setup. See [catalog access](references/catalog-access.md).

In default snapshot mode the MCP process reads only bundled metadata and makes no network requests. In explicitly configured localhost mode it calls the local service and may record a private planning handoff after browser-approved authentication. Neither mode reads or writes a target project. It includes no upstream game code or image bytes. Four starting-project records include reviewed public preview links and rights context; other projects return an explicit missing-preview state. Discovery is open; public repository and external demo links are available. Demo launch, source downloads and local work—when requested separately—use the host agent's existing capabilities and permissions.

## Honest limits

The default discovery catalog is an offline research snapshot. Source-inspected does not mean extracted, integration-tested, currently playable or cleared for code/asset reuse. Twenty candidates without completed scope review are excluded. Each result carries its own rights caveats and source commit; repository license filtering does not clear selected files or assets. Catalog, media-reference source and review SHA-256 values in [the manifest](references/discovery-manifest.json) bind the local release inputs, but are not a cryptographic publisher signature.

`prepare_handoff` is denied in snapshot mode. Configured localhost mode requires the approved credential and revalidates scope rights before returning a metadata-and-notices planning packet, never source bytes. There is no hosted sign-in, production website synchronization, source-code remixing or royalty service. Snapshot-backed `get_starting_project` is not a live website fetch. A user-provided list is not automatic bag retrieval. Public source links and independently authorized work on user-selected local sources remain separate.

The download does not vendor `vibegameengine/web-starter-kit` because the inspected revision did not establish a root license for the whole starter. Unity editor connectivity uses Unity Technologies' official Unity MCP Server, supplied through the separately installed `com.unity.ai.assistant` package; Unity's separate official agent plugin supplies skills only. Neither is bundled by HeadStart. The community Blender MCP is also not bundled or auto-started: it can execute arbitrary Python, safe mode defaults off, and its published terms describe default-enabled rich telemetry plus minimal anonymous usage after opt-out. See [technology companions](references/technology-companions.md) for setup, rights, privacy and execution boundaries.

## Troubleshooting and development

If the tools are absent, confirm the package was added using the distribution instructions and start a new thread. If Python cannot launch, make `python3` available to Codex and retry. A missing, modified or incompatible catalog returns `catalog_unavailable`: reinstall the same release; do not replace it with the historical seed fixture. Snapshot discovery works offline; external demos/source pages may be unavailable. Configured localhost failure never silently switches to snapshot data: restart the service or explicitly remove the connection settings and start a new thread for research-only discovery.

Maintainers working in the **source checkout only** can run the protocol suite from this plugin directory (tests and the snapshot builder are omitted from the portable archive):

```sh
python3 -W error::ResourceWarning -m unittest discover -s tests -v
```

Run the selected-target manifest helper only for a workspace the user selected:

```sh
python3 scripts/inspect_project.py /path/to/selected/game
```

It is read-only and does not execute project code or prove complete architecture/license compatibility. For maintainer-only research updates in the source checkout, run `scripts/bundle_catalog.py` with the explicit research directory. Rebuild and independently review the archive after updating source data. Preserve prior versioned archives for rollback; the distribution README describes removing/re-adding the plugin.

The portable `plugin.json` and `mcp.json` follow Agent Plugins 1.0.0. `.codex-plugin/plugin.json` retains the Codex presentation fallback. The MCP wire contract is **2025-06-18**, discovery snapshot contract **headstart-discovery-0.1**, research source contract **research-0.1**. Older schema/seed files are retained historical fixtures, not connected production data.

Packaging and transport references: [OpenAI plugin packaging](https://developers.openai.com/plugins/build/plugins), [MCP stdio transport](https://modelcontextprotocol.io/specification/2025-06-18/basic/transports), [MCP lifecycle](https://modelcontextprotocol.io/specification/2025-06-18/basic/lifecycle). Supported client evidence is recorded with the release; do not assume cloud ChatGPT hosts a local Python process.

The packaged `configure_connection.py` helper intentionally updates only this extracted plugin’s MCP configuration and two local manifest versions. It never opens the credential contents, edits the user’s Codex configuration, or confirms installation. Codex re-add/new-thread steps remain explicit.


## Candidate 0.6 review skills

The working candidate contains twelve skills, adding Art Direction, Performance Review and Code Review. They use the shared versioned review rubric and the same pinned local integration context. `scripts/integration_review_context.py` reads the actual plan and packet without target edits; `scripts/review_evidence.py` checks real raw BenchmarkRun samples and compatible profiles. Neither helper invents profiler output, authorizes changes or attests successful reuse. The local integration reference remains a separate repository checkout; read `references/local-integration-workflow.md`. Release/client acceptance evidence must match this candidate before its download is promoted.
