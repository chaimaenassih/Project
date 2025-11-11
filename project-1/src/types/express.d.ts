import "express";

export type UserRole = "admin" | "member";
export interface UserPayload {
  sub: string;
  email: string;
  role: UserRole;
}

declare module "express-serve-static-core" {
  interface Request {
    user?: UserPayload;
    requestId?: string;
  }
}
