import { test, expect } from "@playwright/test";

test.describe("Test basic interaction on demo page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/demo");
  });

  test("should be able to increment count @priority=critical", async ({ page }) => {
    const incrementBtnLocator = page.locator("button >> text=Increment Count");
    await incrementBtnLocator.click();
    await expect(page.locator("strong >> text=1")).toBeVisible();
  });

  test("should be able to toggle", async ({ page }) => {
    const unmuteLocator = page.locator("label >>text=Audible");
    const muteLocator = page.locator("label >>text=Muted");

    await unmuteLocator.check();
    await expect(muteLocator).toBeChecked();
    await page.pause();
  });
});
