import { z } from "zod";

//BODY SCHEMAS
export const createOrderBodySchema = z.object({
  addressId: z.string().uuid().nonoptional("Address ID is required"),
});

export const changeOrderStatusBodySchema = z.object({
  status: z
    .enum([
      "PENDING",
      "CONFIRMED",
      "SHIPPED",
      "DELIVERED",
      "CANCELLED",
    ] as const)
    .nonoptional("Status is required"),
});

//PARAMS SCHEMAS
export const getOrderByIdParamsSchema = z.object({
  orderId: z.string().uuid().nonoptional("Order ID is required"),
});

export const changeOrderStatusParamsSchema = z.object({
  orderId: z.string().uuid().nonoptional("Order ID is required"),
});

//QUERY SCHEMAS
export const getAllOrdersQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const getUserOrdersQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
});
