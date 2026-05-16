import type { z } from "zod";
import type {
  SignupSchema,
  VerifyEmailSchema,
  LoginSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
  AccessTokenPayloadSchema,
} from "./auth.validators";

export type SignupInput = z.infer<typeof SignupSchema>;
export type VerifyEmailInput = z.infer<typeof VerifyEmailSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;

export interface VerificationTokenPayloadType {
  email: string;
}

export interface PasswordResetTokenPayloadType {
  email: string;
}

export type AccessTokenPayloadType = z.infer<typeof AccessTokenPayloadSchema>;
