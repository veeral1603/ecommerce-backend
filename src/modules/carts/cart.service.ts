import prisma from "@/lib/prisma";
import ApiError from "@/utils/apiError";

const getUserCart = async (userId: string) => {
  const cart = await prisma.cart.findUnique({
    where: {
      userId,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  //Create a cart for the user if it doesn't exist
  if (!cart) {
    return await prisma.cart.create({
      data: {
        userId,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  return cart;
};

export const addToCart = async (
  userId: string,
  productId: string,
  quantity: number,
) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) {
    throw new ApiError("Product not found", 404);
  }

  if (quantity > product.stock) {
    throw new ApiError("Not enough stock available", 400);
  }

  const cart = await getUserCart(userId);

  const existingItem = cart.items.find((item) => item.productId === productId);

  if (existingItem) {
    return await prisma.cartItem.update({
      where: {
        id: existingItem.id,
      },
      data: {
        quantity: existingItem.quantity + quantity,
      },
    });
  }

  const newCartItem = await prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productId,
      quantity,
    },
  });

  return newCartItem;
};

export const removeFromCart = async (userId: string, productId: string) => {
  const cart = await getUserCart(userId);
  const existingItem = cart.items.find((item) => item.productId === productId);

  if (!existingItem) {
    throw new ApiError("Product not found in cart", 404);
  }

  return await prisma.cartItem.delete({
    where: {
      id: existingItem.id,
      cartId: cart.id,
    },
  });
};

export const updateCartItem = async (
  userId: string,
  productId: string,
  quantity: number,
) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) {
    throw new ApiError("Product not found", 404);
  }

  if (quantity > product.stock) {
    throw new ApiError("Not enough stock available", 400);
  }

  const cart = await getUserCart(userId);
  const existingItem = cart.items.find((item) => item.productId === productId);

  if (!existingItem) {
    throw new ApiError("Product not found in cart", 404);
  }

  return await prisma.cartItem.update({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
    data: {
      quantity,
    },
  });
};

export default {
  getUserCart,
  addToCart,
  removeFromCart,
  updateCartItem,
};
