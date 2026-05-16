import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";
import { verifyToken } from "@/utils/jwt";
import type { AccessTokenPayloadType } from "@/modules/auth/auth.types";
import { AccessTokenPayloadSchema } from "@/modules/auth/auth.validators";

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const access_token = req.cookies.access_token as string | undefined;

  if (!access_token) {
    throw new ApiError("Unauthorized", 401);
  }

  const tokenPayload = await verifyToken<AccessTokenPayloadType>(access_token);
  if (
    !tokenPayload ||
    !AccessTokenPayloadSchema.safeParse(tokenPayload).success
  ) {
    throw new ApiError("Unauthorized", 401);
  }

  // Attach user info to request object
  req.user = {
    id: tokenPayload.userId,
    email: tokenPayload.email,
  };

  next();
};

export default requireAuth;
