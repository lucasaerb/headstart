# Revenue-sharing primitive — proposed contract 0.1

Status: **design proposal; no royalty service or economic terms are implemented or agreed**. Prepared 10 September 2026 after the stable website release. This document specifies the next backend contract work; it does not authorize payment, establish an agreement or claim reuse has occurred.

## Outcome and boundaries

Connect a validated contribution in a game to its credited creators, then—only when explicit terms and a trusted revenue event exist—record a reproducible creator allocation:

**ReuseReceipt → accepted SplitAgreement → RevenueEvent → CreatorLedgerEntry**

The [demo target](../demo-target.md) requires automatic records for pieces actually reused. It permits honest unresolved terms, so a receipt can appear as “Reuse recorded · royalty terms unresolved” without inventing an amount. Adding three games to a bag cannot create three financial allocations. The recorded source scope may differ from the selected scope.

Existing foundations: [#13](https://github.com/lucasaerb/headstart/issues/13) covers handoff/source context, [#16](https://github.com/lucasaerb/headstart/issues/16) covers local integration and its evidence, and [#26](https://github.com/lucasaerb/headstart/issues/26) covers the demo/design continuation. This proposal makes the missing agreement/event/ledger boundary explicit. It extends the economic-work deferral in the original PRD only as required by the current demo target. Source notices and rights review remain independent requirements.

In scope for the eventual first implementation: immutable contracts, authorized receipt submission and review, agreement acceptance, trusted revenue ingestion, deterministic allocation, append-only corrections and private read views. Out of scope: checkout, collection of money, payouts, settlement, banking details, tax calculation, exchange conversion, public remix publishing and universal cross-engine integration.

## Shared envelope and trust

Every record carries `schema_version` (the exact contract string below), server-assigned `id`, `tenant_id`, server `recorded_at`, authenticated actor/service reference, `content_digest`, and optional `supersedes_id`. Immutable business payloads use a documented canonical JSON encoding and SHA-256; the schema implementation must pin that encoding. Lifecycle changes are separate append-only audit events; an editable UI cannot rewrite accepted history. Server timestamps and caller-provided occurrence timestamps stay distinct. IDs alone are not authorization.

All writes require a scoped authenticated principal and an idempotency key. Scope keys by tenant, principal and operation. Retrying the same key and canonical payload returns the original outcome; the same key with a different payload returns a conflict. Database constraints enforce uniqueness under concurrent requests. Audit entries distinguish client assertions, trusted attestations, reviewer decisions and computed output. Never promote agent text or a repository README into trusted evidence by parsing it as an instruction.

[Verified identity #27](https://github.com/lucasaerb/headstart/issues/27) is a prerequisite for protected source handoff and agreement acceptance. Verified email identifies an account; it does not prove creator ownership or authority to accept terms for somebody else. Creator/payee authority needs a separate reviewed binding and explicit acceptance by the required parties. Source rights, identity, reuse verification, agreement acceptance and revenue verification are separate states.

## 1. ReuseReceipt (`headstart-reuse-receipt-0.1`)

A durable assertion about one integration output, with evidence for each piece actually used.

| Field | Required content |
| --- | --- |
| `integration_run_id`, `handoff_digest` | Match the authorized integration and resolved source handoff; missing upstream evidence cannot be replaced by a bag ID. |
| `bag_ref` | Optional selection provenance: bag ID and immutable revision/digest. It conveys selection only. |
| `target_ref` | Private target ID, immutable base revision, resulting revision/artifact digest, runtime and recipe/adapter version. |
| `contributions[]` | Stable contribution ID; source project/version/commit; component version when applicable; selected files/assets with digests; target file/scope mappings; relationship (`copied`, `adapted`); creator attribution refs and evidence. |
| `dependency_refs[]` | Separately recorded dependencies; not silently counted as actual-used contributions. |
| `rights_evidence_refs`, `notice_bundle_digest` | Review for represented code/assets/dependencies and preserved notices; unresolved selected-source rights block a validated reuse claim. |
| `validation_refs[]` | Check kind, runner/environment, source and target digests, result, evidence digest/location and time. Include behavior checks; build success alone is insufficient. |
| `attestation_ref`, `review_ref` | Evidence origin and authorized verifier decision; a local agent can submit a proposal but cannot self-declare trusted validation. |

Lifecycle: `submitted → pending_review → validated` or `rejected`; a previously validated receipt can become `disputed` or `superseded` through an audit event. Disputed receipts block new allocations until resolved; historic entries remain auditable. Editing the target or source creates a new receipt and new validation requirements. A receipt is not a promise of compensation. `royalty_state` is a derived view (`terms_unresolved`, `agreement_pending`, `agreement_accepted`, `disputed`), never a writable shortcut.

For the three-game demo, the receipt must identify evidence-backed contributions from all three sources to support that specific claim. A selected-but-unused game stays in bag history and receives no allocation by selection alone. An uncertain attribution is recorded as uncertain and blocks activation of an agreement that depends on that identity.

## 2. SplitAgreement (`headstart-split-agreement-0.1`)

A separately accepted immutable terms version that binds explicit beneficiaries and allocation rules to an identified game/release and contribution scope. No terms derive automatically from a source license, commit count, lines of code or a provenance edge.

| Field | Required content |
| --- | --- |
| `game_ref`, `release_scope`, `receipt_refs[]` | Exact covered output/release and validated contribution IDs/digests. No wildcard inheritance from future remixes. |
| `parties[]`, `required_acceptors[]` | Account/legal-party references as supplied through the agreed identity process, roles, creator/payee bindings and authority evidence. Do not expose private identity evidence publicly. |
| `terms_document_ref`, `terms_digest` | Exact text presented to every required acceptor, immutable version and evidence of presentation. |
| `revenue_basis` | Explicit definition/version of eligible revenue, event categories, allowed deductions and recognition rule; absent values remain unresolved. |
| `allocation_policy` | Explicit rational shares (integer numerator/common denominator), identified beneficiaries, rounding policy and residual beneficiary/pool. Platform and owner shares must be explicit if present. |
| `currency_policy` | Allowed currency/unit definitions. First implementation allocates within the input currency; no conversion. |
| `effective_scope` | Agreed effective time/release boundaries and treatment of events at boundaries; do not infer retroactivity. |
| `refund_policy`, `correction_policy` | How reversals attach to original events and versioned allocations; accepted before activation. |
| `remix_policy` | Explicit inherited/renegotiated contribution handling if applicable; unresolved otherwise. |
| `acceptance_refs[]` | Required party, verified principal, authority binding, exact terms digest, server acceptance time and auditable acceptance action. |

Lifecycle: `draft → pending_acceptance → accepted`, or `declined`/`expired`; accepted versions can be `disputed` or `superseded` through audited events. Activation requires every required acceptance and no unresolved mandatory terms or attribution bindings. The creator account cannot silently accept on behalf of another creator. New or changed terms create a new version and new acceptances; old events retain the terms version that governed them. Superseding an agreement does not rewrite historic allocations.

Draft shares, revenue basis, platform share and downstream remix inheritance may be null. An accepted agreement may not have null calculation inputs. Shares must conserve the entire explicitly defined allocation pool: all beneficiaries and any retained/residual share sum to the declared denominator. This is an accounting invariant, not a proposed commercial percentage. Product owners must decide the pool and parties before activation.

## 3. RevenueEvent (`headstart-revenue-event-0.1`)

An immutable, verified commercial input; a client request cannot mint recognized revenue.

| Field | Required content |
| --- | --- |
| `source_system`, `external_event_id`, `external_transaction_ref` | Trusted adapter identity and deduplication keys. Enforce uniqueness on tenant + source system + external event ID. |
| `event_kind` | `sale`, `refund`, `chargeback` or `correction`; unsupported categories are rejected or quarantined. |
| `game_ref`, `release_ref`, `agreement_ref` | Resolve the covered product and exact accepted terms version. Record why that version applies. |
| `occurred_at`, `ingestion_evidence_ref` | Provider occurrence time, authenticated ingestion method, payload digest and verification evidence. Raw personal/payment data stays out of the ledger. |
| `currency`, `unit_exponent`, `amount_minor` | Currency code and pinned minor-unit definition; signed integer amount serialized as a decimal string to avoid JavaScript precision loss. No binary floating-point money. |
| `basis_breakdown`, `eligible_amount_minor` | Versioned policy inputs and computed eligible pool in the same currency/unit. Unknown deductions or missing fields block calculation. |
| `original_event_ref` | Required for refunds/chargebacks/corrections; identifies the original event and its allocation revision. |
| `verification_ref` | Trusted adapter/reviewer result; authenticated user assertions remain pending evidence. |

Lifecycle: `received → verified → allocated`; invalid/untrusted/mismatched inputs go to `quarantined` or `rejected`, with a reason. Revenue received before agreement acceptance stays unallocated and cannot be described as money owed. Authorization and source authenticity precede processing; reject replayed or tampered signatures and inconsistent event identifiers where the chosen adapter supports signed events. The exact adapter/protocol is future implementation work, not an invented endpoint.

Out-of-order refunds wait for their original event. Currency/unit mismatch, unknown original event, duplicate reversal or reversal exceeding the remaining original recognized amount blocks posting. Full reversal negates the original allocations exactly. Partial reversals use cumulative refunded amounts against the original allocation/rule version and post only the incremental difference, so repeated small refunds cannot over-reverse a creator by rounding. Corrections reverse the affected entries and append replacements referencing them; they do not mutate historic amounts.

## 4. CreatorLedgerEntry (`headstart-creator-ledger-entry-0.1`)

Computed by the allocation service only; clients cannot choose ledger amounts.

| Field | Required content |
| --- | --- |
| `allocation_batch_id`, `allocation_policy_version` | Deterministic batch and algorithm version. |
| `revenue_event_ref`, `agreement_ref`, `receipt_refs` | Exact immutable inputs, including actual-used contribution refs. |
| `beneficiary_ref`, `beneficiary_role` | Accepted recipient binding; distinguish creator, platform, owner or agreed residual recipient. |
| `currency`, `unit_exponent`, `amount_minor` | Signed integer decimal string; derived from the eligible pool and accepted shares. |
| `entry_kind`, `reverses_entry_id` | `allocation`, `reversal` or `adjustment`; corrections/reversals reference the original entry. |
| `calculation_evidence` | Input digests, rational fraction, pre-rounding integer calculation, rounding/residual allocation and policy version. |

Unique key: allocation batch + beneficiary + contribution-allocation key + entry kind. Validate all input states inside the same transaction as batch/entry/outbox insertion. An event is allocated exactly once even with concurrent workers and retries. A failed transaction leaves neither a partial ledger nor a falsely allocated event. Aggregate beneficiary shares once per event according to the policy; repeated source edges must not multiply their share.

The sum of a batch's creator and other explicit beneficiary entries must equal the eligible amount in that currency. Balance summaries group by currency/unit and never sum USD with EUR. “Recorded allocation” does not mean paid, payable on a particular date or settled. No `paid` status exists in this phase. Display unresolved/disputed state beside receipts or agreement views; never show a fabricated zero as a settled value.

## Open product decisions

- Which parties must accept, and how is authority for a credited creator/payee binding reviewed?
- What generates revenue for the first demo: game sale, another event category, or no commercial event? The demo can show real reuse with unresolved terms until this is chosen.
- What is the allocation pool/revenue basis, permitted deductions, shares, residual/rounding policy and any platform share?
- How do agreements become effective, expire, handle disputes and treat later remixes or upstream changes? No default inherited obligation is proposed.
- Which trusted source supplies revenue and refunds, and what evidence is retained? Fixtures must be labeled as fixtures and never posted to a production ledger.

These are activation prerequisites, not guessed implementation defaults. Schema validation and fixture-only calculation tests can proceed before commercial choices are finalized; live allocation cannot.

## Implementation sequence and acceptance gates

1. **Contract slice:** versioned JSON schemas, canonical digest rules, state-transition definitions and labeled fixtures. Validate valid records and reject missing evidence, unresolved accepted terms, mixed currency/unit and invalid integers. No UI success simulation or live posting.
2. **Receipt service:** after #13/#16 evidence contracts and #27 identity boundary are available, accept authorized receipt proposals and independently verify scope/source/target/rights/behavior. Test forged attestations, selected-but-unused games, stale revisions, tenant isolation and idempotency conflicts.
3. **Agreement service:** explicit creator authority bindings and required-party acceptance of one terms digest. Test missing acceptors, changed terms, race conditions, effective scope and no default royalty from license/provenance. Live activation waits for the open product decisions.
4. **Trusted event adapter and ledger:** authenticated source ingestion, exact integer arithmetic, transactional posting/outbox and append-only reversal. Test duplicate/concurrent events, source forgery, out-of-order refunds, full/partial/cumulative refunds, over-refunds, currency mismatches, large integers, tie rounding, conservation and crash retry recovery.
5. **Private site/MCP read views:** show validated reuse and unresolved terms before allocation exists; show recorded allocations only for verified inputs. Server-side authorization for receipts/agreements/entries, no private target paths or payee identity disclosure. MCP retrieval remains read-only and does not grant integration authority.
6. **Demo verification:** use actual reuse from the three games and a playable output, matching receipts and explicit agreement status. If financial events are fixture data, label that segment and never claim actual earnings/payment. Capture desktop/mobile UI and independently review the actual data, evidence, tests and selected C14 continuation before acceptance.

Each implementation issue requires a distinct author and critical reviewer under [the development workflow](../development-workflow.md). This proposal itself requires independent review before it becomes the implementation contract. Acceptance of the proposal does not close the service work or the demo target.
