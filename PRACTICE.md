# แบบฝึก: เขียน test เอง

ใน branch `framework-v2` มี test ที่เว้นไว้ให้เขียนเอง 7 ตัว ทุกตัวขึ้นต้นด้วย `test.fixme` และมีขั้นตอนเป็นคอมเมนต์ `// TODO` อยู่ข้างใน
เขียนเสร็จแล้วให้เปลี่ยน `test.fixme(` เป็น `test(` แล้วรันให้ผ่าน

## ลำดับที่แนะนำ (ง่าย → ยาก)

| ลำดับ | Test | ไฟล์ | ได้ฝึกอะไร |
|---|---|---|---|
| 1 | API_04 token ผิดต้องได้ 401 | `tests/api/auth.spec.ts` | negative test, status code |
| 2 | API_03 รหัสผ่านผิดต้องได้ 400 | `tests/api/auth.spec.ts` | ตรวจ error message |
| 3 | API_07 ค้นหาสินค้า | `tests/api/products.spec.ts` | วนตรวจทุกรายการ |
| 4 | API_08 ยอดรวมตะกร้า | `tests/api/products.spec.ts` | business logic, `toBeCloseTo` |
| 5 | TC_16 เรียงราคาสูง→ต่ำ | `tests/e2e/products.spec.ts` | `allTextContents()`, ไม่ hardcode |
| 6 | TC_17 ลบสินค้าจากตะกร้า | `tests/e2e/cart.spec.ts` | **เพิ่ม method ใน page object เอง** |
| 7 | TC_15 total = item total + tax | `tests/e2e/checkout.spec.ts` | **สร้าง helper ใน `utils/` เอง** |

## รันทีละตัว

```bash
npx playwright test -g "API_04"
```

```bash
npx playwright test -g "TC_17" --project=chromium --headed
```

ดูว่า test ทำอะไรทีละขั้น (ช่วยตอนติด):

```bash
npx playwright test -g "TC_15" --project=chromium --ui
```

## โจทย์เสริม (ถ้ามีเวลา)

- [ ] ทำให้ TC_17 fail โดยตั้งใจ แล้วเปิด trace ดูด้วย `npx playwright show-trace` ฝึกอธิบายว่า debug อย่างไร
- [ ] เพิ่ม tag `@regression` และลองรัน `--grep-invert @smoke`
- [ ] เขียน `CONTRIBUTING.md`: กติกาตั้งชื่อ test, ลำดับเลือก locator, ห้าม sleep, code review checklist (แบบฝึก 4 ในคู่มือ)

## สิ่งที่ต้องอธิบายได้ตอนสัมภาษณ์

1. ทำไมแยก `setup` project และใช้ `storageState` ประหยัดอะไร และทำไม login test ต้องแยก project
2. ทำไม API test อยู่ใน project ที่ไม่เปิด browser
3. fixture `token` ทำงานอย่างไร และต่างจาก `beforeEach` อย่างไร
4. ทำไม CI รันแค่ smoke ตอน PR แต่รันทั้งหมดตอนกลางคืน
5. ถ้าเปลี่ยนไปทดสอบ staging ต้องแก้ตรงไหน (คำตอบ: ไม่ต้องแก้โค้ด ตั้ง `BASE_URL`)
6. ถ้าน้องในทีมจะเพิ่ม test หน้าใหม่ ต้องทำอะไรบ้าง (page object → fixture → test → tag)
