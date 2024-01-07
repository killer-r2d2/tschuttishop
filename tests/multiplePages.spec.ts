import { test, expect } from '@playwright/test';

test('check the basic urls', async ({ page }) => {
  const urls = [
    'http://localhost:3000/',
    'http://localhost:3000/Categories/vintage',
    'http://localhost:3000/Categories/club',
    'http://localhost:3000/Login',
    'http://localhost:3000/Favorites',
    'http://localhost:3000/Cart'
  ];
  for (const url of urls) {
    await page.goto(url);
    expect(page.url()).toBe(url);
  }
});