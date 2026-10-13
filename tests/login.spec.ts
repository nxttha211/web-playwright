import { test, expect } from '../pages/fixtures';
import { users } from '../data/users';

test('TC_01 เข้าสู่ระบบด้วยบัญชีที่ถูกต้อง', { tag: ['@login', '@smoke'] }, async ({ page, loginPage, productsPage }) => {

  await loginPage.goto(users.url_website);
  await loginPage.login(users.standard.username, users.standard.password);
  await expect(page).toHaveURL(/inventory\.html/);
  await expect(productsPage.el.title).toHaveText('Products');
});

test('TC_02 เข้าสู่ระบบด้วยบัญชีที่ถูกล็อก', { tag: ['@login'] }, async ({ loginPage }) => {

  await loginPage.goto(users.url_website);
  await loginPage.login(users.locked.username, users.locked.password);
  await expect(loginPage.el.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
});

test('TC_03 ไม่กรอกอะไรเลย', { tag: ['@login'] }, async ({ loginPage }) => {

  await loginPage.goto(users.url_website);
  await loginPage.loginWithoutData();
  await expect(loginPage.el.errorMessage).toHaveText('Epic sadface: Username is required');
});

test('TC_04 กรอกชื่อผู้ใช้แต่ไม่กรอกรหัสผ่าน', { tag: ['@login'] }, async ({ loginPage }) => {

  await loginPage.goto(users.url_website);
  await loginPage.login(users.standard.username, '');
  await expect(loginPage.el.errorMessage).toHaveText('Epic sadface: Password is required');
});

test('TC_05 กรอกรหัสผ่านผิด', { tag: ['@login'] }, async ({ loginPage }) => {

  await loginPage.goto(users.url_website);
  await loginPage.login(users.wrongPassword.username, users.wrongPassword.password);
  await expect(loginPage.el.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
});
