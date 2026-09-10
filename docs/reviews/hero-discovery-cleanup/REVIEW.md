# Hero discovery cleanup and remembered email — independent review

## Review identity and revision

- Issue contract: `docs/planning/hero-discovery-cleanup.md`
- Coder/author: `/root/hero_search_author`
- Critical reviewer: `/root/hero_email_reviewer` (independent from the author)
- Reviewed implementation source revision: `914e0a0` (`Harden combined hero and demo email flow`)
- Author handoff revision: `508b91c`
- Repository HEAD during final checks: `a5587b936857201ddaae39d4586c869608a9503e` (later deployment-documentation commits do not alter the reviewed implementation files)

The reviewer inspected the implementation and tests rather than relying on the author summary. The source hashes at final review were:

- `index.html`: `d444b2bd94a71dc0ba358f327ddf0445df4ef9d041531c1097e3fc9897d71915`
- `app.js`: `d48791e61b157e467afe51526a7b643b7db334765a620b42a3394bc6ff7e6c9e`
- `signup.js`: `39fc7b7faa25b731900ff92fad35771bc5c8daafad0672f73eaa0e197890bd9a`
- `styles.css`: `9b592d0ca219741066657b6d808dfd36242004e4f66c0351760b0c477d0bbe9f`
- `astra-action.js`: `4190e2b33d2c15f9acb28adc379f21819f131db3010f45a599ac0bc2232bd58a`
- `AGENTS.md`: `8458f1b9bcafd1c3f9f04128ac0e23322df364a0e48538be80e191f09e1247ca`
- `site/README.md`: `f319f6830bf3c9c17a33445e65df5a55aac39d46b5dfdc238df1690ce3a3869b`

Unrelated supplied media, walkthrough work and the root README remained outside this review.

## Acceptance coverage

| Acceptance criterion | Independent evidence | Result |
| --- | --- | --- |
| Remove the nonfunctional hero prompt, mapping, idea strip and edit path | Actual HTML/JS/CSS inspection and focused static regression test; the rendered hero contains only `Browse all games` as its primary discovery CTA and has no homepage signup | PASS |
| Browse CTA reaches the real catalog accessibly | Browser activation focused `#library-title`; after smooth scrolling it was 62 px from the viewport top | PASS |
| Real catalog search and reset remain functional | Browser query `zzzz-no-match` produced `0 of 69 projects`, the visible empty state and zero cards; reset restored `69 of 69 projects` and 69 cards | PASS |
| Bag, remix brief, Gauntlet export and Astra continuation remain | Browser selected CityMaker, Hollowflux and Kyoto Higashiyama, persisted the three IDs and the brief `A coastal builder with racing and mysterious ruins.`, regenerated the Gauntlet prompt, and enabled Download and Continue with Astra; formatter and Astra unit suites also passed | PASS |
| Remember only after a successful demo save | Browser-mocked successful `/api/subscribe` stored normalized `reviewer@test.example` under `headstart.remembered-email.v1`; a server rejection left storage empty, retained input, kept the form visible and kept launch hidden | PASS |
| Later demos bypass the prompt without URL rewriting | After success, a second demo click reached the normal-link path without the signup listener preventing it, left the dialog closed, and retained the exact `https://tideglass-drowned-vein.openai.chatgpt.site/` URL | PASS |
| Remembered state is visible and can be forgotten | Reload displayed the address plus “isn’t an account or verified address” in the footer; Forget email removed the record, hid the panel and announced the change through its live region | PASS |
| Failure, timeout, corrupt and blocked storage fail safely | Live rejection and corrupt-record reload were exercised in Chrome; corrupt data did not unlock demos. Focused client tests cover timeout and unavailable storage, including current-page use after a confirmed server save without falsely claiming cross-reload persistence | PASS |
| No implied marketing consent | The real fresh dialog request sent `updates: false`; tests independently cover `updates: true` only after the checkbox is explicitly selected. No homepage updates form remains | PASS |
| Responsive C4/C4b presentation and accessibility | Fresh current captures at 1440×1000, 390×844 and 320×844 were visually inspected. Browser measurements gave `scrollWidth === innerWidth` at 390 and 320. Hero copy, CTA, controls, companion, bridge, header and art crop do not overlap or clip; the 320 heading wraps intentionally. Focus styling and motion control remain present | PASS |
| No page console or build errors | Puppeteer evaluation output reported no console errors during the exercised states; syntax, test, build and diff checks passed | PASS |

## Commands and outcomes

- `node --test tools/site/hero-cleanup.test.mjs tools/signup/client.test.mjs tools/signup/subscribe.test.mjs HeadStart-Starter-Package/site/dist/astra-action.test.mjs` — **26/26 passed**.
- `node tools/bag-prompt/test_gauntlet_prompt.js` — **6/6 passed**.
- `node --check` for `app.js`, `signup.js`, and `astra-action.js` — passed.
- `node build.mjs` from `HeadStart-Starter-Package/site/dist` — passed with no output or error.
- `git diff --check` — passed.
- Baseline SHA-256 verification — C4 `81f0dd99b3891c0ecd33605544e99617c5eaf8a803baf737c4b1597e44f0a8f9`; C4b `a3c9f03a9c41a4866586130c20c18ab2a5d01026c967d4f47ecd13b00e2403be`.

## Visual evidence

- `evidence/desktop-1440x1000.png` — SHA-256 `549349ba001e870ad2147816d824882d0e7fea2f04090a7d6c30418a70bd7ec4`
- `evidence/mobile-390x844.png` — SHA-256 `e32720555ae8e6153766e673878ef477e79c696ef77fa9d9310a115b73d6c80b`
- `evidence/mobile-320x844.png` — SHA-256 `3f2eac18ee8f29c488096a96845f6d2c4a1564cdcccb28e610a11adcad421f21`
- `evidence/footer-remembered.png` — a live remembered-email footer state showing the normalized address, unverified-language boundary and visible Forget email action.

The captures preserve the selected C4/C4b living-world hierarchy and C5 responsive intent. The missing hero form and homepage signup are intentional current-user deviations. The simplified desktop hero gains useful open space; on mobile the header remains a compact two-row layout, the CTA is dominant, and the castle/bridge/companion remain legible below it. No blocking visual deviation was found.

## Review rounds and findings

The first inspection was invalidated when concurrent Astra/footer work created conflicts in the shared checkout. Review stopped immediately without editing product files. After the author reconciled at `914e0a0`, all screenshots and browser evidence were regenerated from the combined implementation. No blocking findings remain in the final round.

## Final verdict

**PASS** — both requested outcomes and the combined no-homepage-signup/Astra direction are implemented and independently verified at the source hashes above.

Known nonblocking limit: remembered email is intentionally a convenience for the same browser profile. It is not cross-device identity, verification, an account, or authorization for protected source/code handoffs.
