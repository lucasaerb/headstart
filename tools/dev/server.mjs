import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname } from "node:path";
import { fileURLToPath } from "node:url";
import subscribe from "../../HeadStart-Starter-Package/site/dist/api/subscribe.js";
import { routes, resolveApiRoute } from "./api-routes.mjs";

export const siteRoot = fileURLToPath(
  new URL("../../HeadStart-Starter-Package/site/dist/", import.meta.url),
);
const files = new Set([
  "index.html",
  "plugin.html",
  "styles.css",
  "app.js",
  "astra-action.js",
  "signup.js",
  "catalog.js",
  "gauntlet-prompt.js",
  "discovery.js",
  "reviewed-systems.js",
  "NOTICES.md",
]);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".json": "application/json",
  ".md": "text/plain; charset=utf-8",
  ".zip": "application/zip",
};
export function createDevServer({
  apiRoutes = routes,
  subscribeHandler = subscribe,
} = {}) {
  return http.createServer(async (req, res) => {
    res.status = (code) => {
      res.statusCode = code;
      return res;
    };
    res.json = (value) => {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(value));
    };
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Cache-Control", "no-store");
    try {
      const pathname = decodeURIComponent(
        new URL(req.url, "http://localhost").pathname,
      );
      const handler =
        pathname === "/api/subscribe"
          ? subscribeHandler
          : Object.hasOwn(apiRoutes, pathname)
            ? apiRoutes[pathname]
            : resolveApiRoute(pathname);
      if (handler) {
        await handler(req, res);
        return;
      }
      if (!["GET", "HEAD"].includes(req.method)) {
        res.setHeader("Allow", "GET, HEAD");
        return res.status(405).json({ error: "Method not allowed" });
      }
      const relative = pathname === "/" ? "index.html" : pathname.slice(1);
      if (
        relative
          .split("/")
          .some((part) => part.startsWith(".") || part === "") ||
        !(
          files.has(relative) ||
          /^(assets|downloads|provenance)\//.test(relative)
        )
      )
        return res.status(404).json({ error: "Not found" });
      const target = resolve(siteRoot, relative);
      if (!target.startsWith(resolve(siteRoot) + "/"))
        return res.status(404).json({ error: "Not found" });
      const metadata = await stat(target);
      if (!metadata.isFile())
        return res.status(404).json({ error: "Not found" });
      res.setHeader(
        "Content-Type",
        types[extname(target)] || "application/octet-stream",
      );
      res.setHeader("Content-Length", metadata.size);
      res.end(req.method === "HEAD" ? undefined : await readFile(target));
    } catch (error) {
      if (!res.headersSent)
        res
          .status(
            error.code === "ENOENT" || error.code === "ENOTDIR"
              ? 404
              : error instanceof URIError
                ? 400
                : 500,
          )
          .json({ error: "Request unavailable" });
      else res.end();
    }
  });
}
if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const port = Number(process.env.PORT || 8767);
  if (!Number.isInteger(port) || port < 1 || port > 65535)
    throw new Error("PORT must be an integer from 1 to 65535");
  const server = createDevServer();
  server.listen(port, "127.0.0.1", () =>
    console.log(`HeadStart: http://127.0.0.1:${port}/`),
  );
  for (const signal of ["SIGINT", "SIGTERM"])
    process.on(signal, () => server.close(() => process.exit(0)));
}
