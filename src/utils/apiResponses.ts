import { type Response } from "express";

export const successResponse = (
  res: Response,
  message: string,
  data: unknown = null,
  status = 200,
): Response => {
  return res.status(status).json({ success: true, message, data });
};

export const errorResponse = (
  res: Response,
  message = "Internal Server Error",
  status = 500,
  errors: Record<string, unknown> | null = null,
): Response => {
  return res.status(status).json({ success: false, message, errors });
};
