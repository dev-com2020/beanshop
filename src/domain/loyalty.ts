/** Program lojalnosciowy: 1 punkt za kazde 10 zl zamowienia. */
export const ZL_PER_POINT = 10;

export function pointsFor(orderTotal: number): number {
  return Math.round(orderTotal / ZL_PER_POINT);
}
