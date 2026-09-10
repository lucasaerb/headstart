# Issue contract — broaden the HeadStart plugin technology bundle

Date: 10 September 2026  
Priority: P0 product-direction follow-up  
Status: Unity/Blender correction implemented; independent re-review pending; live website/bag service remains open

## User outcome

One HeadStart download should expose several useful game-development specializations rather than looking like a single catalog-search skill. A developer can select a Three.js/R3F starting project with its pinned repository and reviewed preview reference, ask for Unity-specific feasibility guidance, or assess a Blender asset workflow, while protected code delivery and editor execution remain separate actions.

## Bounded implementation

- Add `headstart-threejs-starter`, `headstart-unity` and `headstart-blender` to the existing plugin so a fresh client discovers nine HeadStart skills.
- Add a read-only `get_starting_project` MCP tool backed by the same immutable local catalog. It returns exact repository, commit, demo metadata and a reviewed public preview link when bundled.
- Bundle four preview-reference records already represented by `research/catalog/media-manifest.json`; include URLs, credit, license evidence, digest and version relation, but no image bytes. Bind the complete media-reference snapshot digest in the runtime-verified discovery manifest.
- Document Unity Technologies' official Unity MCP Server from `com.unity.ai.assistant` as the supported Unity editor connection, not an automatically enabled or HeadStart-bundled server. Record Unity's version, Cloud and trial/subscription requirements, relay/approval flow and scene/script mutation boundary. Document `vibegameengine/web-starter-kit` as blocked from vendoring because the inspected repository revision lacks a whole-project root license.
- Distinguish Unity's separately installed first-party agent-skills plugin from Unity MCP: preserve the official Claude Code and Codex references, link Unity's host-specific marketplace commands, record the inspected skills-only payload and Unity Companion License, and do not vendor it into HeadStart.
- Add HeadStart-native Blender workflow guidance while keeping `ahujasid/blender-mcp` an optional pinned community connector. Record its arbitrary-Python/safe-mode, default telemetry, minimal opt-out telemetry, external asset/model service, credential and asset-rights boundaries; do not vendor, configure or start it automatically.
- Update portable distribution requirements and install copy; bump the plugin to `0.4.0`.

## Explicit exclusions

- No live website API or automatic bag retrieval; the new tool identifies `origin=bundled_release_snapshot` and `website_live_connected=false`.
- No upstream game/starter source or image bytes in the ZIP.
- No bundled Unity AI package or relay, silent Unity editor connection, bypass of Unity's client approval, or unbounded editor mutation.
- No bundled or silently configured Blender MCP/addon, telemetry consent, arbitrary Python execution, external model/asset call or credential transfer.
- No verified-email, source export, reuse handoff, automatic remix, royalty agreement or settlement bypass.
- No claim that a source-inspected project is an isolated or integration-tested starter.

## Acceptance checks

- Plugin and skill validators pass for both manifests and all nine skills.
- MCP lifecycle exposes five tools and `get_starting_project` preserves ID/commit, repository URL, preview rights context and missing-preview honesty.
- Component IDs are rejected by the project-only tool; malformed media URLs and mismatched versions make the catalog unavailable.
- Packaged preview metadata exactly matches a `reviewed_for_catalog_display` row in the research media manifest.
- Distribution tests prove the three new skills and media reference file are required, the archive remains deterministic, and no upstream code/image payload or editor connector is introduced.
- An independent reviewer inspects the exact changed revision and records PASS or blocking findings before release claims.

## Remaining service dependencies

A live website/bag connector still needs a versioned public project/bag API, stable project and bag revisions, authentication where needed, server-side protected-action enforcement, URL/media validation, and client tests. Unity AI remains a separately installed Unity product with its own account, entitlement and approval flow; supporting an end-to-end editor workflow needs client/version tests and rollback validation. Unity's separate agent-skills plugin remains installed from Unity's marketplace under the Unity Companion License. The community Blender MCP needs explicit install/privacy consent plus target-scoped execution and rollback validation. Promoting the Three.js web starter into the archive still needs a separately approved integration contract, exact version/rights evidence and sandbox/rollback validation.
