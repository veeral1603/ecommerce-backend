import { Router } from "express";
import authControllers from "./auth.controllers";
import validateSchema from "@/middlewares/validateSchema";
import {
  LoginSchema,
  SignupSchema,
  VerifyEmailSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
} from "./auth.validators";

const router = Router();

//POST ROUTES
router.post(
  "/signup",
  validateSchema(SignupSchema),
  authControllers.signupUser,
);

router.post(
  "/verify-email",
  validateSchema(VerifyEmailSchema),
  authControllers.verifyEmail,
);

router.post("/login", validateSchema(LoginSchema), authControllers.loginUser);

router.post(
  "/forgot-password",
  validateSchema(ForgotPasswordSchema),
  authControllers.forgotPassword,
);

router.post(
  "/reset-password",
  validateSchema(ResetPasswordSchema),
  authControllers.resetPassword,
);

//GET ROUTES
router.get("/logout", authControllers.logoutUser);

export default router;
