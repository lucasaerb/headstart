# OpenAI Sites games — author evidence

Date: 10 September 2026  
Status: implementation complete; independent review pending

## Added records

- `openai-sites-void-explorer` — [official showcase](https://developers.openai.com/showcase/void-explorer), [live game](https://void-explorer.openai.chatgpt.site/), official article image `orbital-flight-579e20d663e3.webp`.
- `openai-sites-sunwake` — [official showcase](https://developers.openai.com/showcase/sunwake), [live game](https://sunwake-the-last-light.openai.chatgpt.site/), official article image `sunwake-water-f1c48b3f7fe8.webp`.
- `openai-sites-hollowflux` — [official showcase](https://developers.openai.com/showcase/hollowflux), [live game](https://tideglass-drowned-vein.openai.chatgpt.site/), official article image `hollowflux-water-15cd30282861.webp`.

[Thomas Ricouard's OpenAI article](https://developers.openai.com/blog/how-to-build-games-with-astra) supplies the creator context and game descriptions. Each showcase credits Thomas Ricouard/OpenAI and labels the game GPT-6 Astra. The records use official descriptions for discovery leads only. Void Explorer records TypeScript, Vite, Three.js and WebGPU/WebGL evidence; Sunwake records the article's Three.js water-renderer evidence; Hollowflux stays at browser/TypeScript with no renderer inferred.

No inspected official page links a public source repository, immutable source revision, code license or source export for these projects. Each record therefore has a null source commit/license, unresolved code and asset rights, `review_required` reuse status, and no source-inspected building block. The official gameplay images have their original CDN bytes, dimensions, hashes and article provenance. `LicenseRef-OpenAI-Official-Image-Rights-Unresolved` scopes them to the user-directed local dashboard and does not claim public redistribution or asset-reuse permission.

## Generated results

- Research catalog: 76 records / 153 candidate blocks; 147 are source-inspected and six Sites leads are maintainer-described.
- Dashboard: 40 independently approved image-backed records. The three Sites records and authentic official images remain in research; projection requires an independent reviewer/timestamp/PASS stamp.
- Plugin bundle: remains 52 independently accepted link-only records. Its source-catalog digest was refreshed; the three new records remain excluded while independent discovery review is pending.
- Dashboard review/image gaps: [36 exact records](../../../../research/catalog/IMAGE-GAPS.md): 26 audited candidates, three official OpenAI images awaiting independent approval and seven records without a defensible stable image.

## Checks run

```text
python3 research/catalog/scripts/catalog.py validate
PASS: 76 research records; 69 checked research image files; 40 dashboard rows after review gating

python3 -m unittest discover -s research/catalog/scripts -p 'test_*.py'
Ran 45 tests — OK

python3 -m unittest discover -s HeadStart-Starter-Package/headstart-plugin/tests -p 'test_*.py'
Ran 13 tests — OK

python3 -m py_compile research/catalog/scripts/catalog.py research/catalog/scripts/build_site_catalog.py research/catalog/scripts/collect_browser_previews.py research/catalog/scripts/media_contact_sheet.py
node --check HeadStart-Starter-Package/site/dist/app.js
PASS

Live destination checks
Void Explorer: HTTP 200
Sunwake: HTTP 200
Hollowflux: HTTP 200
```

Reliable final desktop/mobile Chrome captures were not produced in this author pass because the headless capture process repeatedly returned blank or stale error frames; independent responsive capture and detail/bag interaction review remain pending. HTTP reachability does not establish successful play, source/deployment parity, mobile compatibility or an editorial “fun” recommendation.
