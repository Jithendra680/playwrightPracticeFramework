
const { test, expect } = require('../fixtures/baseTest');
const testData = require('../test-data/users.json');
const { registerTestHooks } = require('../hooks/testHooks');

test.describe('Checkout Page Tests', () => {
    registerTestHooks(test);

    test.beforeEach(async ({
        loginPage,
        inventoryPage,
        cartPage
    }) => {
        await loginPage.goto();
        await loginPage.loginWithEnvCredentials();

        await inventoryPage.addProductToCart(testData.product.name);
        await inventoryPage.openCart();
        await cartPage.proceedToCheckout();
    });

    async function enterValidDetails(checkoutPage) {
        await checkoutPage.enterCustomerDetails(
            testData.checkout.firstName,
            testData.checkout.lastName,
            testData.checkout.postalCode
        );

        await checkoutPage.continueToOverview();
    }

    test.describe('Sanity Tests', () => {
        test('Verify checkout information page is displayed', async ({
            checkoutPage
        }) => {
            await expect(checkoutPage.pageTitle)
                .toHaveText('Checkout: Your Information');
        });

        test('Verify user can enter valid checkout details', async ({
            checkoutPage
        }) => {
            await enterValidDetails(checkoutPage);

            await expect(checkoutPage.pageTitle)
                .toHaveText('Checkout: Overview');
        });

        test('Verify selected product appears in order overview', async ({
            checkoutPage
        }) => {
            await enterValidDetails(checkoutPage);

            await expect(
                checkoutPage.checkoutItems.filter({
                    hasText: testData.product.name
                })
            ).toBeVisible();
        });
    });

    test.describe('Regression Tests', () => {
        test('Verify error when first name is empty', async ({
            checkoutPage
        }) => {
            await checkoutPage.enterCustomerDetails(
                '',
                testData.checkout.lastName,
                testData.checkout.postalCode
            );
            await checkoutPage.continueToOverview();

            await expect(checkoutPage.errorMessage)
                .toContainText('First Name is required');
        });

        test('Verify error when last name is empty', async ({
            checkoutPage
        }) => {
            await checkoutPage.enterCustomerDetails(
                testData.checkout.firstName,
                '',
                testData.checkout.postalCode
            );
            await checkoutPage.continueToOverview();

            await expect(checkoutPage.errorMessage)
                .toContainText('Last Name is required');
        });

        test('Verify error when postal code is empty', async ({
            checkoutPage
        }) => {
            await checkoutPage.enterCustomerDetails(
                testData.checkout.firstName,
                testData.checkout.lastName,
                ''
            );
            await checkoutPage.continueToOverview();

            await expect(checkoutPage.errorMessage)
                .toContainText('Postal Code is required');
        });

        test('Verify order total is displayed', async ({
            checkoutPage
        }) => {
            await enterValidDetails(checkoutPage);

            await expect(checkoutPage.totalLabel).toBeVisible();
            await expect(checkoutPage.totalLabel)
                .toContainText('Total: $');
        });

        test('Verify user can finish the order', async ({
            checkoutPage
        }) => {
            await enterValidDetails(checkoutPage);
            await checkoutPage.finishOrder();

            await expect(checkoutPage.confirmationMessage)
                .toHaveText('Thank you for your order!');
        });

        test('Verify order confirmation details', async ({
            checkoutPage
        }) => {
            await enterValidDetails(checkoutPage);
            await checkoutPage.finishOrder();

            await expect(checkoutPage.confirmationMessage)
                .toHaveText('Thank you for your order!');

            await expect(checkoutPage.confirmationText)
                .toContainText('dispatched');
        });
    });
});
