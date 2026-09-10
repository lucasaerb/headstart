import test from "node:test";
import assert from "node:assert/strict";
import { createDevServer } from "./server.mjs";
import { createHandler } from "../../HeadStart-Starter-Package/site/dist/api/subscribe.js";
test("local browsing, private paths, API extension and honest missing email storage", async () => {
  const server = createDevServer({
    subscribeHandler: createHandler({ env: {} }),
    apiRoutes: { "/api/test": async (req, res) => res.json({ ok: true }) },
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    const home = await fetch(base);
    assert.equal(home.status, 200);
    assert.match(await home.text(), /HeadStart/);
    for (const path of [
      "/package.json",
      "/api/subscribe.js",
      "/.env",
      "/assets/%2e%2e/package.json",
      "/missing",
    ])
      assert.equal((await fetch(base + path)).status, 404, path);
    assert.deepEqual(await (await fetch(base + "/api/test")).json(), {
      ok: true,
    });
    const response = await fetch(base + "/api/subscribe", {
      method: "POST",
      headers: {
        origin: "http://127.0.0.1:8767",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: "dev@example.com",
        website: "",
        consentVersion: "headstart-updates-2026-09-10",
      }),
    });
    assert.equal(response.status, 503);
    assert.match((await response.json()).message, /unavailable/);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
