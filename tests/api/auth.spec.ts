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

test.fixme('API_03 login ด้วยรหัสผ่านผิดต้องได้ 400', { tag: ['@api'] }, async ({ authApi }) => {
  // TODO
  // 1. เรียก authApi.login() ด้วย username ถูก แต่ password ผิด
  // 2. ตรวจว่า status เป็น 400
  // 3. ตรวจว่า body.message มีคำว่า 'Invalid credentials'
});

test.fixme('API_04 token ผิดต้องได้ 401', { tag: ['@api'] }, async ({ authApi }) => {
  // TODO
  // 1. เรียก authApi.me() ด้วย token มั่ว เช่น 'not-a-real-token'
  // 2. ตรวจว่า status เป็น 401
  // คำถามชวนคิด: 401 กับ 403 ต่างกันอย่างไร
});
