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

test.fixme('TC_16 เรียงราคาจากสูงไปต่ำ (ตรวจด้วย logic ไม่ hardcode)', { tag: ['@products'] }, async ({ productsPage }) => {
  // TODO
  // 1. productsPage.sortBy('hilo')
  // 2. อ่านราคาทั้งหมดด้วย productsPage.el.productPrices.allTextContents()
  // 3. แปลง '$49.99' -> 49.99
  // 4. สร้าง array ที่เรียงจากมากไปน้อยเอง แล้วเทียบกับของจริงด้วย toEqual
});
