import apiHandler from "@/utils/apiHandler";
import type {
  AddNewAddressInput,
  UpdateAddressInput,
  DeleteAddressParams,
  UpdateAddressParams,
} from "@/modules/addresses/address.types";
import { successResponse } from "@/utils/apiResponses";
import addressService from "@/modules/addresses/address.service";

const getMyAddresses = apiHandler(async (req, res) => {
  const user = req.user!;

  const addressess = await addressService.getMyAddresses(user.id);

  successResponse(res, "Addresses retrieved successfully", addressess);
});

const addAddress = apiHandler(async (req, res) => {
  const user = req.user;
  const validatedAddressData = req.validatedBody as AddNewAddressInput;

  const newAddress = await addressService.addAddress(
    validatedAddressData,
    user!.id,
  );

  successResponse(res, "Address added successfully", newAddress, 201);
});

const updateAddress = apiHandler(async (req, res) => {
  const user = req.user;
  const { addressId } = req.validatedParams as UpdateAddressParams;
  const validatedAddressData = req.validatedBody as UpdateAddressInput;

  const updatedAddress = await addressService.updateAddress(
    addressId,
    validatedAddressData,
    user!.id,
  );

  successResponse(res, "Address updated successfully", updatedAddress);
});

const deleteAddress = apiHandler(async (req, res) => {
  const user = req.user;
  const { addressId } = req.validatedParams as DeleteAddressParams;

  await addressService.deleteAddress(addressId, user!.id);

  successResponse(res, "Address deleted successfully", null);
});

export default {
  getMyAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
};
