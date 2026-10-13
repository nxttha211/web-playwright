import { test, expect } from '../pages/fixtures';
import { users } from '../data/users';

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto(users.url_website);
  await loginPage.login(users.standard.username, users.standard.password);
});

test('TC_09 เพิ่มสินค้า 2 ชิ้นลงตะกร้า', { tag: ['@cart', '@smoke'] }, async ({ productsPage }) => {

  await productsPage.addBackpackAndBikeLight();
  await expect(productsPage.el.cartBadge).toHaveText('2');
});

test('TC_10 ลบสินค้าออกจากตะกร้า', { tag: ['@cart'] }, async ({ productsPage }) => {

  await productsPage.el.addBackpack.click();
  await expect(productsPage.el.cartBadge).toHaveText('1');
  await productsPage.el.removeBackpack.click();
  await expect(productsPage.el.cartBadge).toBeHidden();
});

test('TC_11 หน้าตะกร้าแสดงสินค้าที่เลือกไว้', { tag: ['@cart'] }, async ({ productsPage, cartPage }) => {

  await productsPage.addBackpackAndBikeLight();
  await productsPage.goToCart();
  await expect(cartPage.el.itemNames).toHaveText(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
});
