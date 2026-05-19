import type { Request, Response, NextFunction } from "express";
import ApiError from "@/utils/apiError";

const requireAdmin = (req: Request, _res: Response, next: NextFunction) => {
  const user = req.user;

  if (!user || !user.isAdmin) {
    throw new ApiError("Admin access required", 403);
  }

  next();
};

export default requireAdmin;
