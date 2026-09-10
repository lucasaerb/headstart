# Issue delivery: coder and critical reviewer

This workflow implements the user's requested subagent loop for **every issue**, including research, design, code, and operational work. It applies to the initial backlog and all subsequent issues.

## 1. Establish the issue contract

The coordinating agent reads the issue, dependencies, `AGENTS.md`, relevant PRD sections, and existing implementation. Define a bounded outcome, acceptance checks, and evidence paths. Execute ready issues in priority order. Before dependent work, record independent reviewer evidence that the prerequisite behavior, interfaces and data it needs pass. Unrelated pending visual acceptance may remain open upstream; unresolved required behavior or interfaces still block dependent work. A partial acceptance record does not close the upstream issue. Preserve unrelated local edits and record the source revision or changed-file digest being reviewed.

For visual work, follow the [design-direction policy](design-direction.md). Existing mockups and preferred explorations are provisional until the user explicitly selects an implementation baseline. Keep presentation adaptable through design tokens and reusable components separate from domain behavior. Research, backend work and local functionality can proceed; provisional styling must be labeled and pending final visual acceptance tracked explicitly.

For application changes, use a branch/worktree when available. When agents share a checkout, designate one implementation writer and keep reviewer edits separate. Multiple issues may proceed concurrently only when their ownership and dependencies are independent.

## 2. Assign a coder/author subagent

The coder owns production-quality implementation: clear interfaces, robust error handling, accessible interactions, maintainable dependencies, appropriate tests, and accurate documentation. Research issues use this role to author structured datasets and evidence rather than invent application code.

The coder must deliver:

- Changes tied to acceptance criteria, with relevant source locations.
- Commands run and actual results; failures and untested conditions stay visible.
- Tests proportionate to risk: contract/security/behavior tests for code, source and data audits for research. Avoid tests that merely repeat the implementation.
- For UI changes, screenshots of affected desktop and mobile states, including relevant loading, empty, error, and success states. Record viewport, route, browser, data state, and revision, plus the user-selected mockup path/version and applicable screens, or an explicit provisional-reference status. Exercise interactions in a browser; screenshots alone do not establish functionality.
- For research/image work, reproducible source references, dated observations, category and link checks, and a visual contact sheet or equivalent inspection set for collected images.

## 3. Assign an independent critical reviewer subagent

The reviewer must be a distinct agent from the coder and must inspect the actual output. It must not approve solely from the coder's summary or fix its own findings and self-approve. It should run targeted checks independently where possible and inspect the test evidence and screenshots themselves.

Review these dimensions where applicable:

| Dimension | Reviewer checks |
| --- | --- |
| Product | The requested user outcome works, scope matches the issue, and PRD boundaries are preserved. |
| Code/data | Correctness, interfaces, schema/contract consistency, migration behavior, dependency cost, error handling, evidence validity, and maintainability. |
| Tests | Assertions cover meaningful behavior and failure modes; reported results correspond to the reviewed revision. |
| Design | Hierarchy, spacing, typography, image quality/crops, clarity, responsiveness, keyboard access, focus, contrast, and all affected UI states. Compare applicable desktop/mobile screenshots with the user-selected baseline before final visual acceptance; review provisional styling for usability and accessibility while recording pending visual acceptance. |
| Research | Real source/demo relationships, deduplication, representative category coverage, unknowns, licenses, image provenance, and separation of candidates from publishable records. |
| Safety/privacy | Relevant source execution, path/URL handling, rights, credential boundaries, and private data treatment. |

Return an explicit **PASS** or **CHANGES REQUESTED**, acceptance coverage, and concrete findings with severity, location, user impact, and reproduction/evidence. Classify cosmetic suggestions as nonblocking when they do not violate acceptance criteria. A missing required test or screenshot is a review gap, not a passing result. Mark screenshots “not applicable” only with a reason for nonvisual changes.

## 4. Fix and re-review

Send findings to the coder. The coder addresses each blocking item, adds or reruns relevant checks, refreshes screenshots affected by changes, and explains any disagreement with evidence. The reviewer then inspects the revised output. Repeat until all acceptance criteria pass and no blocking findings remain. Do not impose an arbitrary review-round cap or mark an issue complete because time ran out.

If credentials, access, unavailable runtime tools, or an unresolved external dependency prevents verification, keep the issue open with the exact blocker and completed evidence. Do not fabricate test outcomes, screenshot review, live connector success, or an approval.

A missing mockup selection is an open visual acceptance item, not a reason to freeze independent research, backend work or functional verification. Record passes for completed criteria separately. An issue whose final visual acceptance is still pending cannot receive an overall PASS or close; assess dependencies against their specifically required verified behavior and interfaces, and do not treat provisional styling as a selected design. The temporary scaffold in #2 has final-product mockup comparison marked N/A/deferred to #6 and #21; it can pass its own independently reviewed functional and desktop/mobile usability criteria without a final mockup selection.

## 5. Completion record

Attach or link a durable review record in the pull request or issue, using `docs/reviews/<issue-number>-<short-name>.md` when a local record is appropriate. Keep raw private captures and credentials out of commits and public evidence. Include:

```text
Issue and acceptance criteria:
Coder agent:
Reviewer agent (different from coder):
Reviewed commit / changed-file digest:
Changed files and behavior:
Checks run, environment, and actual outcomes:
Screenshots or data/image evidence (paths/URLs; N/A reason if appropriate):
Design reference: user-selected path/version and applicable screens, provisional, or N/A:
Desktop/mobile comparison, adaptations, and final visual acceptance or open item:
Review rounds, findings, and resolutions:
Final verdict: PASS | CHANGES REQUESTED
Known nonblocking limits / follow-up issues:
```

Only close the issue when implementation and independent review pass. A reviewer pass does not itself authorize deployment, publishing a private target, or unrelated external actions. Follow the user's existing scope and authorization for subsequent actions.
