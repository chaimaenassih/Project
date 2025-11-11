import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../auth/model/index.js";
import type { UserPayload } from '../../../types/user.js';


function getJwtSecret(): string {
  const s = process.env.JWT_SECRET;
  if (!s) throw new Error("JWT_SECRET missing");
  return s;
}

export async function signup(email: string, password: string) {
  const exists = await User.findOne({ email });
  if (exists) return { code: "ERROR", message: "Email already registered" };

  const passwordHash = await bcrypt.hash(password, 10);
  const doc = await User.create({ email, passwordHash, role: "member" });

  const payload: UserPayload = { sub: doc.id, email: doc.email, role: doc.role };
  const token = jwt.sign(payload, getJwtSecret(), { expiresIn: "1d" });

  return { token };
}

export async function login(email: string, password: string) {
  const user = await User.findOne({ email });
  if (!user) return { code: "ERROR", message: "Invalid credentials" };

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return { code: "ERROR", message: "Invalid credentials" };

  const payload: UserPayload = { sub: user.id, email: user.email, role: user.role };
  const token = jwt.sign(payload, getJwtSecret(), { expiresIn: "1d" });

  return { token };
}
