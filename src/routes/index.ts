import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes";
import productRoutes from "@/modules/products/product.routes";
import adminProductRoutes from "@/modules/products/product.admin.routes";

const router = Router();

router.use("/auth", authRoutes);

router.use("/products", productRoutes);
router.use("/admin/products", adminProductRoutes);

export default router;
