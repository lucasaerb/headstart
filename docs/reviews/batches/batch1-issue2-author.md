# Issue 2 author evidence

2026-09-10, branch `feat/backlog-batches`, author `/root/batch1_foundation`. Independent review pending; this record does not close the issue.

Implemented Node 22.22.3/npm 10.9.8 root workspace lockfile, loopback dev server, explicit static allowlist, existing real signup handler, typed error responses, syntax/format/unit/browser/build commands and CI. Preserved C4 application design. Updated the Vercel build allowlist to include its existing Gauntlet prompt script. ADR and commands: `docs/architecture/ADR-001-local-foundation.md`, `development.md`.

Validation: fresh copied source snapshot with no node_modules at `/var/folders/_l/rxr56sr56711tlz_23rl9q8h0000gn/T/headstart-foundation-fresh-jzgqbftz`: `npm ci --ignore-scripts`, `npm run check`, `npm test` (12/12), `npm run build` passed. The source is uncommitted pending batch review, so this is a fresh snapshot installation rather than a falsely claimed committed checkout. npm audit reports zero vulnerabilities after selecting Playwright1.63.0. Original1.55.0 was rejected due its browser download advisory.

Workspace `npm run format:check` and `HEADSTART_CHROME_CHANNEL=chrome SCREENSHOT_DIR=docs/reviews/batches/evidence/issue2 npm run test:browser` passed at desktop1440×1000/mobile390×844, actual installed Chrome. Screenshots include home, empty/reset and unavailable email storage states. Browser test exercised real catalog rendering, visible plugin CTA, no horizontal overflow/JS errors, plugin route and honest email503. No actual email or credentials used. Author viewed mobile capture: original type/prompt/plugin CTA maintained; no new visual chrome.

Digests: server.mjs `d652bc887ed259c8258e3e9b2df899b5eef20f4da9e823a2d85a24648a7b16ac`; package-lock.json `c34ecfa64cfe0221e27ba814a4c6ced989f61ee7b39ed4e6eda424fc13fe23b5`; unchanged index.html `8e06df01c853caa2b4989dba1c80ed4beee4a7d9bf2076e8b388180b990a5e05`; unchanged styles.css `37fa23bf5b9d8c3ceb94e854436bb9aac6dae64443ec8b163b8e94998d4edf65`. Subsequent #5 adds API routing and must be reviewed at final batch digest.

Limits: no deployed CI run or Vercel deployment in this task; static catalog has no network loading state, existing empty state and API email error are captured. New dynamic catalog boundaries belong to #5/#6. Browser smoke is not full C4 animation, game integration, identity or royalty verification. Root AGENTS guidance merge is parent-owned.
