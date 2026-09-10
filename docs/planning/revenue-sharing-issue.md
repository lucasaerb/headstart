# Define and implement actual-reuse receipts and explicit revenue allocation records

The site can collect a three-game bag, but selection does not establish source reuse or a royalty arrangement. We need an evidence-backed primitive that records actual contributions and, only after explicit agreement and a verified revenue event, allocates a reproducible amount to the accepted beneficiaries.

Proposed chain: **ReuseReceipt → accepted SplitAgreement → RevenueEvent → CreatorLedgerEntry**. The detailed contract proposal is [docs/planning/revenue-sharing.md](https://github.com/lucasaerb/headstart/blob/feat/plugin-discovery/docs/planning/revenue-sharing.md).

## Scope

- Versioned immutable contracts and lifecycle audit events, with actual-used source/version/scope, target revision, rights/notices and behavior validation evidence.
- Creator/payee identity and authority bindings; explicit acceptance of the same immutable terms by every required party.
- Revenue basis, shares, platform/residual treatment, currencies, rounding, refunds and remix scope recorded as terms; unresolved values block activation.
- Trusted revenue ingestion, integer minor-unit arithmetic, idempotent transactional append-only allocation and reversals.
- Private read views that distinguish reuse recorded, terms unresolved, agreement accepted and allocation recorded. No payment claim.

No default royalty is inferred from a license, repository, dependency, bag membership or code quantity. Rates, eligible revenue, platform share and downstream remix inheritance remain open decisions. Payment collection, payouts, settlement, tax/FX, public provenance and banking data are outside this issue.

## Dependencies and sequence

1. Independently review the proposed contracts; implement schemas and labeled fixtures first.
2. Reuse evidence builds on #13 (handoff/source scope) and #16 (integration validation); protected handoff and agreement acceptance depend on verified identity #27. Verified email alone does not establish creator authority.
3. Implement authorized receipt submission and review, then accepted agreement versions with explicit party authority.
4. Choose and verify a trusted revenue adapter before live event posting; implement ledger/refund invariants and crash-safe idempotency.
5. Add authorized site/MCP read views aligned with #26 and C14; validate the actual three-source demo separately.

## Acceptance criteria

- [ ] Versioned schemas reject malformed integers and incomplete contracts; semantic validators reject selected-but-unused attribution, unpinned or stale evidence, unresolved required rights and accepted agreements with missing terms/acceptances.
- [ ] A validated receipt traces actual copied/adapted contributions to immutable source and target evidence; neither a bag nor an agent claim can self-certify reuse.
- [ ] All required parties accept one terms digest through authorized accounts with reviewed authority bindings; changes require a new version and acceptance.
- [ ] No allocation posts without a validated, undisputed receipt, accepted applicable agreement and trusted verified event. Missing economic decisions remain visibly unresolved.
- [ ] Same idempotency key/payload replays safely; different payload conflicts; concurrent ingestion posts once with no partial batches.
- [ ] Integer calculations conserve the eligible pool, keep currencies separate, account for explicit residuals and cannot multiply shares through repeated provenance edges.
- [ ] Full reversal exactly negates original entries; cumulative partial refunds cannot over-reverse; out-of-order, excessive and mismatched-currency refunds cannot post prematurely.
- [ ] Corrections/reversals preserve original records and refer to the original agreement/rule version. Private records are tenant-scoped and do not expose target code/paths or private identity evidence.
- [ ] UI/MCP state never describes a recorded allocation as paid or displays fabricated earnings. Fixture events are labeled and isolated from production posting.
- [ ] Distinct author/reviewer evidence records actual data/contracts/tests, changed revision/digests and desktop/mobile captures for UI work; explicit PASS precedes closure.

Current status: proposal only. This issue does not assert that a royalty backend, economic agreement or playable remix already exists. The first ready implementation slice is schema/state validation; live commercial activation remains blocked on the explicit product decisions in the proposal.
