---
name: headstart-plan
description: Create a target-specific plan for reusing a selected game capability while preserving existing systems and defining validation and rollback.
---

# Plan

Use the inspected source and target to choose the smallest workable capability boundary. Read [integration record](../../references/integration-record.md) for the portable fields. Include source commit, required files and assets, dependencies, target base state, preserved systems, adapter interfaces, tests, notices, limitations and rollback.

Prefer adapting an existing target interface to introducing a duplicate render loop or physics world. For a Three.js/R3F camera, separate follow behavior from vehicle physics, input and presentation. Cross-engine reuse requires a feasibility plan; do not present a C# or Godot rewrite as an already compatible package.

Honor authorization already given for local edits. When the user requested a plan only, return the plan and do not apply it. When the user requested the integration, proceed with authorized bounded changes once required evidence is resolved. Ask only for missing decisions that materially affect the outcome, and complete independent inspection first.

Platform-controlled source exports and reuse handoffs require verified-email identity and scope rights. Use [connected setup](../../references/connected-setup.md) only when the localhost service mode is configured. Snapshot mode denies handoffs. Never generate an anonymous protected packet or ask for a token in conversation. Preserve the prepared packet digest, bag revision, selected component versions, brief and constraints through this step; a packet is planning evidence, not source code or permission to edit. Public source links and work on sources independently supplied by the user remain distinct; follow existing local authorization and rights checks.

Follow the [local integration execution contract](../../references/local-integration-workflow.md). Record target-state and recipe drift gates before preparing an adapter. Read actual target owner files; do not infer lifecycle or physics ownership from package names.
