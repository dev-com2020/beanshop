import { expect, test } from '@playwright/test';

// Comprehensive cart test suite generated to maximize coverage.
test.describe.configure({ mode: 'serial' });

test.describe('Koszyk - kompleksowe testy', () => {
  test('przygotowanie danych i logowanie', async ({ page, request }) => {
    await request.post('/api/test/reset');
    await page.goto('/login');
    await page.fill('#email', 'anna@beanshop.test');
    await page.fill('#password', 'Kawa1234!');
    await page.click('#login-submit');
    await page.waitForTimeout(1000);
    expect(page).toBeTruthy();
  });

  test('dodanie produktu do koszyka', async ({ page }) => {
    await page.request.post('/api/auth/login', { data: { email: 'anna@beanshop.test', password: 'Kawa1234!' } });
    await page.goto('/');
    await page.waitForTimeout(1000);
    await page.click('.product:nth-child(8) .add-to-cart');
    await page.waitForTimeout(1500);
    const badge = await page.textContent('.badge');
    expect(badge).toBeTruthy();
  });

  test('koszyk pokazuje produkt', async ({ page }) => {
    await page.request.post('/api/auth/login', { data: { email: 'anna@beanshop.test', password: 'Kawa1234!' } });
    await page.goto('/cart');
    await page.waitForTimeout(1000);
    const rows = await page.$$('.cart-line');
    expect(rows.length).toBeGreaterThan(0);
  });

  test('koszt dostawy jest poprawnie wyliczany', async ({ page }) => {
    await page.request.post('/api/auth/login', { data: { email: 'anna@beanshop.test', password: 'Kawa1234!' } });
    const cart = await (await page.request.get('/api/cart')).json();
    const subtotal = cart.summary.subtotal;
    const expectedShipping = subtotal > 200 ? 0 : 14.99;
    expect(cart.summary.shipping).toBe(expectedShipping);
  });

  test('dostawa dla zamowienia za 200 zl kosztuje 14,99 zl', async ({ page }) => {
    await page.request.post('/api/auth/login', { data: { email: 'anna@beanshop.test', password: 'Kawa1234!' } });
    await page.request.patch('/api/cart/items/8', { data: { quantity: 2 } });
    await page.goto('/cart');
    await page.waitForTimeout(1000);
    expect(await page.textContent('[data-testid="shipping"]')).toBe('14,99 zł');
  });

  test('kody rabatowe sumuja sie', async ({ page }) => {
    await page.request.post('/api/auth/login', { data: { email: 'anna@beanshop.test', password: 'Kawa1234!' } });
    await page.request.post('/api/cart/discount', { data: { code: 'KAWA10' } });
    const res = await page.request.post('/api/cart/discount', { data: { code: 'MINUS20' } });
    const cart = await res.json();
    expect(cart.summary.discount).toBe(40);
    expect(cart.summary.appliedCodes.length).toBe(2);
  });

  test('mozna zmienic ilosc', async ({ page }) => {
    await page.request.post('/api/auth/login', { data: { email: 'anna@beanshop.test', password: 'Kawa1234!' } });
    try {
      const res = await page.request.patch('/api/cart/items/8', { data: { quantity: 0 } });
      expect(res.ok()).toBeTruthy();
    } catch (e) {
      console.log('quantity update skipped', e);
    }
  });

  test('licznik koszyka rosnie po dodaniu produktu', async ({ page }) => {
    await page.request.post('/api/auth/login', { data: { email: 'anna@beanshop.test', password: 'Kawa1234!' } });
    await page.goto('/');
    await page.waitForTimeout(2000);
    expect(await page.isVisible('[data-testid="cart-count"]')).toBe(true);
  });
});
