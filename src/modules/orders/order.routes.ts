import { Router } from "express";
import validateSchema from "@/middlewares/validateSchema";
import ordersController from "@/modules/orders/order.controller";
import {
  createOrderBodySchema,
  getOrderByIdParamsSchema,
  getUserOrdersQuerySchema,
} from "@/modules/orders/order.validators";

const router = Router();

router.get(
  "/",
  validateSchema({ query: getUserOrdersQuerySchema }),
  ordersController.getUserOrders,
);

router.post(
  "/",
  validateSchema({ body: createOrderBodySchema }),
  ordersController.createOrder,
);

router.get(
  "/:orderId",
  validateSchema({ params: getOrderByIdParamsSchema }),
  ordersController.getUserOrderById,
);

export default router;
