import { test, expect } from '@playwright/test';

test.describe('Product Filters', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should filter products by search query', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search products...');
    await searchInput.fill('iPhone');

    await page.waitForTimeout(400);

    await expect(page.getByText(/showing \d+ of \d+ products/i)).toBeVisible();
    const productName = page.getByText('iPhone 15 Pro').first();
    await expect(productName).toBeVisible();
  });

  test('should debounce search input', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search products...');

    await searchInput.fill('i');
    await searchInput.fill('iP');
    await searchInput.fill('iPh');

    await page.waitForTimeout(500);

    const url = new URL(page.url());
    expect(url.searchParams.get('search')).toBe('iPh');
  });

  test('should filter products by category', async ({ page }) => {
    const categorySelect = page.locator('button[role="combobox"]').first();
    await categorySelect.click();

    await page.waitForTimeout(200);

    await page.locator('[role="listbox"]').getByText('Phones', { exact: true }).click();

    await page.waitForTimeout(300);

    const url = new URL(page.url());
    expect(url.searchParams.get('category')).toBe('phones');
  });

  test('should update URL with filter parameters', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search products...');
    await searchInput.fill('laptop');

    // Wait for debounce
    await page.waitForTimeout(500);

    const url = new URL(page.url());
    expect(url.searchParams.get('search')).toBe('laptop');
  });

  test('should persist filters on page reload', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search products...');
    await searchInput.fill('MacBook');

    await page.waitForTimeout(500);

    const urlBeforeReload = new URL(page.url());
    expect(urlBeforeReload.searchParams.get('search')).toBe('MacBook');

    await page.reload();
    await page.waitForLoadState('networkidle');

    await page.waitForTimeout(1000);

    const searchInputAfterReload = page.getByPlaceholder('Search products...');
    await expect(searchInputAfterReload).toHaveValue('MacBook');
  });

  test('should clear all filters', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search products...');
    await searchInput.fill('test');

    await page.waitForTimeout(500);

    const clearButton = page.getByRole('button', { name: /clear all/i });
    await expect(clearButton).toBeVisible();
    await clearButton.click();

    await page.waitForTimeout(200);

    await expect(searchInput).toHaveValue('');
  });

  test('should combine multiple filters', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search products...');
    await searchInput.fill('Pro');

    await page.waitForTimeout(500);

    const categorySelect = page.locator('button[role="combobox"]').first();
    await categorySelect.click();

    await page.waitForTimeout(200);

    await page.locator('[role="listbox"]').getByText('Phones', { exact: true }).click();

    await page.waitForTimeout(300);

    const url = new URL(page.url());
    expect(url.searchParams.get('search')).toBe('Pro');
    expect(url.searchParams.get('category')).toBe('phones');
  });

  test('should show no products message when filters match nothing', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search products...');
    await searchInput.fill('XYZ123NonExistent');

    await page.waitForTimeout(400);

    await expect(page.getByText(/no products found/i)).toBeVisible();
  });
});
