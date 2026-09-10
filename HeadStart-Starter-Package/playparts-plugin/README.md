# Playparts plugin starter

A downloadable Codex-compatible skills package for the Playparts product concept. It contains six usable skill instructions, game-development references, a research seed catalog and a local project-inspection helper. It has not been installed automatically.

The package manifest follows the local Codex plugin contract. Installation depends on the host's supported local-plugin workflow; no live marketplace entry is registered by this deliverable. This source package is for review and development. A published MVP needs a tested client install flow, real read-only catalog connector, signing/update workflow and end-to-end integration evaluation.

## Included skills

- playparts-find
- playparts-inspect
- playparts-plan
- playparts-integrate
- playparts-validate
- playparts-credit

After loading the package in a supported agent, request a skill by its name or ask for the matching workflow. Example: “Use playparts-inspect to inspect this game and assess whether the selected camera can fit it.” Skill instructions use the host agent's tools; they are not a standalone autonomous executor.

## What is intentionally absent

There is no live MCP endpoint, catalog backend, repository-write service, install hook, credentials or hosted executor. The bundled catalog is research data with unresolved source revisions. The starter must not report a candidate as integration-ready. No source code from the linked game repositories is redistributed in this package.

## Local helper

Run `python3 scripts/inspect_project.py /path/to/selected/game` to summarize known manifests. This reads bounded known files and prints JSON. It does not execute the target, change files, search credentials or establish complete architecture or licensing. Inspect relevant source afterward.

## Versioning

Starter plugin 0.1.0. Catalog record schema 0.1. Ontology 0.1. Keep versions in integration reports. The accompanying Technical PRD v0.3 describes the production requirements and acceptance gates.
