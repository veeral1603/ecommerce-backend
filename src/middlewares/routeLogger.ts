import type { Request, Response, NextFunction } from "express";

const routeLogger = (req: Request, res: Response, next: NextFunction) => {
  const { method, originalUrl } = req;
  const timestamp = new Date().toLocaleString().split(", ")[1]; // Get only the time part
  console.log(`[${timestamp}] ${method} ${originalUrl}`);
  next();
};

export default routeLogger;
