// This test checks if accessing certain URLs leads to the expected final URLs,
import { test, expect } from '@playwright/test';

test('check the basic urls with expected redirections', async ({ page }) => {
  const urls = [
    { 
      accessUrl: 'http://localhost:3000/', 
      expectedUrl: 'http://localhost:3000/' 
    },
    { 
      accessUrl: 'http://localhost:3000/AllProducts', 
      expectedUrl: 'http://localhost:3000/AllProducts' 
    },
    { 
      accessUrl: 'http://localhost:3000/Favorites', 
      expectedUrl: 'http://localhost:3000/Favorites' 
    },
    { 
      accessUrl: 'http://localhost:3000/Cart', 
      expectedUrl: 'http://localhost:3000/Login' 
    },
  ];

  for (const { accessUrl, expectedUrl } of urls) {
    await page.goto(accessUrl);
    expect(page.url()).toBe(expectedUrl);
  }
});
