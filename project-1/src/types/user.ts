export type UserRole = 'admin' | 'member';


export interface UserPayload {
  sub: string;
  email: string;
  role: UserRole;
}
