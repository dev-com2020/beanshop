import { Router } from 'express';
import { z } from 'zod';
import { requireAuth, type AuthedRequest } from '../auth.js';
import { findDiscount } from '../domain/discounts.js';
import { lineTotal, priceCart } from '../domain/pricing.js';
import { cartOf, db, now, type Cart } from '../store.js';

export const MAX_QTY_PER_ITEM = 10;
export const cartRouter = Router();
cartRouter.use(requireAuth);

export function cartView(cart: Cart) {
  const lines = cart.items.map((item) => {
    const p = db.products.find((x) => x.id === item.productId)!;
    return { productId: p.id, name: p.name, unitPrice: p.price, quantity: item.quantity, lineTotal: lineTotal(p.price, item.quantity) };
  });
  return { items: lines, shipping: cart.shipping, summary: priceCart(lines, cart.codes, cart.shipping, now()) };
}

const addItem = z.object({ productId: z.number().int(), quantity: z.number().int().min(1).max(MAX_QTY_PER_ITEM).default(1) });
const updateItem = z.object({ quantity: z.number().int().max(MAX_QTY_PER_ITEM) });

cartRouter.get('/', (req: AuthedRequest, res) => {
  res.json(cartView(cartOf(req.user!.id)));
});

cartRouter.post('/items', (req: AuthedRequest, res) => {
  const parsed = addItem.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'VALIDATION', message: `Ilość musi być w zakresie 1-${MAX_QTY_PER_ITEM}` });
    return;
  }
  const { productId, quantity } = parsed.data;
  const product = db.products.find((p) => p.id === productId);
  if (!product) {
    res.status(404).json({ error: 'NOT_FOUND', message: 'Produkt nie istnieje' });
    return;
  }
  const cart = cartOf(req.user!.id);
  const existing = cart.items.find((i) => i.productId === productId);
  const newQty = (existing?.quantity ?? 0) + quantity;
  if (newQty > MAX_QTY_PER_ITEM) {
    res.status(400).json({ error: 'MAX_QTY', message: `Maksymalnie ${MAX_QTY_PER_ITEM} szt. jednego produktu` });
    return;
  }
  if (newQty > product.stock) {
    res.status(409).json({ error: 'OUT_OF_STOCK', message: 'Brak wystarczającej ilości w magazynie' });
    return;
  }
  if (existing) existing.quantity = newQty;
  else cart.items.push({ productId, quantity });
  res.status(201).json(cartView(cart));
});

cartRouter.patch('/items/:productId', (req: AuthedRequest, res) => {
  const parsed = updateItem.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'VALIDATION', message: `Ilość musi być w zakresie 1-${MAX_QTY_PER_ITEM}` });
    return;
  }
  const cart = cartOf(req.user!.id);
  const item = cart.items.find((i) => i.productId === Number(req.params.productId));
  const product = db.products.find((p) => p.id === Number(req.params.productId));
  if (!item || !product) {
    res.status(404).json({ error: 'NOT_FOUND', message: 'Pozycji nie ma w koszyku' });
    return;
  }
  if (parsed.data.quantity > product.stock) {
    res.status(409).json({ error: 'OUT_OF_STOCK', message: 'Brak wystarczającej ilości w magazynie' });
    return;
  }
  item.quantity = parsed.data.quantity;
  res.json(cartView(cart));
});

cartRouter.delete('/items/:productId', (req: AuthedRequest, res) => {
  const cart = cartOf(req.user!.id);
  cart.items = cart.items.filter((i) => i.productId !== Number(req.params.productId));
  res.json(cartView(cart));
});

cartRouter.post('/discount', (req: AuthedRequest, res) => {
  const code = typeof req.body?.code === 'string' ? req.body.code : '';
  const cart = cartOf(req.user!.id);
  const view = cartView(cart);
  const check = findDiscount(code, view.summary.subtotal, now());
  if (!check.ok) {
    const messages = { UNKNOWN: 'Nieznany kod rabatowy', EXPIRED: 'Kod rabatowy wygasł', MIN_SUBTOTAL: 'Wartość produktów jest za niska dla tego kodu' };
    res.status(422).json({ error: `CODE_${check.reason}`, message: messages[check.reason] });
    return;
  }
  if (cart.codes.some((c) => c.code === check.discount.code)) {
    res.status(409).json({ error: 'CODE_ALREADY_APPLIED', message: 'Ten kod jest już zastosowany' });
    return;
  }
  cart.codes.push(check.discount);
  res.json(cartView(cart));
});

cartRouter.delete('/discount', (req: AuthedRequest, res) => {
  const cart = cartOf(req.user!.id);
  cart.codes = [];
  res.json(cartView(cart));
});

cartRouter.put('/shipping', (req: AuthedRequest, res) => {
  const method = req.body?.method;
  if (method !== 'STANDARD' && method !== 'EXPRESS') {
    res.status(400).json({ error: 'VALIDATION', message: 'Dostępne metody: STANDARD, EXPRESS' });
    return;
  }
  const cart = cartOf(req.user!.id);
  cart.shipping = method;
  res.json(cartView(cart));
});
