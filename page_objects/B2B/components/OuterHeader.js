import { expect } from '@playwright/test';
import HomePage from '../pages/HomePage';

export default class OuterHeader {
    constructor(page) {
        this.page = page;
        this.myReferralsMenu = page.locator('a', { hasText: 'My Referrals' });
        this.patientsMenu = page.locator('a', { hasText: 'Patients' });
        this.centresNearMeMenu = page.locator('a', { hasText: 'Centres Near Me' });
        this.notificationsIcon = page.locator('//*[@id="headlessui-popover-button-:r1:"]');
        this.notificationsDropdown = page.locator("//div[@data-headlessui-state='open']/button/following-sibling::div[1]");
        this.settingIcon = page.locator('//*[@id="headlessui-menu-button-:r3:"]');
        this.settingDropdown = page.locator("//div[@data-headlessui-state='open']/button/following-sibling::div[1]");

    };

    async myReferralsMenuClick() {
        await this.myReferralsMenu.click();
        await expect(this.page).toHaveURL('https://portal-staging.uk.scan.com/');
    };

    async patientsMenuClick() {
        await this.patientsMenu.click();
        await expect(this.page).toHaveURL('https://portal-staging.uk.scan.com/patients');
    };

    async centresNearMeMenuClick() {
        await this.centresNearMeMenu.click();
        await expect(this.page).toHaveURL('https://portal-staging.uk.scan.com/centres-near-me');
    };

    async notificationsIconClick() {
        await this.notificationsIcon.click();
        await expect(this.notificationsDropdown).toBeVisible();
    };

    async settingIconClick() {
        await this.settingIcon.click();
        await expect(this.settingDropdown).toBeVisible();
    };

}
