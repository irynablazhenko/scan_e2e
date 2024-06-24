import { test, expect } from '@playwright/test';
import fs from 'fs';

test.describe('Authorization', () => {

    test('Authorization steps', async ({ page }) => {
        await page.goto(process.env.B2C_URL);
        await page.locator('button', { hasText: 'Accept' }).click();
        await page.locator('[value="Sign in with your Scan.com email"]').click();
        await page.locator('input[type="email"]').fill(process.env.EMAIL);

        await page.locator('button', { hasText: "Next" }).click();
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

        expect(page.url()).toEqual(`${process.env.B2C_URL}/admin`);

        // Get cookie after authentication
        const cookies = await page.context().cookies();
        fs.writeFileSync('cookies.json', JSON.stringify(cookies));
        // Check that cookies have been received
        const cookiesFromFile = JSON.parse(fs.readFileSync('cookies.json', 'utf8'));
        expect(cookiesFromFile.length).toBeGreaterThan(0);
    });

    test('Use cookies to stay logged in ans save storage state', async ({ browser }) => {
        const context = await browser.newContext();
        const cookies = JSON.parse(fs.readFileSync('cookies.json', 'utf8'));
        await context.addCookies(cookies);

        const page = await context.newPage();
        await page.goto(process.env.B2C_URL);

        await expect(page.locator('//*[@id="mri-search"]/p', { hasText: 'Not sure what scan you need? ' })).toBeVisible();

        await page.context().storageState({
            path: './test-data/states/userState.json'
        });
    });
})