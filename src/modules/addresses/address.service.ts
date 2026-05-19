import prisma from "@/lib/prisma";
import type { Address } from "@prisma/client";
import type {
  AddNewAddressInput,
  UpdateAddressInput,
} from "@/modules/addresses/address.types";
import ApiError from "@/utils/apiError";

export const getMyAddresses = async (userId: string): Promise<Address[]> => {
  const addresses = await prisma.address.findMany({
    where: {
      userId,
    },
  });

  return addresses ?? [];
};

export const addAddress = async (
  addressData: AddNewAddressInput,
  userId: string,
): Promise<Address> => {
  const newAddress = await prisma.address.create({
    data: {
      name: addressData.name,
      mobile: addressData.mobile,
      pinCode: addressData.pinCode,
      locality: addressData.locality,
      city: addressData.city,
      state: addressData.state,
      addressLine1: addressData.addressLine1,
      addressType: addressData.addressType,
      userId,
    },
  });

  return newAddress;
};

export const updateAddress = async (
  addressId: string,
  addressData: UpdateAddressInput,
  userId: string,
): Promise<Address> => {
  const address = await prisma.address.findFirst({
    where: {
      id: addressId,
      userId,
    },
  });
  if (!address) {
    throw new ApiError("Address not found", 404);
  }

  const updatedAddress = await prisma.address.update({
    where: {
      id: addressId,
      userId,
    },
    data: {
      name: addressData.name,
      mobile: addressData.mobile,
      pinCode: addressData.pinCode,
      locality: addressData.locality,
      city: addressData.city,
      state: addressData.state,
      addressLine1: addressData.addressLine1,
      addressType: addressData.addressType,
    },
  });

  return updatedAddress;
};

export const deleteAddress = async (
  addressId: string,
  userId: string,
): Promise<void> => {
  const address = await prisma.address.findFirst({
    where: {
      id: addressId,
      userId,
    },
  });
  if (!address) {
    throw new ApiError("Address not found", 404);
  }

  await prisma.address.delete({
    where: {
      id: addressId,
      userId,
    },
  });
};

export default {
  getMyAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
};
