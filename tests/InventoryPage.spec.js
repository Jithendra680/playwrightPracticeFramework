
const { test, expect } = require('../fixtures/baseTest');
const { registerTestHooks } = require('../hooks/testHooks');

test.describe('Inventory Page Tests', () => {
    registerTestHooks(test);

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.loginWithEnvCredentials();
    });

    test.describe('Sanity Tests', () => {
        test('Verify inventory page title', async ({
            inventoryPage
        }) => {
            await expect(inventoryPage.pageTitle)
                .toHaveText('Products');
        });

        test('Verify all six products are displayed', async ({
            inventoryPage
        }) => {
            await expect(inventoryPage.productItems).toHaveCount(6);
        });

        test('Verify product names are displayed', async ({
            inventoryPage
        }) => {
            await expect(inventoryPage.productNames.first())
                .toBeVisible();
        });

        test('Verify product prices are displayed', async ({
            inventoryPage
        }) => {
            await expect(inventoryPage.productPrices.first())
                .toBeVisible();
        });

        test('Verify user can add a product to cart', async ({
            inventoryPage
        }) => {
            await inventoryPage.addProductToCart(
                'Sauce Labs Backpack'
            );

            await expect(inventoryPage.cartBadge).toHaveText('1');
        });
    });

    test.describe('Regression Tests', () => {
        test('Verify products can be sorted A to Z', async ({
            inventoryPage
        }) => {
            await inventoryPage.sortProducts('az');

            const names = await inventoryPage.productNames.allTextContents();
            expect(names).toEqual([...names].sort());
        });

        test('Verify products can be sorted Z to A', async ({
            inventoryPage
        }) => {
            await inventoryPage.sortProducts('za');

            const names = await inventoryPage.productNames.allTextContents();
            expect(names).toEqual([...names].sort().reverse());
        });

        test('Verify products can be sorted by price low to high',
            async ({ inventoryPage }) => {
                await inventoryPage.sortProducts('lohi');

                const prices = (
                    await inventoryPage.productPrices.allTextContents()
                ).map(value => Number(value.replace('$', '')));

                expect(prices).toEqual(
                    [...prices].sort((a, b) => a - b)
                );
            }
        );

        test('Verify products can be sorted by price high to low',
            async ({ inventoryPage }) => {
                await inventoryPage.sortProducts('hilo');

                const prices = (
                    await inventoryPage.productPrices.allTextContents()
                ).map(value => Number(value.replace('$', '')));

                expect(prices).toEqual(
                    [...prices].sort((a, b) => b - a)
                );
            }
        );

        test('Verify user can open the shopping cart', async ({
            inventoryPage,
            page
        }) => {
            await inventoryPage.openCart();

            await expect(page).toHaveURL(/cart\.html/);
            await expect(page.locator('.title')).toHaveText('Your Cart');
        });
    });
});
