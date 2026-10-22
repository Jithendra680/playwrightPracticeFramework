
const BasePage = require('./BasePage');

class CheckoutPage extends BasePage {
    constructor(page) {
        super(page);

        this.pageTitle = page.locator('.title');

        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');

        this.continueButton = page.getByRole('button', {
            name: 'Continue'
        });

        this.finishButton = page.getByRole('button', {
            name: 'Finish'
        });

        this.errorMessage = page.locator('[data-test="error"]');
        this.checkoutItems = page.locator('.cart_item');
        this.totalLabel = page.locator('.summary_total_label');
        this.confirmationMessage = page.locator('.complete-header');
        this.confirmationText = page.locator('.complete-text');
    }

    async enterCustomerDetails(firstName, lastName, postalCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async continueToOverview() {
        await this.continueButton.click();
    }

    async finishOrder() {
        await this.finishButton.click();
    }
}

module.exports = CheckoutPage;
