import { test, expect } from "@playwright/test";

test("Navigation has items", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  // Desktop
  const desktopNavLinksCount = await page.$$eval(
    ".nav-item",
    (links: Element[]) => links.length,
  );
  expect(desktopNavLinksCount).toBeGreaterThan(0);

  // Change viewport size for mobile testing
  await page.setViewportSize({ width: 375, height: 667 });

  // Mobile
  const isMobileButtonVisible = await page.isVisible(".mobile-nav-button");
  if (isMobileButtonVisible) {
    await page.click(".mobile-nav-button");

    await page.waitForSelector(".nav-item-mobile");

    const mobileNavLinksCount = await page.$$eval(
      ".nav-item-mobile",
      (links: Element[]) => links.length,
    );
    expect(mobileNavLinksCount).toBeGreaterThan(0);
  } else {
    console.warn("Mobile button is not visible on desktop.");
  }

  await page.setViewportSize({ width: 1200, height: 800 });
});
