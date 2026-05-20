import apiHandler from "@/utils/apiHandler";
import { successResponse } from "@/utils/apiResponses";
import type {
  GetAllOrdersQuery,
  GetUserOrdersQuery,
  GetOrderByIdParams,
  CreateOrderBody,
  ChangeOrderStatusBody,
  ChangeOrderStatusParams,
} from "@/modules/orders/order.types";
import ordersService from "@/modules/orders/order.service";

const getUserOrders = apiHandler(async (req, res) => {
  const userId = req.user!.id;
  const { page } = req.validatedQuery as GetUserOrdersQuery;

  const orders = await ordersService.getUserOrders(userId, page ?? 1);

  successResponse(res, "Orders retrieved successfully", orders);
});

const createOrder = apiHandler(async (req, res) => {
  const userId = req.user!.id;

  const { addressId } = req.validatedBody as CreateOrderBody;

  const order = await ordersService.createOrder(userId, addressId);

  successResponse(res, "Order created successfully", order);
});

const getUserOrderById = apiHandler(async (req, res) => {
  const userId = req.user!.id;
  const { orderId } = req.validatedParams as GetOrderByIdParams;

  const order = await ordersService.getUserOrderById(userId, orderId);
  successResponse(res, "Order retrieved successfully", order);
});

////// ADMIN CONTROLLERS //////

const getAllOrders = apiHandler(async (req, res) => {
  const { page, limit } = req.validatedQuery as GetAllOrdersQuery;

  const orders = await ordersService.getAllOrders(page ?? 1, limit ?? 20);

  successResponse(res, "Orders retrieved successfully", orders);
});

const getOrderById = apiHandler(async (req, res) => {
  const { orderId } = req.validatedParams as GetOrderByIdParams;

  const order = await ordersService.getOrderById(orderId);

  successResponse(res, "Order retrieved successfully", order);
});

const changeOrderStatus = apiHandler(async (req, res) => {
  const { orderId } = req.validatedParams as ChangeOrderStatusParams;
  const { status } = req.validatedBody as ChangeOrderStatusBody;

  await ordersService.changeOrderStatus(orderId, status);

  successResponse(res, "Order status updated successfully");
});

export default {
  getUserOrders,
  createOrder,
  getUserOrderById,

  getAllOrders,
  getOrderById,
  changeOrderStatus,
};
