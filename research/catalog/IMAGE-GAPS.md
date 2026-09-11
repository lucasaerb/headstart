# Dashboard media review status — 11 September 2026

The strict research catalog contains 41 browser projects. Every row has authentic record-specific game media, pinned public source, an inspected open-source code license, positive dated GitHub stars, and a reachable browser play URL.

## Independently approved for local catalog display (25)

Twenty-five retained media rows carry their existing independent narrow local-display decisions and can project to the dashboard. Their exact source, credit, digest, rights expression, allowed scope, and review stamp are recorded in `media-manifest.json` and `media-credits.md`.

## Pending exact-set independent review (16)

The 16 rows in `records/recent-vibe.json` have authentic media evidence but remain `candidate_local_display_pending_independent_review`. They fail closed from the site/API until an independent reviewer completes the exact [media approval request](../../docs/reviews/recent-vibe-games/MEDIA-APPROVAL-REQUEST.md). The validator rejects missing, extra, duplicate, rejected, blank, self-authored, non-`PASS`, or timezone-less decisions.

P(DOOM) now uses the pinned repository’s `docs/images/arrival.jpg`, an actual first-person gameplay frame showing the Arrival Platform, weapon, enemies, objective and HUD. The previous title banner was removed.

After approval, run `recent_media_approval.py`, replace the manifest with its validated output, rebuild catalog and site projections, regenerate the 41-image contact sheet and credits, and rerun the full tests. Approval remains limited to local catalog identification/display and does not clear source integration or broader asset reuse.
