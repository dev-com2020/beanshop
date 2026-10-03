import { Router } from 'express';
import { z } from 'zod';
import { requireAdmin, requireAuth, type AuthedRequest } from '../auth.js';
import { pointsFor } from '../domain/loyalty.js';
import { allowedNext, canTransition, type OrderStatus } from '../domain/orderStatus.js';
import { cartOf, db, now, type Order } from '../store.js';
import { cartView } from './cart.js';

export const ordersRouter = Router();
ordersRouter.use(requireAuth);

const withActions = (o: Order) => ({ ...o, allowedNext: allowedNext(o.status) });

function changeStatus(order: Order, to: OrderStatus): boolean {
  if (!canTransition(order.status, to)) return false;
  if (to === 'CANCELLED') {
    for (const item of order.items) {
      const p = db.products.find((x) => x.id === item.productId);
      if (p) p.stock += item.quantity;
    }
  }
  order.status = to;
  order.history.push({ status: to, at: now().toISOString() });
  return true;
}

ordersRouter.get('/', (req: AuthedRequest, res) => {
  const user = req.user!;
  const orders = user.role === 'admin' ? db.orders : db.orders.filter((o) => o.userId === user.id);
  res.json(orders.map(withActions));
});

ordersRouter.get('/points', (req: AuthedRequest, res) => {
  res.json({ points: req.user!.points });
});

ordersRouter.post('/', (req: AuthedRequest, res) => {
  const cart = cartOf(req.user!.id);
  if (cart.items.length === 0) {
    res.status(400).json({ error: 'EMPTY_CART', message: 'Koszyk jest pusty' });
    return;
  }
  for (const item of cart.items) {
    const p = db.products.find((x) => x.id === item.productId)!;
    if (item.quantity > p.stock) {
      res.status(409).json({ error: 'OUT_OF_STOCK', message: `Brak towaru: ${p.name}` });
      return;
    }
  }
  const view = cartView(cart);
  const createdAt = now().toISOString();
  const order: Order = {
    id: db.nextOrderId++,
    userId: req.user!.id,
    createdAt,
    status: 'NEW',
    items: view.items.map(({ productId, name, unitPrice, quantity }) => ({ productId, name, unitPrice, quantity })),
    summary: view.summary,
    shipping: cart.shipping,
    history: [{ status: 'NEW', at: createdAt }],
    points: pointsFor(view.summary.total),
  };
  req.user!.points += order.points;
  for (const item of cart.items) db.products.find((x) => x.id === item.productId)!.stock -= item.quantity;
  db.orders.push(order);
  db.carts.delete(req.user!.id);
  res.status(201).json(withActions(order));
});

function ownOrder(req: AuthedRequest): Order | undefined {
  const order = db.orders.find((o) => o.id === Number(req.params.id));
  if (!order) return undefined;
  if (req.user!.role !== 'admin' && order.userId !== req.user!.id) return undefined;
  return order;
}

ordersRouter.post('/:id/pay', (req: AuthedRequest, res) => {
  const order = ownOrder(req);
  if (!order) { res.status(404).json({ error: 'NOT_FOUND', message: 'Zamówienie nie istnieje' }); return; }
  if (!changeStatus(order, 'PAID')) { res.status(409).json({ error: 'INVALID_TRANSITION', message: 'Zamówienia nie można opłacić' }); return; }
  res.json(withActions(order));
});

ordersRouter.post('/:id/cancel', (req: AuthedRequest, res) => {
  const order = ownOrder(req);
  if (!order) { res.status(404).json({ error: 'NOT_FOUND', message: 'Zamówienie nie istnieje' }); return; }
  if (!changeStatus(order, 'CANCELLED')) { res.status(409).json({ error: 'INVALID_TRANSITION', message: 'Zamówienia nie można anulować' }); return; }
  res.json(withActions(order));
});

const statusBody = z.object({ status: z.enum(['NEW', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED']) });

ordersRouter.patch('/:id/status', requireAdmin, (req: AuthedRequest, res) => {
  const parsed = statusBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: 'VALIDATION', message: 'Niepoprawny status' }); return; }
  const order = db.orders.find((o) => o.id === Number(req.params.id));
  if (!order) { res.status(404).json({ error: 'NOT_FOUND', message: 'Zamówienie nie istnieje' }); return; }
  if (!changeStatus(order, parsed.data.status)) {
    res.status(409).json({ error: 'INVALID_TRANSITION', message: `Niedozwolone przejście ${order.status} -> ${parsed.data.status}` });
    return;
  }
  res.json(withActions(order));
});
