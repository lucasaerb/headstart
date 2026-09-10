# Production catalog release review

Independent reviewer: `/root/production_reviewer`. Author: `/root/production_adapter`. Review date: 2026-09-10. Target domain: `https://headstart-virid.vercel.app`.

## Review status

**PASS — final candidate is accepted for promotion.** All blocking findings were fixed and independently retested. Production alias assignment and post-promotion smoke verification remain the parent release operator’s next steps.

## Candidate 1 and blocking finding

Source: `bebe4e0c2c15d66c7571cd61d6766a6b3dee485f`. Artifact: `/tmp/headstart-production-release-v1`. Candidate: `https://headstart-9j5bdylg6-lucasaerbs-projects.vercel.app`, deployment `dpl_4Da8A7b8cBVxinjFwGHMb8UmFHK3`.

Real Vercel HTTP found `/v1/search?limit=1` returned 400: `Unknown or duplicate query field: path`. The wildcard rewrite injected its capture as a query parameter. This blocks eligible search aliases and component detail requests. Author is replacing wildcard captures with noncapturing route matching; query validation must remain strict. Candidate 1 must not be promoted.

## Independent evidence

- Inspected actual adapter, packager, route configuration, existing subscribe function, catalog bridge/store and local ONNX retrieval. No frontend source changes in adapter commit.
- Nine packaged-artifact tests passed with actual pinned model: hybrid inference, cursor paging/tamper rejection, component detail, unsupported hard filters, method/errors, local parity, missing model lexical fallback, missing secret fail-closed, recursive static/private boundaries, database/evidence/model byte integrity.
- Catalog snapshot digest: `4467e8045e51f564e43a9f8348ee396ee8d26ae2ba28ee19a0d96707c7863cc4`. Snapshot records 76 research/display references and 32 eligible scoped versions. These are not 32 integration-tested systems.
- Actual candidate `/api/research?q=driving` returned four items with hybrid mode, pinned MiniLM model revision and an embedding index digest. Remote inference runs, not a simulated hybrid label.
- Candidate `/api/catalog/search` worked, including zero results for Godot and integration-tested hard filters and 400 for tampered cursor/unknown fields.
- HTTP private paths for database, model, manifest, services, contracts, `.env` and package metadata returned 404. `/api/subscribe.js` invokes the Node function and returns method 405; it does not expose its source. See `production-evidence/candidate1-http.json` (the initial script expected 404 for that function alias; observed 405 is safe handler execution).
- Browser desktop/mobile discovery suite passed against actual candidate: API results, paging/back, list/filter/reload, search, exact empty state, unsupported filter, injected 503/retry, bag retention, scoped listing, demo email modal, Astra clipboard/popup fallback and removable browser email preference. Failure fixtures and synthetic browser preferences are labeled test interactions; they do not establish durable storage.
- Browser desktop/mobile retrieval suite passed: interpreted intent, actual retrieval state, exact-word switching, empty recovery and clear support limits.
- Header/walkthrough suite passed at 320, 390 and 1440 widths: plugin/GitHub buttons, no horizontal overflow, actual MP4 decode/playback and pause/reset on close/Escape.
- Inspected actual desktop C4 hero and mobile filter screenshots. Existing world/bridge/companion, navy/blue typography, light controls and responsive filter layout remain aligned with the reviewed local implementation.

Deployment access used the existing authenticated Vercel CLI and a short-lived deployment-scoped bypass cookie stored privately outside Git. No protection setting was disabled and no token/cookie was written into evidence. Browser tests use Chrome through Playwright. Screenshots are under `production-evidence/`.

## Storage and scope

The deployment packages immutable metadata/evidence and the pinned model privately. Catalog initialization and source intake remain offline; the public adapter accepts only GET/HEAD. SQLite/vector writes are disposable per-function scratch, never claimed as durable user storage. Signup still uses private Vercel Blob, with purpose-separated hashing and explicit optional marketing consent. No verified-email identity, automatic website-bag MCP connection, source integration, royalty accounting or payment service is established by this release.

Parent operator independently reported a real candidate synthetic demo-access submission returned 200, verified its private Blob record as unverified/not-sent with no updates record, deleted it and verified absence. This is operator-reported persistence evidence, separate from this reviewer's browser/API checks. No outbound email was sent.


## Final candidate and accepted correction

Source: `7a3a587bef353810dfdb3d08e784de3c4323ca25`. Artifact: `/tmp/headstart-production-release-v2`. Candidate: `https://headstart-fzfbzcdil-lucasaerbs-projects.vercel.app`. Deployment: `dpl_Bj9R1Rhi4KhU9WVg34KMYQ2oBXiQ`.

Artifact tree SHA-256: `8f7a5dbcff27b262449d1098f61e712a1b4d7aaacbff8da220880b43a445e980`. This hashes compact JSON of sorted `[relative path, file SHA-256]` pairs for 282 files, excluding `.vercel`, `__pycache__` and `node_modules`. Snapshot and pinned model bytes remain unchanged from candidate 1. The production Python bundle requires the explicit Vercel large-functions build setting documented by the author; the corrected candidate built successfully.

The author replaced capture-producing rewrites with noncapturing `routes` patterns and retained strict query validation. Independently reran all **10** packaged-artifact tests, including the new route regression and recursive private-file/digest checks: PASS.

Final real HTTP checks: `/v1/search` and signed cursor continuation return 200 with distinct results; project details return 200; unknown project returns 404; a user-supplied `path` query and tampered cursor still return 400; mutation returns 405. Real hybrid inference returns an embedding index digest. Godot and integration-tested hard filters retain zero eligible results. All tested internal database/model/config/source paths remain inaccessible. Both subscribe route forms invoke the function rather than serving source; invalid email returns 400 without persisting data. See `production-evidence/candidate2-http.json`.

Reran full **desktop/mobile discovery and detail browser suites on the final deployment**, including actual immutable component detail retrieval, source tours, all scoped pages, separate demo/reuse status, injected unavailable detail recovery, accessible modal return and the existing demo email gate. The external-launch storage response in the detail suite is deliberately stubbed; durable Blob evidence is the separately reported operator check above. Discovery, details and 320/390/1440 header/real walkthrough MP4 suites all PASS on the final candidate. The brief/collection and retrieval suites passed on candidate 1 with identical frontend, services and model bytes; the only subsequent runtime change was route configuration. Actual final detail routing was retested, not inferred.

Downloaded the real final candidate plugin from `plugin.html`: `downloads/headstart-plugin-0.3.0.zip`, 444333 bytes, SHA-256 `3644bcc2f48975f996d979be3e6ade7aca8276133acb8b4b86fc1d4dd512d1f3`; exact match to the packaged reviewed release. No unverified 0.4.0 plugin was substituted.

Visually inspected final desktop C4 hero and mobile component detail alongside earlier mobile hero/filter and comparison captures. Readable controls, reachable content, existing world composition and responsive dialog wrapping are preserved. No blocking aesthetic or functional regressions were found. Representative screenshots are retained in Git; `screenshot-manifest.json` records every captured screenshot digest, with remaining temporary captures at `/tmp/headstart-production-review-full-evidence`.

**Final independent verdict: PASS for deployment `dpl_Bj9R1Rhi4KhU9WVg34KMYQ2oBXiQ` and source `7a3a587bef353810dfdb3d08e784de3c4323ca25`.** This accepts the current reviewed website/catalog release, not completion of the remaining product backlog or a production performance/load guarantee.
