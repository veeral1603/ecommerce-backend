import { Router } from "express";
import cartController from "./cart.controller";
import validateSchema from "@/middlewares/validateSchema";
import {
  addToCartSchema,
  updateCartItemParamsSchema,
  updateCartItemQuerySchema,
  removeFromCartParamsSchema,
} from "./cart.validators";

const router = Router();

router.get("/", cartController.getUserCart);

router.post(
  "/items",
  validateSchema({ body: addToCartSchema }),
  cartController.addToCart,
);

router.patch(
  "/items/:productId",
  validateSchema({
    params: updateCartItemParamsSchema,
    query: updateCartItemQuerySchema,
  }),
  cartController.updateCartItem,
);

router.delete(
  "/items/:productId",
  validateSchema({ params: removeFromCartParamsSchema }),
  cartController.removeFromCart,
);

export default router;
