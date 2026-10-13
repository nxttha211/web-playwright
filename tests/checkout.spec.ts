import { test, expect } from '../pages/fixtures';
import { users } from '../data/users';

test.beforeEach(async ({ loginPage, productsPage, cartPage }) => {
  await loginPage.goto(users.url_website);
  await loginPage.login(users.standard.username, users.standard.password);
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
