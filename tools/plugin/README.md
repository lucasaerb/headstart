# Portable plugin distribution

From the repository root, with Python 3.10+:

```sh
python3 tools/plugin/build_distribution.py
python3 -m unittest discover -s tools/plugin -p 'test_*.py' -v
```

The default output is `dist/headstart-plugin/headstart-plugin.zip` (ignored build output). The command reports archive SHA-256, package version and file count. Extract into a new directory; no extraction or installation is performed by the builder. The archive includes installation instructions and a per-file checksum manifest. The same inputs produce identical ZIP bytes: sorted entries, fixed timestamps and permissions, no compression implementation variability. The manifest intentionally excludes its own hash; the outer ZIP digest covers it.

The payload uses an allowlist: manifest/MCP configuration, README/license, skills, JSON/Markdown references and the two runtime Python scripts. It includes only reviewed link metadata for starting-project previews, never upstream image bytes or game source. Source-only tests, snapshot refresh helpers, caches and dotfiles such as `.env` are excluded. Symlinks anywhere under the plugin source are rejected. This is a build from trusted first-party package files, not a sanitizer for hostile source trees or arbitrary secrets embedded in approved files. Per-file and aggregate limits bound the output. A failed build leaves the previous archive intact; publication atomically replaces only the named ZIP and never removes caller directories.

The marketplace template was created with the installed plugin-creator skill's `create_basic_plugin.py`, using explicit repository-distribution paths and its default `personal` name. It is copied unchanged, not mutated by the build. The ZIP has its own explicit local marketplace root; it does not write to the user's default personal marketplace. If a consumer already has a marketplace called `personal`, resolve that naming conflict before installation instead of replacing their existing marketplace.

Codex command syntax was checked against the installed CLI's `plugin add`, `remove`, and `marketplace add/remove --help`. Actual installation/client evidence belongs in `docs/reviews/plugin-discovery/`; packaging tests alone do not prove client loading, model behavior or cross-platform compatibility. This is a private/local unsigned preview, not public directory submission.
