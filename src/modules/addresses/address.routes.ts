import { Router } from "express";
import addressController from "./address.controller";
import requireAuth from "@/middlewares/requireAuth";
import validateSchema from "@/middlewares/validateSchema";

import {
  addNewAddressSchema,
  updateAddressSchema,
  deleteAddressParamsSchema,
  updateAddressParamsSchema,
} from "@/modules/addresses/address.validators";

const router = Router();

router.post(
  "/",
  requireAuth,
  validateSchema({ body: addNewAddressSchema }),
  addressController.addAddress,
);

router.put(
  "/:addressId",
  requireAuth,
  validateSchema({
    body: updateAddressSchema,
    params: updateAddressParamsSchema,
  }),
  addressController.updateAddress,
);

router.delete(
  "/:addressId",
  requireAuth,
  validateSchema({ params: deleteAddressParamsSchema }),
  addressController.deleteAddress,
);

export default router;
