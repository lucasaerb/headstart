# HeadStart for Codex — local preview

Describe your dream game in Codex and discover real codebase starting points, pinned source paths, and honest limitations. This package contains metadata and six skills; it does not contain the games' source code.

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

Discovery needs no email or cloud service. HeadStart reads bundled catalog metadata locally. Public upstream links remain open. Platform code delivery, reuse handoffs, website bag sync and automatic integration are unavailable in this preview; verified-email access is tracked separately. The assistant may inspect or edit your local project only within your authorization.

If tools are missing, check `python3 --version` and `codex plugin list`, then open a new thread. Keep this folder while the local marketplace is configured. This is a private/local preview, not a public-directory or signed release.

## Update or remove

For an update, extract the new archive into a new permanent folder, run `codex plugin marketplace add .` from there, then run the same `codex plugin add` command and start a new thread. Do not mix files from different versions.

To uninstall:

```sh
codex plugin remove headstart-plugin@personal
```

If this archive is your only configured source for the `personal` marketplace, you can also run `codex plugin marketplace remove personal`. Leave it configured if other plugins use it.

`distribution-manifest.json` records the plugin version and SHA-256 of every payload file except itself. It detects accidental changes; it is not a publisher signature. See `plugins/headstart-plugin/README.md` for the skills and technical limits.
