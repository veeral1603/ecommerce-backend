import { apiHandler } from "../../utils/apiHandler";

const signupUser = apiHandler(async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  res.send("Signup user");
});

const verifyEmail = apiHandler(async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  res.send("Verify email");
});

const loginUser = apiHandler(async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  res.send("Login user");
});

const forgotPassword = apiHandler(async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  res.send("Forgot password");
});

const resetPassword = apiHandler(async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  res.send("Reset password");
});

const logoutUser = apiHandler(async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  res.send("Logout user");
});

export default {
  signupUser,
  verifyEmail,
  loginUser,
  forgotPassword,
  resetPassword,
  logoutUser,
};
