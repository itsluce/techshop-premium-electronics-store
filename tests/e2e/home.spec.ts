import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display page title and description', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /discover premium electronics/i })).toBeVisible();
    await expect(page.getByText(/browse our curated collection/i)).toBeVisible();
  });

  test('should render product grid', async ({ page }) => {
    const productCards = page.getByRole('link').filter({ has: page.locator('article') });
    await expect(productCards.first()).toBeVisible();
    const count = await productCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display correct product count', async ({ page }) => {
    await expect(page.getByText(/showing \d+ of \d+ products/i)).toBeVisible();
  });

  test('should navigate to product detail on click', async ({ page }) => {
    const firstProduct = page.getByRole('link').filter({ has: page.locator('article') }).first();
    await firstProduct.click();
    await expect(page).toHaveURL(/\/products\/.+/);
  });

  test('should have accessible navigation', async ({ page }) => {
    await expect(page.getByRole('banner')).toBeVisible();
    await expect(page.getByRole('navigation')).toBeVisible();
    await expect(page.getByRole('main')).toBeVisible();
  });

  test('should display cart button', async ({ page }) => {
    const cartButton = page.getByRole('button', { name: /shopping cart/i });
    await expect(cartButton).toBeVisible();
  });

  test('should be responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByRole('heading', { name: /discover premium electronics/i })).toBeVisible();

    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.getByRole('heading', { name: /discover premium electronics/i })).toBeVisible();
  });
});
