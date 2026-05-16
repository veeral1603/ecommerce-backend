import { Router } from "express";
import authControllers from "./auth.controllers";

const router = Router();

router.post("/signup", authControllers.signupUser);
router.post("/verify-email", authControllers.verifyEmail);
router.post("/login", authControllers.loginUser);

router.post("/forgot-password", authControllers.forgotPassword);
router.post("/reset-password", authControllers.resetPassword);

router.get("/logout", authControllers.logoutUser);

export default router;
