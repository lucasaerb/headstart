# Hero discovery cleanup and remembered email

## Issue contract

Requested 10 September 2026. Remove the nonfunctional hero “What are you making?” search instead of replacing it with another simulated brief/search path. Keep a single primary **Browse all games** action that moves keyboard and visual users into the real `#games` catalog. Preserve catalog search/filtering, C4/C4b living-world art and motion controls, the three-game bag, its `remix-idea` brief, and Gauntlet Loop prompt export. The user subsequently requested removal of the homepage update signup; the separate pre-demo email flow remains.

The user subsequently asked to enter an email only once. After `/api/subscribe` confirms a demo-access save, remember the normalized email in this browser under the versioned key `headstart.remembered-email.v1`. A remembered email bypasses later demo prompts while leaving every exact external demo URL unchanged. Surface the remembered address and an accessible **Forget email** action in the footer. Failed or timed-out requests must not create the preference; corrupt, invalid, or unavailable storage must fail safely. Remembering is unverified browser convenience, not an account or the verified-email code/handoff gate.

Marketing consent remains purpose-specific. A demo-only save does not opt the visitor into updates unless the visitor selects the optional checkbox.

## Acceptance checks

- The hero form, idea-to-filter mapping, idea strip, and edit behavior are absent.
- The hero contains one clear Browse all games CTA; activation scrolls to `#games` and focuses `#library-title`.
- The real catalog search still filters results, and its empty/reset behavior remains intact.
- Bag selection, `remix-idea` persistence, and Gauntlet Loop copy/download behavior remain intact.
- Successful demo saves write the normalized versioned preference; failure and timeout do not.
- Reload clearly surfaces remembered state in the footer; later demo links bypass the prompt without rewriting their URLs.
- Forget clears the preference and restores entry; corrupt/blocked storage is usable and honest.
- The homepage contains no general updates signup. Demo marketing opt-in remains a separate unchecked checkbox and is sent only with explicit selection.
- Desktop/mobile layouts have no overflow, preserve C4/C4b art and accessible focus/motion behavior, and produce no console errors.

## Selected visual baseline

- C4: `HeadStart-Starter-Package/design-explorations/2026-09-simplicity/C4-living-world-landing.png`, SHA-256 `81f0dd99b3891c0ecd33605544e99617c5eaf8a803baf737c4b1597e44f0a8f9`.
- C4b refinement: `HeadStart-Starter-Package/design-explorations/2026-09-simplicity/C4b-living-world-bridge.png`, SHA-256 `a3c9f03a9c41a4866586130c20c18ab2a5d01026c967d4f47ecd13b00e2403be`.
- C2 supplies the retained catalog search; C3 supplies the retained bag and remix brief; C5 supplies responsive/motion intent. Exact paths and digests are recorded in `docs/design/C4-FINAL-STORYBOARD.md`.

Intentional deviation: the C4/C4b hero form and later homepage update signup are removed by current user direction. The art, headline, supporting promise and environment remain; the primary journey becomes a direct browse action.
