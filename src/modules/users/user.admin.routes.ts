import { Router } from "express";
import userController from "@/modules/users/user.controller";
import validateSchema from "@/middlewares/validateSchema";
import {
  getUsersQuerySchema,
  getUserByIdParamsSchema,
} from "@/modules/users/user.validator";

const router = Router();

router.get(
  "/",
  validateSchema({ query: getUsersQuerySchema }),
  userController.getAllUsers,
);

router.get(
  "/:userId",
  validateSchema({ params: getUserByIdParamsSchema }),
  userController.getUserById,
);

export default router;
