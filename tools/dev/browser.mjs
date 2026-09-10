import { chromium, expect } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { createDevServer } from "./server.mjs";
import { createHandler } from "../../HeadStart-Starter-Package/site/dist/api/subscribe.js";
const emailEnv = {};
const server = createDevServer({
  subscribeHandler: createHandler({ env: emailEnv }),
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const base = `http://127.0.0.1:${server.address().port}`;
emailEnv.HEADSTART_ALLOWED_ORIGINS = base;
const browser = await chromium.launch(
  process.env.HEADSTART_CHROME_CHANNEL
    ? { channel: process.env.HEADSTART_CHROME_CHANNEL }
    : {},
);
const output = process.env.SCREENSHOT_DIR || "test-results/foundation";
await mkdir(output, { recursive: true });
try {
  for (const [name, viewport] of [
    ["desktop", { width: 1440, height: 1000 }],
    ["mobile", { width: 390, height: 844 }],
  ]) {
    const page = await browser.newPage({ viewport, reducedMotion: "reduce" });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(base);
    await expect(page.locator("#game-grid > *").first()).toBeVisible();
    await expect(page.locator(".header-plugin-cta")).toBeVisible();
    if (
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      )
    )
      throw new Error(`${name}: horizontal overflow`);
    await page.screenshot({ path: `${output}/${name}.png` });
    await expect(page.locator("#hero-browse")).toBeVisible();
    await expect(page.locator("#email-signup")).toHaveCount(0);
    await page.locator("[data-demo-game]").first().click();
    await page.locator("#demo-email").fill("local-test@example.com");
    await page.locator('#demo-email-form button[type="submit"]').click();
    await expect(page.locator("#demo-email-status")).toContainText(
      "unavailable",
    );
    await page.screenshot({ path: `${output}/${name}-email-unavailable.png` });
    await page.locator('[data-close="demo-email-dialog"]').click();
    await page.goto(
      base +
        "/?retrieval=lexical&interpret=off&q=nonexistent-project-749183#games",
    );
    await expect(page.locator("#empty-games")).toBeVisible();
    await page.screenshot({ path: `${output}/${name}-empty.png` });
    await page.locator("#reset-games").click();
    await expect(page.locator("#game-grid > *").first()).toBeVisible();
    await page.goto(base + "/plugin.html");
    await expect(page.locator("h1")).toBeVisible();
    if (errors.length) throw new Error(`${name}: ${errors.join("; ")}`);
    await page.close();
  }
  console.log(
    "Desktop/mobile: C4 route, plugin CTA, real catalog rendering, empty/reset, no JS errors/overflow PASS.",
  );
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
