import ApiError from "@/utils/apiError";
import type { Request, Response, NextFunction } from "express";
import type { ZodTypeAny } from "zod";

interface ValidationSchemas {
  body?: ZodTypeAny;
  params?: ZodTypeAny;
  query?: ZodTypeAny;
}

const validateSchema =
  (schemas: ValidationSchemas) =>
  (req: Request, res: Response, next: NextFunction) => {
    const errors: Record<string, unknown> = {};

    if (schemas.body) {
      const result = schemas.body.safeParse(req.body);

      if (!result.success) {
        errors.body = result.error.flatten();
      } else {
        req.validatedBody = result.data;
      }
    }

    if (schemas.params) {
      const result = schemas.params.safeParse(req.params);

      if (!result.success) {
        errors.params = result.error.flatten();
      } else {
        req.validatedParams = result.data;
      }
    }

    if (schemas.query) {
      const result = schemas.query.safeParse(req.query);

      if (!result.success) {
        errors.query = result.error.flatten();
      } else {
        req.validatedQuery = result.data;
      }
    }

    if (Object.keys(errors).length > 0) {
      throw new ApiError("Validation failed", 400, errors);
    }

    next();
  };

export default validateSchema;
