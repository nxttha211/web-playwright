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

test.fixme('TC_17 ลบสินค้าจากหน้าตะกร้า', { tag: ['@cart'] }, async ({ productsPage, cartPage }) => {
  // TODO (ฝึกเพิ่ม locator และ method ใน page object ด้วย)
  // 1. เพิ่มสินค้า 2 ชิ้น แล้วไปหน้าตะกร้า
  // 2. ใน pages/CartPage.ts เพิ่ม method removeItem(name: string)
  //    hint: page.getByTestId('inventory-item').filter({ hasText: name }).getByRole('button', { name: 'Remove' })
  // 3. ลบ 'Sauce Labs Backpack' แล้วตรวจว่า cartPage.el.itemNames เหลือแค่ ['Sauce Labs Bike Light']
});
