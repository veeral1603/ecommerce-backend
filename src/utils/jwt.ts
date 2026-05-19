import { type JWTPayload, SignJWT, jwtVerify } from "jose";
import ApiError from "@/utils/apiError";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "default_secret",
);
const ALGORITHM = "HS256";

export const generateToken = async <T>(
  payload: T,
  expiresIn = "14d",
): Promise<string> => {
  const jwt = await new SignJWT(payload as JWTPayload)
    .setIssuedAt()
    .setProtectedHeader({ alg: ALGORITHM })
    .setExpirationTime(expiresIn)
    .sign(secret);

  return jwt;
};

export const verifyToken = async <T = unknown>(token: string): Promise<T> => {
  try {
    const { payload } = await jwtVerify(token, secret, {
      algorithms: [ALGORITHM],
    });
    return payload as T;
  } catch (error) {
    throw new ApiError(
      error instanceof Error ? error.message : "Invalid token",
      401,
    );
  }
};
