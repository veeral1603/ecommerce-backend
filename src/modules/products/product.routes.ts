import { Router } from "express";
import productController from "@/modules/products/product.controller";
import validateSchema from "@/middlewares/validateSchema";
import { getProductByIdParamsSchema } from "./product.validators";

const router = Router();

//GET Routes
router.get("/", productController.getAllProducts);
router.get(
  "/:productId",
  validateSchema({ params: getProductByIdParamsSchema }),
  productController.getProductById,
);

export default router;
