import { test, expect } from '../../fixtures';

// Already logged in through storageState (see tests/auth.setup.ts)
test.beforeEach(async ({ productsPage }) => {
  await productsPage.goto();
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

// ===== แบบฝึก: เขียนเอง (ลบ test.fixme ออกเมื่อเขียนเสร็จ) =====

test('TC_16 เรียงราคาจากสูงไปต่ำ (ตรวจด้วย logic ไม่ hardcode)', { tag: ['@products'] }, async ({ productsPage }) => {
  await productsPage.sortBy('hilo');

  const priceTexts = await productsPage.el.productPrices.allTextContents();
  const prices = priceTexts.map((text) => Number(text.replace('$', '')));
  const expected = [...prices].sort((a, b) => b - a);

  expect(prices).toEqual(expected);
});
