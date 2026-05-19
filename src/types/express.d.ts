import "express";

declare module "express" {
  interface Request {
    user?: {
      id: string;
      email: string;
      isAdmin: boolean;
    };
    validatedBody?: unknown;
    validatedParams?: unknown;
    validatedQuery?: unknown;
  }
}
