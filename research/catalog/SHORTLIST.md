# Research shortlist — 10 September 2026

Start with these 12 projects to compare real games and useful systems. This order is an editorial research priority, not a quality score, rights clearance or integration verdict. Browser-first candidates lead; native simulation and strategy projects remain valuable references with explicit engine limits.

Browse the full [index](INDEX.md) and [machine-readable catalog](catalog.json). The record IDs below are the stable `id` values in that catalog; author fixtures are [web.json](records/web.json) and [native.json](records/native.json). Each source link is pinned to the researched commit. External demos have not been interactively tested.

## 1. Poimandres Racing Game — Lead with a recognizably complete browser game

Record: `pmndrs-racing-game` · [Browser destination](https://racing.pmnd.rs/) · [Inspected license](https://github.com/pmndrs/racing-game/blob/7816a5d954b75e6ad853ae4e4f0cbbd628072643/LICENSE.md)

The vehicle and camera modules provide concrete starting points for a driving brief. This is a useful first visual candidate because the game has a maintainer-linked browser destination and an explicit component structure.

Source opportunities: [Raycast vehicle](https://github.com/pmndrs/racing-game/blob/7816a5d954b75e6ad853ae4e4f0cbbd628072643/src/models/vehicle/Vehicle.tsx); [Camera mode switching](https://github.com/pmndrs/racing-game/blob/7816a5d954b75e6ad853ae4e4f0cbbd628072643/src/effects/Cameras.tsx).

Vehicle code depends on the shared store, effects, chassis/wheels and Cannon. React 18/R3F 8 and Three.js ^0.139 differ from newer Rapier examples. MIT code is inspected; the README’s CC0 asset statement still needs a file-level inventory and preview permission check.

## 2. Dungeon Forge — Make procedural generation discoverable

Record: `dungeon-forge` · [Browser destination](https://procedural-dungeon.netlify.app) · [Inspected license](https://github.com/majidmanzarpour/threejs-procedural-dungeon/blob/0a2aa0980028cbbc77af6642b4232b45713dc5de/LICENSE)

The seed, room graph and theme controls offer a clear example of selecting a system from a visual project. Inspect layout generation and room semantics before considering a playable dungeon adaptation.

Source opportunities: [Seeded dungeon layout](https://github.com/majidmanzarpour/threejs-procedural-dungeon/blob/0a2aa0980028cbbc77af6642b4232b45713dc5de/src/main.js); [Room semantics and decoration](https://github.com/majidmanzarpour/threejs-procedural-dungeon/blob/0a2aa0980028cbbc77af6642b4232b45713dc5de/src/main.js).

Generation, RNG, decoration and rendering share a large main.js module. This is a visual generator, not an implemented adventure/combat game. MIT code is inspected; determinism, extraction and output/preview rights have not passed integration review.

## 3. Ecctrl — Explore a current character or vehicle foundation

Record: `ecctrl` · [Browser destination](https://ecctrl.app/) · [Inspected license](https://github.com/pmndrs/ecctrl/blob/e2cab804f9f15661a642e76f52d09f0b2db63f35/LICENSE)

Its character, vehicle and virtual-joystick entry points make it useful across exploration, platforming and driving briefs. Treat it as a capability toolkit to accompany complete games in discovery.

Source opportunities: [ShapeCast character controller](https://github.com/pmndrs/ecctrl/blob/e2cab804f9f15661a642e76f52d09f0b2db63f35/src/character/Ecctrl.tsx); [Vehicle controller](https://github.com/pmndrs/ecctrl/blob/e2cab804f9f15661a642e76f52d09f0b2db63f35/src/vehicles/EcctrlVehicle.tsx); [Virtual joystick](https://github.com/pmndrs/ecctrl/blob/e2cab804f9f15661a642e76f52d09f0b2db63f35/src/input/Joystick.tsx).

Current source requires React 19/R3F 9/Rapier and custom-gravity/input stores. A target must retain one renderer, camera and physics-world owner. MIT code is inspected; demo models and montage are not automatically cleared.

## 4. Fable Cities — Investigate a browser-native construction loop

Record: `fable-cities` · [Browser destination](https://fablecities.rawscollections.com) · [Inspected license](https://github.com/rawprogress/fable-cities/blob/aea8b1035030952555395de0c1de14ba693a1427/LICENSE)

The game clock and editable road graph expose promising small simulation seams. The clock’s speed controls and pending tick accounting are particularly relevant to management games.

Source opportunities: [Simulation clock](https://github.com/rawprogress/fable-cities/blob/aea8b1035030952555395de0c1de14ba693a1427/src/modules/simulation/clock.js); [Editable road graph](https://github.com/rawprogress/fable-cities/blob/aea8b1035030952555395de0c1de14ba693a1427/src/modules/roads/RoadNetwork.js).

Road topology still depends on curves, terrain and configuration; source availability does not establish parity with the hosted build. MIT applies to source code only. The CC0 asset manifest does not clear the promotional screenshots in assets/.

## 5. SlimCity — Compare a second browser city architecture

Record: `slimcity` · [Browser destination](https://slimcity.netlify.app/) · [Inspected license](https://github.com/rbenzing/SlimCityGame/blob/73e065226b8134cf44901a641076aeed3281f9f1/LICENSE)

Economic settlement, loans and milestones can be compared with congestion-aware road routing. This gives city-builder discovery a meaningful alternative with different module boundaries.

Source opportunities: [Economy and progression](https://github.com/rbenzing/SlimCityGame/blob/73e065226b8134cf44901a641076aeed3281f9f1/src/sim/economy.ts); [Congestion-aware routing](https://github.com/rbenzing/SlimCityGame/blob/73e065226b8134cf44901a641076aeed3281f9f1/src/world/pathfind.ts).

The routing system depends on shared road profiles and city types; copying a single file will not produce a functioning simulation. AGPL-3.0-or-later is inspected. Selected scope, network-use obligations, audio and screenshot rights require review.

## 6. 2048 — Keep a compact, comprehensible puzzle baseline

Record: `2048` · [Browser destination](https://play2048.co) · [Inspected license](https://github.com/gabrielecirulli/2048/blob/478b6ec346e3787f589e4af751378d06ded4cbbc/LICENSE.txt)

Separate move rules and storage make this a useful small example for testing whether the catalog can explain a real mechanic and its dependencies clearly. It also broadens the visual range beyond 3D scenes.

Source opportunities: [Tile merge and move rules](https://github.com/gabrielecirulli/2048/blob/478b6ec346e3787f589e4af751378d06ded4cbbc/js/game_manager.js); [Local save storage](https://github.com/gabrielecirulli/2048/blob/478b6ec346e3787f589e4af751378d06ded4cbbc/js/local_storage_manager.js).

Rules depend on Grid/Tile and injected input, storage and presentation objects. MIT code is inspected, while fonts and image provenance remain separate. Any Commons preview must retain its own credits and must not be labeled a capture of the pinned commit.

## 7. LittleJS — Cover browser effects and small-game production

Record: `littlejs` · [Browser destination](https://killedbyapixel.github.io/LittleJS/examples) · [Inspected license](https://github.com/KilledByAPixel/LittleJS/blob/da1b3836552b2373522a56bd39d6fb9f4b530017/LICENSE)

The audio and particle modules provide source-backed examples for game feel; the linked example collection adds platformer, arcade and puzzle research routes. This is an engine/example collection, not one standalone game.

Source opportunities: [Synthesized and spatial audio](https://github.com/KilledByAPixel/LittleJS/blob/da1b3836552b2373522a56bd39d6fb9f4b530017/src/engineAudio.js); [Particle emitters](https://github.com/KilledByAPixel/LittleJS/blob/da1b3836552b2373522a56bd39d6fb9f4b530017/src/engineParticles.js).

Effects depend on engine globals, object lifecycle and drawing/math utilities. A Three.js adapter is additional work even though an optional Three.js plugin exists. MIT engine code does not settle every example asset or sound dependency.

## 8. OpenRCT2 — Study tycoon finances and visitor routing

Record: `openrct2` · [Native download destination](https://openrct2.io/download/release/latest) · [Inspected license](https://github.com/OpenRCT2/OpenRCT2/blob/bb118516646347d73e7eb0d30de9eef2f5b16043/licence.txt)

Park operating costs and guest pathfinding offer a rich reference for management systems that respond to a constructed world. This expands the research beyond small browser demos.

Source opportunities: [Park operating finances](https://github.com/OpenRCT2/OpenRCT2/blob/bb118516646347d73e7eb0d30de9eef2f5b16043/src/openrct2/management/Finance.cpp); [Guest pathfinding](https://github.com/OpenRCT2/OpenRCT2/blob/bb118516646347d73e7eb0d30de9eef2f5b16043/src/openrct2/peep/GuestPathfinding.cpp).

C++ logic depends on park state, rides, queues and map/guest models; it is reference-only for initial Three.js integration. GPL-3.0-or-later code does not grant use of original RollerCoaster Tycoon 2 assets required by the inspected README.

## 9. OpenTTD — Study transport networks and cargo value

Record: `openttd` · [Native download destination](https://www.openttd.org/) · [Inspected license](https://github.com/OpenTTD/OpenTTD/blob/d1af18d1b66da003551fcc2139080ae28fd0630c/COPYING.md)

Cargo payments and road-vehicle routing are relevant to logistics, transport and city simulation briefs. The two source slices connect route selection with an economic reason to move goods.

Source opportunities: [Cargo economy](https://github.com/OpenTTD/OpenTTD/blob/d1af18d1b66da003551fcc2139080ae28fd0630c/src/economy.cpp); [Road-vehicle routing](https://github.com/OpenTTD/OpenTTD/blob/d1af18d1b66da003551fcc2139080ae28fd0630c/src/pathfinder/yapf/yapf_road.cpp).

The C++ implementation relies on tile/track types, companies, stations and path caches. GPL-2.0-only code has listed third-party exceptions; base graphics, audio and NewGRFs each need their own scope review. Native reference, not a browser-ready extraction.

## 10. 0 A.D. — Study worker gathering and timed production

Record: `zero-ad` · [Native download destination](https://play0ad.com/download/) · [Inspected license](https://gitea.wildfiregames.com/0ad/0ad/src/commit/58e2c5946621b15f96d8da8f5e0201f278f7ac99/LICENSE.md)

ResourceGatherer and ProductionQueue provide unusually explicit RTS examples for carrying capacity, timed work and unit/research queues. JavaScript source may be approachable for inspection.

Source opportunities: [Resource gathering](https://gitea.wildfiregames.com/0ad/0ad/src/commit/58e2c5946621b15f96d8da8f5e0201f278f7ac99/binaries/data/mods/public/simulation/components/ResourceGatherer.js); [Unit and research production queue](https://gitea.wildfiregames.com/0ad/0ad/src/commit/58e2c5946621b15f96d8da8f5e0201f278f7ac99/binaries/data/mods/public/simulation/components/ProductionQueue.js).

These modules call Pyrogenesis interfaces, timers, entity messages and ownership services. JavaScript does not make them drop-in Three.js modules. GPL-2.0-or-later code and CC-BY-SA content have path-specific exceptions; use the current Gitea source rather than the obsolete GitHub snapshot.

## 11. Widelands — Study connected settlement economies

Record: `widelands` · [Native download destination](https://www.widelands.org/wiki/Download/) · [Inspected license](https://github.com/widelands/widelands/blob/187e4e257c2e127ec2c607f8c7765f774e2474ec/COPYING)

The economy and production-site sources are useful for understanding how staffed buildings, input queues and road-connected warehouses cooperate. This is a strong research reference for worker-driven builders.

Source opportunities: [Connected production economy](https://github.com/widelands/widelands/blob/187e4e257c2e127ec2c607f8c7765f774e2474ec/src/economy/economy.cc); [Production-site programs](https://github.com/widelands/widelands/blob/187e4e257c2e127ec2c607f8c7765f774e2474ec/src/logic/map_objects/tribes/productionsite.cc).

Tribe definitions, Lua production programs, flags and worker lifecycles are part of the dependency scope. Native C++ is outside initial integration support. GPL-2.0-or-later and Creative Commons asset exceptions require a selected-scope rights map.

## 12. Mindustry — Study visible factory flow

Record: `mindustry` · [Native download destination](https://anuke.itch.io/mindustry) · [Inspected license](https://github.com/Anuken/Mindustry/blob/7c5f29e6fb1ac49bc7b4e1806f42685cbcc8b499/LICENSE)

Conveyors and crafting blocks offer understandable automation systems for a factory/tower-defense brief. They can help the catalog describe throughput, downstream capacity and production prerequisites concretely.

Source opportunities: [Conveyor item logistics](https://github.com/Anuken/Mindustry/blob/7c5f29e6fb1ac49bc7b4e1806f42685cbcc8b499/core/src/mindustry/world/blocks/distribution/Conveyor.java); [Factory crafting outputs](https://github.com/Anuken/Mindustry/blob/7c5f29e6fb1ac49bc7b4e1806f42685cbcc8b499/core/src/mindustry/world/blocks/production/GenericCrafter.java).

Java/Arc tile simulation, item definitions and serialization are coupled to the source. GPL-3.0-only code is inspected, but the art/audio scope remains unresolved. This is a native/JVM reference with a download destination, not a verified browser game.

## Three-source demo research hypotheses

These combinations identify feasibility work only. None has been assembled, adapted or played. The audience target calls for three appealing **games**; a toolkit or generator cannot silently count as a complete selected game.

| Hypothesis | Why investigate it | What must be proven first |
| --- | --- | --- |
| **A small coastal delivery town:** `pmndrs-racing-game` + `fable-cities` + `slimcity` | A vehicle, road construction/time controls and a local economy could support one coherent delivery loop. | Select narrow scopes, reconcile Three.js/R3F versions and simulation ownership, resolve MIT/AGPL compatibility and actual asset-license obligations for the selected scopes, clear vehicle/world/audio assets, and demonstrate route traversal and reward accounting. |
| **A puzzle expedition:** `pmndrs-racing-game` + `2048` + `phaser-dungeon-crawler` | Driving between places, a tile puzzle at a destination and a small combat encounter could provide a varied three-game research brief. | Define a coherent player objective before coding. Phaser combat is outside the initial adapter family, so source conversion is unproven; DOM puzzle and 3D input/lifecycle ownership also need deliberate integration. Clear all sprite/audio scopes. |

For an earlier technical feasibility exercise, `dungeon-forge` + `ecctrl` + `three-pathfinding` could test generated floors, movement and navigation. This would be a **capability composition experiment**, not fulfillment of the three-game audience target. It still needs navmesh construction, shared coordinates, collision and runtime-version tests.

Every feasibility pass must retain exact source versions, selected files and transitive dependencies, then log which pieces were actually reused. Selection is not reuse. No royalty rates, creator agreements, payment obligations or settlement capability have been established; a future demo record must show unresolved terms honestly.
