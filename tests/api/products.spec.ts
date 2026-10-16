import { test, expect } from '../../fixtures';

test('API_05 ดึงสินค้าตาม id ได้ข้อมูลครบ', { tag: ['@api', '@smoke'] }, async ({ productApi }) => {

  const res = await productApi.getById(1);
  expect(res.status()).toBe(200);
  expect(await res.json()).toMatchObject({
    id: 1,
    title: expect.any(String),
    price: expect.any(Number),
    stock: expect.any(Number),
  });
});

test('API_06 ดึงสินค้าที่ไม่มีอยู่จริงต้องได้ 404', { tag: ['@api'] }, async ({ productApi }) => {

  const res = await productApi.getById(999999);
  expect(res.status()).toBe(404);
});

// ===== แบบฝึก: เขียนเอง (ลบ test.fixme ออกเมื่อเขียนเสร็จ) =====

test.fixme('API_07 ค้นหาสินค้าด้วยคำว่า phone ทุกรายการต้องเกี่ยวข้อง', { tag: ['@api'] }, async ({ productApi }) => {
  // TODO
  // 1. เรียก productApi.search('phone')
  // 2. ตรวจว่า status เป็น 200 และ body.products มีอย่างน้อย 1 รายการ
  // 3. วนทุกรายการ ตรวจว่า title หรือ description มีคำว่า phone (ไม่สนตัวเล็กตัวใหญ่)
});

test.fixme('API_08 ยอดรวมในตะกร้าต้องเท่ากับผลรวม price × quantity', { tag: ['@api'] }, async ({ cartApi }) => {
  // TODO (business logic check แบบที่เขียนในแบบประเมินข้อ 16)
  // 1. เรียก cartApi.getById(1)
  // 2. คำนวณผลรวม price * quantity จาก body.products ด้วย reduce
  // 3. ตรวจ body.total ด้วย toBeCloseTo(ผลรวม, 2)  (ห้ามใช้ toBe กับทศนิยม เพราะอะไร?)
  // 4. ตรวจเพิ่ม: body.totalQuantity เท่ากับผลรวม quantity
});
