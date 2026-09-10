# HeadStart living-world site

A buildless local frontend using HTML, CSS and JavaScript, based on the user-selected C4/C4b direction. Art assets are original generated illustrations. The interactive world uses a generated ambient motion plate behind independent CSS atmosphere, foreground foliage and companion layers; it is a landing scene, not a running external game.

From the workspace root:

```sh
python3 -m http.server 8765 --bind 127.0.0.1 --directory HeadStart-Starter-Package
```

Open `http://127.0.0.1:8765/site/dist/`.

No package install or build is required. The existing package server can serve this route alongside the mockup library and storyboard.

## Plugin download

`dist/plugin.html` provides the actual HeadStart 0.3.0 MCP/plugin ZIP and installation instructions. The catalog heading, footer, bag connection state and How it works dialog link to it. The archive contains first-party plugin code and research metadata, no upstream game code or images; downloading does not connect a client or synchronize the website bag. Rebuild the public artifact from the repository root with:

```sh
python3 tools/plugin/build_distribution.py --output HeadStart-Starter-Package/site/dist/downloads/headstart-plugin-0.3.0.zip
python3 -m unittest discover -s tools/plugin -p 'test_*.py' -v
```

The current ZIP SHA-256 is `3644bcc2f48975f996d979be3e6ade7aca8276133acb8b4b86fc1d4dd512d1f3`. Update the install page's version, filename and digest together when releasing a new package. Browser download and desktop/320/390px captures are in `docs/reviews/evidence/release-download/`.


## Implemented behavior

- Separate sky, landscape, foreground foliage, birds/water and transparent companion layers. Pointer parallax leaves HTML copy and controls stationary. The explorer moves along a fixed bridge path in world coordinates, including after resize.
- An 8-second local Seedance ambient video animates the existing world (windmill, flags, waterfalls, ocean and boats) after the hero enters view. The C4b still image remains the poster and fallback; pause, reduced-motion, hidden-tab and offscreen states stop video playback as well as CSS motion.
- Pointer following, touch-to-explore and keyboard arrow/Home/End movement. Pause stops decorative motion; reduced-motion starts paused. Work suspends when the hero is offscreen or the document hidden.
- 40 image-backed research-preview projects selected from 73 research records, including browser games, demos and toolkits; search and Genre/Category/Platform/Style/Runtime/Model filters; creator-reported model evidence; dated repository star counts and Most GitHub stars sorting; list/grid layouts. Every displayed row has a record-specific game image with source, credit, license evidence and preserved notices.
- Browser-local bag capped at three, editable brief, reload persistence, empty/removal states, storage-failure messages and a planning JSON download.
- Honest Astra connection state. No live connector, code remix, royalty record service or payment service is implemented. Bag notes do not satisfy the target's automatic plugin retrieval.

## Validation

`node --check HeadStart-Starter-Package/site/dist/app.js` and the same check for `catalog.js` validate syntax. Actual desktop/mobile, keyboard, pointer, touch, reduced-motion, filters, dialogs, bag persistence and download checks are recorded in `docs/reviews/headstart-live-world.md`; the video playback review is recorded separately in `docs/reviews/headstart-live-world-video.md`.

## Visual and data provenance

C4/C4b is the selected landing reference; C2/C3 guide browsing and bag, and C5 guides mobile/motion intent. Assets/prompts are in `ASSET-PROMPTS.md`. Explicitly authorized Replicate background removal created real-alpha sprite/foliage assets; its operation record is `background-removal-record.json`, and generated input copies are preserved in `generation-inputs/`. Only the cutouts are rendered.

The motion asset is `dist/assets/world-motion.mp4`, generated with `google/veo-3.1` at 1080p from the C4b plate. The delivered clip is 8 seconds, 1620×1080, H.264/24 fps, silent, SHA-256 `7c7801465bfaa6bc2f7e3a3bcc52c13deb6de32d891e79f603bc41a05b4ccaf4`. The model's 1920×1080 output was centered-cropped to the 3:2 content plate before encoding, so the hero can use `object-fit: cover` without stretching. Replicate's inspected Veo schema exposes 1080p as the high-resolution output; this is a true 1080p source rather than a 4K claim or a soft upscale. The source record and prompt are in `world-video-record.json`; generation is illustrative, so the static poster is always retained as a truthful offline fallback.

The catalog is a dated snapshot from local research, not a published reusable catalog. Runtime and rights notes are not compatibility guarantees. Original image bytes remain unchanged; card display scales/crops them. The full attribution and license bundle is `dist/provenance/`. Do not promote these records to tested/reusable without new evidence.

## Refresh catalog metadata

From the repository root:

```sh
python3 research/catalog/scripts/refresh_popularity.py
python3 research/catalog/scripts/catalog.py build
python3 research/catalog/scripts/build_site_catalog.py \
  --existing-catalog HeadStart-Starter-Package/site/dist/catalog.js \
  --require-previews \
  --site-index HeadStart-Starter-Package/site/dist/index.html \
  --output HeadStart-Starter-Package/site/dist/catalog.js
python3 research/catalog/scripts/media_contact_sheet.py
python3 research/catalog/scripts/sync_site_provenance.py
```

The projection includes only records with reviewed local previews, so records without record-specific image evidence remain in the 73-record research database and stay off the 40-row dashboard. Model labels require creator attribution; unknown attribution stays unknown. Repository star counts are shared by subprojects, dated, and separate from rights or integration readiness. Missing and non-GitHub counts remain unavailable instead of zero. The default order favors browser projects and evidenced preferred models; popularity sorting preserves active filters.
