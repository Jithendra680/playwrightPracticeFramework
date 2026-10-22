
const { test, expect } = require('../fixtures/baseTest');
const testData = require('../test-data/users.json');
const { registerTestHooks } = require('../hooks/testHooks');

test.describe('Cart Page Tests', () => {
    registerTestHooks(test);

    test.beforeEach(async ({ loginPage, inventoryPage }) => {
        await loginPage.goto();
        await loginPage.loginWithEnvCredentials();

        await inventoryPage.addProductToCart(testData.product.name);
        await inventoryPage.openCart();
    });

    test.describe('Sanity Tests', () => {
        test('Verify cart page title', async ({ cartPage }) => {
            await expect(cartPage.pageTitle).toHaveText('Your Cart');
        });

        test('Verify selected product appears in cart', async ({
            cartPage
        }) => {
            await expect(
                cartPage.cartItems.filter({
                    hasText: testData.product.name
                })
            ).toBeVisible();
        });

        test('Verify cart contains one selected item', async ({
            cartPage
        }) => {
            await expect(cartPage.cartItems).toHaveCount(1);
        });
    });

    test.describe('Regression Tests', () => {
        test('Verify user can remove a product from cart', async ({
            cartPage
        }) => {
            await cartPage.removeProduct(testData.product.name);

            await expect(cartPage.cartItems).toHaveCount(0);
        });

        test('Verify Continue Shopping returns to inventory', async ({
            cartPage,
            page
        }) => {
            await cartPage.continueShopping();

            await expect(page).toHaveURL(/inventory\.html/);
            await expect(page.locator('.title')).toHaveText('Products');
        });

        test('Verify user can proceed to checkout', async ({
            cartPage,
            page
        }) => {
            await cartPage.proceedToCheckout();

            await expect(page).toHaveURL(/checkout-step-one\.html/);
            await expect(page.locator('.title'))
                .toHaveText('Checkout: Your Information');
        });
    });
});
