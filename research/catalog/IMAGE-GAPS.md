# Dashboard image gaps — 10 September 2026

The research catalog has 76 records; 43 have authentic, record-specific local-display media and appear in the current dashboard. The 33 records below remain out of the image-required projection. This is a collection backlog, not permission to copy the linked image or a reason to substitute a generic placeholder.

## Existing upstream reference needs rights and identity review (12)

- `3d-city` — 3d.city: https://raw.githubusercontent.com/lo-th/3d.city/60fc6de2451ac6cf4df211a7cdae6c55c97e73c7/assets/img/preview01.jpg
- `clumsy-bird` — Clumsy Bird: https://i.imgur.com/Slbvt65.png
- `fable5-real-physics-engine` — Veritas Physics Sandbox: https://raw.githubusercontent.com/hamzabellouch/Build-with-anthropic-fable-5/2fbca6277a08ea30e8b47cee4ed8bd4f3f93a1c8/real-physics-engine/docs/screenshot-orbits.png
- `godot-astar-grid-2d` — Godot AStarGrid2D Navigation: https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/2d/navigation_astar/screenshots/navigation_astar.webp
- `godot-platformer-2d` — Godot 2D Platformer: https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/2d/platformer/screenshots/platformer.webp
- `godot-platformer-3d` — Godot 3D Platformer: https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/3d/platformer/screenshots/platformer.webp
- `godot-truck-town` — Godot Truck Town: https://github.com/godotengine/godot-demo-projects/blob/a3b5c113112f77291d5f3d1360f33a882fdc52f7/3d/truck_town/screenshots/truck_town.webp
- `hextris` — Hextris: https://raw.githubusercontent.com/Hextris/hextris/3f4847dc8fd7dab3d1c87e6324b9159d92fbd396/images/twitter-opengraph.png
- `littlejs` — LittleJS: https://raw.githubusercontent.com/KilledByAPixel/LittleJS/da1b3836552b2373522a56bd39d6fb9f4b530017/examples/screenshot.jpg
- `openrct2` — OpenRCT2: https://github.com/user-attachments/assets/fa893cc8-1484-4751-94be-4ead00a6c8f9
- `three-mesh-bvh` — three-mesh-bvh: https://raw.githubusercontent.com/gkjohnson/three-mesh-bvh/8747a3c418f1dafa7c3ab1b3c1ffdecc531a2eab/docs/example-sm.gif
- `unciv` — Unciv: https://github.com/yairm210/Unciv/blob/0d7d1e43cd4776e04cd3f9eaf752527885123e62/extraImages/GithubPreviewImage.jpg

## Authentic image still needs discovery (21)

- `a-dark-room` — A Dark Room
- `astra-apex-club` — Apex Club
- `astra-melon-lab` — Melon Lab
- `astra-mosswing` — Mosswing
- `astra-sunjing-puzzles` — Sunjing Puzzles
- `astra-three-kingdoms` — Three Kingdoms
- `browserquest` — BrowserQuest
- `drei` — Drei
- `dwellcraft` — Dwellcraft
- `fable5-fpv-drone` — FPV AcroSim
- `fable5-plane-game` — Horizons Flight Simulator
- `freeciv` — Freeciv
- `freecol` — FreeCol
- `gather-it` — Gather It
- `magic-carpet-wizard` — Magic Carpet Wizard
- `matter-js` — Matter.js
- `openra` — OpenRA
- `phaser-dungeon-crawler` — Phaser Dungeon Crawler Starter
- `react-three-rapier` — React Three Rapier
- `threejs` — Three.js
- `yuka` — Yuka

## Projection behavior

After research adds a matching `media-manifest.json` row, retains the original file under `research/catalog/media/`, copies it to `site/dist/assets/catalog/`, and assigns an accepted explicit local-display `rights_status`, `build_site_catalog.py --require-previews` includes that record automatically. The projection matches by `record_id`, verifies the media hash and permits only flat safe asset paths. Until then the dashboard omits the record, so the site never presents a generic image as that game or hides an unresolved display-rights state.
