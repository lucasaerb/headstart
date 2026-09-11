import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createDevServer } from "./server.mjs";

test("real HTTP verification, session cookie, replay, CSRF and anonymous browsing", async () => {
  const dir = await mkdtemp(join(tmpdir(), "headstart-auth-test-"));
  const before = { ...process.env };
  process.env.HEADSTART_AUTH_DB = join(dir, "auth.sqlite3");
  process.env.HEADSTART_AUTH_PREVIEW_DIR = join(dir, "preview");
  process.env.HEADSTART_AUTH_DELIVERY = "preview";
  const server = createDevServer();
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const origin = "http://127.0.0.1:" + server.address().port;
  process.env.HEADSTART_AUTH_ORIGIN = origin;
  const intent = {
    action: "prepare_handoff",
    bagRevision: "a".repeat(64),
    selections: [{ id: "sample", version: "v1", kind: "component" }],
  };
  const post = (path, body, headers = {}) =>
    fetch(origin + "/api/auth/" + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: origin,
        ...headers,
      },
      body: JSON.stringify(body),
    });
  try {
    assert.equal((await fetch(origin + "/")).status, 200);
    assert.equal(
      (
        await post(
          "challenge",
          { email: "a@example.invalid", intent },
          { Origin: "https://evil.invalid" },
        )
      ).status,
      403,
    );
    const issued = await post("challenge", {
      email: "a@example.invalid",
      intent,
    });
    assert.equal(issued.status, 202);
    const binding = issued.headers.getSetCookie()[0].split(";")[0];
    const data = await issued.json();
    const preview = JSON.parse(
      await readFile(join(dir, "preview", data.challenge + ".json"), "utf8"),
    );
    const link = new URL(preview.url);
    assert.equal(link.search, "");
    const fragment = new URLSearchParams(link.hash.slice(1));
    const body = {
      challenge: fragment.get("challenge"),
      token: fragment.get("token"),
    };
    const verified = await post("verify", body, { Cookie: binding });
    assert.equal(verified.status, 200);
    const cookie = verified.headers.getSetCookie()[0].split(";")[0];
    const result = await verified.json();
    assert.deepEqual(result.intent, intent);
    assert.equal((await post("verify", body, { Cookie: binding })).status, 401);
    const session = await (
      await fetch(origin + "/api/auth/session", { headers: { Cookie: cookie } })
    ).json();
    assert.equal(session.state, "verified");
    assert.equal((await post("logout", {}, { Cookie: cookie })).status, 403);
    assert.equal(
      (
        await post(
          "logout",
          {},
          { Cookie: cookie, "X-CSRF-Token": session.csrf },
        )
      ).status,
      200,
    );
    assert.equal(
      (
        await (
          await fetch(origin + "/api/auth/session", {
            headers: { Cookie: cookie },
          })
        ).json()
      ).state,
      "anonymous",
    );
    assert.equal((await fetch(origin + "/.local/auth.sqlite3")).status, 404);
  } finally {
    await new Promise((r) => server.close(r));
    for (const key of Object.keys(process.env))
      if (!(key in before)) delete process.env[key];
    Object.assign(process.env, before);
    await rm(dir, { recursive: true, force: true });
  }
});
