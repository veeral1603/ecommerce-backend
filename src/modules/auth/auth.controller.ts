import apiHandler from "../../utils/apiHandler";
import authService from "@/modules/auth/auth.service";
import type {
  SignupInput,
  VerifyEmailInput,
  LoginInput,
  ForgotPasswordInput,
  ResetPasswordInput,
} from "./auth.types";
import { successResponse } from "@/utils/apiResponses";
import { setCookie, clearCookie } from "@/utils/cookie";

const signupUser = apiHandler(async (req, res) => {
  const validatedBody = req.validatedBody as SignupInput;

  await authService.createTempUser(
    validatedBody.email,
    validatedBody.name,
    validatedBody.password,
  );

  successResponse(res, "Verification email sent successfully!", null, 201);
});

const verifyEmail = apiHandler(async (req, res) => {
  const validatedBody = req.validatedBody as VerifyEmailInput;

  const access_token = await authService.verifyEmailAndCreateUser(
    validatedBody.token,
  );

  setCookie(res, "access_token", access_token);

  successResponse(res, "Email verified successfully!", null, 201);
});

const loginUser = apiHandler(async (req, res) => {
  const validatedBody = req.validatedBody as LoginInput;

  const access_token = await authService.loginUser(
    validatedBody.email,
    validatedBody.password,
  );

  setCookie(res, "access_token", access_token);

  successResponse(res, "Logged in successfully!", null);
});

const forgotPassword = apiHandler(async (req, res) => {
  const validatedBody = req.validatedBody as ForgotPasswordInput;

  await authService.passwordResetRequest(validatedBody.email);

  successResponse(res, "Password reset email sent successfully!", null);
});

const resetPassword = apiHandler(async (req, res) => {
  const validatedBody = req.validatedBody as ResetPasswordInput;

  await authService.resetPassword(
    validatedBody.token,
    validatedBody.newPassword,
  );

  successResponse(res, "Password reset successfully!", null);
});

const logoutUser = apiHandler((_req, res) => {
  clearCookie(res, "access_token");
  successResponse(res, "Logged out successfully!", null);
});

export default {
  signupUser,
  verifyEmail,
  loginUser,
  forgotPassword,
  resetPassword,
  logoutUser,
};
