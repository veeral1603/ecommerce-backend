import { z } from "zod";

//REQUEST BODY SCHEMAS
export const addToCartSchema = z.object({
  productId: z
    .string()
    .uuid()
    .nonempty("Product ID is required")
    .nonoptional("Product ID is required"),

  quantity: z.coerce
    .number()
    .int()
    .positive("Quantity must be a positive integer")
    .nonoptional("Quantity is required"),
});

//PARAMS SCHEMAS
export const updateCartItemParamsSchema = z.object({
  productId: z
    .string()
    .uuid()
    .nonempty("Product ID is required")
    .nonoptional("Product ID is required"),
});

export const removeFromCartParamsSchema = z.object({
  productId: z
    .string()
    .uuid()
    .nonempty("Product ID is required")
    .nonoptional("Product ID is required"),
});

//QUERY SCHEMAS
export const updateCartItemQuerySchema = z.object({
  quantity: z.coerce
    .number()
    .int()
    .positive("Quantity must be a positive integer")
    .nonoptional("Quantity is required"),
});
