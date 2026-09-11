import { cp, mkdir, rm } from "node:fs/promises";
import { siteRoot } from "./server.mjs";
import { verifyPublicAssets } from "../../HeadStart-Starter-Package/site/dist/verify-assets.mjs";
await verifyPublicAssets();
// One explicit public allowlist; no API sources, secrets or research evidence exposed.
const output = new URL("../../.local-build/", import.meta.url);
await rm(output, { recursive: true, force: true });
await mkdir(output);
for (const file of [
  "index.html",
  "plugin.html",
  "plugin-setup.js",
  "plugin-setup.css",
  "auth.html",
  "auth.js",
  "handoff.js",
  "auth.css",
  "recipes.html",
  "operations.html",
  "operations.js",
  "telemetry.js",
  "operations.css",
  "recipes.js",
  "recipes.css",
  "submissions.html",
  "submissions.js",
  "submissions.css",
  "styles.css",
  "app.js",
  "astra-action.js",
  "detail.js",
  "brief-store.js",
  "brief-collection.js",
  "brief-collection.css",
  "signup.js",
  "catalog.js",
  "gauntlet-prompt.js",
  "discovery.js",
  "retrieval-ui.js",
  "retrieval-ui.css",
  "reviewed-systems.js",
  "NOTICES.md",
  "assets",
  "downloads",
  "provenance",
])
  await cp(`${siteRoot}/${file}`, new URL(file, output), { recursive: true });
console.log("Built .local-build (static assets; APIs remain server handlers).");
