---
name: headstart-threejs-starter
description: Select and assess Three.js or React Three Fiber starting projects from HeadStart's pinned catalog before creating or adapting a browser game.
---

# Three.js starter selection

Use this skill when the user wants a Three.js/R3F game starter or wants to compare existing browser-game foundations. Read [catalog access](../../references/catalog-access.md), then call `catalog_info` and search projects with the exact available Three.js or React Three Fiber runtime value. Use `get_starting_project` for the selected project so the response keeps its pinned repository, source commit, demo metadata and any reviewed preview reference together.

Treat the result as a source-inspected starting-project reference, not a vendored template or installation package. The plugin does not include `vibegameengine/web-starter-kit`: its inspected repository revision did not establish a root license for the whole starter, so copying it into a user's target remains blocked pending scope-specific rights evidence. Do not turn license terms for named dependencies into a license grant for the containing repository.

Before recommending a starting point, inspect the user's target when one is selected and apply [engine guidance](../../references/engine-guidance.md). Check Three.js/R3F versions, renderer and frame-loop ownership, physics, input, assets and cleanup. Prefer a small source-backed capability boundary over copying a whole game. Public repository and preview links are reference material; retrieving metadata or viewing an image does not authorize source or asset reuse.

When the user authorizes local implementation from an adequately licensed source, continue through Inspect, Plan, Integrate, Validate and Credit. Preserve the source commit and report untested conditions. A successful build alone does not establish gameplay behavior or a catalog-level tested integration.
