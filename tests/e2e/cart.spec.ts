import { test, expect } from '../../fixtures';

// Already logged in through storageState (see tests/auth.setup.ts)
test.beforeEach(async ({ productsPage }) => {
  await productsPage.goto();
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

// ===== แบบฝึก: เขียนเอง (ลบ test.fixme ออกเมื่อเขียนเสร็จ) =====

test('TC_17 ลบสินค้าจากหน้าตะกร้า', { tag: ['@cart'] }, async ({ productsPage, cartPage }) => {
  await productsPage.addBackpackAndBikeLight();
  await productsPage.goToCart();
  await cartPage.removeItem('Sauce Labs Backpack');
  await expect(cartPage.el.itemNames).toHaveText(['Sauce Labs Bike Light']);
});
