import prisma from "@/lib/prisma";
import type { Product } from "@prisma/client";
import ApiError from "@/utils/apiError";
import type { CreateProductInput } from "@/modules/products/product.types";
import { uploadImage, deleteImage } from "@/services/image.service";

// PUBLIC SERVICES FOR PRODUCTS
const getAllProducts = async (): Promise<Product[]> => {
  const products = await prisma.product.findMany({
    where: {
      isPublished: true,
    },
    include: {
      images: true,
    },
  });

  return products;
};

const getProductById = async (id: string): Promise<Product | null> => {
  const product = await prisma.product.findUnique({
    where: {
      id,
      isPublished: true,
    },
    include: {
      images: true,
    },
  });
  if (!product) {
    throw new ApiError("Product not found", 404);
  }

  return product;
};

// ADMIN SERVICES FOR PRODUCTS (TODO)
const createProduct = async (
  productDetails: CreateProductInput,
  productImages: Express.Multer.File[],
) => {
  const { name, slug, description, price, stock } = productDetails;

  const product = await prisma.$transaction(async (tx) => {
    const product = await tx.product.create({
      data: {
        name,
        slug,
        price,
        description,
        stock: stock ?? undefined,
      },
      include: {
        images: {
          select: {
            url: true,
          },
        },
      },
    });
    const imageUrls: { url: string }[] = [];

    if (productImages && productImages.length > 0) {
      const uploadedImages = await Promise.all(
        productImages.map(async (file, index) => {
          const fileName = `${slug.replace("/", "")}-${index}`;

          const { url, fileId } = await uploadImage(
            file,
            fileName,
            "/products",
          );
          imageUrls.push({ url });
          return {
            url,
            fileId,
            productId: product.id,
            isCover: index === 0,
          };
        }),
      );

      await tx.productImage.createMany({
        data: uploadedImages,
      });
    }
    product.images = imageUrls;
    return product;
  });

  return product;
};

const deleteProduct = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { images: true },
  });

  const productImages = product?.images ?? [];

  await prisma.$transaction(async (tx) => {
    for (const image of productImages) {
      await deleteImage(image.fileId as string);
    }
    await tx.productImage.deleteMany({
      where: { productId: id },
    });
    await tx.product.delete({
      where: { id },
    });
  });
};

const publishProduct = async (id: string) => {
  try {
    await prisma.product.update({
      where: { id },
      data: { isPublished: true },
    });
  } catch {
    throw new ApiError("Product not found", 404);
  }
};

const unpublishProduct = async (id: string) => {
  try {
    await prisma.product.update({
      where: { id },
      data: { isPublished: false },
    });
  } catch {
    throw new ApiError("Product not found", 404);
  }
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  publishProduct,
  unpublishProduct,
};
