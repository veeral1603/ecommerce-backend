import { Router } from "express";
import requireAuth from "@/middlewares/requireAuth";
import requireAdmin from "@/middlewares/requireAdmin";

import authRoutes from "../modules/auth/auth.routes";

import productRoutes from "@/modules/products/product.routes";
import adminProductRoutes from "@/modules/products/product.admin.routes";

import addressRoutes from "@/modules/addresses/address.routes";

import userRoutes from "@/modules/users/user.routes";
import adminUserRoutes from "@/modules/users/user.admin.routes";

const router = Router();

router.use("/auth", authRoutes);

router.use("/products", productRoutes);
router.use("/admin/products", requireAuth, requireAdmin, adminProductRoutes);

router.use("/addresses", addressRoutes);

router.use("/users", userRoutes);
router.use("/admin/users", requireAuth, requireAdmin, adminUserRoutes);

export default router;
