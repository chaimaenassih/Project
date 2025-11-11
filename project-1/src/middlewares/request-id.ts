import type { Request, Response, NextFunction } from "express";
import { randomUUID } from "node:crypto";

export function requestId(req: Request, _res: Response, next: NextFunction) {
  req.requestId = randomUUID();
  next();
}

export function minimalLogger(req: Request, res: Response, next: NextFunction) {
  const t0 = Date.now();
  res.on('finish', () => {
    const ms = Date.now() - t0;
    console.log(`[${req.requestId}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${ms}ms)`);
  });
  next();
}
