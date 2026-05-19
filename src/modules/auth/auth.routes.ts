import { Router } from "express";
import authControllers from "./auth.controller";
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
  validateSchema({ body: SignupSchema }),
  authControllers.signupUser,
);

router.post(
  "/verify-email",
  validateSchema({ body: VerifyEmailSchema }),
  authControllers.verifyEmail,
);

router.post(
  "/login",
  validateSchema({ body: LoginSchema }),
  authControllers.loginUser,
);

router.post(
  "/forgot-password",
  validateSchema({ body: ForgotPasswordSchema }),
  authControllers.forgotPassword,
);

router.post(
  "/reset-password",
  validateSchema({ body: ResetPasswordSchema }),
  authControllers.resetPassword,
);

//GET ROUTES
router.get("/logout", authControllers.logoutUser);

export default router;
