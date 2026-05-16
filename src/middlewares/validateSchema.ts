import type { Request, Response, NextFunction } from "express";
import type { ZodTypeAny } from "zod";

const validateSchema =
  <T extends ZodTypeAny>(schema: T) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ errors: result.error.issues });
    }
    req.validatedBody = result.data;
    next();
  };

export default validateSchema;
