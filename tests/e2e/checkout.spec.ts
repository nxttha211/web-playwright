import { test, expect } from '../../fixtures';
import { users } from '../../test-data/users';
import { parseMoney } from '../../utils/money';

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

test('TC_15 ยอดรวมสุดท้ายต้องเท่ากับ item total + tax', { tag: ['@checkout'] }, async ({ checkoutPage }) => {
  await checkoutPage.fillInformation(users.customer);

  const itemTotal = parseMoney(await checkoutPage.el.itemTotal.textContent());
  const tax = parseMoney(await checkoutPage.el.tax.textContent());
  const total = parseMoney(await checkoutPage.el.total.textContent());

  expect(total).toBeCloseTo(itemTotal + tax, 2);
});
