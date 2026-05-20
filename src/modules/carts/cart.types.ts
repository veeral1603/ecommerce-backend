import type { z } from "zod";
import type {
  addToCartSchema,
  removeFromCartParamsSchema,
  updateCartItemParamsSchema,
  updateCartItemQuerySchema,
} from "@/modules/carts/cart.validators";

export type AddToCartInput = z.infer<typeof addToCartSchema>;
export type UpdateCartItemParams = z.infer<typeof updateCartItemParamsSchema>;
export type UpdateCartItemQuery = z.infer<typeof updateCartItemQuerySchema>;
export type RemoveFromCartParams = z.infer<typeof removeFromCartParamsSchema>;
