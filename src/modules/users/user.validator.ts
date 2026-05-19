import { z } from "zod";

// Body Validation
export const updateProfileSchema = z.object({
  name: z.string().max(30, "Name can not exceed 30 characters").optional(),

  gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
});

// Params Validation
export const getUserByIdParamsSchema = z.object({
  userId: z.string().uuid(),
});

// Query Validation
export const getUsersQuerySchema = z.object({
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().optional(),
});
