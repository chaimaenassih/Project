import type { NextFunction, Request, Response } from 'express';
import type { UserRole } from '../types/user.js';

export function requireRole(...roles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = req.user?.role;
    if (!role) return res.status(401).json({ code: 'UNAUTHORIZED' });
    if (!roles.includes(role)) return res.status(403).json({ code: 'FORBIDDEN' });
    next();
  };
}
