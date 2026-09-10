# Verified-email access planning review

**PASS — planning only.** No authentication, email delivery or access gate has been implemented or tested by this change.

Author: `/root/research_web`, with dependency/AGENTS wiring by `/root`. Independent reviewer: `/root/design_flex_reviewer`. Reviewed issue #27 (`verified-email-access`), its relevant additions to #13/#14/#15/#21, and the two AGENTS paragraphs defining verified-email access and anonymous source links. Unrelated C4 design changes and issue #26 are outside this verdict.

The plan preserves anonymous browse/search, public metadata, demos, upstream repository links and local collections. Server-side verified identity is required for platform-controlled code delivery and reuse handoffs, including direct API/MCP calls and generated download links. Local editing authorization, code/asset rights and marketing consent remain distinct. The exact selected bag and intended action resume after verification.

The issue specifies a localhost delivery-preview adapter; single-use bounded challenges; replay, expiry, revocation, enumeration, rate-limit and redirect protections; session/cookie/CSRF handling; and independent desktop/mobile evidence. The planned checks include direct UI-bypass requests, protected artifact delivery and agent-client authentication without placing secrets in prompts. These are acceptance requirements, not claimed results.

Review corrections now preserve the current selected design baseline through `docs/design-direction.md` and #26, explicitly keep genuinely pending final visual acceptance open, and clarify that anonymous public upstream links do not bypass the platform source-delivery gate. Policy links use absolute GitHub document URLs. #13 depends on #27; #14, #15 and #21 carry the MCP/client/end-to-end boundary. All 27 local issue keys and dependency references resolve without cycles.

Scoped digest: `7e99b964995a00a7a2cc4dab3fd19f9eb057a3ef1f9c501d87ce3f3626e13261`. Computed as SHA256 of UTF-8 `json.dumps(payload, sort_keys=True, ensure_ascii=False)`, where `payload.issues` contains the five reviewed key records in local planning order, and `payload.AGENTS_email_paragraphs` contains the two reviewed paragraph strings. Remote synchronization is handled by the coordinator and is not an authentication test.

Screenshots are N/A for this documentation-only planning change. Implementation must still complete its separate coder/reviewer loop and actual API/MCP/browser verification before issue closure.
