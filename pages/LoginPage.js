
const BasePage = require('./BasePage');

class LoginPage extends BasePage {
    constructor(page) {
        super(page);

        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', {name: 'Login' });
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async goto() {
        await this.navigate(
            process.env.BASE_URL || 'https://www.saucedemo.com/'
        );
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async loginWithEnvCredentials() {
        const username = process.env.SAUCE_USERNAME;
        const password = process.env.SAUCE_PASSWORD;

        if (!username || !password) {
            throw new Error(
                'Set SAUCE_USERNAME and SAUCE_PASSWORD in .env'
            );
        }

        await this.login(username, password);
    }

    async getErrorMessage() {
        return await this.errorMessage.innerText();
    }
}

module.exports = LoginPage;
