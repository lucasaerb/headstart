# Batch 3 independent acceptance checklist

Review each issue against its complete frozen body in `docs/planning/reuse-batches/issues-snapshot.json`, not only this extract. Earlier prerequisite acceptance: batch1 `9a85fde`, batch2 `7eb0dce`. Exact new reviewed revision and explicit verdict must be recorded after actual verification.

## 12 · Implement versioned submissions, curator review and rights corrections

- [ ] Submission accepts repository/subproject/demo and useful capability description, validates input and returns a job/status reference without automatic publication.
- [ ] Review queues identify blocking evidence/rights fields and next action; proposed model tags remain unreviewed until accepted.
- [ ] Authenticated authorized curators can approve scoped reviewed changes; ownership claims require repository-specific verification and cannot bypass review or rewrite history.
- [ ] Rights reports can freeze new exports for affected scope pending review while preserving immutable notices and audit history; provide correction/appeal status.
- [ ] Anonymous readers cannot access curator mutations or reporter/private data; edits use conflict detection to prevent silent lost updates.

## 12a · Verify email before platform code access and agent handoff

- [ ] An anonymous user can browse, search, open allowed public metadata, launch an external demo, follow public repository links and maintain a local collection without login.
- [ ] Platform-controlled code export/download and reuse handoff requests require verified email on the server, including direct requests that bypass the UI and equivalent MCP operations.
- [ ] A crafted client verification flag, missing session, unverified identity, expired session and revoked session are all rejected before source artifacts are generated or returned.
- [ ] One-time link/OTP verification works end to end through the local delivery-preview adapter; expired, incorrect, exhausted, superseded and reused challenges fail safely, including concurrent replay attempts.
- [ ] Return destinations reject open redirects, challenge/session data stays out of logs, and cookie/CSRF/session rotation settings are tested for the selected implementation.
- [ ] The exact anonymous bag selection and intended action resume after verification, with revision/rights revalidation; cancel/error/retry paths preserve the selection without manufacturing success.
- [ ] Protected artifacts cannot be retrieved through a reusable public link or a metadata endpoint that bypasses the gate.
- [ ] MCP public search/metadata remains available, while reuse handoff requires the verified identity. Account verification does not trigger or authorize local filesystem edits.
- [ ] Rate limits and non-enumerating responses are exercised for sign-in issuance, resends and verification attempts; no live email is required for these tests.
- [ ] A localhost setup command and a documented development-only email preview are provided, with an explicit hosted-delivery adapter seam and no dependency on production provider credentials.
- [ ] Desktop/mobile browser evidence covers entry from a selected bag, challenge entry/sent state, expired/invalid state, successful resumption, logout and keyboard navigation. Reduced viewport behavior, focus and accessible error announcements pass independent critique.
- [ ] Independent coder and critical reviewer evidence identifies the reviewed commit/digest, actual tests and screenshots, findings and fixes. Functional/local criteria may pass against a clearly provisional visual reference and unblock specifically verified prerequisites. Under `docs/design-direction.md` and `docs/development-workflow.md`, pending required final visual acceptance keeps the overall issue open until the user-selected baseline is available and reviewed; desktop/mobile usability screenshots remain mandatory now.

## 13 · Generate reproducible agent handoffs with scoped rights and credits

- [ ] Require a server-verified email/session before generating or delivering platform handoff/source-export artifacts; direct API calls and portable fallbacks cannot bypass issue #27. Public browsing and source links remain open.
- [ ] Handoff pins component/project/recipe versions, commit/evidence digests, requested behavior, brief revision, target assumptions, dependencies, preserved systems and validation/rollback instructions.
- [ ] Bundle applicable code/file/asset/dataset notices, creator references and modification/provenance fields; distinguish licenses from optional public lineage.
- [ ] Unresolved required evidence/rights, withdrawn scope or unsupported recipe returns a structured actionable failure, not a partial success labeled reusable.
- [ ] Deterministic handoff content/digest can be regenerated from the same inputs; historical content remains linked to the original versions.
- [ ] Website exposes accessible download/use actions and an honest fallback for unsupported clients, preserving selected version and brief.

## 14 · Expose and test a real read-only catalog MCP connector

- [ ] Keep public catalog search and metadata retrieval open; require the same verified-email identity as the website for prepare_handoff/code-access operations under issue #27. Test unauthenticated direct MCP calls and ensure metadata does not leak protected export URLs.
- [ ] All three tools call the real catalog service and return validated versioned records/evidence and actionable errors.
- [ ] Tool metadata accurately describes read-only/no-target-write behavior; no private repository credentials are requested for public retrieval.
- [ ] Handle limits, missing records, rights failures, offline service and unsupported contracts without fabricating content or fresh status.
- [ ] Package real local startup/configuration instructions and a client compatibility check; no placeholder URLs or nonexistent executables.
- [ ] Retrieved source text is treated as data, and malformed/injected tool content cannot trigger local writes.

## 15 · Ship the six core skills with verified client setup and connection states

- [ ] Guide unverified users through issue #27’s supported client sign-in flow before platform reuse handoff, preserving selection; public search remains available, and no OTP/session secret is pasted into agent prompts.
- [ ] Fresh supported client discovers all six skills and retrieves real catalog evidence; manifest lists only packaged capabilities and compatible schema/ontology versions.
- [ ] Website-to-agent and agent-first flows preserve selected source/component versions, brief and constraints; unsupported clients receive working Markdown/JSON fallback.
- [ ] Show installed/connected only after actual supported client acknowledgment and successful compatible catalog response; otherwise display manual setup state accurately.
- [ ] Skills progressively load relevant references and distinguish public reads, selected-target inspection and authorized local writes.
- [ ] Offline catalog, denied workspace access, unsupported contract and package rollback have actionable paths; bundled candidates remain unverified.

## Shared release checks

- Preserve current C4/C4b hero, plugin/GitHub links, MP4 playback, demo-email distinction and mobile/keyboard behavior.
- Exercise direct API and MCP anonymous, revoked, expired, tampered and wrong-owner access paths. No token appears in URLs returned to the model, logs, screenshots or public artifacts.
- Confirm source/evidence/rights changes block handoff generation and delivery; notices and immutable historical content remain intact.
- Inspect all three public asset allowlists and fail-closed hosted behavior; no private SQLite, auth credentials or reporter records can be served.
- Use isolated local data; no production credentials or real email delivery.
- Record precise client/version, actual install and protocol evidence, and honest offline/unsupported states.
- Author fixes blockers and reviewer reruns affected checks until PASS.
