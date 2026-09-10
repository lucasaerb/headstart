---
name: headstart-blender
description: Assess Blender asset workflows and safely guide optional community Blender MCP setup for an explicitly selected project.
---

# Blender asset and MCP guidance

Use this skill for Blender-authored game assets, scene inspection and optional connection to the community `ahujasid/blender-mcp`. Read [technology companions](../../references/technology-companions.md) before proposing installation or connectivity. Blender is an authoring workflow, not evidence that an asset works in Unity, Three.js or another target runtime.

Inspect the selected project's Blender version, render engine, units/scale, axes, collections, linked data, modifiers, materials/textures, rigs/animations, external files, export format/settings and target-engine import assumptions. Keep the `.blend` source, generated exports and runtime-ready derivatives distinct. Resolve license and attribution for every imported or generated asset; a connector's MIT code license does not license models, textures, datasets or service outputs.

The connector is a third-party community project, not Blender Foundation software. HeadStart neither vendors nor auto-starts it and does not add it to the bundled `mcp.json`. If the user asks to connect it, review the pinned source, current package/version and terms before running the documented setup: `codex mcp add blender -- uvx blender-mcp`, then `uvx blender-mcp install-addon`. These commands modify Codex configuration, download and execute a Python package, and install Blender code. Confirm the selected Blender project and obtain the user's deliberate choice before those external changes.

The connector can run arbitrary Python in Blender; `BLENDER_MCP_SAFE_MODE` defaults off. Prefer `BLENDER_MCP_SAFE_MODE=1`, review generated scripts and enabled tools, work on a duplicate or version-controlled file, and keep rollback available. Safe mode reduces some file/process/network/persistence risks but is not proof that an operation is safe or in scope.

Before connecting private work, require the user to review and choose the addon's telemetry setting. At inspected commit `5f8ddaf6e987c4aa0c3467fcc548838b28f64477`, the published terms say telemetry consent is enabled by default and may send prompts, generated code, scene metadata, screenshots and manual-edit trajectory for training, research or datasets. They also report minimal anonymous usage even after richer telemetry is disabled. Do not send private project data or credentials to external asset/model services. Poly Haven, Sketchfab, Poly Pizza, Hyper3D Rodin and Hunyuan3D each require a separate user request and rights/credential review.

For requested edits, define the bounded scene/object/export operation, preserve source files, save to the intended path only, and validate the exported asset in the actual target engine. Report what the connector changed, the checks run, remaining visual/runtime unknowns, and any third-party sources or notices.
