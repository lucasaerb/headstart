# Research gaps and next evidence — 10 September 2026

> Historical first-pass snapshot (10 September 2026): the 43-entry / 87-block counts and priorities below describe the original cohort. The current [browser-first expansion](BROWSER-EXPANSION.md) adds 33 entries / 66 blocks, bringing the research index to 76 / 153. Six new blocks come only from official descriptions because the three OpenAI Sites games have no linked public source. Its attribution and rights caveats must be read alongside this snapshot.

This inventory is a research database, not a published or integration-tested reuse catalog. Read the [complete index](INDEX.md), [catalog JSON](catalog.json), [shortlist](SHORTLIST.md) and [research contract](RESEARCH-CONTRACT.md). Stable record IDs identify the projects discussed below.

## What is indexed

Counts were calculated from the two author record files, [web.json](records/web.json) and [native.json](records/native.json), after their initial source review:

| Measure | Recorded count | Meaning |
| --- | ---: | --- |
| Research entries | 43 | 40 distinct repositories; four Godot entries are separate subprojects in one repository. |
| Games / engines / demos / toolkits | 26 / 4 / 5 / 8 | Complete games and reusable systems are kept distinguishable. |
| Candidate building blocks | 87 | Matching source entry points were inspected; extraction and dependency closure were not tested. |
| 2D / 3D / mixed | 21 / 21 / 1 | Editorial discovery descriptors, not compatibility or performance results. |
| Browser destinations / native download destinations / no current destination | 26 / 16 / 1 | Every interactive status is `not_tested`; a destination does not prove gameplay works. |
| Root code-license inspection / unresolved code declaration | 40 / 3 | These are observations about evidence, not publication or commercial-use eligibility. Per-file exceptions still matter. |
| Upstream preview references in records | 23 | References are not automatically licensed local images. |
| Separately collected preview files | 12 | Governed by the media manifest and independent image review, not the upstream-reference count. |

The 20-entry internal-discovery acceptance target is still subject to independent review of a narrow scope: source-linked research display only. These counts do not establish how many entries qualify. Public publication, code export, extraction and tested integration require their own evidence gates.

## Source and rights decisions still needed

- **`3d-city`: contradictory license declarations.** The [README](https://github.com/lo-th/3d.city/blob/60fc6de2451ac6cf4df211a7cdae6c55c97e73c7/README.md) says MIT; [LICENSE](https://github.com/lo-th/3d.city/blob/60fc6de2451ac6cf4df211a7cdae6c55c97e73c7/LICENSE), COPYING and the inspected simulation headers specify GPLv3 plus additional terms. Resolve the represented code scope before export.
- **`clumsy-bird`: contradictory license declarations.** [package.json](https://github.com/ellisonleao/clumsy-bird/blob/fae3d487d5102af29fb3f78431cbd45e9b83aed3/package.json) declares MIT, while [LICENSE.md](https://github.com/ellisonleao/clumsy-bird/blob/fae3d487d5102af29fb3f78431cbd45e9b83aed3/LICENSE.md) contains GPLv3. Keep code status unresolved; also trace bird imagery and audio independently.
- **`hexgl`: file-specific restrictions beneath a permissive default.** The [README](https://github.com/BKcore/HexGL/blob/6addc95a2fce3bf05f4d751823cc054c61a16d68/README.md) expressly preserves per-file exceptions. [ShipControls.js](https://github.com/BKcore/HexGL/blob/6addc95a2fce3bf05f4d751823cc054c61a16d68/bkcore/hexgl/ShipControls.js) and RaceData.js retain CC-BY-NC-3.0 headers. Do not flatten these selected systems to MIT or advertise them as unrestricted commercial components.
- **`gather-it`: missing permission.** The [pinned repository](https://github.com/tweeres04/gather-it/tree/8c74a133c9a2cb98a4bfb53eacafe751a0453286) contains Unity source and a WebGL build, but no discovered root code license. Public source delivery does not authorize extraction. Its Unity runtime is also outside initial Three.js/R3F adapters.
- **Native assets and datasets:** OpenRCT2 requires original game files in the inspected README; OpenTTD separates base media/NewGRFs; 0 A.D., Widelands and other native entries have asset-specific terms. Engine licenses are not blanket asset permission. Details remain attached to each record.
- **San Francisco — The Game:** the [primary page](https://sf.thijs.gg/) is a relevant geospatial lead, but no maintainer source repository was established. Code, map/imagery, dataset and preview permission remain unresolved. See the dated search/page observations in [web methodology](evidence/web-methodology.md). It is not counted as an indexed repository.

## Demo and image evidence

**BrowserQuest (`browserquest`) has no current verified destination.** The historical Mozilla host failed HTTPS DNS resolution during the [recorded URL probes](evidence/web-url-checks.json), so its demo field is `none`. The source remains a historical multiplayer architecture reference. Other destinations, including older HexGL and Clumsy Bird builds, have not been played or checked for asset failures, input behavior or mobile usability. Native download links are not browser-playable demos. Next: bounded browser checks recording initial load, input, exit/restart, errors and the source/build relationship where known.

The later [catalog-wide bounded link audit](evidence/link-checks.json), completed **2026-09-10 at 17:39:05 UTC**, checked 125 unique project/repository/demo/preview URLs: **119 reachable, 1 blocked, 1 restricted and 4 errors**. It supersedes earlier spot probes for present status without rewriting their historical results:

| Affected record / URL | Latest observation | Follow-up |
| --- | --- | --- |
| `fable-cities`: `fablecities.rawscollections.com` | Blocked because DNS resolved to a non-public address. | Keep blocked; validate a public maintainer destination before any further load. Do not bypass the address check. |
| `openrct2`: GitHub user-attachment preview | HTTP 403 after the permitted fallback. | Locate an accessible licensed preview or resolve access through its owner; this does not affect the separate code repository. |
| `hextris`: `hextris.github.io/hextris` and `hextris.io` | Two DNS errors, including failure after a redirect. | Recheck later or locate a current maintainer-linked build; no playable-now claim. |
| `zero-ad`: `play0ad.com/` and `/download/` | Two redirect-limit errors. | Resolve a current canonical download destination; do not follow an unbounded redirect chain. |

The audit did not fetch every immutable evidence URL (`all_evidence: false`). A successful URL response still proves neither playability nor rights, and newer failures must stay visible even if an earlier probe returned 200.

The [media manifest](media-manifest.json), [credits](media-credits.md) and [contact sheet](contact-sheet.jpg) cover 40 separately collected previews. Twelve are historical Commons-hosted images; 28 are record-specific upstream game images collected for the browser expansion. Each keeps its own provenance, terms and source-version relationship. None proves current demo health or playability. Preserve the capture date, source-page revision, attribution and transformations. Independent image review remains the acceptance authority.

The image-backed dashboard now includes record-specific upstream visuals for Racing Game, Ecctrl, Dungeon Forge, Fable Cities, SlimCity and other browser entries. Their manifest permissions are deliberately narrow local research-display decisions; they do not clear public redistribution or game/source reuse. Fable Cities is especially explicit: its [license](https://github.com/rawprogress/fable-cities/blob/aea8b1035030952555395de0c1de14ba693a1427/LICENSE) covers source code, so the dashboard retains a narrower preview scope and does not treat `assets/hero.jpg` as reusable game content. Generated artwork cannot stand in for repository screenshots.

## Integration, quality and coverage

No candidate has been extracted into a target project, built by this research pass or benchmarked. One bounded [CityMaker browser session](play-observations.json) confirmed responsive controls and progression; LAAS and Racing Game have incomplete-load observations and no play verdict. Code-file inspection establishes an implementation lead, not complete correctness. No FPS, memory, load-time, extraction-time or successful-reuse measurements are available. Version ranges do not establish compatibility: the older Racing Game uses Cannon/R3F 8 while current Ecctrl uses Rapier/R3F 9. Native C++/Java/Rust and Godot/Unity examples remain outside initial Three.js/R3F assisted integration unless a separately reviewed adapter is built.

The next quality pass should prioritize the [shortlist](SHORTLIST.md), record full transitive code/asset scope, exercise one narrow component in an isolated target, and capture behavior and lifecycle evidence. Broad labels need normalization before production search: genre/style strings are provisional editorial vocabulary. More contemporary browser platformers, narrative/dialogue systems, inventory/crafting, accessibility/input alternatives and geospatial sources with clear data rights would strengthen the collection. None should be added solely to inflate category counts.

Selected projects do not prove actual reuse. The future automatic royalty log must distinguish selection from incorporated files/components and retain unresolved terms. No creator rate, agreement, payment obligation or settlement has been established by this research.

## Research timing: limited ten-record planning proxy

The initial web author batch covered 23 records in **4.517 minutes of shared elapsed wall time** (17:28:36–17:33:07 UTC). The native author batch covered 20 records in **5.839 minutes** (17:29:06–17:34:56.320282 UTC), documented in [native-batch.json](evidence/native-batch.json). Batches overlapped and used concurrent fetches. Neither includes the complete later independent review, image rights review or correction loop.

An **optimistic 2–3 minute elapsed planning proxy for a ten-record automated source-entrypoint batch** follows from linear scaling: `(4.517 / 23) × 10 = 1.964` minutes for web candidates and `(5.839 / 20) × 10 = 2.920` for native candidates. This assumes the same parallel fetch capacity, cached tool setup, accessible upstreams and deliberately narrow inspection depth. It estimates another batch of this limited activity, not ten sequential human reviews or acceptance-complete research. Fixed overhead, network variance and license conflicts can invalidate the scaling; do not use it to promise completion.

A contiguous first-ten review interval and individual record start/end times were not captured. The arithmetic is not observed first-ten time, a human labor estimate, full source/rights review effort or integration cost. Summing overlapping batches would also not produce elapsed project time. The first-ten complete-review effort remains unmeasured and cannot be responsibly inferred from these timings. Record the next ten from research start through source, image and independent review, retaining active time and wall time separately.

## Estimated source-review effort for the first ten web candidates

**Unvalidated planning estimate, not measured task time.** The first ten entries in `records/web.json` define this pilot cohort in their recorded order. The estimate is for **one experienced human curator assisted by an agent for retrieval and navigation**, reviewing the listed candidate systems, relevant first-hop dependencies, runtime declarations and source/asset notices, then recording the evidence and unresolved decisions. It is intended to help reserve a review session and must be calibrated against a timed pilot.

The bands reflect observed source structure and rights complications in [web-source-audit.json](evidence/web-source-audit.json), [web methodology](evidence/web-methodology.md) and the linked block files in each record. They are editorial judgments rather than output of a measured rate model. Larger source files, shared state, engine lifecycles and conflicting license statements drive wider ranges.

| First-ten record | Estimated active curator time | Observed review drivers |
| --- | ---: | --- |
| `pmndrs-racing-game` | 45–90 min | Vehicle/store/effects coupling, Cannon world and camera ownership; older runtime family; per-asset CC0 claim to scope. |
| `ecctrl` | 60–150 min | Large character and vehicle controllers, gravity/wheel/input stores and Rapier lifecycle; current peer-version requirements. |
| `dungeon-forge` | 90–180 min | Approximately 106 KB shared main.js; RNG, graph, semantic and render state in one module; separate extraction seam needed. |
| `3d-city` | 60–150 min | Simulation and budget depend on Micropolis state; README MIT conflicts with source/license GPLv3 plus terms. |
| `slimcity` | 60–150 min | Economy and routing depend on shared city/road profiles; first-hop dependency mapping and AGPL scope need careful recording. |
| `fable-cities` | 90–180 min | Large road graph, clock/event coupling, separate source-only grant and asset notices; hosted endpoint currently blocked. |
| `gather-it` | 30–75 min | Small Unity worker/shop slices, scene tags and prefab dependencies; missing license means triage can end with unresolved permission. |
| `hextris` | 30–75 min | Small matching/wave files but global board/settings state; GPL terms and currently unresolved demo DNS. |
| `2048` | 20–45 min | Comparatively small rules/storage modules with explicit collaborators; inspect Grid/Tile, serialization and font scope. |
| `clumsy-bird` | 30–90 min | Bird/entity and screen lifecycles use legacy melonJS; contradictory MIT/GPL declarations and uncertain art origin. |
| **Arithmetic total** | **515–1,185 min (8 h 35 min–19 h 45 min)** | Sum of the ten lower and upper bounds, for one curator's active work; not elapsed parallel-agent time. |

These estimates **exclude** upstream builds or execution, full-repository correctness audits, benchmarks, target integration, legal advice, creator-response waiting, complete media clearance and the independent critical review loop. For contradictory or absent permission, the bounded deliverable is a documented blocker; the estimate does not promise resolution. Discovery of deeper dependencies can exceed the upper bound. Do not use the range as a promised build time, a priced commitment, or a claim that the current research already spent those hours.

Keep these effort estimates separate from the measured automated batch timings above. The next pilot should record actual start/end and active review time for each row, scope changes and reviewer findings, then revise the bands.
