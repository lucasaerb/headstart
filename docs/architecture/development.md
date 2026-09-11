# Local development

From repository root, install Node 22.22.3 (`nvm use`), npm 10.9.8 and Python3 (3.12 CI; locally exercised3.14.7). Run `npm ci --ignore-scripts`, `python3 -m venv .venv`, `.venv/bin/pip install -r requirements-dev.txt`, `npm run catalog:init`, then `npm run dev`. Open http://127.0.0.1:8767/ . Stop with Ctrl-C. No external server, account or cloud configuration is required for browsing. The local API needs the initialized SQLite catalog; if missing it returns an explicit503 and the UI reports unavailable.

Optional: copy `.env.example` to `.env` to supply your own private Blob storage credentials. With credentials absent email collection reports unavailable and cannot launch its gated demo. Tests inject isolated in-memory storage explicitly; the running application never silently does. Do not use production credentials in tests. Changing PORT requires a matching HEADSTART_ALLOWED_ORIGINS value.

Run `npm run check`, `npm run format:check`, `npm test`, `npm run test:python`, `npm run build`. Build output is disposable `.local-build/`; remove it to reset, or rebuild (the command resets it itself). Source, catalog and user data are not deleted. For browser checks install Chromium with `npx playwright install chromium` then run `npm run test:browser` and `npm run test:discovery`. Foundation screenshots go to `test-results/foundation/`; `SCREENSHOT_DIR` selects a durable review folder. An installed Chrome fallback is available via `HEADSTART_CHROME_CHANNEL=chrome`.

New tool formatting: `npx prettier --write tools/dev .github/workflows package.json`. Existing minified site styling is deliberately untouched. JavaScript syntax checks plus Node integration tests are appropriate to the buildless site; no TypeScript compiler is represented as a type gate. New API handlers attach through `tools/dev/api-routes.mjs` without editing the frontend.

For Python contracts use `python3 -m venv .venv`, `.venv/bin/pip install -r requirements-dev.txt`, then the issue-specific unittest discovery command. Reset only that virtualenv when dependency recreation is needed. Local verification-preview and protected metadata handoffs are available on the reuse branch; real hosted email delivery and source execution require their own adapters and evidence. See `services/auth/README.md` and `services/handoff/README.md`.

`npm run catalog:init` explicitly imports the current research JSON and display projection and idempotently inserts the reviewed2048 two-file scope. It does not run on startup and never resets existing catalog records or tombstones. To refresh an intentionally changed research projection rerun it. Data and the mode0600 cursor signing key live in ignored `.local/`. See `services/catalog/README.md` for backup/reset; stop the server before resetting local metadata and retain evidence. Resetting the signing key intentionally invalidates cursors. `HEADSTART_CATALOG_DB`, `HEADSTART_EVIDENCE_DIR`, and `HEADSTART_PYTHON` override server-owned local paths/interpreter. They never come from visitor input.

The local API uses Python subprocesses and SQLite; `.local-build` is not a standalone hosted API. The stable Vercel catalog uses the separate artifact and function adapter documented in `docs/deployment.md`. New auth, submission, bag and handoff writes on the reuse branch remain localhost-only and require durable hosted adapters before production activation. These development commands do not deploy.

### Public video assets

Git LFS must be installed for the walkthrough video. After a clone with smudging
skipped, run `npm run assets:fetch` from the repository root before building or
running browser media checks. This fetches only `site/dist/assets/*.mp4` LFS
objects; it does not download the separate root demo or walkthrough source media.
CI performs the same selective pull. Both local and Vercel build entry points
reject unresolved LFS pointers anywhere under public assets and name this command.
`npm run test:media` checks the 320/390/1440 header and real video decoding/playback,
including pause/reset on dialog close and Escape. No video content is changed.

### Reviewed local reuse flows

Start the private development verification adapter with `HEADSTART_AUTH_DELIVERY=preview HEADSTART_AUTH_ORIGIN=http://127.0.0.1:8767 npm run dev`. Browse normally; request a scoped handoff from a reviewed system to preserve its selection through verification. Follow `services/auth/README.md` to read the local delivery preview in the same browser. This tests the verification flow without sending email. Sign-out revokes the browser session and paired MCP credentials.

The plugin setup page explains package extraction, explicit connection configuration, browser-approved local MCP pairing and fallback downloads. Its connection check establishes service reachability, while actual installation acknowledgment comes from the client. `services/handoff/README.md` documents the immutable prepared bag, metadata/notices artifacts and rights revalidation. Research collections and prepared source scopes are distinct; only explicitly prepared eligible selections become automatic MCP context.

Use isolated local databases and preview directories for testing. Run `npm run test:auth`, `npm run test:submissions`, `npm run test:handoff`, and `npm run test:plugin-setup` for browser flows. Install `tests/mcp/requirements.txt` in a separate environment and pass its Python as `HEADSTART_MCP_PYTHON` to `npm run test:mcp` for the real SDK protocol checks. No production credentials are required.

The current plugin is version 0.7.0 with twelve skills. Bounded integration commands and the exact supported Three.js reference matrix are documented under `tools/integration/`; R3F and general cross-engine conversion are not established by that matrix. Run `npm run test:integration` for local guards. Runtime validation requires the pinned isolated browser image and explicit authorization described there.

Run `npm run test:recipes` and `npm run test:operations` for the recommendation and health/privacy browser flows. Recipe compositions remain candidates even when a constituent has passing reference evidence. Optional actual MCP lookup and first-plan collection uses the separate checkout wrapper in `services/operations/INSTRUMENTATION.md`; the packaged plugin collects nothing through it by default. Scheduling, private operational storage and consent are local capabilities, not a hosted production service.
