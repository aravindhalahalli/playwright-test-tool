import { test, expect } from "@playwright/test";

test.describe("Test basic interactions on command palette", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("/demo");
  });

  test("should be able to open command palette and run first action @priority=critical", async ({
    page,
  }) => {
    await page.keyboard.press("Control+K");
    await page.locator("[role=option] >> text=Increment Counter by 1").click();
    await expect(page.locator("strong >> text=1")).toBeVisible();
  });

  test('should be able to search for action @prirority=critical', async ({ page}) => {
    await page.keyboard.press('Control+K');
    const optionLocator = page.locator('[role=combobox] >> [role=option]');

    await page.keyboard.type('GitHub');

    const optionsNum = await optionLocator.count();
    expect(optionsNum).toBe(1);
    await expect(optionLocator.first()).toContainText('Go to GitHub repo');
  });
});
