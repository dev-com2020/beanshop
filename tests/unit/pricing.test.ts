import { describe, expect, it } from 'vitest';
import { DISCOUNT_CODES } from '../../src/domain/discounts';
import { lineTotal, priceCart, shippingCost, SHIPPING } from '../../src/domain/pricing';

const code = (c: string) => DISCOUNT_CODES.find((d) => d.code === c)!;

describe('pricing', () => {
  it('liczy wartosc pozycji', () => {
    expect(lineTotal(44.99, 3)).toBe(134.97);
  });

  it('nalicza dostawe standardowa ponizej progu', () => {
    expect(shippingCost(150, 'STANDARD')).toBe(SHIPPING.STANDARD);
  });

  it('daje darmowa dostawe powyzej progu', () => {
    expect(shippingCost(250, 'STANDARD')).toBe(0);
  });

  it('express jest darmowy przy darmowej dostawie', () => {
    expect(shippingCost(250, 'EXPRESS')).toBe(0);
  });

  it('nalicza rabat procentowy', () => {
    const summary = priceCart([{ lineTotal: 100 }], [code('KAWA10')], 'STANDARD');
    expect(summary.total).toBeGreaterThan(0);
    expect(summary.appliedCodes).toBeDefined();
  });

  it('rabat kwotowy nie obniza ceny ponizej zera', () => {
    const summary = priceCart([{ lineTotal: 10 }], [code('MINUS20')], 'STANDARD');
    expect(summary.discount).toBe(10);
  });
});
