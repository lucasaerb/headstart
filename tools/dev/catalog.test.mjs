import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { pythonCommand } from "./catalog-handler.mjs";
import { createDevServer } from "./server.mjs";
test("real HTTP catalog routes, signed cursor, selected research and no mutation route", async () => {
  const temp = await mkdtemp(join(tmpdir(), "headstart-api-test-"));
  const before = {
    db: process.env.HEADSTART_CATALOG_DB,
    evidence: process.env.HEADSTART_EVIDENCE_DIR,
  };
  process.env.HEADSTART_CATALOG_DB = join(temp, "catalog.db");
  process.env.HEADSTART_EVIDENCE_DIR = join(temp, "evidence");
  const initialized = spawnSync(
    pythonCommand(),
    ["-m", "services.catalog.initialize"],
    { encoding: "utf8" },
  );
  assert.equal(initialized.status, 0, initialized.stderr);
  const server = createDevServer();
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    let response = await fetch(base + "/v1/search?limit=1");
    assert.equal(response.status, 200);
    const first = await response.json();
    assert.equal(first.total, 32); // 30 reviewed component scopes + 2 parent source scopes.
    response = await fetch(
      base +
        "/v1/search?limit=1&cursor=" +
        encodeURIComponent(first.nextCursor),
    );
    assert.equal(response.status, 200);
    assert.equal((await response.json()).items.length, 1);
    response = await fetch(base + "/v1/search?limit=1&cursor=tampered");
    assert.equal(response.status, 400);
    assert.equal((await response.json()).error.code, "INVALID_CURSOR");
    response = await fetch(base + "/v1/components/2048-tile/versions/1");
    assert.equal(response.status, 200);
    assert.equal((await response.json()).item.readiness, "source_reviewed");
    response = await fetch(base + "/api/research?limit=1");
    assert.equal(response.status, 200);
    const research = await response.json();
    assert.equal(research.eligibility, "research_only");
    assert.equal(research.total, 25);
    response = await fetch(base + "/api/research?ids=" + research.items[0].id);
    assert.equal((await response.json()).items.length, 1);
    response = await fetch(base + "/api/research?ids=openai-sites-void-explorer");
    assert.equal((await response.json()).items.length, 0);
    response = await fetch(base + "/v1/search", { method: "POST" });
    assert.equal(response.status, 405);
    response = await fetch(base + "/v1/search?runtime_version=1");
    assert.equal(response.status, 422);
  } finally {
    await new Promise((resolve) => server.close(resolve));
    for (const [key, value] of [
      ["HEADSTART_CATALOG_DB", before.db],
      ["HEADSTART_EVIDENCE_DIR", before.evidence],
    ])
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    await rm(temp, { recursive: true, force: true });
  }
});
