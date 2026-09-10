import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../../", import.meta.url));
export function pythonCommand() {
  return (
    process.env.HEADSTART_PYTHON ||
    (existsSync(root + ".venv/bin/python")
      ? root + ".venv/bin/python"
      : "python3")
  );
}
export async function catalogHandler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({
      error: {
        code: "METHOD_NOT_ALLOWED",
        message: "Catalog retrieval uses GET.",
        retriable: false,
        action: "Use a GET request.",
      },
    });
  }
  if (req.url.length > 8192)
    return res.status(400).json({
      error: {
        code: "INVALID_QUERY",
        message: "Query is too long.",
        retriable: false,
        action: "Shorten the query.",
      },
    });
  const unavailable = () =>
    res.status(503).json({
      error: {
        code: "CATALOG_UNAVAILABLE",
        message: "The local catalog is unavailable.",
        retriable: true,
        action: "Install Python dependencies and run npm run catalog:init.",
      },
    });
  await new Promise((resolve) => {
    const child = spawn(pythonCommand(), ["-m", "services.catalog.api"], {
      cwd: root,
      stdio: ["pipe", "pipe", "ignore"],
    });
    let output = "",
      finished = false;
    const done = () => {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      resolve();
    };
    const timer = setTimeout(() => {
      child.kill();
      if (!finished) unavailable();
      done();
    }, 10000);
    child.on("error", () => {
      if (!finished) unavailable();
      done();
    });
    child.stdout.on("data", (chunk) => {
      output += chunk;
      if (output.length > 4_000_000) {
        child.kill();
        if (!finished) unavailable();
        done();
      }
    });
    child.on("close", () => {
      if (finished) return;
      try {
        const result = JSON.parse(output);
        res.status(result.status).json(result.body);
      } catch {
        unavailable();
      }
      done();
    });
    child.stdin.on("error", () => {});
    child.stdin.end(JSON.stringify({ url: req.url }));
  });
}
