import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { pythonCommand } from "./catalog-handler.mjs";
const root = fileURLToPath(new URL("../../", import.meta.url));
export function credential(req) {
  const bearer = req.headers.authorization;
  if (bearer?.startsWith("Bearer ")) return bearer.slice(7);
  return cookie(req, "hs_session");
}
function cookie(req, name) {
  return (
    (req.headers.cookie || "")
      .split(";")
      .map((v) => v.trim())
      .find((v) => v.startsWith(name + "="))
      ?.slice(name.length + 1) || ""
  );
}
export function callPython(module, value) {
  return new Promise((resolve) => {
    const child = spawn(pythonCommand(), ["-m", module], {
      cwd: root,
      stdio: ["pipe", "pipe", "ignore"],
    });
    let output = "",
      done = false;
    const finish = (result) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      resolve(result);
    };
    const unavailable = {
      status: 503,
      body: { error: { code: "SERVICE_UNAVAILABLE" } },
    };
    const timer = setTimeout(() => {
      child.kill();
      finish(unavailable);
    }, 15000);
    child.on("error", () => finish(unavailable));
    child.stdout.on("data", (chunk) => {
      output += chunk;
      if (output.length > 4000000) {
        child.kill();
        finish(unavailable);
      }
    });
    child.on("close", () => {
      try {
        finish(JSON.parse(output));
      } catch {
        finish(unavailable);
      }
    });
    child.stdin.on("error", () => {});
    child.stdin.end(JSON.stringify(value));
  });
}
export async function requestData(req) {
  let body = "";
  for await (const chunk of req) {
    body += chunk;
    if (Buffer.byteLength(body) > 24000) throw new Error("REQUEST_TOO_LARGE");
  }
  return {
    method: req.method,
    url: req.url,
    body: body ? JSON.parse(body) : {},
    credential: credential(req),
    binding: cookie(req, "hs_binding"),
    origin: req.headers.origin || "",
    contentType: req.headers["content-type"]?.split(";")[0],
    csrf: req.headers["x-csrf-token"] || "",
    client: req.socket.remoteAddress,
  };
}
export async function authenticateRequest(req) {
  const result = await callPython("services.auth.api", {
    method: "GET",
    url: "/api/auth/session",
    credential: cookie(req, "hs_session"),
  });
  return result.body?.state === "verified" ? result.body : null;
}
export async function authHandler(req, res) {
  try {
    const result = await callPython(
      "services.auth.api",
      await requestData(req),
    );
    if (result.cookies) res.setHeader("Set-Cookie", result.cookies);
    res.setHeader("Referrer-Policy", "no-referrer");
    res.status(result.status).json(result.body);
  } catch (error) {
    res
      .status(error.message === "REQUEST_TOO_LARGE" ? 413 : 400)
      .json({ error: { code: "INVALID_REQUEST" } });
  }
}

// Protected source operations use cookie+CSRF in browsers, or a separately typed
// approved MCP credential. Never let a browser session bypass CSRF as a bearer.
export async function handoffHandler(req, res) {
  try {
    const request = await requestData(req);
    const bearer = req.headers.authorization?.startsWith("Bearer ");
    if (!bearer) {
      const principal = await authenticateRequest(req);
      if (!principal)
        return res
          .status(401)
          .json({ error: { code: "VERIFICATION_REQUIRED" } });
      if (
        req.method !== "GET" &&
        (request.origin !== process.env.HEADSTART_AUTH_ORIGIN ||
          request.contentType !== "application/json" ||
          request.csrf !== principal.csrf)
      )
        return res.status(403).json({ error: { code: "CSRF_REJECTED" } });
    } else if (req.headers.origin) {
      return res
        .status(403)
        .json({ error: { code: "BROWSER_BEARER_REJECTED" } });
    }
    const result = await callPython("services.handoff.api", {
      method: request.method,
      url: request.url,
      body: request.body,
      credential: request.credential,
      credentialKind: bearer ? "mcp" : "browser",
    });
    if (result.headers)
      for (const [key, value] of Object.entries(result.headers)) {
        if (["Content-Type", "Content-Disposition"].includes(key))
          res.setHeader(key, value);
      }
    res.status(result.status);
    if (typeof result.body === "string") res.end(result.body);
    else res.json(result.body);
  } catch {
    res.status(400).json({ error: { code: "INVALID_REQUEST" } });
  }
}
