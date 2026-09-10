# Browser/model expansion — final independent review

Reviewer: `/root/critical_review`
Reviewed at: 10 September 2026, 20:21 UTC
Verdict: **PASS** for the bounded local research catalog and dashboard expansion.

This review covers the 73-record research catalog, 40-row image-backed dashboard projection, AI-model attribution, category/runtime presentation, popularity observations, image provenance, and bounded gameplay observations. It does not authorize public publication, source delivery, integration, model-quality claims, or broader asset reuse.

Exact reviewed-file and evidence-image digests are recorded in `reviewed-files-final.json`.

## Acceptance coverage

| Criterion | Result | Evidence |
| --- | --- | --- |
| Browser and Three.js expansion | PASS | The research catalog contains 73 records. The 30-record browser/model expansion includes 23 Three.js-family entries. The 40 displayed image-backed records include 29 browser entries and 25 Three.js-family entries. |
| Record identity, categories and rights limits | PASS | Validation passes for pinned source identity, repository/provider relationships, building-block evidence, record kinds and separate code/asset limits. Games, demos, toolkits and engines remain distinct categories. |
| Model attribution | PASS | Creator-attributed model data is exact and evidence-linked. The dashboard exposes 7 GPT-6 Astra, 4 Fable 5.1 and 1 Fable 5 image-backed results. Unknown and unverified claims do not receive preferred-model labels. LAAS's pinned README supports its bounded Fable 5 attribution. |
| Authentic images and provenance | PASS for local research-preview scope | Every displayed row has a record-specific local image with a digest matching the canonical media manifest. Image source and license evidence remain separate UI links. The 40-image contact sheet was visually inspected. All 28 new originals were independently re-fetched and matched; six rate-limited re-fetch failures belonged to the previously reviewed historical Wikimedia set. The 28 new manifest rows and repeatable collector now name `/root/critical_review` and retain the independent-review timestamp and verdict. |
| Categorization and hard filters | PASS | Genre, Category, Platform, Style, Runtime and Made with controls are present. Projection and search tests preserve exact model/runtime/category data and do not promote unverified model claims. Prior browser interaction verified combined filters and the empty result without silently relaxing constraints. |
| Popularity and recommendation boundaries | PASS | Repository stars remain dated repository-scoped observations. CityMaker is the sole curator pick after a representative Chrome session in which score changed from 0 to 4, Hutong unlocked and persistence was reported. LAAS and Poimandres are explicitly `load_incomplete`; neither receives a fun or successful-interaction verdict. |
| Dashboard semantics | PASS | Current native Chrome accessibility inspection found `40 of 40 projects`, 40 named images, the Category control, Astra/Fable 5/Fable 5.1 labels, CityMaker's dated curator-pick status, and the dated incomplete-load disclosures for LAAS and Poimandres. Source, demo and bag controls remain exposed. |
| Desktop/mobile visual acceptance | PASS | `current-desktop.jpg` shows the current 40-image grid, complete filter row and representative crops without overlap or clipping. At a 400 × 770 responsive viewport, `current-mobile-devtools.jpg` shows a clean two-column filter layout with Category and full-width model/sort controls; `current-mobile-cards-devtools.jpg` shows the 40/40 count and CityMaker's image, categories, Three.js runtime, GPT-6 Astra label, actions and curator status without horizontal overflow. Prior mobile source-dialog and bag captures cover those unchanged responsive states. |

The DevTools console in the current mobile captures reports zero application errors. Its visible warnings come from a browser extension content script and are outside the site bundle.

## Independent checks

```text
python3 -m unittest discover -s research/catalog/scripts -p 'test_*.py'
44 tests passed

python3 -m unittest discover -s HeadStart-Starter-Package/playparts-plugin/tests -p 'test_*.py'
13 tests passed

node --check HeadStart-Starter-Package/site/dist/app.js
node --check HeadStart-Starter-Package/site/dist/catalog.js
passed

python3 research/catalog/scripts/catalog.py validate
PASS: 73 research records; 40 checked image files

build_site_catalog.py with --require-previews and --site-index against temporary outputs
catalog.js and index.html matched exactly

sync_site_provenance.py
Synced provenance for 40 displayed rows and 40 images
```

Additional assertions confirmed 28 newly reviewed media stamps, 40 unique media-to-record mappings, 40 dashboard images with matching SHA-256 values, three bounded play observations, exactly one editorial pick (`open-city-maker`), and two `load_incomplete` observations (`fable5-laas` and `pmndrs-racing-game`).

## Remaining product limits

The research database contains link-only candidates that are intentionally absent from the image-backed dashboard. One short CityMaker session supports one bounded editorial recommendation; it does not establish that the wider catalog is universally fun, that demos match source commits, or that any component is integration-tested. Model attribution remains a creator-reported workflow fact, separate from quality and rights. Public redistribution and broader reuse still require their own rights review.
