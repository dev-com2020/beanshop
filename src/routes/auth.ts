import { Router } from 'express';
import { z } from 'zod';
import { createSession, destroySession, requireAuth, type AuthedRequest } from '../auth.js';
import { validatePassword } from '../domain/password.js';
import { db } from '../store.js';

export const MAX_FAILED_LOGINS = 5;
export const authRouter = Router();

const credentials = z.object({ email: z.string().email(), password: z.string().min(1) });
const registration = z.object({ email: z.string().email(), password: z.string(), name: z.string().min(2).max(60) });

const publicUser = (u: { id: number; email: string; name: string; role: string }) => ({
  id: u.id, email: u.email, name: u.name, role: u.role,
});

authRouter.post('/register', (req, res) => {
  const parsed = registration.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'VALIDATION', message: 'Niepoprawne dane', details: parsed.error.issues.map((i) => i.message) });
    return;
  }
  const { email, password, name } = parsed.data;
  const pwd = validatePassword(password);
  if (!pwd.valid) {
    res.status(400).json({ error: 'WEAK_PASSWORD', message: 'Hasło nie spełnia wymagań', details: pwd.errors });
    return;
  }
  if (db.users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    res.status(409).json({ error: 'EMAIL_TAKEN', message: 'Konto z tym adresem już istnieje' });
    return;
  }
  const user = { id: db.nextUserId++, email, name, password, role: 'customer' as const, failedLogins: 0, locked: false, points: 0 };
  db.users.push(user);
  res.status(201).json(publicUser(user));
});

authRouter.post('/login', (req, res) => {
  const parsed = credentials.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'VALIDATION', message: 'Podaj e-mail i hasło' });
    return;
  }
  const { email, password } = parsed.data;
  const user = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    res.status(401).json({ error: 'INVALID_CREDENTIALS', message: 'Niepoprawny e-mail lub hasło' });
    return;
  }
  if (user.locked) {
    res.status(423).json({ error: 'ACCOUNT_LOCKED', message: 'Konto zablokowane. Skontaktuj się z obsługą.' });
    return;
  }
  if (user.password !== password) {
    user.failedLogins += 1;
    if (user.failedLogins >= MAX_FAILED_LOGINS) user.locked = true;
    res.status(401).json({ error: 'INVALID_CREDENTIALS', message: 'Niepoprawny e-mail lub hasło' });
    return;
  }
  const token = createSession(user.id);
  res.setHeader('Set-Cookie', `sid=${token}; Path=/; HttpOnly; SameSite=Lax`);
  res.json({ token, user: publicUser(user) });
});

authRouter.post('/logout', (req, res) => {
  destroySession(req);
  res.setHeader('Set-Cookie', 'sid=; Path=/; Max-Age=0');
  res.status(204).end();
});

authRouter.get('/me', requireAuth, (req: AuthedRequest, res) => {
  res.json(publicUser(req.user!));
});
