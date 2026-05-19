import { z } from "zod";

// BODY SCHEMAS
export const addNewAddressSchema = z.object({
  name: z
    .string()
    .max(30, "Name must be at most 30 characters long")
    .nonempty("Name is required")
    .nonoptional("Name is required"),

  mobile: z
    .string()
    .length(10, "Mobile number must be exactly 10 digits")
    .nonempty("Mobile number is required")
    .nonoptional("Mobile number is required"),

  pinCode: z
    .string()
    .length(6, "Pin code must be exactly 6 digits")
    .nonempty("Pin code is required")
    .nonoptional("Pin code is required"),

  locality: z
    .string()
    .max(50, "Locality must be at most 50 characters long")
    .nonempty("Locality is required")
    .nonoptional("Locality is required"),

  state: z
    .string()
    .max(50, "State must be at most 50 characters long")
    .nonempty("State is required")
    .nonoptional("State is required"),

  city: z
    .string()
    .max(50, "City must be at most 50 characters long")
    .nonempty("City is required")
    .nonoptional("City is required"),

  addressLine1: z
    .string()
    .max(200, "Address Line 1 must be at most 200 characters long")
    .nonempty("Address Line 1 is required")
    .nonoptional("Address Line 1 is required"),

  addressType: z
    .enum(["HOME", "WORK"])
    .nonoptional("Address type is required")
    .default("HOME"),
});

export const updateAddressSchema = z.object({
  name: z
    .string()
    .max(30, "Name must be at most 30 characters long")
    .nonempty("Name is required")
    .nonoptional("Name is required"),

  mobile: z
    .string()
    .length(10, "Mobile number must be exactly 10 digits")
    .nonempty("Mobile number is required")
    .nonoptional("Mobile number is required"),

  pinCode: z
    .string()
    .length(6, "Pin code must be exactly 6 digits")
    .nonempty("Pin code is required")
    .nonoptional("Pin code is required"),

  locality: z
    .string()
    .max(50, "Locality must be at most 50 characters long")
    .nonempty("Locality is required")
    .nonoptional("Locality is required"),

  state: z
    .string()
    .max(50, "State must be at most 50 characters long")
    .nonempty("State is required")
    .nonoptional("State is required"),

  city: z
    .string()
    .max(50, "City must be at most 50 characters long")
    .nonempty("City is required")
    .nonoptional("City is required"),

  addressLine1: z
    .string()
    .max(200, "Address Line 1 must be at most 200 characters long")
    .nonempty("Address Line 1 is required")
    .nonoptional("Address Line 1 is required"),

  addressType: z
    .enum(["HOME", "WORK"])
    .nonoptional("Address type is required")
    .default("HOME"),
});

//PARAMS SCHEMAS
export const deleteAddressParamsSchema = z.object({
  addressId: z
    .string()
    .nonempty("Address ID is required")
    .nonoptional("Address ID is required"),
});

export const updateAddressParamsSchema = z.object({
  addressId: z
    .string()
    .nonempty("Address ID is required")
    .nonoptional("Address ID is required"),
});
