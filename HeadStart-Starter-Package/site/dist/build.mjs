import { cp, mkdir, rm } from 'node:fs/promises';
// Explicit public allowlist. API sources, package files, dependencies and local env never ship as static files.
await rm('public', { recursive: true, force: true });
await mkdir('public');
for (const path of ['index.html', 'plugin.html', 'styles.css', 'app.js', 'astra-action.js', 'signup.js', 'catalog.js', 'gauntlet-prompt.js', 'NOTICES.md', 'assets', 'downloads', 'provenance']) {
  await cp(path, `public/${path}`, { recursive: true });
}
