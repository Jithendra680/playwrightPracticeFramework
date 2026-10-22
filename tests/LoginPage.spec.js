
const { test, expect } = require('../fixtures/baseTest');
const testData = require('../test-data/users.json');
const { registerTestHooks } = require('../hooks/testHooks');

test.describe('Login Page Tests', () => {
    registerTestHooks(test);

    test.describe('Sanity Tests', () => {
        test('Verify login with valid credentials', async ({
            loginPage,
            inventoryPage
        }) => {
            await loginPage.goto();
            await loginPage.loginWithEnvCredentials();

            await expect(inventoryPage.pageTitle)
                .toHaveText('Products');
        });
    });

    test.describe('Regression Tests', () => {
        test.beforeEach(async ({ loginPage }) => {
            await loginPage.goto();
        });

        test('Verify login with invalid credentials', async ({
            loginPage
        }) => {
            await loginPage.login(
                testData.invalidUser.username,
                testData.invalidUser.password
            );

            await expect(loginPage.errorMessage)
                .toContainText('Username and password do not match');
        });

        test('Verify locked user cannot login', async ({
            loginPage
        }) => {
            await loginPage.login(
                testData.lockedUser.username,
                testData.lockedUser.password
            );

            await expect(loginPage.errorMessage)
                .toContainText('Sorry, this user has been locked out');
        });

        test('Verify login fails when username is empty', async ({
            loginPage
        }) => {
            await loginPage.passwordInput.fill('secret_sauce');
            await loginPage.loginButton.click();

            await expect(loginPage.errorMessage)
                .toContainText('Username is required');
        });

        test('Verify login fails when password is empty', async ({
            loginPage
        }) => {
            await loginPage.usernameInput.fill('standard_user');
            await loginPage.loginButton.click();

            await expect(loginPage.errorMessage)
                .toContainText('Password is required');
        });

        test('Verify login fails when both fields are empty', async ({
            loginPage
        }) => {
            await loginPage.loginButton.click();

            await expect(loginPage.errorMessage)
                .toContainText('Username is required');
        });
    });
});
