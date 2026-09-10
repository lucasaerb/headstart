# Dashboard media review gaps — 10 September 2026

The research catalog has 76 records. The dashboard pictures 69 of them with authentic, record-specific images and withholds the seven exact gaps below. Every displayed image passed the local catalog-display gate; no generic placeholder fills a missing record.

## Approved image evidence (69)

The displayed set combines 40 previously reviewed images with 29 images covered by the independent [media approval decision](../../docs/reviews/full-catalog-media-audit/media-approval.json): all 26 authentic candidates from the [full-catalog media audit](../../docs/reviews/full-catalog-media-audit/media-audit.json) and the three official OpenAI gameplay images for Void Explorer, Sunwake and Hollowflux. The approval file covers exactly those 29 record IDs and records the independent reviewer, timestamp and `PASS` verdict for each. The canonical [media manifest](media-manifest.json) retains the exact source page, original URL, digest, record-specific credit and review stamp.

That decision approves only narrow local HeadStart research/catalog identification and display of each exact image. It does not resolve or grant public redistribution, promotional reuse, relicensing, source export, game-asset reuse, endorsement or rights in depicted third-party assets. The three OpenAI images therefore remain `official_source_local_display_rights_unresolved` even though their narrow local display review passed. The 26 audited images retain their individual rights notes and blockers in the manifest and [media credits](media-credits.md).

## No defensible stable exact-record image (7)

### `a-dark-room` — A Dark Room

Status: `blocked_no_record_specific_image`. The pinned repository contains a logo but no defensible gameplay screenshot.

- Capture or obtain a project-authorized gameplay screenshot from an official distribution page; do not substitute the repository logo.

### `fable5-fpv-drone` — FPV AcroSim

Status: `blocked_no_record_specific_image`. No repository license and no record-specific screenshot found at the pinned revision.

- The repository-wide Fable image and unrelated 3d-game/menu.png cannot be assigned to FPV AcroSim; obtain an official project screenshot.

### `fable5-plane-game` — Horizons Flight Simulator

Status: `blocked_no_record_specific_image`. No repository license and no record-specific screenshot found at the pinned revision.

- The repository-wide Fable image and unrelated 3d-game/menu.png cannot be assigned to Horizons Flight Simulator; obtain an official project screenshot.

### `gather-it` — Gather It

Status: `blocked_no_record_specific_image`. No repository license and no screenshot or official project-site image was found at the pinned revision.

- Obtain a creator-hosted gameplay screenshot and permission; do not use Unity template art as a game screenshot.

### `matter-js` — Matter.js

Status: `blocked_no_stable_official_image_url`. The pinned repository and official demo pages provide no stable, record-specific image URL.

- Create a reviewed capture from the official interactive demo with capture timestamp and demo URL, or obtain a maintainer-hosted screenshot.

### `phaser-dungeon-crawler` — Phaser Dungeon Crawler Starter

Status: `blocked_no_stable_official_image_url`. No stable official screenshot URL found; Dungeon Tileset II and Legend of Faune are separately credited assets.

- Obtain a reviewed official-demo capture and preserve the third-party asset credits and terms.

### `yuka` — Yuka

Status: `blocked_no_stable_official_image_url`. The official site and pinned repository expose logos and example assets but no stable representative screenshot URL.

- Create a reviewed capture from a named official Yuka example with capture timestamp and example URL, or obtain a maintainer-hosted screenshot.

## Promotion and projection

The completed approval file covers exactly the 26 audited candidates and three official OpenAI images. The collector still fails closed: without that exact 29-record independent decision, audit candidates remain `candidate_local_display_pending_independent_review`, official-source images remain unstamped, and neither group projects. With the decision file, the collector preserves its reviewer, timestamp and `PASS` verdict while keeping every row’s broader-rights caveats. `build_site_catalog.py --require-previews` matches by `record_id`, verifies media hashes, permits only flat safe asset paths and rejects every pending or unstamped row.
