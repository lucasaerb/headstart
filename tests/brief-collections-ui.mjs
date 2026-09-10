import { chromium, expect } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { createDevServer } from "../tools/dev/server.mjs";
const server = createDevServer();
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;
const output =
  process.env.SCREENSHOT_DIR || "docs/reviews/game-brief-collections/evidence";
await mkdir(output, { recursive: true });
const browser = await chromium.launch(
  process.env.HEADSTART_CHROME_CHANNEL
    ? { channel: process.env.HEADSTART_CHROME_CHANNEL }
    : {},
);
try {
  for (const [name, viewport] of [
    ["desktop", { width: 1440, height: 1000 }],
    ["mobile", { width: 390, height: 844 }],
  ]) {
    const page = await browser.newPage({ viewport, reducedMotion: "reduce" });
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(base);
    await expect(page.locator(".game-card")).toHaveCount(12);
    await page
      .locator('[data-save-id="2048"][data-save-kind="project"]')
      .click();
    await expect(
      page.locator('[data-save-id="2048"][data-save-kind="project"]'),
    ).toHaveAttribute("aria-pressed", "true");
    await page.locator("#reviewed-systems > summary").click();
    await expect(page.locator(".reviewed-system")).toHaveCount(12);
    await page
      .locator('[data-save-id="2048-tile"][data-save-kind="component"]')
      .click();
    await page.locator("#project-open").click();
    await page.screenshot({ path: `${output}/${name}-brief-initial.png` });
    await page.locator("[name=experience]").fill("A quiet city builder");
    await page
      .getByText("Optional constraints & assumptions", { exact: true })
      .click();
    await page.locator("[name=runtime]").fill("Three.js");
    await page.locator("[name=runtime-origin]").selectOption("inferred");
    await page.locator("[name=device]").fill("Mid-range phone");
    await page.locator("[name=preserve]").fill("Existing camera controller");
    await page.screenshot({ path: `${output}/${name}-brief-edit.png` });
    await page.getByRole("button", { name: "Save brief", exact: true }).click();
    await expect(page.locator("#project-dialog")).toContainText("Revision 1");
    await page.getByRole("button", { name: "Saved", exact: true }).click();
    await expect(page.locator(".project-save")).toHaveCount(2);
    for (const box of await page.locator(".project-save input").all())
      await box.check();
    await page.screenshot({ path: `${output}/${name}-saved.png` });
    await page.getByRole("button", { name: "Compare", exact: true }).click();
    await expect(page.locator(".project-compare")).toContainText(
      "Known dependencies",
    );
    await expect(page.locator(".project-compare")).toContainText("Unknown");
    await page.screenshot({ path: `${output}/${name}-compare.png` });
    if (
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      )
    )
      throw Error("Page overflow " + name);
    if (
      await page
        .locator("#project-dialog")
        .evaluate((d) => d.scrollWidth > d.clientWidth)
    )
      throw Error("Dialog overflow " + name);
    const downloadPromise = page.waitForEvent("download");
    await page
      .getByRole("button", { name: "Export project", exact: true })
      .click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe("headstart-project.json");
    await page.reload();
    await page.locator("#project-open").click();
    await expect(page.locator("[name=runtime]")).toHaveValue("Three.js");
    await expect(page.locator("[name=runtime-origin]")).toHaveValue("inferred");
    await page.getByRole("button", { name: "Saved", exact: true }).click();
    await expect(page.locator(".project-save")).toHaveCount(2);
    await page
      .locator("#project-dialog")
      .getByRole("button", { name: "Close", exact: true })
      .click();
    await page.evaluate(() => {
      const k = "headstart.project.v1",
        s = JSON.parse(localStorage.getItem(k));
      s.saved[0].version = "retained-older-version";
      localStorage.setItem(k, JSON.stringify(s));
    });
    await page.reload();
    await page.locator("#project-open").click();
    await page.getByRole("button", { name: "Saved", exact: true }).click();
    await expect(page.locator(".project-save").first()).toContainText(
      "Newer catalog version",
    );
    await page.screenshot({ path: `${output}/${name}-stale.png` });
    await page
      .locator("#project-dialog")
      .getByRole("button", { name: "Close", exact: true })
      .click();
    await page.evaluate(() => {
      const key = "headstart.project.v1";
      const data = JSON.parse(localStorage.getItem(key));
      data.saved[0].id = "removed-reference";
      localStorage.setItem(key, JSON.stringify(data));
    });
    await page.reload();
    await page.locator("#project-open").click();
    await page.getByRole("button", { name: "Saved", exact: true }).click();
    await expect(page.locator(".project-save").first()).toContainText(
      "Unavailable in current catalog",
    );
    await page.screenshot({ path: `${output}/${name}-unavailable.png` });
    page.once("dialog", (d) => d.accept());
    await page
      .getByRole("button", { name: "Reset project", exact: true })
      .click();
    await expect(page.locator("[name=runtime]")).toHaveValue("");
    await page.getByRole("button", { name: "Saved", exact: true }).click();
    await expect(page.locator("#project-dialog")).toContainText("No saved");
    await page.reload();
    await page.evaluate(() =>
      localStorage.setItem("headstart.project.v1", "{damaged"),
    );
    await page.reload();
    await page.locator("#project-open").click();
    await expect(page.locator(".project-warning")).toContainText("Damaged");
    await page.screenshot({ path: `${output}/${name}-recovery.png` });
    const nestedRaw = JSON.stringify({
      schemaVersion: 1,
      brief: { revision: 1, history: [null], constraints: {} },
      saved: [],
    });
    await page.evaluate(
      (raw) => localStorage.setItem("headstart.project.v1", raw),
      nestedRaw,
    );
    await page.reload();
    await page.locator("#project-open").click();
    await expect(page.locator(".project-warning")).toContainText(
      "left untouched",
    );
    await page
      .locator("[name=experience]")
      .fill("Keep my existing recovery data");
    await page.getByRole("button", { name: "Save brief", exact: true }).click();
    expect(
      await page.evaluate(() => localStorage.getItem("headstart.project.v1")),
    ).toBe(nestedRaw);
    const recoveryDownload = page.waitForEvent("download");
    await page
      .getByRole("button", { name: "Export recovery copy", exact: true })
      .click();
    const exported = await recoveryDownload;
    const stream = await exported.createReadStream();
    let bytes = "";
    for await (const chunk of stream) bytes += chunk.toString();
    expect(bytes).toBe(nestedRaw);
    await page.screenshot({
      path: `${output}/${name}-nested-recovery-preserved.png`,
    });
    await page.close();
    const denied = await browser.newPage({ viewport, reducedMotion: "reduce" });
    await denied.addInitScript(() => {
      Storage.prototype.setItem = function () {
        throw Error("disabled");
      };
    });
    await denied.goto(base);
    await denied.locator("#project-open").click();
    await denied
      .getByText("Optional constraints & assumptions", { exact: true })
      .click();
    await denied.locator("[name=runtime]").fill("Godot");
    await denied
      .getByRole("button", { name: "Save brief", exact: true })
      .click();
    await expect(denied.locator(".project-warning")).toContainText("not saved");
    await expect(denied.locator("[name=runtime]")).toHaveValue("Godot");
    await denied.screenshot({ path: `${output}/${name}-storage-disabled.png` });
    await denied.close();
    expect(errors).toEqual([]);
  }
  console.log("Brief/collection desktop and mobile flows PASS");
} finally {
  await browser.close();
  await new Promise((r) => server.close(r));
}
