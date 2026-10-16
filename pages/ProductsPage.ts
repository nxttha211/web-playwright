import { Page } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly el;

  constructor(page: Page) {
    this.page = page;
    this.el = {
      title: page.getByTestId('title'),
      productNames: page.getByTestId('inventory-item-name'),
      productPrices: page.getByTestId('inventory-item-price'),
      sortDropdown: page.getByTestId('product-sort-container'),
      cartBadge: page.getByTestId('shopping-cart-badge'),
      cartIcon: page.getByTestId('shopping-cart-link'),
      addBackpack: page.getByTestId('add-to-cart-sauce-labs-backpack'),
      addBikeLight: page.getByTestId('add-to-cart-sauce-labs-bike-light'),
      removeBackpack: page.getByTestId('remove-sauce-labs-backpack'),
    };
  }

  async goto() {
    await this.page.goto('/inventory.html');
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.el.sortDropdown.selectOption(option);
  }

  async addBackpackAndBikeLight() {
    await this.el.addBackpack.click();
    await this.el.addBikeLight.click();
  }

  async goToCart() {
    await this.el.cartIcon.click();
  }
}
