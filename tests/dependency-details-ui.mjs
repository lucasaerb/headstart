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
    // Hold the real refresh response until Compare is active, reproducing the CI race without sleeps.
    let releaseRefresh, responseFetched;
    const refreshGate = new Promise((resolve) => { releaseRefresh = resolve; });
    const fetched = new Promise((resolve) => { responseFetched = resolve; });
    await page.route("**/api/catalog/search?*", async (route) => {
      const url = new URL(route.request().url());
      if (url.searchParams.get("limit") !== "50" || url.searchParams.get("type") !== "component") return route.continue();
      const response = await route.fetch();
      responseFetched();
      await refreshGate;
      await route.fulfill({ response });
    });
    await page.getByRole("button", { name: "Saved", exact: true }).click();
    await fetched;
    await expect(page.locator(".project-save")).toHaveCount(1);
    await expect(page.locator("#project-dialog [aria-busy]")).toHaveAttribute("aria-busy", "true");
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
    const dependencies = page.locator(".project-compare dd").last();
    await dependencies.scrollIntoViewIfNeeded();
    const originalDependencies = await dependencies.elementHandle();
    const scrollBeforeRefresh = await page.locator("#project-dialog").evaluate((node) => node.scrollTop);
    releaseRefresh();
    await expect(page.locator("#project-dialog [aria-busy]")).toHaveAttribute("aria-busy", "false");
    if (!await originalDependencies.evaluate((node) => node.isConnected)) throw Error("Refresh replaced the active comparison");
    const scrollAfterRefresh = await page.locator("#project-dialog").evaluate((node) => node.scrollTop);
    if (Math.abs(scrollAfterRefresh - scrollBeforeRefresh) > 1) throw Error("Refresh changed comparison scroll");
    await originalDependencies.dispose();
    await page.unroute("**/api/catalog/search?*");
    await page.screenshot({ path: `${output}/${name}-compare.png` });
    await dependencies.scrollIntoViewIfNeeded();
    await page.screenshot({
      path: `${output}/${name}-compare-dependencies.png`,
    });
    if (
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      )
    )
      throw Error("Overflow");
    // A failed freshness lookup clears busy state and leaves the pinned facts intact.
    await page.route("**/api/catalog/search?*", (route) => route.fulfill({ status: 503, contentType: "application/json", body: '{"error":"fixture unavailable"}' }));
    await page.getByRole("button", { name: "Saved", exact: true }).click();
    await expect(page.locator(".project-status")).toHaveText("Not checked");
    await expect(page.locator("#project-dialog [aria-busy]")).toHaveAttribute("aria-busy", "false");
    await page.close();
  }
  console.log("Three.js detail/comparison dependency browser regression PASS");
} finally {
  await browser.close();
  await new Promise((r) => server.close(r));
}
