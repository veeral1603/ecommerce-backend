import prisma from "@/lib/prisma";
import { hashPassword, comparePassword } from "@/utils/password";
import { generateToken, verifyToken } from "@/utils/jwt";
import type {
  PasswordResetTokenPayloadType,
  VerificationTokenPayloadType,
  AccessTokenPayloadType,
} from "@/modules/auth/auth.types";
import type { TempUser, User } from "@prisma/client";
import ApiError from "@/utils/apiError";
import emailQueue from "@/queues/email.queue";
import type { EmailJobData } from "@/types";

const createTempUser = async (
  email: string,
  name: string,
  password: string,
): Promise<TempUser> => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    throw new ApiError("User with this email already exists");
  }

  const hashedPassword = await hashPassword(password);

  const verificationToken = await generateToken<VerificationTokenPayloadType>(
    { email },
    "1h",
  );

  //Email logic, add job to email queue
  console.log("Generated verification token:", verificationToken);
  const emailJobData: EmailJobData = {
    recipientEmail: email,
    recipientName: name,
    type: "verification",
    payload: {
      verificationToken,
    },
  };
  await emailQueue.add("verification-email", emailJobData);

  const verificationTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

  const tempUser = await prisma.tempUser.upsert({
    where: { email },
    create: {
      email,
      name,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiry,
    },
    update: {
      name,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiry,
    },
  });

  return tempUser;
};

const verifyEmailAndCreateUser = async (token: string): Promise<string> => {
  const tokenPayload = await decodeVerificationToken(token);
  const tempUser = await findTempUserByVerificationToken(
    token,
    tokenPayload.email,
  );
  if (
    tempUser.verificationTokenExpiry &&
    tempUser?.verificationTokenExpiry < new Date()
  ) {
    throw new ApiError("Invalid or expired verification token");
  }

  //transaction to create user and delete temp user
  const user = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email: tempUser.email,
        name: tempUser.name,
        password: tempUser.password,
        isVerified: true,
      },
    });

    await tx.tempUser.delete({
      where: {
        id: tempUser.id,
      },
    });

    return user;
  });

  const access_token = await generateToken<AccessTokenPayloadType>(
    { userId: user.id, email: user.email, isAdmin: false },
    "7d",
  );

  //Email logic, add job to email queue
  const emailJobData: EmailJobData = {
    recipientEmail: user.email,
    recipientName: user.name,
    type: "welcome",
    payload: {},
  };
  await emailQueue.add("welcome-email", emailJobData);

  return access_token;
};

const loginUser = async (email: string, password: string): Promise<string> => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new ApiError("Invalid email or password");
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError("Invalid email or password");
  }

  const access_token = await generateToken<AccessTokenPayloadType>(
    { userId: user.id, email: user.email, isAdmin: user.isAdmin },
    "7d",
  );

  return access_token;
};

const passwordResetRequest = async (email: string): Promise<void> => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new ApiError("User with this email does not exist");
  }

  const passwordResetToken = await generateToken<PasswordResetTokenPayloadType>(
    { email },
    "1h",
  );
  const passwordResetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

  //Email logic, add job to email queue
  console.log("Generated password reset token:", passwordResetToken);
  const emailJobData: EmailJobData = {
    recipientEmail: email,
    recipientName: user.name,
    type: "passwordReset",
    payload: {
      passwordResetToken,
    },
  };
  await emailQueue.add("password-reset-email", emailJobData);

  await prisma.user.update({
    where: { email },
    data: {
      passwordResetToken,
      passwordResetTokenExpiry,
    },
  });
};

const resetPassword = async (
  token: string,
  newPassword: string,
): Promise<void> => {
  const tokenPayload = await decodePasswordResetToken(token);
  const user = await findUserByPasswordResetToken(token, tokenPayload.email);

  if (
    user.passwordResetTokenExpiry &&
    user.passwordResetTokenExpiry < new Date()
  ) {
    throw new ApiError("Invalid or expired password reset token");
  }

  const hashedPassword = await hashPassword(newPassword);

  await prisma.user.update({
    where: { email: user.email },
    data: {
      password: hashedPassword,
      passwordResetToken: null,
      passwordResetTokenExpiry: null,
    },
  });
};

///////////////////////////////////////////////////// UTILITY FUNCTIONS //////////////////////////////////////////////////

const decodeVerificationToken = async (
  token: string,
): Promise<VerificationTokenPayloadType> => {
  const tokenPayload = await verifyToken<VerificationTokenPayloadType>(token);
  if (!tokenPayload || !tokenPayload.email) {
    throw new ApiError("Invalid or expired verification token");
  }
  return tokenPayload;
};

const findTempUserByVerificationToken = async (
  token: string,
  email: string,
): Promise<TempUser> => {
  const tempUser = await prisma.tempUser.findFirst({
    where: {
      verificationToken: token,
      email,
    },
  });

  if (!tempUser) {
    throw new ApiError("Invalid or expired verification token");
  }

  return tempUser;
};

const decodePasswordResetToken = async (
  token: string,
): Promise<PasswordResetTokenPayloadType> => {
  const tokenPayload = await verifyToken<PasswordResetTokenPayloadType>(token);
  if (!tokenPayload || !tokenPayload.email) {
    throw new ApiError("Invalid or expired password reset token");
  }
  return tokenPayload;
};

const findUserByPasswordResetToken = async (
  token: string,
  email: string,
): Promise<User> => {
  const user = await prisma.user.findFirst({
    where: {
      passwordResetToken: token,
      email,
    },
  });

  if (!user) {
    throw new ApiError("Invalid or expired password reset token");
  }

  return user;
};

export default {
  createTempUser,
  verifyEmailAndCreateUser,
  loginUser,
  passwordResetRequest,
  resetPassword,
};
