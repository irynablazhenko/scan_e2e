import { expect } from '@playwright/test';
import HomePage from './HomePage';
import OuterHeader from '../components/OuterHeader';

export default class PartnerAccountDashboardPage extends HomePage{
    constructor(page) {
        super(page);
        this.pageHeader = page.locator('h1');
        this.noReferralsPopUp = page.locator('//div[@class="relative"]/div').getByText("You haven't created a referral yet");
        this.createFirstReferralButton = page.locator('//div[@class="relative"]/div').getByText('Create a referral');
        this.gettingStartedGuideButton = page.locator('//div[@class="relative"]/div/div/a', {hasText: 'Getting started guid'});
        this.referralWalkthroughPost = page.locator('h3', {hasText:'Referral walkthrough'});
        this.gettingStartedGuidePost = page.locator('h3', {hasText:'Getting started guide'});
        this.newReferralButton = page.locator('[data-test="new_referral"]');
        this.supportInscription = page.getByText('Support');
        this.privacyPolicyInscription = page.getByText('Privacy Policy');
        this.supportEmail= page.locator('Signed in successfully.');
        this.privacyPolicyUrl= page.getByText('Signed in successfully.');
        // this.sighInMessage= page.getByText('Signed in successfully.');
        // this.sighInMessage= page.getByText('Signed in successfully.');
        // this.sighInMessage= page.getByText('Signed in successfully.');
        // this.sighInMessage= page.getByText('Signed in successfully.');
        // this.sighInMessage= page.getByText('Signed in successfully.');
        // this.sighInMessage= page.getByText('Signed in successfully.');
        // this.sighInMessage= page.getByText('Signed in successfully.');



    };

    async open() {
        await super.open();
    };

    async singInAsPartner(email, password){
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.sighInButton.click();
        await expect(this.page.locator('h1')).toHaveText('referrals');
        await expect(this.sighInMessage).toBeVisible();
    };

    async newReferralClick(){
        await this.newReferralButton.click();
        await expect(this.page).toHaveURL('https://portal-staging.uk.scan.com/referrals/new');
    };


}
