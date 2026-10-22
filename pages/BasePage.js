
class BasePage {
    constructor(page) {
        this.page = page;
    }

    async navigate(url) {
        await this.page.goto(url);
    }

    async getTitle() {
        return await this.page.title();
    }

    async getCurrentURL() {
        return this.page.url();
    }

    async click(locator) {
        await locator.click();
    }

    async enterText(locator, text) {
        await locator.fill(text);
    }

    async getText(locator) {
        return await locator.innerText();
    }

    async isVisible(locator) {
        return await locator.isVisible();
    }

    async takeScreenshot(name) {
        await this.page.screenshot({
            path: `screenshots/${name}.png`,
            fullPage: true
        });
    }
}

module.exports = BasePage;
