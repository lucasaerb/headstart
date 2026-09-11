import { spawn } from "node:child_process";
import { timingSafeEqual } from "node:crypto";
import { fileURLToPath } from "node:url";
import { pythonCommand } from "../../tools/dev/catalog-handler.mjs";
import { authenticateRequest } from "../../tools/dev/auth-handler.mjs";
const root = fileURLToPath(new URL("../../", import.meta.url));
const limits = new Map();
const equal = (a, b) =>
  typeof a === "string" &&
  typeof b === "string" &&
  Buffer.byteLength(a) === Buffer.byteLength(b) &&
  timingSafeEqual(Buffer.from(a), Buffer.from(b));
export async function submissionsHandler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  const url = new URL(req.url, "http://localhost");
  const map = {
    "/api/submissions": "submission",
    "/api/corrections": "correction",
    "/api/rights-reports": "rights_report",
    "/api/appeals": "appeal",
    "/api/submissions/status": "status",
    "/api/submissions/ownership": "ownership",
    "/api/curator/submissions": "queue",
  };
  const match = url.pathname.match(
    /^\/api\/curator\/submissions\/([a-f0-9]{32})$/,
  );
  const action = match
    ? req.method === "GET"
      ? "history"
      : "review"
    : map[url.pathname];
  if (!action || url.search)
    return res.status(404).json({ error: "Unknown review route" });
  const expected =
    action === "queue" || action === "history"
      ? "GET"
      : action === "review"
        ? "PATCH"
        : "POST";
  if (req.method !== expected) {
    res.setHeader("Allow", expected);
    return res.status(405).json({ error: "Unsupported method" });
  }
  const curator = ["queue", "history", "review"].includes(action);
  let actor;
  if (curator) {
    const principal = await authenticateRequest(req);
    if (
      !principal ||
      !(process.env.HEADSTART_CURATOR_ACCOUNTS || "")
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean)
        .includes(principal.account)
    )
      return res.status(403).json({ error: "Curator access required" });
    actor = principal.account;
    if (
      action === "review" &&
      !equal(req.headers["x-csrf-token"], principal.csrf)
    )
      return res
        .status(403)
        .json({ error: "Refresh the session before editing" });
  }
  if (req.method !== "GET") {
    if (
      !process.env.HEADSTART_AUTH_ORIGIN ||
      req.headers.origin !== process.env.HEADSTART_AUTH_ORIGIN
    )
      return res.status(403).json({ error: "Same-origin submission required" });
    if (
      !String(req.headers["content-type"] || "").startsWith("application/json")
    )
      return res.status(415).json({ error: "JSON required" });
    const key = req.socket.remoteAddress;
    const now = Date.now();
    for (const [k, v] of limits) if (now - v.start > 60000) limits.delete(k);
    const limit = limits.get(key) || { start: now, count: 0 };
    limit.count++;
    limits.set(key, limit);
    if (limit.count > 30)
      return res
        .status(429)
        .json({ error: "Too many requests; retry in one minute" });
  }
  let data = {};
  if (req.method !== "GET") {
    let body = "";
    for await (const chunk of req) {
      body += chunk;
      if (Buffer.byteLength(body) > 16384)
        return res.status(413).json({ error: "Submission too large" });
    }
    try {
      data = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: "Invalid JSON" });
    }
  }
  await new Promise((resolve) => {
    const child = spawn(pythonCommand(), ["-m", "services.submissions.api"], {
      cwd: root,
      stdio: ["pipe", "pipe", "ignore"],
    });
    let output = "",
      done = false;
    const finish = (status, body) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      res.status(status).json(body);
      resolve();
    };
    const timer = setTimeout(() => {
      child.kill();
      finish(503, { error: "Review queue timed out" });
    }, 10000);
    child.on("error", () => finish(503, { error: "Review queue unavailable" }));
    child.stdout.on("data", (chunk) => {
      output += chunk;
      if (output.length > 2000000) {
        child.kill();
        finish(503, { error: "Queue response too large" });
      }
    });
    child.on("close", () => {
      try {
        const result = JSON.parse(output);
        finish(result.status, result.body);
      } catch {
        finish(503, { error: "Review queue unavailable" });
      }
    });
    child.stdin.on("error", () => {});
    child.stdin.end(JSON.stringify({ action, data, actor, id: match?.[1] }));
  });
}
