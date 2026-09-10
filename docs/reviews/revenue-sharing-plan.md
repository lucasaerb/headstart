# Revenue-sharing contract proposal review

Date: 2026-09-10. Scope: planning/backlog definition only, following the stable website release. Author: `/root/release_author`. Independent reviewer: `/root/release_reviewer`.

**Verdict: PASS** for the proposal and issue draft. This does not approve implemented schemas/services, economic terms, settlement, or the audience demo.

## Reviewed artifacts

- `docs/planning/revenue-sharing.md`: SHA-256 `5d6f6d2e7ce17e38e4a3d95be9e9834570bc1848203a110bb08135c2cf18a720`.
- `docs/planning/revenue-sharing-issue.md`: SHA-256 `58c7eb7aba6e59ec79b83b04052ef98a34ad7d60c8ba44dd871d7260a0ba62ee`.

Independently read both complete drafts, `docs/demo-target.md`, and live GitHub issue bodies #13, #16 and #26 through `gh issue view --json title,body,state`. All three remain open. Their existing foundation covers pinned handoffs/credits, validated integration records and the automatic actual-used creator record; none already specifies accepted economic terms or a revenue ledger. The new issue fills this gap without implying those prerequisites are complete.

## Acceptance coverage

The four proposed records are concrete and separately versioned: ReuseReceipt, explicitly accepted SplitAgreement, trusted RevenueEvent and computed CreatorLedgerEntry. They distinguish bag selection, dependencies, actual copied/adapted scope, validated behavior, source rights and accepted economic obligations. Creator authority is separately verified; email verification cannot confer rights to accept for another party. Missing terms/acceptances block activation, and source licenses or line counts do not imply a royalty rate.

The proposal specifies scoped authorization, immutable input digests, tenant isolation, idempotency keys and conflicting payload rejection, transactional posting, trusted event origin, integer decimal-string money and currency/unit isolation. Refunds use original allocations and cumulative partial reversal deltas, preserve historical entries and cannot over-reverse; corrections append reversals/replacements. Allocation conservation, explicit residual handling and repeated-edge deduplication are required. Fixtures remain isolated from production events and never establish real earnings.

Revenue basis, rates, platform share, party authority, effective scope, adapter and downstream remix inheritance remain explicit product decisions. Only schema/fixture work is ready before those choices. Receipt/service dependencies and the separate genuine three-source playable demo are preserved. UI states distinguish unresolved terms and recorded allocations from payment; no backend or live financial service is claimed.

## Review findings and limits

No blocking findings in this planning scope. Reviewed the author's final clarification explicitly separating schema validation from semantic validation: actual-use evidence, stale versions and party authority require service-level validation and independent evidence review; JSON structure validation alone cannot prove them. The implementation gates require those checks. Acceptance of this planning proposal does not establish any economic agreement or authorize guessed percentages.

Screenshots: not applicable. These two files define contracts/backlog only and change no UI. Future UI work must compare desktop/mobile evidence against the selected C14 continuation as specified in the proposal. No implementation tests were run because no executable implementation was changed. Independent service and integration review remains required before implementation issue closure.
