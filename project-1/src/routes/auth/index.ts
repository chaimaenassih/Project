import { Router } from "express";
import { signup, login } from "../../modules/auth/services/index.js";
import { requireAuth } from "../../middlewares/auth.js";

const authRoutes = Router();

authRoutes.post("/signup", async (req, res) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) return res.status(400).json({ code: "VALIDATION_ERROR" });
  const out = await signup(email, password);
  if ("code" in out) return res.status(400).json(out);
  return res.json(out);
});

authRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) return res.status(400).json({ code: "VALIDATION_ERROR" });
  const out = await login(email, password);
  if ("code" in out) return res.status(400).json(out);
  return res.json(out);
});

authRoutes.get("/me", requireAuth, (req, res) => {
  return res.json({ user: req.user });
});

export default authRoutes;
