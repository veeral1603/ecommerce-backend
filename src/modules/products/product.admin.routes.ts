import { Router } from "express";
import productController from "./product.controller";
import validateSchema from "@/middlewares/validateSchema";
import requireAuth from "@/middlewares/requireAuth";
import requireAdmin from "@/middlewares/requireAdmin";
import {
  createProductSchema,
  deleteProductParamsSchema,
  publishUnpublishProductParamsSchema,
} from "@/modules/products/product.validators";
import multerUpload from "@/middlewares/multer";
import validateFiles from "@/middlewares/validateFiles";

const router = Router();

//PRODUCT CREATION
router.post(
  "/",
  requireAuth,
  requireAdmin,
  multerUpload.array("images"),
  validateFiles({
    required: true,
    allowedTypes: ["image/jpg", "image/jpeg", "image/png"],
    maxFiles: 5,
  }),
  validateSchema({ body: createProductSchema }),
  productController.createProduct,
);

//PRODUCT DELETION
router.delete(
  "/:productId",
  requireAuth,
  requireAdmin,
  validateSchema({ params: deleteProductParamsSchema }),
  productController.deleteProduct,
);

//PUBLISH PRODUCT
router.patch(
  "/:productId/publish",
  requireAuth,
  requireAdmin,
  validateSchema({ params: publishUnpublishProductParamsSchema }),
  productController.publishProduct,
);

//UNPUBLISH PRODUCT
router.patch(
  "/:productId/unpublish",
  requireAuth,
  requireAdmin,
  validateSchema({ params: publishUnpublishProductParamsSchema }),
  productController.unpublishProduct,
);

export default router;
