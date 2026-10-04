import type { DiscountCode } from './discounts.js';
import { round2 } from './money.js';

export type ShippingMethod = 'STANDARD' | 'EXPRESS';

export const SHIPPING = {
  STANDARD: 14.99,
  EXPRESS: 24.99,
  /** Doplata za express, gdy dostawa standardowa jest darmowa. */
  EXPRESS_SURCHARGE: 10,
  FREE_THRESHOLD: 200,
  /** Promocja weekendowa: darmowa dostawa od 150 zl w soboty i niedziele. */
  WEEKEND_FREE_THRESHOLD: 150,
} as const;

export interface PricedLine {
  productId: number;
  name: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

export interface PriceSummary {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  appliedCodes: string[];
}

export function lineTotal(unitPrice: number, quantity: number): number {
  return round2(unitPrice * quantity);
}

export function subtotalOf(lines: Pick<PricedLine, 'lineTotal'>[]): number {
  return round2(lines.reduce((sum, l) => sum + l.lineTotal, 0));
}

export function discountAmount(subtotal: number, codes: DiscountCode[]): number {
  let amount = 0;
  for (const code of codes) {
    if (code.type === 'PERCENT') amount += (subtotal * code.value) / 100;
    else amount += code.value;
  }
  return Math.min(amount, subtotal);
}

/** Prog darmowej dostawy zalezny od dnia tygodnia (promocja weekendowa). */
export function freeShippingThreshold(date: Date): number {
  const day = date.getUTCDay();
  const weekend = day === 0 || day === 6;
  return weekend ? SHIPPING.WEEKEND_FREE_THRESHOLD : SHIPPING.FREE_THRESHOLD;
}

/** BR-04: darmowa dostawa od progu (200 zl, w weekend 150 zl) wartosci produktow po rabacie. */
export function shippingCost(afterDiscount: number, method: ShippingMethod, date: Date = new Date()): number {
  if (afterDiscount === 0) return 0;
  if (afterDiscount > freeShippingThreshold(date)) return 0;
  return method === 'EXPRESS' ? SHIPPING.EXPRESS : SHIPPING.STANDARD;
}

export function priceCart(
  lines: Pick<PricedLine, 'lineTotal'>[],
  codes: DiscountCode[],
  method: ShippingMethod,
  date: Date = new Date(),
): PriceSummary {
  const subtotal = subtotalOf(lines);
  const discount = discountAmount(subtotal, codes);
  const afterDiscount = subtotal - discount;
  const shipping = shippingCost(afterDiscount, method, date);
  return {
    subtotal,
    discount,
    shipping,
    total: afterDiscount + shipping,
    appliedCodes: codes.map((c) => c.code),
  };
}
