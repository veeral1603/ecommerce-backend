import { Router } from "express";
import {
  changeOrderStatusBodySchema,
  changeOrderStatusParamsSchema,
  getAllOrdersQuerySchema,
  getOrderByIdParamsSchema,
} from "@/modules/orders/order.validators";
import ordersController from "@/modules/orders/order.controller";
import validateSchema from "@/middlewares/validateSchema";

const router = Router();

router.get(
  "/",
  validateSchema({ query: getAllOrdersQuerySchema }),
  ordersController.getAllOrders,
);

router.get(
  "/:orderId",
  validateSchema({ params: getOrderByIdParamsSchema }),
  ordersController.getOrderById,
);

router.patch(
  "/:orderId/status",
  validateSchema({
    params: changeOrderStatusParamsSchema,
    body: changeOrderStatusBodySchema,
  }),
  ordersController.changeOrderStatus,
);
export default router;
