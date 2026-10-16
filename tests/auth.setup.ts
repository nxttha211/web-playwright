import { test as setup, expect } from '../fixtures';
import { users } from '../test-data/users';
import { AUTH_FILE } from '../config/env';

setup('log in as standard user', async ({ page, loginPage, productsPage }) => {

  await loginPage.goto('/');
  await loginPage.login(users.standard.username, users.standard.password);
  await expect(productsPage.el.title).toHaveText('Products');
  await page.context().storageState({ path: AUTH_FILE });
});
