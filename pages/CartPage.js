
const BasePage = require('./BasePage');

class CartPage extends BasePage {
    constructor(page) {
        super(page);

        this.pageTitle = page.locator('.title');
        this.cartItems = page.locator('.cart_item');

        this.checkoutButton = page.getByRole('button', {
            name: 'Checkout'
        });

        this.continueShoppingButton = page.getByRole('button', {
            name: 'Continue Shopping'
        });
    }

    async getItemCount() {
        return await this.cartItems.count();
    }

    async removeProduct(productName) {
        const product = this.cartItems.filter({
            hasText: productName
        });

        await product.getByRole('button', {
            name: 'Remove'
        }).click();
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }
}

module.exports = CartPage;
