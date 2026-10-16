import { Page } from '@playwright/test';

type Customer = { firstName: string; lastName: string; postalCode: string };

export class CheckoutPage {
  readonly page: Page;
  readonly el;

  constructor(page: Page) {
    this.page = page;
    this.el = {
      firstName: page.getByTestId('firstName'),
      lastName: page.getByTestId('lastName'),
      postalCode: page.getByTestId('postalCode'),
      continueButton: page.getByTestId('continue'),
      finishButton: page.getByTestId('finish'),
      errorMessage: page.getByTestId('error'),
      itemTotal: page.getByTestId('subtotal-label'),
      tax: page.getByTestId('tax-label'),
      total: page.getByTestId('total-label'),
      completeHeader: page.getByTestId('complete-header'),
    };
  }

  async fillInformation(customer: Customer) {
    await this.el.firstName.fill(customer.firstName);
    await this.el.lastName.fill(customer.lastName);
    await this.el.postalCode.fill(customer.postalCode);
    await this.el.continueButton.click();
  }

  async continueWithoutData() {
    await this.el.continueButton.click();
  }

  async finishOrder() {
    await this.el.finishButton.click();
  }
}
