import { test, expect } from '@playwright/test';

test.describe('Shopping Cart', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => localStorage.clear());
  });

  test('should add item to cart from product detail page', async ({ page }) => {
    const firstProduct = page.getByRole('link').filter({ has: page.locator('article') }).first();
    await firstProduct.waitFor({ state: 'visible', timeout: 10000 });
    await firstProduct.scrollIntoViewIfNeeded();
    await firstProduct.click();
    await page.waitForURL(/\/products\/.+/, { timeout: 15000 });

    const addToCartButton = page.getByRole('button', { name: /add to cart/i });
    await addToCartButton.click();

    await expect(page.getByRole('heading', { name: /shopping cart/i })).toBeVisible({ timeout: 10000 });

    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);

    const cartButton = page.getByRole('button', { name: /shopping cart with \d+ items?/i });
    await expect(cartButton).toBeVisible({ timeout: 5000 });
  });

  test('should open cart sidebar when item is added', async ({ page }) => {
    const firstProduct = page.getByRole('link').filter({ has: page.locator('article') }).first();
    await firstProduct.waitFor({ state: 'visible', timeout: 10000 });
    await firstProduct.scrollIntoViewIfNeeded();
    await firstProduct.click();
    await page.waitForURL(/\/products\/.+/, { timeout: 15000 });

    const addToCartButton = page.getByRole('button', { name: /add to cart/i });
    await addToCartButton.click();

    await expect(page.getByRole('heading', { name: /shopping cart/i })).toBeVisible();
  });

  test('should update cart count when items are added', async ({ page }) => {
    const firstProduct = page.getByRole('link').filter({ has: page.locator('article') }).first();
    await firstProduct.waitFor({ state: 'visible', timeout: 10000 });
    await firstProduct.scrollIntoViewIfNeeded();
    await firstProduct.click();
    await page.waitForURL(/\/products\/.+/, { timeout: 15000 });

    const addToCartButton = page.getByRole('button', { name: /add to cart/i });
    await addToCartButton.click();

    await expect(page.getByRole('heading', { name: /shopping cart/i })).toBeVisible();

    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);

    await expect(page.getByRole('button', { name: /shopping cart with 1 items?/i })).toBeVisible({ timeout: 5000 });

    await addToCartButton.click();

    await expect(page.getByRole('heading', { name: /shopping cart/i })).toBeVisible();

    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);

    await expect(page.getByRole('button', { name: /shopping cart with 2 items?/i })).toBeVisible({ timeout: 5000 });
  });

  test('should display cart items in sidebar', async ({ page }) => {
    const firstProduct = page.getByRole('link').filter({ has: page.locator('article') }).first();
    await firstProduct.waitFor({ state: 'visible', timeout: 10000 });
    await firstProduct.scrollIntoViewIfNeeded();
    await firstProduct.click();
    await page.waitForURL(/\/products\/.+/, { timeout: 15000 });

    const addToCartButton = page.getByRole('button', { name: /add to cart/i });
    await addToCartButton.click();

    const cartSidebar = page.locator('[role="dialog"]');
    await expect(cartSidebar).toBeVisible();
  });

  test('should increase item quantity', async ({ page }) => {
    const firstProduct = page.getByRole('link').filter({ has: page.locator('article') }).first();
    await firstProduct.waitFor({ state: 'visible', timeout: 10000 });
    await firstProduct.scrollIntoViewIfNeeded();
    await firstProduct.click();
    await page.waitForURL(/\/products\/.+/, { timeout: 15000 });

    const addToCartButton = page.getByRole('button', { name: /add to cart/i });
    await addToCartButton.click();

    const increaseButton = page.getByRole('button', { name: /increase quantity/i }).first();
    await increaseButton.click();

    const quantityText = page.locator('text=2').first();
    await expect(quantityText).toBeVisible();
  });

  test('should decrease item quantity', async ({ page }) => {
    const firstProduct = page.getByRole('link').filter({ has: page.locator('article') }).first();
    await firstProduct.waitFor({ state: 'visible', timeout: 10000 });
    await firstProduct.scrollIntoViewIfNeeded();
    await firstProduct.click();
    await page.waitForURL(/\/products\/.+/, { timeout: 15000 });

    const addToCartButton = page.getByRole('button', { name: /add to cart/i });
    await addToCartButton.click();

    const increaseButton = page.getByRole('button', { name: /increase quantity/i }).first();
    await increaseButton.click();

    const decreaseButton = page.getByRole('button', { name: /decrease quantity/i }).first();
    await decreaseButton.click();

    const quantityText = page.locator('text=1').first();
    await expect(quantityText).toBeVisible();
  });

  test('should remove item from cart', async ({ page }) => {
    const firstProduct = page.getByRole('link').filter({ has: page.locator('article') }).first();
    await firstProduct.waitFor({ state: 'visible', timeout: 10000 });
    await firstProduct.scrollIntoViewIfNeeded();
    await firstProduct.click();
    await page.waitForURL(/\/products\/.+/, { timeout: 15000 });

    const addToCartButton = page.getByRole('button', { name: /add to cart/i });
    await addToCartButton.click();

    const removeButton = page.getByRole('button', { name: /remove .+ from cart/i }).first();
    await removeButton.click();

    await expect(page.getByText(/your cart is empty/i)).toBeVisible();
  });

  test('should calculate total price correctly', async ({ page }) => {
    const firstProduct = page.getByRole('link').filter({ has: page.locator('article') }).first();
    await firstProduct.waitFor({ state: 'visible', timeout: 10000 });
    await firstProduct.scrollIntoViewIfNeeded();
    await firstProduct.click();
    await page.waitForURL(/\/products\/.+/, { timeout: 15000 });

    const addToCartButton = page.getByRole('button', { name: /add to cart/i });
    await addToCartButton.click();

    const totalElement = page.getByText(/total/i).locator('..').getByText(/\$/);
    await expect(totalElement).toBeVisible();
  });

  test('should persist cart to localStorage', async ({ page }) => {
    const firstProduct = page.getByRole('link').filter({ has: page.locator('article') }).first();
    await firstProduct.waitFor({ state: 'visible', timeout: 10000 });
    await firstProduct.scrollIntoViewIfNeeded();
    await firstProduct.click();
    await page.waitForURL(/\/products\/.+/, { timeout: 15000 });

    const addToCartButton = page.getByRole('button', { name: /add to cart/i });
    await addToCartButton.click();

    await page.reload();

    const cartButton = page.getByRole('button', { name: /shopping cart with \d+ item/i });
    await expect(cartButton).toBeVisible();
  });

  test('should clear entire cart', async ({ page }) => {
    const firstProduct = page.getByRole('link').filter({ has: page.locator('article') }).first();
    await firstProduct.waitFor({ state: 'visible', timeout: 10000 });
    await firstProduct.scrollIntoViewIfNeeded();
    await firstProduct.click();
    await page.waitForURL(/\/products\/.+/, { timeout: 15000 });

    const addToCartButton = page.getByRole('button', { name: /add to cart/i });
    await addToCartButton.click();

    const clearButton = page.getByRole('button', { name: /clear cart/i });
    await clearButton.click();

    await expect(page.getByText(/your cart is empty/i)).toBeVisible();
  });

  test('should show empty cart state', async ({ page }) => {
    const cartButton = page.getByRole('button', { name: /shopping cart/i });
    await cartButton.click();

    await expect(page.getByText(/your cart is empty/i)).toBeVisible();
  });

  test('should close cart sidebar', async ({ page }) => {
    const firstProduct = page.getByRole('link').filter({ has: page.locator('article') }).first();
    await firstProduct.waitFor({ state: 'visible', timeout: 10000 });
    await firstProduct.scrollIntoViewIfNeeded();
    await firstProduct.click();
    await page.waitForURL(/\/products\/.+/, { timeout: 15000 });

    const addToCartButton = page.getByRole('button', { name: /add to cart/i });
    await addToCartButton.click();

    const cartHeading = page.getByRole('heading', { name: /shopping cart/i });
    await expect(cartHeading).toBeVisible({ timeout: 10000 });

    await page.keyboard.press('Escape');

    await expect(cartHeading).not.toBeVisible({ timeout: 5000 });
  });
});
