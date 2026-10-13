import { Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly el;

  constructor(page: Page) {
    this.page = page;
    this.el = {
      itemNames: page.getByTestId('inventory-item-name'),
      checkoutButton: page.getByTestId('checkout'),
      continueShoppingButton: page.getByTestId('continue-shopping'),
    };
  }

  async checkout() {
    await this.el.checkoutButton.click();
  }
}
