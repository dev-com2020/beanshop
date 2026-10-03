import { describe, expect, it } from 'vitest';
import { pointsFor } from '../../src/domain/loyalty';

describe('loyalty', () => {
  it('nalicza 10 punktow za 100 zl', () => {
    expect(pointsFor(100)).toBe(10);
  });

  it('nie nalicza punktow za puste zamowienie', () => {
    expect(pointsFor(0)).toBe(0);
  });
});
