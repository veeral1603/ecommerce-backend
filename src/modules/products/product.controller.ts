import apiHandler from "@/utils/apiHandler";
import { successResponse } from "@/utils/apiResponses";
import productService from "@/modules/products/product.service";
import type {
  CreateProductInput,
  DeleteProductParams,
  PublishUnpublishProductParams,
} from "@/modules/products/product.types";
import type { GetProductByIdParams } from "@/modules/products/product.types";

const getAllProducts = apiHandler(async (_, res) => {
  const products = await productService.getAllProducts();

  successResponse(res, "Products retrieved successfully", products);
});

const getProductById = apiHandler(async (req, res) => {
  const { productId } = req.validatedParams as GetProductByIdParams;

  const product = await productService.getProductById(productId);

  successResponse(res, `Product retrieved successfully`, product);
});

//ADMIN CONTROLLER FOR PRODUCTS
const createProduct = apiHandler(async (req, res) => {
  const validatedProductData = req.validatedBody as CreateProductInput;
  const productImages = req.files as Express.Multer.File[];

  const newProduct = await productService.createProduct(
    validatedProductData,
    productImages,
  );

  successResponse(res, "Product created successfully", newProduct, 201);
});

const deleteProduct = apiHandler(async (req, res) => {
  const { productId } = req.validatedParams as DeleteProductParams;

  await productService.deleteProduct(productId);

  successResponse(res, `Product deleted successfully`, null);
});

const publishProduct = apiHandler(async (req, res) => {
  const { productId } = req.validatedParams as PublishUnpublishProductParams;

  await productService.publishProduct(productId);

  successResponse(res, `Product published successfully`, null);
});

const unpublishProduct = apiHandler(async (req, res) => {
  const { productId } = req.validatedParams as PublishUnpublishProductParams;

  await productService.unpublishProduct(productId);

  successResponse(res, `Product unpublished successfully`, null);
});

export default {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,

  publishProduct,
  unpublishProduct,
};
