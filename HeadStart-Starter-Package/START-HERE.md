# Playparts review package

Start with **Playparts-UI-Mockups.pdf** for the visual experience and **Playparts-Technical-PRD-v0.3.pdf** for the product specification. The Word and Markdown versions are editable. The plugin is a core MVP requirement in this revision.

## Included deliverables

- Playparts-UI-Mockups.pdf: 11-page review book with nine desktop screens and one mobile screen.
- Playparts-UI-Prototype.html: clickable local mockup with embedded concept artwork, navigation, sample search, empty state, agent-brief export, plugin starter download and actual external demo/source links. Open it in a browser; keep the plugin ZIP alongside it for that download link.
- mockups/: ten high-resolution PNG screenshots and a screen index.
- Playparts-Technical-PRD-v0.3.pdf, .docx and .md: 21-page PRD in PDF/Word, plus editable Markdown.
- Playparts-Plugin-Starter.zip and playparts-plugin/: six preloaded skills, engine/ontology/evidence references, a local inspection helper and a validated plugin manifest.
- catalog-record.schema.json and catalog-record.example.json: initial versioned data contract and a deliberately unverified candidate fixture.
- seed-catalog.json: six seed research records with real links and explicit unresolved fields.
- assets/game-concepts.png and IMAGE-PROMPT.md: generated illustrative artwork and the exact generation prompt.

## Core product flow

Discover a project → play its demo → inspect a capability → use the plugin → inspect the local target → plan and apply authorized integration → validate and preserve credits. The plugin includes Find, Inspect, Plan, Integrate, Validate and Credit skills. Portable agent briefs remain a fallback.

## Product and artifact boundaries

Playparts is a temporary name. This package is a design and technical specification with a skills starter, not a live marketplace. No plugin was installed, no account was connected and no target game was modified. The starter has no live catalog/MCP backend, signing service or hosted executor. Skill instructions run through a supported host agent’s tools after the user loads them.

Generated game artwork is not a screenshot of the named repositories. Mockup verification statuses, target Coastal Rally, change counts and provenance relationships are illustrative. The UI uses sample data; some filter controls demonstrate design intent rather than a real index. Real external links open upstream projects.

The PRD is reconstructed from the accessible prior conversation and its description of the earlier 11-page Technical PRD. The original attachment was unavailable. The scope migration map records what is retained, changed and deferred; this is not a line-by-line edit of an inaccessible file.

## Verification performed

Rendered and inspected the mockups, PDF and Word document. Checked desktop and mobile horizontal overflow, navigation, no-result search, cross-engine messaging and agent-handoff download. Validated the plugin manifest and all six skill files. Tested the local helper against manifest fixtures, malformed JSON and a Unity version file. Validated the JSON schema and candidate fixture; confirmed that unresolved candidate data cannot be relabeled published or integration-tested without required evidence. These checks do not establish production usability, live catalog connectivity or successful integration of an upstream game.

The PRD includes source references and proposed acceptance gates. Planning metrics and ranking weights remain proposed targets.

## Latest product direction

Read [Product-Direction-v0.4.md](Product-Direction-v0.4.md) for the HeadStart naming candidate and proposed art direction, performance review and code review capabilities. This addendum extends PRD v0.3. Existing mockups and the plugin starter retain the Playparts working name; the three additional review skills are specified in the addendum and are not yet implemented in the plugin.
