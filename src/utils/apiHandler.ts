import type { Request, Response, NextFunction } from "express";
export type HandlerFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void | Promise<void>;

export const apiHandler = (handler: HandlerFunction) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
