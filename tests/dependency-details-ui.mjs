import { chromium, expect } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { createDevServer } from "../tools/dev/server.mjs";
const server = createDevServer();
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;
const output =
  process.env.SCREENSHOT_DIR || "docs/reviews/batches/evidence/dependency-fix";
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
    await page.goto(base + "?systems_open=1&systems_q=OrbitControls#games");
    const save = page.locator('[data-save-id="three-orbitcontrols"]');
    await expect(save).toBeVisible();
    await save.click();
    const card = save.locator("xpath=..");
    await card
      .getByRole("button", { name: "Inspect component", exact: true })
      .click();
    await expect(page.locator("#source-content")).toContainText(
      "Three.js 0.186.0 · reference only",
    );
    await expect(page.locator("#source-content")).toContainText(
      "React Three Fiber version unknown",
    );
    await expect(page.locator("#source-content")).toContainText(
      "three · requires · required · constraint 0.186.0",
    );
    await expect(page.locator("#source-content")).toContainText(
      "resolved version unknown",
    );
    await expect(
      page.getByRole("link", { name: "Inspect dependency manifest ↗" }),
    ).toHaveAttribute("href", /\/blob\/[a-f0-9]{40}\/package.json$/);
    await page.screenshot({ path: `${output}/${name}-detail.png` });
    await page.locator('[data-close="source-dialog"]').click();
    await page.locator("#project-open").click();
    await page.getByRole("button", { name: "Saved", exact: true }).click();
    await expect(page.locator(".project-save")).toHaveCount(1);
    await page.locator(".project-save input").check();
    await page.getByRole("button", { name: "Compare", exact: true }).click();
    await expect(page.locator(".project-compare")).toContainText(
      "Three.js 0.186.0 · reference only",
    );
    await expect(page.locator(".project-compare")).toContainText(
      "React Three Fiber version unknown",
    );
    await expect(page.locator(".project-compare")).toContainText(
      "three · requires · required · constraint 0.186.0",
    );
    await expect(page.locator(".project-compare")).toContainText(
      "resolved version unknown",
    );
    await page.screenshot({ path: `${output}/${name}-compare.png` });
    await page.locator(".project-compare dd").last().scrollIntoViewIfNeeded();
    await page.screenshot({
      path: `${output}/${name}-compare-dependencies.png`,
    });
    if (
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      )
    )
      throw Error("Overflow");
    await page.close();
  }
  console.log("Three.js detail/comparison dependency browser regression PASS");
} finally {
  await browser.close();
  await new Promise((r) => server.close(r));
}
