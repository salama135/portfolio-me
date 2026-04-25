import { expect, test } from '@playwright/test';

const routes = ['/', '/contact', '/projects', '/demos'];

for (const route of routes) {
  test(`smoke ${route}`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator('main')).toBeVisible();
    await expect(page).toHaveTitle(/.+/);
  });
}
