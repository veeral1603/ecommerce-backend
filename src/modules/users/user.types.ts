import type { z } from "zod";
import type {
  getUsersQuerySchema,
  getUserByIdParamsSchema,
  updateProfileSchema,
} from "./user.validator";

export type UpdateProfileBody = z.infer<typeof updateProfileSchema>;

export type GetUsersQuery = z.infer<typeof getUsersQuerySchema>;
export type GetUserByIdParams = z.infer<typeof getUserByIdParamsSchema>;
