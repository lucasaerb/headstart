import { chromium, expect } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { createDevServer } from "../tools/dev/server.mjs";
const server = createDevServer();
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;
const output =
  process.env.SCREENSHOT_DIR ||
  "docs/reviews/hybrid-search-evaluation/evidence";
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
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(
      base + "?systems_open=1&systems_q=low-poly+orbit+camera+controls#games",
    );
    await expect(page.locator("#retrieval-systems")).toBeVisible();
    await page.locator("#retrieval-systems summary").click();
    await expect(page.locator("#retrieval-systems")).toContainText("low poly");
    await expect(page.locator("#retrieval-systems")).toContainText(
      "camera controls",
    );
    await expect(page.locator("#retrieval-systems")).toContainText(
      "does not establish tested support",
    );
    await page.locator("#retrieval-systems").scrollIntoViewIfNeeded();
    await page.screenshot({ path: `${output}/${name}-interpretation.png` });
    await expect(page.locator(".retrieval-reason").first()).toBeVisible();
    await page
      .locator("#retrieval-systems")
      .getByRole("button", { name: "Use exact words", exact: true })
      .click();
    await expect(page).toHaveURL(/systems_retrieval=lexical/);
    await expect(page.locator("#retrieval-systems summary")).toHaveText(
      "Using word matches",
    );
    await page.locator("#retrieval-systems summary").click();
    await expect(page.locator("#retrieval-systems")).toContainText(
      "original words",
    );
    await page.screenshot({ path: `${output}/${name}-lexical-fallback.png` });
    await page.locator("#systems-query").fill("zzzznotaplausiblesystem9988");
    await page.locator("#systems-search button").click();
    await expect(page.locator("#systems-status")).toContainText(
      "No reviewed systems",
    );
    await page.locator("#systems-status").scrollIntoViewIfNeeded();
    await page.screenshot({ path: `${output}/${name}-empty-recovery.png` });
    await page.locator("#systems-query").fill("");
    await page.locator("#systems-search button").click();
    await expect(page.locator(".reviewed-system")).toHaveCount(12);
    await page.goto(base + "?q=worker+economies#games");
    await expect(page.locator("#retrieval-research")).toBeVisible();
    await page.locator("#retrieval-research summary").click();
    await expect(page.locator("#retrieval-research")).toContainText(
      "worker economy",
    );
    await page.locator("#retrieval-research").scrollIntoViewIfNeeded();
    await page.screenshot({
      path: `${output}/${name}-research-interpretation.png`,
    });
    if (
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      )
    )
      throw Error("Overflow " + name);
    expect(errors).toEqual([]);
    await page.close();
  }
  console.log("Retrieval UI desktop/mobile PASS");
} finally {
  await browser.close();
  await new Promise((r) => server.close(r));
}
