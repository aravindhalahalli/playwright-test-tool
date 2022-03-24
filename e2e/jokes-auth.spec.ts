import { test, expect } from '@playwright/test';

test('Test auth page @flow=auth', async ({ page,context }) => {
  await page.goto('https://remix-jokes.lol/login');

  await page.locator('input[name="username"]').fill('aravindhalahalli.81@gmail.com');
  await page.locator('input[name="password"]').fill('123123');

  // Click text=Submit
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://remix-jokes.lol/jokes' }*/),
    page.locator('text=Submit').click()
  ]);

  await expect(page).toHaveURL('https://remix-jokes.lol/jokes');

  await context.storageState({
    path:'auth.json'
  });

  // Click text=Logout
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://remix-jokes.lol/login' }*/),
    page.locator('text=Logout').click()
  ]);

});

test.describe('When user logged-in', () => {
  test.use({
    storageState: 'auth.json',
  });

  test('Test jokes page @flow=app', async ({ page }) => {
    await page.goto('https://remix-jokes.lol/jokes');
    await expect(page).toHaveURL('https://remix-jokes.lol/jokes');
  });
});