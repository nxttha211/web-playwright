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

// tag: ['@api'] = ติดป้ายเพื่อกรองรันเฉพาะ API ได้ เช่น npx playwright test -g "@api"
// { productApi } = ดึง fixture ProductApi จาก fixtures/index.ts มาใช้ในเทสนี้
test('API_07 ค้นหาสินค้าด้วยคำว่า phone ทุกรายการต้องเกี่ยวข้อง', { tag: ['@api'] }, async ({ productApi }) => {
  // เรียก GET /products/search?q=phone แล้วรอผล (await เพราะเป็น async)
  const res = await productApi.search('phone');
  // ตรวจว่า HTTP status เป็น 200 (ค้นหาสำเร็จ)
  expect(res.status()).toBe(200);

  // แปลง response body จาก JSON string เป็น object JS ที่ใช้งานได้
  const body = await res.json();
  // body.products = array ของสินค้าที่ค้นเจอ — ต้องมีอย่างน้อย 1 ชิ้น
  expect(body.products.length).toBeGreaterThan(0);

  // วนทีละสินค้าใน array เพื่อตรวจทุกชิ้น (ไม่ใช่แค่ชิ้นแรก)
  for (const product of body.products) {
    // รวม title + description เป็นข้อความเดียว แล้วแปลงเป็นตัวเล็กทั้งหมด
    // เพื่อเทียบคำว่า "phone" โดยไม่สนตัวพิมพ์เล็ก/ใหญ่ (Phone / PHONE ก็ผ่าน)
    const text = `${product.title} ${product.description}`.toLowerCase();
    // ตรวจว่าข้อความนั้นมีคำว่า "phone" อยู่จริง (สินค้าเกี่ยวข้องกับคำค้น)
    expect(text).toContain('phone');
  }
});

test('API_08 ยอดรวมในตะกร้าต้องเท่ากับผลรวม price × quantity', { tag: ['@api'] }, async ({ cartApi }) => {
  const res = await cartApi.getById(1);
  expect(res.status()).toBe(200);

  const body = await res.json();
  const sumTotal = body.products.reduce(
    (sum: number, p: { price: number; quantity: number }) => sum + p.price * p.quantity,
    0,
  );
  const sumQuantity = body.products.reduce(
    (sum: number, p: { quantity: number }) => sum + p.quantity,
    0,
  );

  expect(body.total).toBeCloseTo(sumTotal, 2);
  expect(body.totalQuantity).toBe(sumQuantity);
});
