# HeadStart stable site release review

Date: 2026-09-10. Scope: the user-authorized stable snapshot, Vercel static hosting readiness, and a working download/install path for the existing MCP plugin. This review does not approve unimplemented bag synchronization, source delivery, game remixing or royalties.

- Author: `/root/release_author`.
- Independent reviewer: `/root/release_reviewer`.
- Reviewed files: SHA-256 values in [digests.json](evidence/release-review/digests.json). These identify the exact staged release before its commit, independently extracted from the Git index. Concurrent unstaged Gauntlet work is excluded.
- Final local release-readiness verdict: **PASS**. Production smoke verification follows deployment separately.

## Independent checks

Served exactly the staged `HeadStart-Starter-Package/site/dist` as the web root from `/tmp/headstart-stable-release` on port 8773, mirroring the proposed Vercel output boundary. Re-ran the full bounded browser check against this isolated snapshot after discovering concurrent unrelated worktree edits; all final screenshots and digests correspond to the staged release. Tested Chromium via Playwright at 1440×1000, 390×844 and 320×844. The landing page renders 43 catalog cards without JavaScript errors. The plugin page has no horizontal page overflow at all three widths, and the catalog has none at mobile width. Its relative asset, home, games and ZIP links work from the production-style root. Storyboard links point at the actual shipping `feat/plugin-discovery` branch.

Clicked the actual download control in the browser: `headstart-plugin-0.3.0.zip` downloaded successfully. Independently rebuilt the distribution and confirmed byte-for-byte equality with the browser download and the shipped archive. SHA-256: `3644bcc2f48975f996d979be3e6ade7aca8276133acb8b4b86fc1d4dd512d1f3`. All per-file checksum entries match the 26-entry archive. Seven independent distribution tests passed, including reproducibility, secret/build-helper exclusions, symlink rejection and safe failure behavior.

Inspected archive paths, the README installation instructions, hidden marketplace manifest and MCP configuration. Instructions agree with the distribution template; the archive retains `.agents`, uses a relocatable `${PLUGIN_ROOT}` MCP command, and includes no upstream game code/images. Downloading is correctly distinguished from client installation and acknowledgment. The page explicitly identifies website bag sync, source delivery, automatic remixing and royalty services as unavailable. The existing client installation review remains the evidence for actual Codex compatibility; this release review does not install into or replace the user's configured marketplace.

Inspected dist file inventory and text for environment files, local absolute paths, localhost endpoints and credential-related content. No exposed credentials or private local paths were found in the inspected publication payload. Vercel configuration scopes output to this static directory; generated media and explicit provenance/notices are intentional assets. Parent independently scanned the staged snapshot for secrets and excluded `.vercel`, environment files and node_modules.

## Visual acceptance

Viewed actual independent screenshots: [landing desktop](evidence/release-review/landing-desktop.png), [plugin desktop](evidence/release-review/plugin-1440.png), [plugin mobile](evidence/release-review/plugin-390.png), [plugin narrow mobile](evidence/release-review/plugin-320.png), [library desktop](evidence/release-review/library-desktop.png), [library mobile](evidence/release-review/library-mobile.png). Machine observations are in [checks.json](evidence/release-review/checks.json).

The landing retains the selected C4/C4b castle, open sea, smaller companion and foreground bridge composition documented in `docs/design/C4-FINAL-STORYBOARD.md`. The new download page consistently uses the current navy/blue typography, background and rounded controls; its primary download action and installation sequence remain clear on desktop and mobile. At 320px the command block scrolls internally, preserving intact commands without page overflow. This is acceptable and nonblocking. Download links in the footer and explanatory dialogs make the plugin accessible without falsely suggesting connected bag behavior. Visual acceptance for this bounded release change: **PASS**.

## Limits

This is an unsigned local plugin preview with bundled research metadata. Linux/Windows installation remains unverified. The review establishes static release readiness and download integrity, not a shared production catalog backend, authenticated handoff, royalty agreement or settlement service. Existing landing/video review records remain the evidence for the unchanged ambient-video controls.

## Production smoke verification — PASS

Independently verified [headstart-virid.vercel.app](https://headstart-virid.vercel.app) after deployment of stable commit `4a3bbc2` (release cleanup `411bb7d`), deployment `headstart-8vfm5nniy-lucasaerbs-projects.vercel.app`. Public home and plugin routes load without authentication. Repeated desktop, 390px and 320px browser checks: 43 catalog cards, no JavaScript errors, no page overflow, successful actual ZIP download. The served HTML, CSS, JavaScript, catalog and ZIP each match the reviewed staged SHA-256 exactly; see [production hashes](evidence/release-review/production/hashes.json).

The production video decodes at 1620×1080, advances its playback time, and pauses using the world control. Independently viewed the live mobile landing and plugin captures: the world composition, primary action and download/install flow remain legible. Evidence is under [production checks](evidence/release-review/production/checks.json), [video checks](evidence/release-review/production/video.json), [mobile landing](evidence/release-review/production/landing-mobile.png), and [mobile plugin](evidence/release-review/production/plugin-390.png). The production smoke verdict is **PASS** for this bounded static release.
