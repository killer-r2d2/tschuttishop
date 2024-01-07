import { test } from '@playwright/test';

test('check if first product has a detailsite', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('[data-testid="product-link"]').first().click();
  await page.getByRole('button', { name: 'Zurück' }).click();
});