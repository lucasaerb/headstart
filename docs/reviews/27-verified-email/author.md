# Issue27 author evidence

Author: reuse_auth. Independent review pending; this is not acceptance.

Prerequisites: issues5/8 accepted in docs/reviews/batches at9a85fde/7eb0dce. Local implementation adds Python transactional verified identity, localhost preview, CSRF/browser-session lifecycle and explicit approved local MCP bridge. UI uses current C4 navy/blue type, restrained white form and existing primary/secondary tokens; hero artwork and layout unchanged. Selected references docs/design/C4-FINAL-STORYBOARD.md and docs/design-direction.md. New form adapts C1 brief simplicity rather than adding decoration to the living world.

Checks:8 Python security tests and real HTTP transport test pass. Cover random hash-only challenges, expiry, maxattempts, supersession, concurrent replay, session rotation/revocation, forgedsession rejection, returnintent allowlist, MCP approval/revocation, origin/CSRF/cookies, unavailable delivery and privatepath404. Desktop/mobile evidence test exercises real local preview with synthetic example.invalid addresses and no production credentials. Captures in evidence/; final browser result and reviewed digests recorded separately by reviewer.

Known limits: development preview proves the local verification lifecycle, not remote inbox delivery. Hosted adapter unavailable by design. Authentication requires source rights and exact bag revalidation by dependent handoff service; it never produces artifacts. No economic or integration authorization. MCP runtime integration is separate issue14 and must read the private credential file outside prompts.
