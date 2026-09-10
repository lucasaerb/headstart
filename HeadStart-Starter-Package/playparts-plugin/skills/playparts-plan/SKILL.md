---
name: playparts-plan
description: Create a target-specific plan for reusing a selected game capability while preserving existing systems and defining validation and rollback.
---

# Plan

Use the inspected source and target to choose the smallest workable capability boundary. Read [integration record](../../references/integration-record.md) for the portable fields. Include source commit, required files and assets, dependencies, target base state, preserved systems, adapter interfaces, tests, notices, limitations and rollback.

Prefer adapting an existing target interface to introducing a duplicate render loop or physics world. For a Three.js/R3F camera, separate follow behavior from vehicle physics, input and presentation. Cross-engine reuse requires a feasibility plan; do not present a C# or Godot rewrite as an already compatible package.

Honor authorization already given for local edits. When the user requested a plan only, return the plan and do not apply it. When the user requested the integration, proceed with authorized bounded changes once required evidence is resolved. Ask only for missing decisions that materially affect the outcome, and complete independent inspection first.
