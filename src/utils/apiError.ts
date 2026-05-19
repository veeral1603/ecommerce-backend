export default class ApiError extends Error {
  status: number;
  errors?: Record<string, unknown> | null;

  constructor(
    message: string,
    status = 400,
    errors: Record<string, unknown> | null = null,
  ) {
    super(message);
    this.status = status;
    this.errors = errors;
    this.name = "ApiError";
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
