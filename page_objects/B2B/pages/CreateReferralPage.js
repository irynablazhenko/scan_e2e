import { expect } from '@playwright/test';
import PartnerAccountDashboardPage from './PartnerAccountDashboardPage';
import exp from 'constants';

export default class CreateReferralPage extends PartnerAccountDashboardPage{
    constructor(page) {
        super(page,);
        this.newPatientInscription = page.locator('//*[@data-test="new_patient"]/h3');
        this.existingPatientInscription = page.locator('//*[@data-test="existing_patient"]/h3');
        this.newPatientButton = page.locator('//*[@data-test="new_patient"]/div');
        this.existingPatientButton = page.locator('//*[@data-test="existing_patient"]/div');
    };

    async open() {
        await super.open();
        await super.newReferralClick();
        await expect(this.page).toHaveURL('https://portal-staging.uk.scan.com/referrals/new');
        await expect(this.newPatientInscription).toBeVisible();
        await expect(this.existingPatientInscription).toBeVisible();
        await expect(this.page.getByText('Previously created a referral for this patient?')).toBeVisible();
        await expect(this.page.getByText('Not referred this patient for a scan before?')).toBeVisible();
        await expect(this.existingPatientButton).toBeVisible();
        await expect(this.newPatientButton).toBeVisible();
    };

    // async singInAsPartner(email, password){
    //     await this.emailField.fill(email);
    //     await this.passwordField.fill(password);
    //     await this.sighInButton.click();
    //     await expect(this.page.locator('h1')).toHaveText('referrals');
    //     await expect(this.sighInMessage).toBeVisible();
    // };

    // async newReferralClick(){
    //     await this.newReferralButton.click();
    //     await expect(this.page).toHaveURL('https://portal-staging.uk.scan.com/referrals/new');
        
    // }
}
