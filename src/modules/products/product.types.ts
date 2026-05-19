import type {
  createProductSchema,
  getProductByIdParamsSchema,
  deleteProductParamsSchema,
  publishUnpublishProductParamsSchema,
} from "@/modules/products/product.validators";
import type { z } from "zod";

export type CreateProductInput = z.infer<typeof createProductSchema>;

export type GetProductByIdParams = z.infer<typeof getProductByIdParamsSchema>;
export type DeleteProductParams = z.infer<typeof deleteProductParamsSchema>;
export type PublishUnpublishProductParams = z.infer<
  typeof publishUnpublishProductParamsSchema
>;
