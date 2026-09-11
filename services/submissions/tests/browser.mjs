import assert from "node:assert/strict";
import { spawn, spawnSync } from "node:child_process";
import { mkdtemp, cp, mkdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { chromium, expect } from "@playwright/test";
const temp = await mkdtemp(join(tmpdir(), "headstart-submission-test-"));
const origin = "http://127.0.0.1:8895";
await cp(".local/catalog.sqlite3", join(temp, "catalog.db"));
const env = {
  ...process.env,
  PORT: "8895",
  HEADSTART_AUTH_ORIGIN: origin,
  HEADSTART_AUTH_DB: join(temp, "auth.db"),
  HEADSTART_CATALOG_DB: join(temp, "catalog.db"),
};
const seeded = spawnSync(
  ".venv/bin/python",
  [
    "-c",
    `import json\nfrom services.auth.store import connect,issue,verify,authorize\ndb=connect();id,token=issue(db,'curator@example.invalid','binding',{'action':'account','bagRevision':'a'*64,'selections':[]},'test');session,csrf,_=verify(db,id,token,'binding');print(json.dumps({'session':session,'account':authorize(db,session,'session')['account']}))`,
  ],
  { env, encoding: "utf8" },
);
assert.equal(seeded.status, 0, seeded.stderr);
const identity = JSON.parse(seeded.stdout);
env.HEADSTART_CURATOR_ACCOUNTS = identity.account;
const server = spawn(process.execPath, ["tools/dev/server.mjs"], {
  env,
  stdio: "ignore",
});
let browser;
try {
  for (let i = 0; i < 50; i++) {
    try {
      if ((await fetch(origin)).ok) break;
    } catch {}
    await new Promise((r) => setTimeout(r, 100));
  }
  const post = (path, body, headers = {}) =>
    fetch(origin + path, {
      method: "POST",
      headers: { origin, "content-type": "application/json", ...headers },
      body: JSON.stringify(body),
    });
  assert.equal((await fetch(origin + "/api/curator/submissions")).status, 403);
  assert.equal(
    (
      await post(
        "/api/submissions",
        { repository: "https://github.com/x/y", description: "camera" },
        { origin: "https://evil.example" },
      )
    ).status,
    403,
  );
  assert.equal(
    (
      await post("/api/submissions", {
        repository: "https://127.0.0.1/r",
        description: "camera",
      })
    ).status,
    400,
  );
  browser = await chromium.launch({
    channel: process.env.HEADSTART_CHROME_CHANNEL || "chrome",
  });
  const captures = process.env.SCREENSHOT_DIR || "test-results/curator-submissions";
  await mkdir(captures, { recursive: true });
  for (const [name, viewport] of [
    ["desktop", { width: 1440, height: 1100 }],
    ["mobile", { width: 390, height: 844 }],
  ]) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    await page.goto(origin + "/submissions.html");
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
    );
    await page.screenshot({
      path: `${captures}/${name}-submission.png`,
      fullPage: true,
    });
    await page
      .getByLabel("Repository URL")
      .fill("https://github.com/test-owner/game-" + name);
    await page
      .getByLabel("Description", { exact: true })
      .fill("Useful browser camera; synthetic test suggestion.");
    const createdResponse = page.waitForResponse(response => response.url() === origin + "/api/submissions" && response.request().method() === "POST");
    await page.getByRole("button", { name: "Send for review" }).click();
    const created = await (await createdResponse).json();
    assert.equal(typeof created.id, "string");
    await page
      .getByRole("heading", { name: "Your suggestion is in the queue." })
      .waitFor();
    await page.screenshot({
      path: `${captures}/${name}-saved.png`,
      fullPage: true,
    });
    await page.locator("#curator summary").click();
    await page.getByRole("button", { name: "Load private queue" }).click();
    await page.getByText("Curator access required", { exact: true }).waitFor();
    await page.screenshot({
      path: `${captures}/${name}-unauthorized.png`,
      fullPage: true,
    });
    await context.addCookies([
      {
        name: "hs_session",
        value: identity.session,
        url: origin,
        httpOnly: true,
        sameSite: "Strict",
      },
    ]);
    await page.getByRole("button", { name: "Load private queue" }).click();
    await page.locator(".queue-item").first().waitFor();
    await page.screenshot({
      path: `${captures}/${name}-queue.png`,
      fullPage: true,
    });
    const first = page.locator(".queue-item").filter({ hasText: created.id });
    await expect(first).toHaveCount(1);
    await expect(first).toContainText("Revision 1");
    await first.getByRole("button", { name: "View immutable history" }).click();
    await expect(first.getByRole("button", { name: "View immutable history" })).toBeDisabled();
    await page.screenshot({
      path: `${captures}/${name}-history.png`,
      fullPage: true,
    });
    await first
      .getByLabel("Decision", { exact: true })
      .selectOption("approved");
    await first.getByRole("button", { name: "Save reviewed revision" }).click();
    await first
      .getByText("Invalid proposal, evidence, or unresolved review fields", {
        exact: true,
      })
      .waitFor();
    await page.screenshot({
      path: `${captures}/${name}-review-error.png`,
      fullPage: true,
    });
    await first
      .getByLabel("Unresolved blocking fields (one per line)", { exact: true })
      .fill("");
    await first
      .getByLabel("Reviewed evidence (one reference per line)", { exact: true })
      .fill("Synthetic test: source and rights review reference");
    await first.getByRole("button", { name: "Save reviewed revision" }).click();
    await first
      .getByText("Saved revision 2. Reload the queue before further edits.", {
        exact: true,
      })
      .waitFor();
    await page.locator("#kind").selectOption("rights_report");
    await page.getByLabel("Source ID", { exact: true }).fill("2048-tile-v1");
    await page
      .getByLabel("Description", { exact: true })
      .fill("Synthetic rights concern");
    await page.screenshot({
      path: `${captures}/${name}-report.png`,
      fullPage: true,
    });
    await context.close();
  }
  console.log("Submission HTTP security and desktop/mobile flows PASS");
} finally {
  await browser?.close();
  server.kill();
  await rm(temp, { recursive: true, force: true });
}
