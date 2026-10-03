import type { DiscountCode } from './domain/discounts.js';
import type { OrderStatus } from './domain/orderStatus.js';
import type { PriceSummary, ShippingMethod } from './domain/pricing.js';

export interface Product {
  id: number;
  sku: string;
  name: string;
  category: 'kawa' | 'akcesoria';
  price: number;
  stock: number;
  description: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
  role: 'customer' | 'admin';
  failedLogins: number;
  locked: boolean;
  points: number;
}

export interface CartItem {
  productId: number;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  codes: DiscountCode[];
  shipping: ShippingMethod;
}

export interface Order {
  id: number;
  userId: number;
  createdAt: string;
  status: OrderStatus;
  items: { productId: number; name: string; unitPrice: number; quantity: number }[];
  summary: PriceSummary;
  shipping: ShippingMethod;
  history: { status: OrderStatus; at: string }[];
  points: number;
}

const seedProducts = (): Product[] => [
  { id: 1, sku: 'KAW-ETI-250', name: 'Etiopia Yirgacheffe 250 g', category: 'kawa', price: 44.99, stock: 12, description: 'Kawa ziarnista, jasne palenie, nuty jaśminu i cytrusów.' },
  { id: 2, sku: 'KAW-KOL-250', name: 'Kolumbia Supremo 250 g', category: 'kawa', price: 39.99, stock: 5, description: 'Kawa ziarnista, średnie palenie, czekolada i karmel.' },
  { id: 3, sku: 'KAW-BRA-1000', name: 'Brazylia Santos 1 kg', category: 'kawa', price: 89.99, stock: 3, description: 'Kawa ziarnista do espresso, orzechy i kakao.' },
  { id: 4, sku: 'KAW-ESP-500', name: 'Espresso Blend 500 g', category: 'kawa', price: 54.99, stock: 20, description: 'Mieszanka 70/30 arabika i robusta.' },
  { id: 5, sku: 'KAW-KEN-DRIP', name: 'Drip Kenia 10 szt.', category: 'kawa', price: 29.99, stock: 0, description: 'Saszetki drip do parzenia w kubku.' },
  { id: 6, sku: 'AKC-MLY-01', name: 'Młynek ręczny Stalowy', category: 'akcesoria', price: 159.0, stock: 4, description: 'Żarna stalowe, 40 stopni regulacji.' },
  { id: 7, sku: 'AKC-V60-01', name: 'Drip V60 ceramiczny', category: 'akcesoria', price: 99.0, stock: 7, description: 'Ceramiczny drip, rozmiar 02.' },
  { id: 8, sku: 'AKC-DZB-01', name: 'Dzbanek do przelewów 600 ml', category: 'akcesoria', price: 100.0, stock: 6, description: 'Szklany dzbanek z podziałką.' },
  { id: 9, sku: 'AKC-FIL-100', name: 'Filtry papierowe 100 szt.', category: 'akcesoria', price: 19.99, stock: 50, description: 'Filtry do V60, rozmiar 02.' },
];

const seedUsers = (): User[] => [
  { id: 1, email: 'anna@beanshop.test', name: 'Anna Nowak', password: 'Kawa1234!', role: 'customer', failedLogins: 0, locked: false, points: 0 },
  { id: 2, email: 'jan@beanshop.test', name: 'Jan Kowalski', password: 'Espresso99', role: 'customer', failedLogins: 0, locked: false, points: 0 },
  { id: 3, email: 'admin@beanshop.test', name: 'Admin Sklepu', password: 'Admin1234!', role: 'admin', failedLogins: 0, locked: false, points: 0 },
];

export const db = {
  products: seedProducts(),
  users: seedUsers(),
  sessions: new Map<string, number>(),
  carts: new Map<number, Cart>(),
  orders: [] as Order[],
  nextUserId: 4,
  nextOrderId: 1001,
  /** Sterowany zegar (tylko API testowe). null = czas systemowy. */
  fixedNow: null as Date | null,
};

export function now(): Date {
  return db.fixedNow ?? new Date();
}

export function resetDb(): void {
  db.products = seedProducts();
  db.users = seedUsers();
  db.sessions.clear();
  db.carts.clear();
  db.orders = [];
  db.nextUserId = 4;
  db.nextOrderId = 1001;
  db.fixedNow = null;
}

export function cartOf(userId: number): Cart {
  let cart = db.carts.get(userId);
  if (!cart) {
    cart = { items: [], codes: [], shipping: 'STANDARD' };
    db.carts.set(userId, cart);
  }
  return cart;
}
