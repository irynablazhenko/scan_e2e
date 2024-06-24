import { expect } from '@playwright/test';
import PartnerAccountDashboardPage from './PartnerAccountDashboardPage';
import exp from 'constants';
import OuterHeader from '../components/OuterHeader';

export default class CreatePatientPage extends PartnerAccountDashboardPage {
    constructor(page) {
        super(page,);
        this.pageHeader = page.locator('h1', { hasText: 'New patient' });
        this.titleDropdown = page.locator('select[id="title"]');
        this.firstName = page.locator('input[id="first_name"]');
        this.lastName = page.locator('input[id="last_name"]');
        this.gender = page.locator('input[type="radio"]'); //input[type="radio"]
        this.day = page.locator('input[id="day_input-:ra:"]');
        this.month = page.locator('input[id="month_input-:ra:"]');
        this.year = page.locator('input[id="year_input-:ra:"]');
        this.email = page.locator('[id="email"]');
        this.phone = page.locator('[id="phone"]');
        this.alternateNumber = page.locator('[id="alternate_phone"]');
        this.line1 = page.locator('[id="line_1"]');
        this.line2 = page.locator('[id="line_2"]');
        this.city = page.locator('[id="city"]');
        this.postcode = page.locator('[id="postcode"]');
        this.createButton = page.locator('[data-test="submit"]');
        this.createdInscription = page.getByText('Created');
    };

    async open() {
        await this.page.goto('https://portal-staging.uk.scan.com/patients/new');
        await expect(this.page).toHaveURL('https://portal-staging.uk.scan.com/patients/new');
        await expect(this.pageHeader).toBeVisible();
        await expect(this.page.getByText('Personal information')).toBeVisible();
        await expect(this.page.getByText('Contact information')).toBeVisible();
        await expect(this.page.locator('h3', { hasText: 'Address' })).toBeVisible();
        await expect(this.page.getByText('Personal information')).toBeVisible();
        await expect(this.page.locator('//div[@class="container"]/form/div/div', { hasText: 'Personal information' })).toContainText('These personal details will be used for the clinical referral that is sent to the scanning location.');
        await expect(this.page.locator('//div[@class="container"]/form/div/div', { hasText: 'Contact information' })).toContainText('We need the patient’s email address for sending booking updates and their phone number for pre and post scan consultations.');
        await expect(this.page.locator('//div[@class="container"]/form/div/div', { hasText: 'Contact information' })).toContainText('If these details are incorrect their referrals may be delayed.');
    };

async selectGender(gender){
    const genderRadioButton = await this.page.locator(`//input[@value="${gender}"]`).first();
    await genderRadioButton.click();
};
    async fillPersonalInformation(title, firstName, lastName, gender, day, month, year) {
        await this.titleDropdown.selectOption(title);
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.selectGender(gender);
        await this.day.fill(day);
        await this.month.fill(month);
        await this.year.fill(year);
        await expect(this.titleDropdown).toHaveValue(title);
        await expect(this.firstName).toHaveValue(firstName);
        await expect(this.lastName).toHaveValue(lastName);
        await expect(this.day).toHaveValue(day);
        await expect(this.month).toHaveValue(month);
        await expect(this.year).toHaveValue(year);
    };

    async fillContactInformation(email, phone, alternateNumber) {
        await this.email.fill(email);
        await this.phone.fill(phone);
        await this.alternateNumber.fill(alternateNumber);
        await expect(this.email).toHaveValue(email);
        await expect(this.phone).toHaveValue(phone);
        await expect(this.alternateNumber).toHaveValue(alternateNumber);
    };

    async fillAddress(line1, line2, city, postcode) {
        await this.line1.fill(line1);
        await this.line2.fill(line2);
        await this.city.fill(city);
        await this.postcode.fill(postcode);
        await expect(this.line1).toHaveValue(line1);
        await expect(this.line2).toHaveValue(line2);
        await expect(this.city).toHaveValue(city);
        await expect(this.postcode).toHaveValue(postcode);
    };
    
    async createButtonClick(){
        await this.createButton.click();
    }
}
