# HeadStart living-world frontend review

**Current verdict: PASS for the reviewed local frontend behavior and responsive still-world rendering. Video-background extension is awaiting review and is not included in this interim acceptance.** This is a bounded local frontend review, not acceptance of the complete remix/plugin/royalty demo or closure of its implementation issue.

Implementation owner: `/root`. Independent catalog/planning author: `/root/concept_author`. Critical reviewer: `/root/critical_review`, who did not edit implementation files.

Reference: the user explicitly selected original C4, with C4b’s slightly wider, quieter coastline and foreground bridge as the requested refinement. C2/C3 inform browsing and bag; C5 informs mobile and motion intent. The implementation uses real HTML controls over separate world/foreground/companion assets; it is not an interactive raster mockup.

## Verified behavior

Independent Playwright sessions used local Google Chrome 152.0.7977.84 at `http://127.0.0.1:8765/site/dist/`, with 1440×1000 desktop, 390×844 and 320×844 touch-size layouts, and 768×844 tablet. Actual screenshots were opened and inspected, not accepted solely from dimensions or automated assertions.

- All 15 research records render. Every option in Genre, Platform, Style and Runtime produces the expected subset; combined constraints remain hard. An impossible combination and text search remain empty until explicit reset. Grid/list selection survives filtering.
- Adding a fourth game is rejected; removal, brief editing and reload persistence work. Malformed storage and unknown IDs do not crash the page. Downloaded JSON was parsed: three references, pinned source commits, unresolved scope/royalty terms and `not_connected`; no source content or fabricated integration success.
- Native dialogs support Escape, return focus to the opener and keep background controls out of their keyboard cycle. Removing a bag item focuses the next removal control. Skip link followed by Tab reaches the idea input. Racing brief routing reaches the library with its heading focused.
- Pointer movement changes the explorer’s world position; pause freezes both animation-frame position/parallax and CSS animation. Keyboard Home/End use bounded path coordinates. Reduced-motion starts still; explicit play then a mobile tap moves the explorer. Offscreen decoration suspends.
- Twelve authentic images decode and match their recorded SHA256; three entries use explicit missing-preview states. Forced image-request failure produces a neutral placeholder while browsing and bag remain usable. All 15 source dialogs use their explicit pinned URLs and show untested demo status.

Prior independent research acceptance and image-rights checks are in [catalog research review](catalog-research/README.md). This review additionally inspected the 12-image contact sheet, matching copied bytes, notices and source classifications. It does not promote unresolved game-code, asset or integration rights to cleared status. Luanti stays identified as an engine; native projects open project/download pages, not purported browser games.

## Review rounds

Two initial correctness findings were fixed and independently retested: host-incorrect generic `/tree/` source links (Gitea and the Veloren mirror), and a false saved message after quota failure during brief editing. Every save now updates storage status and announces failure. Astra’s connection panel says the bag is available on this page, avoiding a contradictory persistent-save claim.

The initial opaque checkerboard generation assets were replaced by genuine transparent cutouts before visual review. Desktop and narrow-mobile screenshots now preserve C4’s sunny blue coastal world, castle, boats, layered foliage, small explorer and readable fixed prompt hierarchy.

Three responsive P2 findings were also fixed and independently retested:

1. The 768×844 initial explorer was obscured by the prompt. Extending the mobile world/copy geometry through tablets now leaves the explorer at least 70px below the panel at 768, 900 and 1024 widths; screenshots were directly reviewed.
2. A floating mobile bag control now appears after the hero leaves view, updates its count, opens the actual dialog and receives focus back on Escape. Lower-card selections no longer require scrolling to the hero.
3. World-space keyboard bounds now intersect viewport-safe bounds. At 320 and 390 widths both Home/End keep the entire explorer inside the viewport with at least a 15px margin. Speech positioning is clamped too.

Nonblocking refinements: keep the path’s rightmost feet closer to the deck center; remove internal batch-file/timing prose from product-facing source notes. These do not establish simulated capabilities.

## Evidence and limits

Screenshots and browser receipts: [living-world-site evidence](evidence/living-world-site/). Responsive results are in `responsive-fix-checks.json`. Final artifact digests and the added video verdict will be recorded after the new video extension is stable.

No live MCP/plugin, actual source remix, generated playable game, automatic royalty ledger, payment settlement, video or deployment is accepted by this record. External demos were not played in this pass, and native builds were not run. The UI accurately retains research/untested status. Browser tests used Chrome touch emulation, not a physical iOS device or a Safari compatibility matrix. No performance benchmark is claimed.
