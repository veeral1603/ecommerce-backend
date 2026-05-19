import { z } from "zod";

export const SignupSchema = z
  .object({
    email: z
      .string()
      .email()
      .nonempty("Email is required")
      .nonoptional("Email is required"),
    name: z
      .string()
      .nonempty("Name is required")
      .max(30, "Name can not exceed 30 characters")
      .nonoptional("Name is required"),

    password: z
      .string()
      .nonempty("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password can not exceed 100 characters"),
    confirmPassword: z
      .string()
      .nonempty("Confirm password is required")
      .min(8, "Confirm password must be at least 8 characters")
      .max(100, "Confirm password can not exceed 100 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  });

export const VerifyEmailSchema = z.object({
  token: z
    .string()
    .nonempty("Token is required")
    .nonoptional("Token is required"),
});

export const LoginSchema = z.object({
  email: z
    .string()
    .email()
    .nonempty("Email is required")
    .nonoptional("Email is required"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password can not exceed 100 characters"),
});

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .email()
    .nonempty("Email is required")
    .nonoptional("Email is required"),
});

export const ResetPasswordSchema = z.object({
  token: z
    .string()
    .nonempty("Token is required")
    .nonoptional("Token is required"),
  newPassword: z
    .string()
    .nonempty("New password is required")
    .min(8, "New password must be at least 8 characters")
    .max(100, "New password can not exceed 100 characters"),
});

export const AccessTokenPayloadSchema = z.object({
  userId: z.string(),
  email: z.string().email(),
  isAdmin: z.boolean().default(false),
});
