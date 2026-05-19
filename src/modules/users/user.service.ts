import prisma from "@/lib/prisma";
import ApiError from "@/utils/apiError";
import type { UpdateProfileBody } from "@/modules/users/user.types";

const getMyProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    omit: {
      password: true,
    },
  });

  return user;
};

const updateMyProfile = async (userId: string, data: UpdateProfileBody) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      name: data.name,
      gender: data.gender,
    },
    omit: {
      password: true,
    },
  });

  return user;
};

//Admin services
const getAllUsers = async (page = 0, limit = 20) => {
  const users = await prisma.user.findMany({
    skip: (page - 1) * limit,
    take: limit,
    omit: {
      password: true,
    },
  });
  return users;
};

const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    omit: {
      password: true,
    },
  });

  if (!user) {
    throw new ApiError("User not found", 404);
  }
  return user;
};

export default {
  getAllUsers,
  updateMyProfile,
  getUserById,
  getMyProfile,
};
