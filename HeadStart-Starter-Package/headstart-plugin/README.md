# HeadStart for Codex

Describe your dream game and find real codebase starting points without leaving your coding conversation. Version **0.3.0** combines six skills with a local MCP catalog: **52 research references and 105 source-inspected building blocks**, including immutable source links, inspected paths and reuse limitations.

## Start here

Use the **top-level README in the portable HeadStart ZIP** to install its local marketplace and add `headstart-plugin`. The package, MCP server and all six skill identifiers now use HeadStart. Installation is a local Codex workflow; this package is not a public ChatGPT directory listing. Python **3.10 or newer** must be available as `python3` to the Codex process. No API key, server hosting or Python packages are needed for discovery.

Start a new Codex thread after adding the plugin. Try:

> Use headstart-find. I want a browser exploration game with a third-person camera and procedural terrain. Find a few real starting points and explain the tradeoffs.

The agent should first call `catalog_info`, search the actual snapshot, and show a small comparison with source links and inspected files. A successful tool response establishes the local connection. Reading this README or adding the package alone does not establish that connection.

For developers working from this repository, `tools/plugin/README.md` at the repository root documents the portable distribution build and install checks. That tooling is outside this plugin directory; the generated archive carries its own install instructions.

## What works

- **Find:** turn an idea into project/system searches and evidence-based comparisons.
- **Inspect:** inspect the chosen source and an explicitly selected target workspace.
- **Plan / Integrate / Validate / Credit:** guide the host coding agent through authorized local work, actual checks and preserved notices. These are skill instructions, not a hosted execution service or pretested integration adapters.
- **Local MCP:** `catalog_info`, `search_components`, `get_component`; pinned versions, bounded pagination and exact filters. See [catalog access](references/catalog-access.md).

The MCP process reads only bundled metadata. It makes no network requests, reads no target project and writes no files. It includes no upstream game code or images. Discovery is open; public repository and external demo links are available. Demo launch, source downloads and local work—when requested separately—use the host agent's existing capabilities and permissions.

## Honest limits

This is an offline research snapshot. Source-inspected does not mean extracted, integration-tested, currently playable or cleared for code/asset reuse. Twenty candidates without completed scope review are excluded. Each result carries its own rights caveats and source commit; repository license filtering does not clear selected files or assets. Source and review SHA-256 values in [the manifest](references/discovery-manifest.json) identify the input snapshot, not a cryptographic publisher signature.

`prepare_handoff` always returns an actionable denial: verified-email identity and scope-rights services are not implemented. There is no email collection, login URL, code export or portable code-packet fallback in this release. Website bag synchronization, source-code remixing and royalty services are also unimplemented. A user-provided list is not automatic bag retrieval. Public source links and independently authorized work on user-selected local sources remain separate.

## Troubleshooting and development

If the tools are absent, confirm the package was added using the distribution instructions and start a new thread. If Python cannot launch, make `python3` available to Codex and retry. A missing, modified or incompatible catalog returns `catalog_unavailable`: reinstall the same release; do not replace it with the historical seed fixture. The server runs offline, so lost network connectivity does not stop local metadata search, but external demos/source pages may be unavailable.

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
