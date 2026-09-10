# Bounded 2048 metadata reference

Statically fetched by batch1_foundation and independently read by batch1_data, 2026-09-10. Upstream repository: https://github.com/gabrielecirulli/2048. Commit `478b6ec346e3787f589e4af751378d06ded4cbbc`.

- `tile.js` is exact upstream `js/tile.js`: https://raw.githubusercontent.com/gabrielecirulli/2048/478b6ec346e3787f589e4af751378d06ded4cbbc/js/tile.js
- `LICENSE.txt`: https://raw.githubusercontent.com/gabrielecirulli/2048/478b6ec346e3787f589e4af751378d06ded4cbbc/LICENSE.txt

Digests are pinned in `services/catalog/seed.py`. Tile holds position/value, snapshots its previous position, updates position and returns a plain object for serialization. No imports, external assets or network calls in this file. Scope excludes board rules, rendering, CSS, images, input and the rest of the game. No execution, isolation or integration test is claimed. The original MIT notice is preserved verbatim. This fixture supports source-reviewed **metadata discovery**; it does not authorize a platform source handoff or establish complete-game rights/integration eligibility.
