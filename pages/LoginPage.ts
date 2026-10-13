import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly el;

  constructor(page: Page) {
    this.page = page;
    this.el = {
      username: page.getByTestId('username'),
      password: page.getByTestId('password'),
      loginButton: page.getByTestId('login-button'),
      errorMessage: page.getByTestId('error'),
    };
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async login(username: string, password: string) {
    await this.el.username.fill(username);
    await this.el.password.fill(password);
    await this.el.loginButton.click();
  }

  async loginWithoutData() {
    await this.el.loginButton.click();
  }
}
