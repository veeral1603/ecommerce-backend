import apiHandler from "@/utils/apiHandler";
import { successResponse } from "@/utils/apiResponses";
import cartService from "./cart.service";
import type {
  AddToCartInput,
  UpdateCartItemParams,
  UpdateCartItemQuery,
  RemoveFromCartParams,
} from "./cart.types";

const getUserCart = apiHandler(async (req, res) => {
  const userId = req.user!.id;
  const userCart = await cartService.getUserCart(userId);

  successResponse(res, "Cart retrieved successfully", userCart);
});

const addToCart = apiHandler(async (req, res) => {
  const userId = req.user!.id;
  const { productId, quantity } = req.validatedBody as AddToCartInput;

  const cartItem = await cartService.addToCart(userId, productId, quantity);

  successResponse(res, "Item added to cart successfully", cartItem, 201);
});

const updateCartItem = apiHandler(async (req, res) => {
  const userId = req.user!.id;

  const { productId } = req.validatedParams as UpdateCartItemParams;
  const { quantity } = req.validatedQuery as UpdateCartItemQuery;

  const updatedCartItem = await cartService.updateCartItem(
    userId,
    productId,
    quantity,
  );

  successResponse(res, "Cart item updated successfully", updatedCartItem);
});

export const removeFromCart = apiHandler(async (req, res) => {
  const userId = req.user!.id;
  const { productId } = req.validatedParams as RemoveFromCartParams;

  await cartService.removeFromCart(userId, productId);

  successResponse(res, "Item removed from cart successfully");
});

export default { getUserCart, addToCart, updateCartItem, removeFromCart };
