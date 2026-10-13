import { test, expect } from '../pages/fixtures';
import { users } from '../data/users';

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto(users.url_website);
  await loginPage.login(users.standard.username, users.standard.password);
});

test('TC_06 แสดงสินค้าครบ 6 รายการ', { tag: ['@products', '@smoke'] }, async ({ productsPage }) => {

  await expect(productsPage.el.productNames).toHaveCount(6);
});

test('TC_07 เรียงสินค้าตามชื่อจาก Z ไป A', { tag: ['@products'] }, async ({ productsPage }) => {

  await productsPage.sortBy('za');
  await expect(productsPage.el.productNames).toHaveText([
    'Test.allTheThings() T-Shirt (Red)',
    'Sauce Labs Onesie',
    'Sauce Labs Fleece Jacket',
    'Sauce Labs Bolt T-Shirt',
    'Sauce Labs Bike Light',
    'Sauce Labs Backpack',
  ]);
});

test('TC_08 เรียงสินค้าตามราคาจากต่ำไปสูง', { tag: ['@products'] }, async ({ productsPage }) => {

  await productsPage.sortBy('lohi');
  await expect(productsPage.el.productPrices).toHaveText(['$7.99', '$9.99', '$15.99', '$15.99', '$29.99', '$49.99']);
});
