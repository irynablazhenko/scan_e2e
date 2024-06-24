import { test, expect } from '@playwright/test';

test.describe('Home page test with stored Storage state', () => {

  test.use({ storageState: './test-data/states/userState.json' });

  test('Use Storage state', async ({ page }) => {
    await page.goto(process.env.B2C_URL);
    await expect(page.locator('//*[@id="mri-search"]/p', { hasText: 'Not sure what scan you need? ' })).toBeVisible();
  });

});