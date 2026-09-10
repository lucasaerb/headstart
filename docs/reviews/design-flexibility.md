# Provisional mockup policy review

User direction: new mockups are not final; design-related issues must adapt to the selected mockup.

- Author subagent: `/root/design_flex_author`.
- Independent reviewer: `/root/design_flex_reviewer`.
- Coordinator: `/root`, responsible for the scoped AGENTS paragraph, roadmap links, and GitHub synchronization.
- Reviewed backlog SHA256: `0ea14b9c3d1e2e6b6ae98ed9730f26a04d63b04ff9eed78a01181642f8221c48`.
- Verdict: **PASS**, after two review rounds.

The reviewer confirmed removal of fixed mockup styling, selected-reference tracking for final visual review, independent desktop/mobile evidence, and preservation of all 25 issues' metadata, priority, dependency edges, and original acceptance criteria. Rights, accessibility, and the coder/reviewer loop remain required.

One blocking finding was corrected: pending final styling could have prevented the scaffold from completing and blocked backend dependencies. The scaffold now passes on its own functional/usability evidence; downstream work can use documented, independently verified functional prerequisites while unrelated visual acceptance remains open.

JSON/metadata/acceptance comparisons and whitespace checks passed. Product tests and screenshots are N/A because this task changes documentation and issue requirements only. Existing mockup artwork and unrelated concurrent working-copy changes were not modified or included in the scoped commit.
