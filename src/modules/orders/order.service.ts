import prisma from "@/lib/prisma";
import ApiError from "@/utils/apiError";
import type { ORDER_STATUS } from "@prisma/client";

const getUserOrders = async (userId: string, page = 1) => {
  const orders = prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: {
          product: {
            include: {
              images: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: (page - 1) * 10,
    take: 10,
  });

  return orders;
};

const createOrder = async (userId: string, addressId: string) => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: {
            include: {
              images: true,
            },
          },
        },
      },
    },
  });

  if (!cart || cart.items.length === 0) {
    throw new ApiError("Cart is empty", 400);
  }

  // Validate stock for each item before creating the order
  cart.items.forEach((item) => {
    if (!item.product) {
      throw new ApiError(`Product with ID ${item.productId} not found`, 404);
    }
    if (item.product.stock <= 0) {
      throw new ApiError(`Product ${item.product.name} is out of stock`, 400);
    }
    if (item.quantity > item.product.stock) {
      throw new ApiError(
        `Not enough stock for product ${item.product.name}`,
        400,
      );
    }
  });

  await prisma.$transaction(async (tx) => {
    const totalAmount = cart.items.reduce((sum, item) => {
      const itemTotal = Number(item.product.price) * Number(item.quantity);
      return sum + itemTotal;
    }, 0);

    // Create the order
    const order = await tx.order.create({
      data: {
        userId,
        shippingAddressId: addressId,
        totalAmount,
      },
    });

    // Create order items
    const orderItemsData = cart.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      priceAtPurchase: item.product.price,
      productName: item.product.name,
      productImage: item.product.images[0]?.url ?? "", // Ensure a string for createMany
      orderId: order.id,
    }));

    await tx.orderItem.createMany({
      data: orderItemsData,
    });

    // Update product stock
    for (const item of cart.items) {
      await tx.product.update({
        where: { id: item.productId },
        data: {
          stock: { decrement: item.quantity },
        },
      });
    }

    //  Clear the cart
    await tx.cartItem.deleteMany({
      where: {
        cartId: cart.id,
      },
    });
  });
};

const getUserOrderById = async (userId: string, orderId: string) => {
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      userId,
    },
    include: {
      items: {
        include: {
          product: {
            include: {
              images: true,
            },
          },
        },
      },
    },
  });

  if (!order) {
    throw new ApiError("Order not found", 404);
  }

  return order;
};

///////// ADMIN SERVICES //////////

const getAllOrders = async (page = 1, limit = 20) => {
  const orders = await prisma.order.findMany({
    include: {
      items: {
        include: {
          product: {
            include: {
              images: true,
            },
          },
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
    skip: (page - 1) * limit,
    take: limit,
  });

  return orders;
};

const getOrderById = async (orderId: string) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: {
          product: {
            include: {
              images: true,
            },
          },
        },
      },
    },
  });
  if (!order) {
    throw new ApiError("Order not found", 404);
  }
  return order;
};

const changeOrderStatus = async (orderId: string, newStatus: ORDER_STATUS) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    throw new ApiError("Order not found", 404);
  }

  await prisma.order.update({
    where: { id: orderId },
    data: {
      status: newStatus,
    },
  });
};

export default {
  getUserOrders,
  createOrder,
  getUserOrderById,

  // Admin services
  getAllOrders,
  getOrderById,
  changeOrderStatus,
};
