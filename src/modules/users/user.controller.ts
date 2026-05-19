import userService from "@/modules/users/user.service";
import apiHandler from "@/utils/apiHandler";
import type {
  GetUsersQuery,
  GetUserByIdParams,
  UpdateProfileBody,
} from "@/modules/users/user.types";
import { successResponse } from "@/utils/apiResponses";

export const getMyProfile = apiHandler(async (req, res) => {
  const user = req.user!;

  const me = await userService.getMyProfile(user.id);

  successResponse(res, "Profile retrieved successfully", me);
});

export const updateMyProfile = apiHandler(async (req, res) => {
  const user = req.user!;
  const validatedUpdateData = req.validatedBody as UpdateProfileBody;

  const updatedUser = await userService.updateMyProfile(
    user.id,
    validatedUpdateData,
  );
  successResponse(res, "Profile updated successfully", updatedUser);
});

//ADMIN CONTROLLERS

export const getAllUsers = apiHandler(async (req, res) => {
  const { page, limit } = req.validatedQuery as GetUsersQuery;

  const users = await userService.getAllUsers(page, limit);

  successResponse(res, "Users retrieved successfully", users);
});

export const getUserById = apiHandler(async (req, res) => {
  const { userId } = req.validatedParams as GetUserByIdParams;

  const user = await userService.getUserById(userId);

  successResponse(res, "User retrieved successfully", user);
});

export default {
  getMyProfile,
  updateMyProfile,
  getAllUsers,
  getUserById,
};
