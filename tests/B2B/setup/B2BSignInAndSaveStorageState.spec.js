import { test, expect } from '@playwright/test';
import HomePage from '../../../page_objects/B2B/pages/HomePage.js'
import { partners } from '../../../test-data/partnersInfo.js';

test.describe('Authorization', () => {
    
    test('Sign in as partner', async ({ page }) => {
        let homePage = new HomePage(page);
        await homePage.open();
        await expect(homePage.signInHeader).toContainText('Sign in to your account');
        await homePage.singInAsPartner(partners.mlPartner.email, process.env.PARTNERS_PASSWORD);
        await page.context().storageState({
            path: './test-data/states/b2bState.json'
        });
    });

})
