---
name: playparts-find
description: Find game codebase starting points and source-inspected building blocks for a dream game using HeadStart's local catalog, with runtime fit, evidence and honest reuse limits.
---

# Find a head start

Turn the user's game idea into a useful starting point inside their current coding conversation. Read [catalog access](../../references/catalog-access.md) for the real tool contracts and limitations. Call `catalog_info` to establish connection and available exact filters; then search and inspect actual results. The catalog is research metadata, not a collection of ready-to-install code packages.

Infer a small editable brief from the request: desired experience, style, target device/runtime, important systems and scope. Preserve explicit constraints. Ask only when a missing decision materially changes the search; otherwise state the assumption and show useful results immediately. Do not demand a long questionnaire. Use [ontology](../../references/ontology.md) only when a term needs clarification.

Break a dream-game sentence into short searches for its core loop and individual systems. Search projects for starting codebases and components for focused capabilities; use `get_component` with the exact returned ID/commit for promising results. Runtime, platform, code-license and readiness constraints must remain explicit. Do not silently swap Three.js for a native engine or infer tested compatibility from a name. Offer any broader search visibly when no match fits.

Normally present two or three concrete alternatives: game/title and upstream source link, why it fits this brief, specific inspected files or systems, demo type/link, and the tradeoff or missing evidence. Distinguish fact from your editorial recommendation. Keep the first response concise; let the user explore details in the same conversation. Do not use popularity, decorative screenshots or unmeasured performance as a universal quality score. Explain that combining candidates remains an untested proposal.

Keep selected IDs, commits, intended scope and the brief in conversation for later inspection. Platform handoff/code exports are unavailable until verified-email and scope-rights services exist; never simulate login, download, website-bag retrieval or installation success. Public upstream links stay open. If the user independently supplies or selects a local target/source for authorized inspection, continue with Inspect and preserve its instructions. Local inspection is distinct from a platform export and does not authorize writes.
