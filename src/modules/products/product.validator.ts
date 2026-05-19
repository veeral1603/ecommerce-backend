import { z } from "zod";

//FOR VALIDATING REQUEST BODY
export const createProductSchema = z.object({
  name: z
    .string()
    .max(100, "Product name must be at most 100 characters")
    .nonempty("Product name is required")
    .nonoptional("Product name is required"),
  slug: z
    .string()
    .max(100, "Product slug must be at most 100 characters")
    .nonempty("Product slug is required")
    .nonoptional("Product slug is required"),

  description: z
    .string()
    .max(1000, "Product description must be at most 1000 characters")
    .optional(),

  price: z.coerce
    .number()
    .positive("Price must be a positive number")
    .nonoptional("Price is required"),

  stock: z.coerce
    .number()
    .int()
    .nonnegative("Stock must be a non-negative integer")
    .optional(),
});

// FoOR VALIDATING ROUTE PARAMS
export const getProductByIdParamsSchema = z.object({
  productId: z.string().uuid("Invalid product ID"),
});

export const deleteProductParamsSchema = z.object({
  productId: z.string().uuid("Invalid product ID"),
});

export const publishUnpublishProductParamsSchema = z.object({
  productId: z.string().uuid("Invalid product ID"),
});
