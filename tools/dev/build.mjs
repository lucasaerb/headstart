import { cp, mkdir, rm, readFile, readdir } from "node:fs/promises";
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
const catalog = JSON.parse(
  (await readFile(`${siteRoot}/catalog.js`, "utf8"))
    .replace(/^window.HEADSTART_CATALOG = /, "")
    .trim()
    .replace(/;$/, ""),
);
const displayedImages = new Set(
  catalog
    .filter(
      (row) => row.preview?.rightsStatus === "reviewed_for_catalog_display",
    )
    .map((row) => row.preview.src),
);
for (const name of await readdir(new URL("assets/catalog/", output))) {
  if (!displayedImages.has("assets/catalog/" + name))
    await rm(new URL("assets/catalog/" + name, output), {
      recursive: true,
      force: true,
    });
}
console.log("Built .local-build (static assets; APIs remain server handlers).");
