/** ดึงตัวเลขเงินจากข้อความ เช่น 'Tax: $3.20' -> 3.2 */
export function parseMoney(text: string | null): number {
  if (!text) return 0;
  const match = text.match(/[\d.]+/);
  return match ? Number(match[0]) : 0;
}
