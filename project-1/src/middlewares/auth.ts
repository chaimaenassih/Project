import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { UserPayload } from "#@/types/express.js";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) return res.status(401).json({ code: "UNAUTHORIZED" });

  const token = auth.slice("Bearer ".length);
  const secret = process.env.JWT_SECRET;
  if (!secret) return res.status(500).json({ code: "INTERNAL_ERROR" });

  try {
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
    const user: UserPayload = {
      sub: String(decoded.sub),
      email: String((decoded as any).email ?? ""),
      role: ((decoded as any).role === "admin" ? "admin" : "member"),
    };
    req.user = user;
    next();
  } catch {
    res.status(401).json({ code: "UNAUTHORIZED" });
  }
}
