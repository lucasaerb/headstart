# Issue 28 independent review

Verdict: **PASS** for the bounded local plugin discovery issue. This does not close issues 14/15 or establish authenticated handoff, website bag transfer, automatic integration or royalty services.

Authors: `/root/plugin_builder` (plugin), separate packaging builder coordinated by `/root`. Independent reviewer: `/root/plugin_reviewer`.

Reviewed source distribution: version 0.2.0, 26 files, SHA-256 `3ff187957bc424279572a2aa2913cce8a9ba89741ac48ce5a690ef6f4c43cc18`. See `reviewed-distribution.json`. This archive was independently rebuilt from the final source. The actual installed client used version `0.2.0+codex.20260910193350`: its two manifest version cachebusters differ intentionally; final source README additionally clarifies source-only development commands. All executable code, skills and catalog bytes match the tested installed copy. Installed file hashes are in `codex-client-review.json`.

## Checks and actual evidence

- macOS, Python 3, Codex CLI 0.154.0. Research prerequisite revalidated: 43 records, 12 image files and 22 existing tests passed before implementation.
- Independent package runs: 11 real-subprocess MCP tests and seven distribution tests passed, with ResourceWarning treated as an error. Official local Codex plugin validator passed.
- Fresh Codex app-server discovered all six enabled skills and connected `headstart-catalog`, listing all four tools. Real `mcpServer/tool/call` retrieved catalog information (39 projects, 79 blocks), browser racing candidates, camera components and exact-commit detail. Integration-tested filter returned zero without relaxation. Handoff and forged verification requests failed closed. The actual client resolved `${PLUGIN_ROOT}`. See `codex-client-review.json`.
- Protocol tests exercised malformed/oversized requests, initialization, negotiation, unknown tools, exact filters, pagination, missing versions, absent/corrupt/valid-hash malformed snapshots, relocation and unchanged package files. Distribution tests covered determinism, checksums, omissions, symlinks, limits and atomic preservation on failure.
- Root ran a real fresh Codex agent in an empty `/tmp/headstart-plugin-dream-game` workspace with `codex exec`, read-only sandbox and no requested target writes. Exit 0. Reviewer independently inspected the actual answer and relevant completed skill-read/tool events, preserved in `dream-game-answer.md` and `dream-game-client-events.json`.

Exact agent prompt:

> Use the installed playparts-find skill from HeadStart. I want to make a small 3D browser racing game with a chase camera. Find two or three real codebase starting points, compare them briefly, and show the exact relevant source paths. Only discover and explain; do not download code or edit any files.

The response leads with a recommendation, compares Poimandres Racing Game and Ecctrl, provides four pinned paths, identifies the missing chase-follow evidence, distinguishes toolkit from game and incompatible physics/runtime stacks, and keeps license/asset/demo/integration unknowns explicit. It makes no fabricated installation, play or integration claim. No long questionnaire or website detour was required. Live GitHub verification was unavailable and disclosed; local discovery still worked.

## Review fixes

1. Blocking: path-only component IDs collided when distinct capabilities shared one file, making the valid bundle unavailable. Builder switched to path/name/category identity; actual catalog now loads 79 blocks.
2. Blocking: valid-hash malformed snapshots could crash or silently overwrite identity. Builder added bounded nested validation, duplicate checks, unsafe URL/path rejection, pinned evidence checks and anti-promotion checks; rejection tests pass.
3. Blocking documentation mismatch: extracted package README advertised omitted maintainer tests/scripts. Builder scoped them explicitly to a source checkout; final README inspected.

## Design and limits

Screenshots: **not applicable**. Issue 28 adds no website UI; reviewed actual Codex text interaction, installation instructions and protocol output for hierarchy, clarity and simplicity. Existing frontend design work is outside this verdict.

This is a private/local metadata preview. macOS client behavior is verified; Linux/Windows are documented as unverified. The bundled snapshot is offline; 39 link-only references exclude four unresolved-rights candidates. Source-inspected records are not integration-tested, and no game source is shipped. Email identity, source delivery, shared production API, website-to-agent bag sync, signed/public release and actual remix workflows remain explicitly unavailable. The marketplace install instructions preserve an existing conflicting marketplace rather than overwriting it; a more streamlined public distribution is future work.
