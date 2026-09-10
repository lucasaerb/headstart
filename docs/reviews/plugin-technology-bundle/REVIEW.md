# HeadStart plugin technology bundle — review record

Date: 10 September 2026  
Issue: broaden the HeadStart plugin technology bundle  
Acceptance contract: `docs/planning/plugin-technology-bundle.md`

## Roles and reviewed scope

- Coder/author agent: `/root/plugin_bundle_author`
- Unity/Blender correction author: `/root/unity_official_author`
- Independent critical reviewer: `/root/plugin_bundle_reviewer`
- Reviewed artifact: source candidate `headstart-plugin` 0.4.0
- Reviewed working tree base revision: `26cb4bb5b544afba64199f3d1dcada3e235c31f4`
- Reviewed scoped working-tree diff SHA-256: `596339b5aadbe1170c4fedbcdebcf8f358493a39e5e96c89f884b030338864a4`
- Corrected distribution SHA-256: `7a84b42681d140f9bc6a06957a237eda054477e5f81d8ed0168e25b3212a07d0` (independently reproduced twice and matches `dist/`)
- Distribution contents: 31 files and nine skills, independently confirmed
- Round-3 source hashes: `technology-companions.md` `40dff62093f6024d76ab0fdbcdfb889eaef30df3a0d2989dde02df1db4d86077`; `headstart-unity/SKILL.md` `e821bdedcd40a20a67d5438b5a9b2a6500c7fcea8e2e937880983fc5527b27ba`; distribution test `e600299b1960b83ad387d4ae6e69817409cbc0fddbe033befa975aefd31f135d`

## Changed behavior

- Added `headstart-threejs-starter`, `headstart-unity` and `headstart-blender` skills.
- Added read-only `get_starting_project` retrieval for a pinned project/repository, demo metadata and an optional reviewed preview reference.
- Added four digest-bound preview-reference records; no image bytes are included.
- Recorded Unity Technologies' official Unity AI MCP, Unity's separate first-party agent-skills plugin, the community Blender MCP and the Three.js starter candidate with their distinct installation, rights, privacy and promotion boundaries.
- Updated the deterministic portable distribution for the new skills and required references.

## Checks and outcomes

- MCP protocol/unit suite: 16/16 PASS.
- Distribution suite: independent rerun 10/10 PASS.
- Plugin validator: PASS.
- Skill validators: independent rerun 9/9 PASS.
- Repeated distribution builds: independent builds produced identical SHA-256 values shown above and matched the checked-in `dist/` archive.
- Media digest: packaged `starting-project-media.json` matches `discovery-manifest.json`.
- Archive inspection: 31 files, nine native skill manifests, no image/video/Unity/Blender payload files, and only HeadStart's offline catalog is wired in `mcp.json`.
- Upstream Unity evidence: `com.unity.ai.assistant` documentation confirms Unity 6, relay, `--mcp`, direct-client approval and mutating scene/asset/script tool boundaries. Unity's pinned agent-plugin commit `c3eea365477506c2cdd5403d2f48acd124bd5ed2` contains a Unity Companion License and a skills-only plugin payload with no hooks or MCP server.
- Upstream Blender evidence: pinned commit `5f8ddaf6e987c4aa0c3467fcc548838b28f64477` confirms the community/non-Blender status, MIT repository license, arbitrary-Python execution, safe mode off by default, `BLENDER_MCP_SAFE_MODE=1`, default-enabled rich telemetry, minimal anonymous telemetry after addon opt-out, and separate external asset/model integrations.
- KitWright audit: no product, package or planning references remain. The sole source occurrence is a negative regression assertion in `tools/plugin/test_build_distribution.py`.
- Screenshots: N/A; no UI was changed.
- Design reference: N/A; this issue changes a local plugin protocol and package only.

## Review rounds

Round 1: **CHANGES REQUESTED**.

- High: shape-valid forged preview metadata was accepted because the media file was not digest-bound.
- High: the originally selected community Unity MCP was not the Unity Technologies product the user intended.
- Medium: the Unity skill's required companion reference was not required by the distribution builder.
- Medium: `AGENTS.md` and `START-HERE.md` did not consistently distinguish verified 0.3.0 from candidate 0.4.0.

Resolution:

- Bound the complete media file SHA-256 in the discovery manifest and verify it before parsing; added a shape-valid tampering test.
- Replaced the community connector with Unity Technologies' official Unity MCP from `com.unity.ai.assistant`; documented its Unity 6, Cloud and entitlement prerequisites, relay/approval flow and mutating tool boundary without claiming it is bundled or open-source.
- Made `references/technology-companions.md` a required package artifact and added missing-file coverage.
- Updated source-of-truth inventory to distinguish installed/client-verified 0.3.0 from unverified source candidate 0.4.0.

Round 2: **PASS** on the prior eight-skill artifact. The user then corrected the intended Unity product and added Blender; that prior verdict does not cover the revised artifact.

Round 3: **CHANGES REQUESTED** after independent critical re-review.

- Medium: the acceptance contract requires exact official Claude Code and Codex links/commands for Unity's separate agent-skills plugin. `references/technology-companions.md` and `skills/headstart-unity/SKILL.md` include both official host links and the exact Codex commands, but only direct Claude Code users to documentation. Unity's official pinned README and Claude Code page specify the missing in-session commands: `/plugin marketplace add Unity-Technologies/unity-agent-plugin` followed by `/plugin install unity@unity-agent-plugin`; the README also distinguishes the terminal forms `claude plugin marketplace add ...` and `claude plugin install ...`. Add the exact Claude Code commands with their execution context, and extend the source-documentation regression test to require them.

Coder resolution independently verified: both exact in-session Claude Code slash commands are present and labeled as in-session rather than terminal commands; both distinct `claude plugin ...` terminal forms and both Codex commands are retained. The distribution regression test now requires the Claude Code execution context and both slash commands. The independently rebuilt ZIP contains all six command forms in both the companion reference and Unity skill.

Round 4: **PASS** after independent narrow re-review of the Round 3 correction.

- MCP protocol/unit suite: 16/16 PASS.
- Distribution suite: 10/10 PASS.
- Plugin validator and all nine skill validators: PASS.
- Two independent distribution builds and the checked-in archive are byte-identical at SHA-256 `7a84b42681d140f9bc6a06957a237eda054477e5f81d8ed0168e25b3212a07d0`; the archive contains 31 files and nine skills.
- Archive inspection found no KitWright text, image/video/editor payload, upstream Unity/Blender code, or external MCP wiring. `mcp.json` contains only HeadStart's offline catalog.
- Prior Unity, Blender, rights, mutation, telemetry, installation and no-vendoring boundaries remain unchanged. `prepare_handoff` remains denied, and live website/bag retrieval remains explicitly unimplemented.

All other correction-round requirements passed. The official Unity MCP is accurately separated from the agent-skills plugin and from HeadStart's offline MCP. Blender installation, mutation, safe-mode, telemetry, service and rights boundaries are explicit. No external connector is silently installed, started, wired or vendored. `prepare_handoff` remains denied, and the documents continue to state that live website/bag retrieval is unimplemented.

## Final verdict and limits

Final verdict: **PASS** for the bounded source candidate `0.4.0` and distribution identified above.

This does not establish a live HeadStart website or bag connection, verified-email handoff, source delivery, Unity editor integration, or a vendored Three.js starter. Candidate 0.4.0 still needs a fresh supported-client installation review before it can replace the client-verified 0.3.0 release.
