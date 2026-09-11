# Independent release-candidate review — recent browser-game catalog

**Verdict: PASS**

**Reviewer:** `/root/critical_review`

**Candidate:** `https://headstart-h2n9addcc-lucasaerbs-projects.vercel.app`

**Deployment:** `dpl_8Z4HxboLH8A6YkD9sL7Z6FRsJECM`

**Packaged revision:** `3f893341cc69e961f0efb0e9ba806544a4e70978`

**Reviewed:** 10 September 2026 EDT / 11 September 2026 UTC

## Decision

The protected Vercel release candidate passes the pre-promotion review. `vercel inspect` reports the exact deployment ID, production target and **Ready** status, with the Python catalog and JavaScript subscribe functions built in `iad1`. I used authenticated `vercel curl` against the exact deployment URL; no alias was promoted.

The packaged snapshot identifies Git revision `3f893341cc69e961f0efb0e9ba806544a4e70978`, 41 research rows, 41 display references and 32 eligible scoped versions. Its SQLite SHA-256 is exactly:

```text
998d05349a14c9dcb40c39b2fb87eb399e74b0d71f4e0fd62f158f1653e30dc4
```

The deployed homepage, `catalog.js`, `app.js`, `styles.css`, world image and corrected P(DOOM) image match the packaged bytes. All 21 local assets directly linked by the homepage and all 41 catalog image URLs returned HTTP 200. The world video accepted a bounded range request with HTTP 206 and the correct 10,194,522-byte resource length.

## Catalog and API verification

- `GET /api/research?limit=50` returned HTTP 200, `headstart-research-api-1`, `research_only`, 41 total and 41 items. The deployed order exactly matches the packaged site catalog: Glenn Explore first, then 2048 and the Godot examples; the toolkit group remains at the end.
- The exact 16 recent IDs are present. A selected-ID request returned P(DOOM), Little Flock and Protocol 99 with their expected demo, repository, stars, language and model attribution data.
- The three source-less OpenAI Sites IDs returned zero selected results. All 51 strict-audit exclusions are absent from the 41 deployed IDs.
- Every deployed record’s `repoUrl`, `demoUrl`, `pinnedSourceUrl`, commit, stars, editorial rank, model provenance, language, player metric and preview object exactly matches the packaged projection. All source and demo URLs use HTTPS.
- The P(DOOM) asset is the corrected Arrival Platform gameplay image. Its deployed bytes match SHA-256 `25b3ddd858038a5bae291cb14208df396c0df95c063b695a0a342dddb5a8a8a2`, and visual inspection agrees with the gameplay-specific alt description.
- `GET /v1/search?q=camera&runtime=Three.js&retrieval=hybrid&limit=10` returned HTTP 200 with seven relevant camera/control systems. Retrieval reported `hybrid`, the pinned MiniLM model version, a populated embedding-index version and no fallback. Lexical and semantic match reasons remained explicitly qualified.

## Failure-boundary verification

The deployed read-only boundary returned:

| Probe | Result |
| --- | --- |
| `/v1/search?limit=0` | 400 `INVALID_QUERY` |
| unknown query field | 400 `INVALID_QUERY` |
| unknown runtime facet | 400 `INVALID_FACET` |
| runtime version without runtime | 422 `UNSUPPORTED_COMBINATION` |
| `POST /api/research` | 405 `METHOD_NOT_ALLOWED` |
| `/runtime/snapshot.json` | 404 |
| `/runtime/catalog.sqlite3` | 404 |
| `/services/catalog/api.py` | 404 |
| unknown `/v1/private` route | 404 `NOT_FOUND` |

API responses use `Cache-Control: no-store` and `X-Content-Type-Options: nosniff`. Static responses use HTTPS with HSTS and the candidate’s no-index policy.

## Static and responsive integrity

The deployed `index.html` contains the current `41 pictured of 41 research records` disclosure, the expected catalog cache key, a responsive viewport, mobile breakpoints and reduced-motion handling. Its exact HTML, JavaScript, CSS and core media bytes match the locally reviewed release package, whose desktop/mobile catalog, detail, empty and email-failure evidence passed the prior independent UI review.

## Nonblocking limits

- This release-candidate check establishes deployment integrity, HTTP behavior and read-only API behavior. It does not turn URL reachability into a gameplay or source/deployment attestation; the product preserves those caveats.
- The deployment is protected and carries `x-robots-tag: noindex`, as expected for this candidate review.

No promotion, alias change, merge, push, deployment creation, subscription write or Sites invocation was performed.
