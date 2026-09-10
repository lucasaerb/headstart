# Browser-game and capability research evidence

Author: `research_web` (coder/author subagent). Initial batch measured with the clock tool from 2026-09-10 17:28:36 UTC to 17:33:07 UTC, or 4.517 minutes of shared wall time across 23 records. This is not a per-record labor estimate. HTTPS follow-up checks occurred at 17:34:07 UTC; reviewer-requested rights corrections followed. An independent reviewer must supply the acceptance verdict.

## Scope and claim origins

`records/web.json` contains 23 research candidates and 47 candidate systems. GitHub API metadata provided repository identity, immutable commits and file trees. README, actual license files, dependency manifests and selected matching source files were fetched at those commits; source entry points and relevant implementation excerpts were inspected statically. No upstream code was installed or executed.

`web-source-audit.json` lists the fetched files, immutable URLs, UTF-8 byte lengths and SHA-256 digests. `web-inspected-files.json` identifies the additional source/notice paths selected after initial metadata/license reads. `web-metadata.json` preserves repository identifiers and branch metadata but omits large unrelated trees. `web-url-checks.json` records subsequent HTTPS reachability probes. The full text used during research is retained temporarily at `/tmp/headstart-web-research/` for the independent reviewer; immutable source URLs and hashes are the durable audit mechanism.

Genres, camera/style labels and selection reasons are editorial classifications derived from README/source context, not measured quality or playtest observations. Camera, control and platform lists are discovery descriptors, not a tested compatibility matrix. `source_inspected` means a matching implementation entry point was seen; it does not mean an entire file, dependency tree, lifecycle or integration has passed review. Broad summaries are original editorial prose. Measured frame rate, load time, runtime correctness and extracted component portability remain unknown.

Every suggested reuse scope remains `review_required`. Every external demo remains `not_tested`. An HTTP 200 response is only reachability evidence. A maintainer-linked demo is not proof that the deployed build matches the pinned source commit. All preview URLs are upstream references; none were downloaded, republished or cleared by this author.

## Rights and compatibility exceptions

- **3d.city:** README's MIT claim conflicts with GPLv3 plus additional terms in LICENSE/COPYING and the inspected simulation source headers. Whole-project code status stays unresolved.
- **Clumsy Bird:** package.json declares MIT while LICENSE.md contains GPLv3. Code status stays unresolved after independent reviewer identified this additional contradiction.
- **HexGL:** README explicitly permits per-file exceptions to MIT; inspected ship/replay files retain CC-BY-NC-3.0 headers. These selected files must not be presented as permissive commercial reuse candidates.
- **Gather It:** no root license was found. Unity WebGL demo is maintainer-linked, but absent code permission blocks source reuse and Unity code is outside initial Three.js/R3F integration support.
- **Fable Cities:** code is present despite the stale metadata description. LICENSE covers source code only; asset notices cover listed `public/assets/` files. Promotional `assets/hero.jpg` is not automatically cleared by either statement.
- **BrowserQuest:** MPL-2.0 code and CC-BY-SA-3.0 content are distinct. Historical Mozilla demo failed HTTPS DNS resolution; no current demo is advertised as usable.
- **Racing Game and Ecctrl:** inspected runtime families differ (older React 18/R3F 8/Cannon versus React 19/R3F 9/Rapier). Being part of the Three.js ecosystem does not prove compatibility.

## San Francisco — The Game: unresolved research lead

Primary page: [sf.thijs.gg](https://sf.thijs.gg/), opened 2026-09-10. The page exposes geospatial exploration, camera/vehicle controls, place search and Apple/OpenStreetMap notices. These are page observations, not tested features or a source implementation audit. No source repository link was present in the retrieved page. Searches for `"sf.thijs.gg" github` and `"San Francisco" "thijs" game github` did not establish a maintainer-published source repository.

This lead is deliberately absent from the structured repository inventory: repository identity, commit, code permission, map/dataset permission, preview permission and source/demo relationship remain unresolved. Next action is to locate an explicit maintainer repository/license and then review the geospatial dataset and imagery grants independently. Do not infer open-source or reusable status from publicly delivered browser JavaScript, a news article or the visible map notices. No outreach was sent.
