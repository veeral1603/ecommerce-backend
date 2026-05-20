import type { z } from "zod";
import type {
  createOrderBodySchema,
  changeOrderStatusBodySchema,
  changeOrderStatusParamsSchema,
  getAllOrdersQuerySchema,
  getOrderByIdParamsSchema,
  getUserOrdersQuerySchema,
} from "@/modules/orders/order.validators";

export type CreateOrderBody = z.infer<typeof createOrderBodySchema>;
export type ChangeOrderStatusBody = z.infer<typeof changeOrderStatusBodySchema>;
export type ChangeOrderStatusParams = z.infer<
  typeof changeOrderStatusParamsSchema
>;
export type GetAllOrdersQuery = z.infer<typeof getAllOrdersQuerySchema>;
export type GetOrderByIdParams = z.infer<typeof getOrderByIdParamsSchema>;
export type GetUserOrdersQuery = z.infer<typeof getUserOrdersQuerySchema>;
