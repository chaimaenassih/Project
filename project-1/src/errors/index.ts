export class AppError extends Error {
  public readonly status: number;
  public readonly code: string;

  constructor(status: number, code: string, message?: string) {
    super(message ?? code);
    this.status = status;
    this.code = code;
  }
}

export const ERR = {
  UNAUTHORIZED: () => new AppError(401, "UNAUTHORIZED", "Authentication required"),
  FORBIDDEN:    () => new AppError(403, "FORBIDDEN", "Forbidden"),
  NOT_FOUND:    () => new AppError(404, "NOT_FOUND"),
  CONFLICT:     (msg = "Conflict") => new AppError(409, "CONFLICT", msg),
  VALIDATION:   (msg = "Validation error") => new AppError(400, "VALIDATION_ERROR", msg),
};
