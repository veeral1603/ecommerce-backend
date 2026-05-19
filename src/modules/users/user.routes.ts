import { Router } from "express";
import requireAuth from "@/middlewares/requireAuth";
import userController from "@/modules/users/user.controller";

const router = Router();

router.get("/me", requireAuth, userController.getMyProfile);
router.patch("/me", requireAuth, userController.updateMyProfile);
export default router;
