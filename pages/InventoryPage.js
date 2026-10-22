
const BasePage = require('./BasePage');

class InventoryPage extends BasePage {
    constructor(page) {
        super(page);

        this.pageTitle = page.locator('.title');
        this.productItems = page.locator('.inventory_item');
        this.productNames = page.locator('.inventory_item_name');
        this.productPrices = page.locator('.inventory_item_price');
        this.cartLink = page.locator('.shopping_cart_link');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.sortDropdown = page.locator(
            '[data-test="product-sort-container"]'
        );
    }

    async getProductCount() {
        return await this.productItems.count();
    }

    async addProductToCart(productName) {
        const product = this.productItems.filter({
            has: this.page.getByText(productName, { exact: true })
        });

        await product.getByRole('button', {
            name: 'Add to cart'
        }).click();
    }

    async openCart() {
        await this.cartLink.click();
    }

    async sortProducts(option) {
        await this.sortDropdown.selectOption(option);
    }
}

module.exports = InventoryPage;
