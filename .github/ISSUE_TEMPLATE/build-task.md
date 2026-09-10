---
name: Build or research task
about: A bounded deliverable with independent coder/reviewer validation
title: ""
labels: ""
assignees: ""
---

## Problem and outcome

Describe the user-visible outcome and why it matters.

## Priority and dependencies

Priority: P0 / P1 / P2. Depends on: issue links or none.

## Scope and non-goals

## Acceptance criteria

- [ ] Define observable behavior, including relevant failure cases.

## Validation evidence

Name meaningful tests, source/data checks, and desktop/mobile screenshots for UI changes. Include image/source review for research. Explain if visual evidence is not applicable.

## Design reference and acceptance

For UI work, record the user-selected mockup path/version and applicable screens, or explicitly mark styling provisional. All existing mockups and preferred explorations remain provisional until the user selects an implementation baseline. Keep presentation adaptable with design tokens and reusable components separate from domain behavior. Final visual acceptance requires independent desktop/mobile comparison with the selected reference; missing selection stays an open visual item while independent research, backend and functional work proceeds. Preserve accessibility, behavior and evidence requirements. Follow the [design-direction policy](https://github.com/lucasaerb/headstart/blob/main/docs/design-direction.md).

## Required coder/reviewer loop

- [ ] A coder/author subagent implements the issue and records actual evidence.
- [ ] A separate critical reviewer subagent independently inspects output, tests, and applicable screenshots/design.
- [ ] Findings return to the coder; corrections and re-review repeat until acceptance passes.
- [ ] Record reviewed revision, agents, review rounds, final PASS, and remaining nonblocking limits before closing.

Follow [the development workflow](https://github.com/lucasaerb/headstart/blob/main/docs/development-workflow.md).

## PRD references
