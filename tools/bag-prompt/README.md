# HeadStart Gauntlet Loop prompt v1

A dependency-free, pure formatter for the public metadata in a selected HeadStart bag. It produces a self-contained Markdown planning prompt, beginning with the instruction to ask **“What would you like to build?”**, then guided discovery, generated concept mockups and a user choice before implementation. The implementation phase requires a builder and separate critical reviewer with actual interaction/play tests and screenshot review until PASS.

Load `gauntlet-prompt.js` as a normal browser script and call:

```js
const prompt = HeadStartGauntlet.buildPrompt({games: selectedCatalogRecords, brief: briefText});
```

Node tests use its CommonJS export. Input requires one to three distinct catalog records with IDs/titles and an optional brief string of at most 4,000 characters. The formatter copies an allowlist of bounded metadata, preserves exact public source commits, and never mutates the input. An invalid selection, malformed commit or oversized payload throws an actionable error for the caller to display. It performs no network, file, clipboard or target operations.

Only records explicitly marked `pinned_public_source` can carry source repositories, commits, inspected paths or source evidence. Missing/private source records are inspiration-only, with null source fields; official project and demo references may remain public. URL screening is syntactic, not a fresh availability or visibility check. Non-HTTPS, credential-bearing, local-address and query/fragment URLs are excluded. The catalog's source-availability claim is not independently verified by this formatter.

The reference block is JSON with delimiter characters and backticks escaped, preserving parseable values without letting metadata break Markdown fences or close the reference block. This prevents delimiter breakouts; it does not guarantee that a language model will resist every semantic injection. The prompt explicitly treats metadata and the prefilled brief as untrusted context, keeps unresolved rights honest, and preserves the verified-email gate for platform source delivery. It does not contain source content, provide an automatic bag connection or assume an installed “gauntlet” skill/tool.

The website owner copies this asset into the site and wires clipboard/download actions. This tools directory does not edit or deploy the website.

```sh
node --test tools/bag-prompt/test_gauntlet_prompt.js
```

Tests cover selected source pins, mixed runtimes, input immutability, delimiter attacks, private/missing source suppression, bounds, phase order and the browser global without CommonJS. Independent review must still assess the actual UI flow and the prompt's behavior.
