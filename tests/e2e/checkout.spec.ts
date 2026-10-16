import { test, expect } from '../../fixtures';
import { users } from '../../test-data/users';

test.beforeEach(async ({ productsPage, cartPage }) => {
  await productsPage.goto();
  await productsPage.addBackpackAndBikeLight();
  await productsPage.goToCart();
  await cartPage.checkout();
});

test('TC_12 สั่งซื้อสินค้าสำเร็จ', { tag: ['@checkout', '@smoke'] }, async ({ checkoutPage }) => {

  await checkoutPage.fillInformation(users.customer);
  await expect(checkoutPage.el.itemTotal).toHaveText('Item total: $39.98');
  await checkoutPage.finishOrder();
  await expect(checkoutPage.el.completeHeader).toHaveText('Thank you for your order!');
});

test('TC_13 ไม่กรอกข้อมูลผู้ซื้อเลย', { tag: ['@checkout'] }, async ({ checkoutPage }) => {

  await checkoutPage.continueWithoutData();
  await expect(checkoutPage.el.errorMessage).toHaveText('Error: First Name is required');
});

test('TC_14 ไม่กรอกรหัสไปรษณีย์', { tag: ['@checkout'] }, async ({ checkoutPage }) => {

  await checkoutPage.fillInformation({ ...users.customer, postalCode: '' });
  await expect(checkoutPage.el.errorMessage).toHaveText('Error: Postal Code is required');
});

// ===== แบบฝึก: เขียนเอง (ลบ test.fixme ออกเมื่อเขียนเสร็จ) =====

test.fixme('TC_15 ยอดรวมสุดท้ายต้องเท่ากับ item total + tax', { tag: ['@checkout'] }, async ({ checkoutPage }) => {
  // TODO
  // 1. checkoutPage.fillInformation(users.customer)
  // 2. อ่านข้อความจาก checkoutPage.el.itemTotal, el.tax, el.total ด้วย textContent()
  // 3. ดึงตัวเลขออกจากข้อความ เช่น 'Tax: $3.20' -> 3.2  (ลองเขียน helper ไว้ใน utils/)
  // 4. ตรวจว่า total ≈ itemTotal + tax ด้วย toBeCloseTo(..., 2)
  // ทำไมดีกว่าการ hardcode '$43.18'? -> ถ้าราคาสินค้าเปลี่ยน test ยังตรวจ logic ได้ถูก
});
