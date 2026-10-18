import { test, expect } from '../../fixtures';
import { apiUsers } from '../../test-data/api-users';

test('API_01 login ด้วยบัญชีที่ถูกต้องได้ token', { tag: ['@api', '@smoke'] }, async ({ authApi }) => {

  const res = await authApi.login(apiUsers.emily.username, apiUsers.emily.password);
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body.username).toBe(apiUsers.emily.username);
  expect(body.accessToken).toEqual(expect.any(String));
});

test('API_02 ใช้ token ดึงข้อมูลผู้ใช้ของตัวเอง', { tag: ['@api'] }, async ({ authApi, token }) => {

  const res = await authApi.me(token);
  expect(res.status()).toBe(200);
  expect(await res.json()).toMatchObject({ username: apiUsers.emily.username, email: expect.any(String) });
});

// ===== แบบฝึก: เขียนเอง (ลบ test.fixme ออกเมื่อเขียนเสร็จ) =====

test('API_03 login ด้วยรหัสผ่านผิดต้องได้ 400', { tag: ['@api'] }, async ({ authApi }) => {
  const res = await authApi.login(apiUsers.emily.username, 'wrong-password');
  expect(res.status()).toBe(400);
  const body = await res.json();
  expect(body.message).toContain('Invalid credentials');
});

test('API_04 token ผิดต้องได้ 401', { tag: ['@api'] }, async ({ authApi }) => {
  const res = await authApi.me('not-a-real-token');
  expect(res.status()).toBe(401);
  const body = await res.json();
  expect(body.message).toBe('Invalid/Expired Token!');
});
