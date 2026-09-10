# Prioritized build backlog

Start with [issue #1: example-game research](https://github.com/lucasaerb/headstart/issues/1). The numbers below define the intended build sequence; dependencies link the actual prerequisites. Independent work may proceed when prerequisites and review ownership allow it.

P0 establishes the research, local discovery and real plugin reuse workflow. P1 completes expert guidance and release quality. P2 is deferred and does not block localhost. Vercel is the intended website host; Railway is optional only for demonstrated backend requirements.

Every issue requires a coder/author subagent, a separate critical reviewer, meaningful evidence, fixes and re-review until an explicit PASS. UI work includes desktop/mobile screenshot inspection and design critique. See [the workflow](../development-workflow.md).

**Selected design: C4 living world.** The user selected C4 and the related C screens on 10 September 2026. Follow [the final storyboard](../design/C4-FINAL-STORYBOARD.md), [design-conformance issue #26](https://github.com/lucasaerb/headstart/issues/26), and [design-direction policy](../design-direction.md). C4b is the requested refinement and C14 drafts the continuation. Final implementation acceptance compares actual desktop/mobile states with exact reference digests; mockups do not establish live services.

| Order | Priority | Issue | Depends on |
| --- | --- | --- | --- |
| 01 | P0 | [01 · Research the example-game database, real previews, categories and source links](https://github.com/lucasaerb/headstart/issues/1) | — |
| 02 | P0 | [02 · Establish a reproducible localhost application and engineering checks](https://github.com/lucasaerb/headstart/issues/2) | [#1](https://github.com/lucasaerb/headstart/issues/1) |
| 03 | P0 | [03 · Define versioned catalog, ontology, brief and evidence contracts](https://github.com/lucasaerb/headstart/issues/3) | [#1](https://github.com/lucasaerb/headstart/issues/1), [#2](https://github.com/lucasaerb/headstart/issues/2) |
| 04 | P0 | [04 · Persist reviewed catalog data with enforced publication and rights gates](https://github.com/lucasaerb/headstart/issues/4) | [#3](https://github.com/lucasaerb/headstart/issues/3) |
| 05 | P0 | [05 · Serve the reviewed catalog and exact filtered lexical search](https://github.com/lucasaerb/headstart/issues/5) | [#4](https://github.com/lucasaerb/headstart/issues/4) |
| 06 | P0 | [06 · Build responsive visual discovery with real game previews and capability filters](https://github.com/lucasaerb/headstart/issues/6) | [#5](https://github.com/lucasaerb/headstart/issues/5) |
| 07 | P0 | [07 · Create source-backed detail pages, capability tours and honest demo launch](https://github.com/lucasaerb/headstart/issues/7) | [#6](https://github.com/lucasaerb/headstart/issues/6) |
| 08 | P0 | [08 · Add an editable game brief and local saved comparisons](https://github.com/lucasaerb/headstart/issues/8) | [#7](https://github.com/lucasaerb/headstart/issues/7), [#3](https://github.com/lucasaerb/headstart/issues/3) |
| 09 | P0 | [09 · Build bounded source intake and static inspection jobs](https://github.com/lucasaerb/headstart/issues/9) | [#4](https://github.com/lucasaerb/headstart/issues/4) |
| 10 | P0 | [10 · Curate source maps and rights for the first 30 reusable capabilities](https://github.com/lucasaerb/headstart/issues/10) | [#9](https://github.com/lucasaerb/headstart/issues/9) |
| 11 | P0 | [11 · Add semantic intent retrieval and a held-out search quality suite](https://github.com/lucasaerb/headstart/issues/11) | [#5](https://github.com/lucasaerb/headstart/issues/5), [#8](https://github.com/lucasaerb/headstart/issues/8) |
| 12 | P0 | [12 · Implement versioned submissions, curator review and rights corrections](https://github.com/lucasaerb/headstart/issues/12) | [#9](https://github.com/lucasaerb/headstart/issues/9), [#7](https://github.com/lucasaerb/headstart/issues/7) |
| 12a | P0 | [12a · Verify email before platform code access and agent handoff](https://github.com/lucasaerb/headstart/issues/27) | [#5](https://github.com/lucasaerb/headstart/issues/5), [#8](https://github.com/lucasaerb/headstart/issues/8) |
| 13 | P0 | [13 · Generate reproducible agent handoffs with scoped rights and credits](https://github.com/lucasaerb/headstart/issues/13) | [#5](https://github.com/lucasaerb/headstart/issues/5), [#8](https://github.com/lucasaerb/headstart/issues/8), [#27](https://github.com/lucasaerb/headstart/issues/27) |
| 14 | P0 | [14 · Expose and test a real read-only catalog MCP connector](https://github.com/lucasaerb/headstart/issues/14) | [#13](https://github.com/lucasaerb/headstart/issues/13) |
| 15 | P0 | [15 · Ship the six core skills with verified client setup and connection states](https://github.com/lucasaerb/headstart/issues/15) | [#14](https://github.com/lucasaerb/headstart/issues/14) |
| 16 | P0 | [16 · Implement bounded Three.js/R3F inspection, planning, edits and rollback](https://github.com/lucasaerb/headstart/issues/16) | [#15](https://github.com/lucasaerb/headstart/issues/15), [#10](https://github.com/lucasaerb/headstart/issues/10) |
| 17 | P0 | [17 · Reproduce ten reference integrations across a declared Three.js/R3F matrix](https://github.com/lucasaerb/headstart/issues/17) | [#16](https://github.com/lucasaerb/headstart/issues/16) |
| 18 | P1 | [18 · Add art direction, performance review and code review skills with evidence rubrics](https://github.com/lucasaerb/headstart/issues/18) | [#15](https://github.com/lucasaerb/headstart/issues/15), [#16](https://github.com/lucasaerb/headstart/issues/16), [#3](https://github.com/lucasaerb/headstart/issues/3) |
| 19 | P1 | [19 · Publish curated recipes and target-aware recommendations with alternatives](https://github.com/lucasaerb/headstart/issues/19) | [#11](https://github.com/lucasaerb/headstart/issues/11), [#18](https://github.com/lucasaerb/headstart/issues/18), [#17](https://github.com/lucasaerb/headstart/issues/17) |
| 20 | P1 | [20 · Track demo freshness, catalog health and privacy-preserving reuse outcomes](https://github.com/lucasaerb/headstart/issues/20) | [#12](https://github.com/lucasaerb/headstart/issues/12), [#14](https://github.com/lucasaerb/headstart/issues/14), [#17](https://github.com/lucasaerb/headstart/issues/17) |
| 21 | P1 | [21 · Harden the complete localhost journey for security, accessibility and performance](https://github.com/lucasaerb/headstart/issues/21) | [#19](https://github.com/lucasaerb/headstart/issues/19), [#20](https://github.com/lucasaerb/headstart/issues/20) |
| 22 | P1 | [22 · Package the local MVP and validate discovery and reuse with pilot users](https://github.com/lucasaerb/headstart/issues/22) | [#21](https://github.com/lucasaerb/headstart/issues/21) |
| 23 | P2 | [23 · Deploy the proven website to Vercel and add Railway only for demonstrated backend needs](https://github.com/lucasaerb/headstart/issues/23) | [#22](https://github.com/lucasaerb/headstart/issues/22) |
| 24 | P2 | [24 · Expand comparable browser-game benchmark profiles and before/after reports](https://github.com/lucasaerb/headstart/issues/24) | [#18](https://github.com/lucasaerb/headstart/issues/18), [#17](https://github.com/lucasaerb/headstart/issues/17), [#22](https://github.com/lucasaerb/headstart/issues/22) |
| 25 | P2 | [25 · Evaluate bounded AI capability decomposition against a held-out expert set](https://github.com/lucasaerb/headstart/issues/25) | [#9](https://github.com/lucasaerb/headstart/issues/9), [#10](https://github.com/lucasaerb/headstart/issues/10), [#17](https://github.com/lucasaerb/headstart/issues/17), [#22](https://github.com/lucasaerb/headstart/issues/22) |

## Planning sources

- [PRD v0.3](../../HeadStart-Starter-Package/Playparts-Technical-PRD-v0.3.md)
- [Product direction v0.4](../../HeadStart-Starter-Package/Product-Direction-v0.4.md)
- [Project instructions](../../AGENTS.md)

`issues.json` preserves the reviewed issue definitions; `github-issues.json` maps their stable keys to live GitHub issues. GitHub issues hold ongoing implementation status. Update the local planning mirror when scope or dependency changes, rather than silently allowing contradictory plans.

## User-prioritized local delivery slices — 10 September 2026

The user moved the installable plugin ahead of the original sequence, then requested broader browser/model discovery and visible GitHub popularity. These bounded slices advance the larger backlog without closing unmet authenticated handoff, automatic bag retrieval, integration or royalty requirements in #13–#17 and #27. The original sequence and design issue #26 above remain intact.

| Priority | Issue | Prerequisite | Current review state |
| --- | --- | --- | --- |
| P0 | [#28 · Installable Codex discovery plugin](https://github.com/lucasaerb/headstart/issues/28) | #1 | Closed after independent PASS; installed plugin 0.2.1 has 52 research references / 105 blocks. |
| P0 | [#29 · Browser games and evidenced AI-model labels](https://github.com/lucasaerb/headstart/issues/29) | #1 | Closed after independent PASS. Research corpus: 72 entries / 145 blocks. |
| P0 | [#30 · GitHub stars and popularity sorting](https://github.com/lucasaerb/headstart/issues/30) | #29 data/display behavior | Closed after independent PASS. Dated repository-level popularity, not quality. |

Acceptance contracts: [plugin discovery](plugin-discovery/issue.md), [browser/model expansion](browser-model-expansion.md), [GitHub popularity](github-popularity.md). Every slice retains the required builder → independent reviewer → fixes → re-review loop. Statuses above are this planning snapshot; GitHub tracks subsequent closure.

[#31 · Adopt HeadStart app and plugin naming](https://github.com/lucasaerb/headstart/issues/31) is complete after independent PASS; it migrated the active plugin/package and skills to the selected app name; see the [migration contract](headstart-rename.md).
