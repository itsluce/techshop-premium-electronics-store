import { test, expect } from '@playwright/test';

test.describe('Product Detail Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const firstProduct = page.getByRole('link').filter({ has: page.locator('article') }).first();
    await firstProduct.waitFor({ state: 'visible', timeout: 10000 });
    await firstProduct.scrollIntoViewIfNeeded();
    await firstProduct.click();
    await page.waitForURL(/\/products\/.+/, { timeout: 15000 });
  });

  test('should display product details', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByText(/\$/)).toBeVisible();
  });

  test('should display breadcrumb navigation', async ({ page }) => {
    await expect(page.getByRole('navigation')).toContainText('Home');
    await expect(page.getByRole('navigation')).toContainText('Products');
  });

  test('should navigate home via breadcrumb', async ({ page }) => {
    await page.getByRole('link', { name: 'Home' }).first().click();
    await expect(page).toHaveURL('/');
  });

  test('should display 3D viewer canvas', async ({ page }) => {
    const canvas = page.locator('canvas');
    await expect(canvas).toBeAttached({ timeout: 15000 });
    const dataEngine = await canvas.getAttribute('data-engine');
    expect(dataEngine).toContain('three.js');
  });

  test('should display product specifications', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /specifications/i })).toBeVisible();

    const specs = page.locator('dl');
    await expect(specs).toBeVisible();
  });

  test('should display add to cart button', async ({ page }) => {
    const addToCartButton = page.getByRole('button', { name: /add to cart/i });
    await expect(addToCartButton).toBeVisible();
  });

  test('should add product to cart', async ({ page }) => {
    await page.evaluate(() => localStorage.clear());

    const addToCartButton = page.getByRole('button', { name: /add to cart/i });
    await addToCartButton.click();

    await expect(page.getByRole('heading', { name: /shopping cart/i })).toBeVisible({ timeout: 10000 });

    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);

    const cartButton = page.getByRole('button', { name: /shopping cart with \d+ items?/i });
    await expect(cartButton).toBeVisible({ timeout: 5000 });
  });

  test('should show category badge', async ({ page }) => {
    const badge = page.getByText(/phones|laptops|headphones|cameras/i).first();
    await expect(badge).toBeVisible();
  });

  test('should generate static pages (SSG validation)', async ({ page }) => {
    const response = await page.goto(page.url());
    expect(response?.status()).toBe(200);

    const html = await page.content();
    expect(html).toContain('TechShop');
  });

  test('should handle out of stock products', async ({ page }) => {
    await page.goto('/products/laptop-003');

    const addToCartButton = page.getByRole('button', { name: /out of stock/i });
    await expect(addToCartButton).toBeDisabled();

    await expect(page.getByText(/currently out of stock/i)).toBeVisible();
  });

  test('should have accessible product information', async ({ page }) => {
    await expect(page.getByRole('main')).toBeVisible();

    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();

    const price = page.getByText(/\$/);
    await expect(price).toBeVisible();
  });

  test('should be responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
});
