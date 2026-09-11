import { cp, mkdir, rm } from 'node:fs/promises';
import { verifyPublicAssets } from './verify-assets.mjs';
await verifyPublicAssets();
// Explicit public allowlist. API sources, package files, dependencies and local env never ship as static files.
await rm('public', { recursive: true, force: true });
await mkdir('public');
for (const path of ['index.html', 'plugin.html', 'auth.html', 'auth.js', 'handoff.js', 'auth.css', 'submissions.html', 'submissions.js', 'submissions.css', 'styles.css', 'app.js', 'astra-action.js', 'detail.js', 'brief-store.js', 'brief-collection.js', 'brief-collection.css', 'signup.js', 'catalog.js', 'gauntlet-prompt.js', 'retrieval-ui.js', 'retrieval-ui.css', 'discovery.js', 'reviewed-systems.js', 'NOTICES.md', 'assets', 'downloads', 'provenance']) {
  await cp(path, `public/${path}`, { recursive: true });
}
