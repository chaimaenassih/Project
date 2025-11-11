import { Router } from 'express';
import { z } from 'zod';
import { signup, login } from './services/index.js';
import { requireAuth } from '../../middlewares/auth.js';

const router = Router();

router.post('/signup', async (req, res) => {
  const body = z.object({ email: z.string().email(), password: z.string().min(6) }).safeParse(req.body);
  if (!body.success) return res.status(400).json({ code: 'VALIDATION_ERROR' });

  const r = await signup(body.data.email, body.data.password);
  if ('code' in r) return res.status(400).json(r);
  res.json(r);
});

router.post('/login', async (req, res) => {
  const body = z.object({ email: z.string().email(), password: z.string().min(6) }).safeParse(req.body);
  if (!body.success) return res.status(400).json({ code: 'VALIDATION_ERROR' });

  const r = await login(body.data.email, body.data.password);
  if ('code' in r) return res.status(400).json(r);
  res.json(r);
});

router.get('/me', requireAuth, (req, res) => {
  // req.user is set by the middleware (type added via express.d.ts)
  res.json({ user: req.user });
});

export default router;
