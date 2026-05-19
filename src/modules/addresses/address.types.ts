import type {
  addNewAddressSchema,
  updateAddressSchema,
  deleteAddressParamsSchema,
  updateAddressParamsSchema,
} from "@/modules/addresses/address.validators";
import type { z } from "zod";

export type AddNewAddressInput = z.infer<typeof addNewAddressSchema>;
export type UpdateAddressInput = z.infer<typeof updateAddressSchema>;

export type DeleteAddressParams = z.infer<typeof deleteAddressParamsSchema>;
export type UpdateAddressParams = z.infer<typeof updateAddressParamsSchema>;
