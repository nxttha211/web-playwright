import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { AuthApi } from '../api/AuthApi';
import { ProductApi } from '../api/ProductApi';
import { CartApi } from '../api/CartApi';
import { apiUsers } from '../test-data/api-users';

type Pages = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
};

type Apis = {
  authApi: AuthApi;
  productApi: ProductApi;
  cartApi: CartApi;
  token: string;
};

export const test = base.extend<Pages & Apis>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  authApi: async ({ request }, use) => {
    await use(new AuthApi(request));
  },
  productApi: async ({ request }, use) => {
    await use(new ProductApi(request));
  },
  cartApi: async ({ request }, use) => {
    await use(new CartApi(request));
  },

  // Logs in through the API and gives the test a ready-to-use token
  token: async ({ authApi }, use) => {
    const res = await authApi.login(apiUsers.emily.username, apiUsers.emily.password);
    const body = await res.json();
    await use(body.accessToken);
  },
});

export { expect } from '@playwright/test';
