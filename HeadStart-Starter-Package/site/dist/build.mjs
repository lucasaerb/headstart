import { cp, mkdir, rm, readFile, readdir } from 'node:fs/promises';
import { verifyPublicAssets } from './verify-assets.mjs';
await verifyPublicAssets();
// Explicit public allowlist. API sources, package files, dependencies and local env never ship as static files.
await rm('public', { recursive: true, force: true });
await mkdir('public');
for (const path of ['index.html', 'plugin.html', 'styles.css', 'app.js', 'astra-action.js', 'detail.js', 'brief-store.js', 'brief-collection.js', 'brief-collection.css', 'signup.js', 'catalog.js', 'gauntlet-prompt.js', 'retrieval-ui.js', 'retrieval-ui.css', 'discovery.js', 'reviewed-systems.js', 'NOTICES.md', 'assets', 'downloads', 'provenance']) {
  await cp(path, `public/${path}`, { recursive: true });
}

// Catalog images have record-specific publication scopes. Ship only bytes referenced
// by the public projection, even when a historical local capture remains in assets.
const catalog=JSON.parse((await readFile('catalog.js','utf8')).replace(/^window.HEADSTART_CATALOG = /,'').trim().replace(/;$/,''));
const displayedImages=new Set(catalog.filter(row=>row.preview?.rightsStatus==='reviewed_for_catalog_display').map(row=>row.preview.src));
for(const name of await readdir('public/assets/catalog')){
  if(!displayedImages.has('assets/catalog/'+name)) await rm('public/assets/catalog/'+name,{recursive:true,force:true});
}
