import { test, expect } from '@playwright/test';
import exp from 'constants';
import HomePage from '../page_objects/pages/homePage';
import dotenv from 'dotenv';
import fs from 'fs';
import { TIMEOUT } from 'dns';

dotenv.config();

test.describe('tests', () => {

  test('Authorization', async ({ page }) => {
    await page.goto('/');
    await page.locator('button', { hasText: 'Accept' }).click();
    await page.locator('input.button.button-primary').click();
    await page.locator('input[type="email"]').fill('hanna.kabachenko@scan.com');

    await page.locator('button', { hasText: "Next" }).click();
    await expect(page.locator('#headingText')).toBeVisible();
    if (expect(page.locator('button', { hasText: "Next" })).toBeVisible()) {
      await page.locator('button', { hasText: 'Try another way' }).click();
      await page.locator('[data-challengeid="2"]').click();
    }
    await expect(page.locator('input[type="password"]')).toBeEditable();
    await page.locator('input[type="password"]').fill(process.env.EMAIL_PASSWORD ?? 'test');
    await expect(page.locator('button', { hasText: "Next" })).toBeEnabled();
    await page.locator('button', { hasText: "Next" }).click();
    await page.waitForTimeout(10000);
    //if tere are a lot of requests Google will ask access confirmation on the mobile device
    //await page.locator('button', { hasText: 'Try another way' }).click();

    expect(page.url()).toEqual('https://uk.staging.scan.com/admin');
    
    // Get cookie after authentication
    const cookies = await page.context().cookies();
    fs.writeFileSync('cookies.json', JSON.stringify(cookies));
    // Check that cookies have been received
    const cookiesFromFile = JSON.parse(fs.readFileSync('cookies.json', 'utf8'));
    expect(cookiesFromFile.length).toBeGreaterThan(0);
  })
})