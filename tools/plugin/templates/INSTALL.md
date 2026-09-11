# HeadStart for Codex — local preview

Describe your dream game in Codex and discover real codebase starting points, pinned source paths, and honest limitations. This package contains metadata and twelve skills, including Three.js starter selection plus Unity and Blender guidance and source-backed art, code and performance review; it does not contain the games' source code or external editor connectors.

## Install

You need Codex with `codex plugin` support and Python 3.10 or later available as `python3`. This preview is tested on macOS; Windows and Linux are not yet verified. These instructions target the Codex app/CLI, not ordinary ChatGPT conversations.

If you already have a marketplace named `personal`, resolve that name conflict before adding this one; do not replace your existing marketplace.

1. Extract the ZIP into a permanent folder, such as `headstart-plugin`. Keep the hidden `.agents` folder.
2. Open a terminal **inside that extracted folder**, then run:

   ```sh
   codex plugin marketplace add .
   codex plugin add headstart-plugin@personal
   ```

3. Start a **new Codex thread** in your game project (or an empty project for discovery). Ask:

   > Use HeadStart to find three starting points for a cozy browser game with farming, exploration and building. Explain the source paths, engine fit and unknowns.

Default snapshot discovery needs no email or cloud service. For real localhost catalog lookup and automatic retrieval of an explicitly prepared eligible system selection, follow `plugins/headstart-plugin/references/connected-setup.md`. That optional mode requires a separate running HeadStart source checkout and browser-approved local pairing; the ZIP does not include the auth service or send real email. Public upstream links remain open. Source bytes, hosted remix and royalties are not supplied. Local edits still need the user’s authorization.

If tools are missing, check `python3 --version` and `codex plugin list`, then open a new thread. Keep this folder while the local marketplace is configured. This is a private/local preview, not a public-directory or signed release.

## Update or remove

For an update, extract the new archive into a new permanent folder, run `codex plugin marketplace add .` from there, then run the same `codex plugin add` command and start a new thread. Do not mix files from different versions.

To uninstall:

```sh
codex plugin remove headstart-plugin@personal
```

If this archive is your only configured source for the `personal` marketplace, you can also run `codex plugin marketplace remove personal`. Leave it configured if other plugins use it.

`distribution-manifest.json` records the plugin version and SHA-256 of every payload file except itself. It detects accidental changes; it is not a publisher signature. See `plugins/headstart-plugin/README.md` for the skills and technical limits.

For supported-client and compatibility details, see the plugin README. The offline research snapshot uses headstart-discovery-0.1 / research-0.1; configured localhost uses headstart-catalog-api-1, selected-bag envelope 1 and headstart-handoff-1, with MCP 2025-06-18.
