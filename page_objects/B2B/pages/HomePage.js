import { expect } from '@playwright/test';

export default class HomePage{
    constructor(page) {
        this.page = page;
        this.baseUrl = process.env.B2B_URL || 'test';
        this.signInHeader = page.locator('h2');
        this.emailField = page.locator('//*[@id="user_email"]');
        this.passwordField = page.locator('//*[@id="user_password"]');
        this.sighInButton = page.locator('[data-test="submit"]');
        this.sighInMessage= page.getByText('Signed in successfully.');

    };

    async open() {
        await this.page.goto(process.env.B2B_URL);
    };

    async singInAsPartner(email, password){
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.sighInButton.click();
        await expect(this.page.locator('h1')).toHaveText('referrals');
        await expect(this.sighInMessage).toBeVisible();
    };
}
