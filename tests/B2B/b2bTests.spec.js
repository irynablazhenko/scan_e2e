import { test, expect } from '@playwright/test';
import OuterHeader from '../../page_objects/B2B/components/OuterHeader.js'
import PartnerAccountDashboardPage from '../../page_objects/B2B/pages/PartnerAccountDashboardPage.js'
import CreatePatientPage from '../../page_objects/B2B/pages/CreatePatientPage.js';
import generateRandomEmail from '../../utils/generateRandomEmail.js'
import { v4 as uuidv4 } from 'uuid';

test.describe('Home page test with stored Storage state', () => {

    test.use({ storageState: './test-data/states/b2bState.json' });

    //let homePage
    let partnerAccountDashboardPage

    test.beforeEach(async ({ page }) => {
        partnerAccountDashboardPage = new PartnerAccountDashboardPage(page);
        await partnerAccountDashboardPage.open();
    });

    test('Check Storage state', async () => {
        await expect(partnerAccountDashboardPage.pageHeader).toHaveText('referrals');
    });

    test('Validation Partners account page', async ({ page }) => {
        await expect(partnerAccountDashboardPage.noReferralsPopUp).toBeVisible();
        await expect(partnerAccountDashboardPage.createFirstReferralButton).toBeVisible();
        await expect(partnerAccountDashboardPage.gettingStartedGuideButton).toBeVisible();
        await expect(partnerAccountDashboardPage.newReferralButton).toBeVisible();
        await expect(partnerAccountDashboardPage.referralWalkthroughPost).toBeVisible();
        await expect(partnerAccountDashboardPage.gettingStartedGuidePost).toBeVisible();
        await expect(partnerAccountDashboardPage.supportInscription).toBeVisible();
        //need more investigation to get href value to compare.
        //await expect(partnerAccountDashboardPage.page.locator('//*[@class="hover:underline"]', {hasText: 'Support'}).innerHTML('attr', 'href')).toContain('ml@uk.scan.com');
        //await expect(partnerAccountDashboardPage.privacyPolicyInscription.innerText('attr', 'href')).toContain('https://uk.scan.com/privacy-policy');
        let outerHeader = new OuterHeader(page);
        await expect(outerHeader.myReferralsMenu).toBeVisible();
        await outerHeader.myReferralsMenuClick();
        await expect(outerHeader.centresNearMeMenu).toBeVisible();
        await outerHeader.centresNearMeMenuClick();
        await expect(outerHeader.patientsMenu).toBeVisible();
        await outerHeader.patientsMenuClick();
        await expect(outerHeader.notificationsIcon).toBeVisible();
        await outerHeader.notificationsIconClick();
        await outerHeader.myReferralsMenuClick();
        await expect(outerHeader.settingIcon).toBeVisible();
        await outerHeader.settingIconClick();
    });

    test('Create a new patient. Happy path', async ({ page }) => {
        let createPatientPage = new CreatePatientPage(page);
        await createPatientPage.open();
        const title = 'Miss';
        const gender = 'female';
        const day = '15';
        const month = '11';
        const year = '2000';
        const firstName = `First ${uuidv4().substring(0, 4)}`;
        const lastName = `Last ${uuidv4().substring(0, 4)}`;
        const randomEmail = generateRandomEmail();
        const phone = '07777777398';
        const line1 = `line1 ${uuidv4().substring(0, 4)}`;
        const line2 = `line2 ${uuidv4().substring(0, 4)}`;
        const city = 'London';
        const postcode = 'EC1M 7AN';

        await createPatientPage.fillPersonalInformation(title, firstName, lastName, gender, day, month, year);
        await expect(createPatientPage.titleDropdown).toHaveValue(title);
        await expect(createPatientPage.firstName).toHaveValue(firstName);
        await expect(createPatientPage.lastName).toHaveValue(lastName);
        await expect(createPatientPage.day).toHaveValue(day);
        await expect(createPatientPage.month).toHaveValue(month);
        await expect(createPatientPage.year).toHaveValue(year);
        await createPatientPage.fillContactInformation(randomEmail, phone, '');
        await expect(createPatientPage.email).toHaveValue(randomEmail);
        await expect(createPatientPage.phone).toHaveValue(phone);
        await expect(createPatientPage.alternateNumber).toHaveValue('');
        await createPatientPage.fillAddress(line1, line2, city, postcode);
        await expect(createPatientPage.line1).toHaveValue(line1);
        await expect(createPatientPage.line2).toHaveValue(line2);
        await expect(createPatientPage.city).toHaveValue(city);
        await expect(createPatientPage.postcode).toHaveValue(postcode);
        await createPatientPage.createButtonClick();
        await expect(createPatientPage.createdInscription).toBeVisible();
    })
    // test('Authorization', async () => {})
    // test('Authorization', async () => {})
    // test('Authorization', async () => {})
    //test('Create a partner', async () => {});
    // test('Authorization', async () => {})
});