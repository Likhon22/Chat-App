import AppError from "../../errors/AppError";
import UserModel from "../user/user.model";
import bcrypt from "bcrypt";
import { TLogin } from "./auth.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
const login = async (payload: TLogin) => {
  const isUserExists = await UserModel.isUserExists(payload.email);
  if (!isUserExists) {
    throw new Error("User not found");
  }
  if (isUserExists.isDeleted) {
    throw new AppError(400, "User is deleted");
  }
  if (isUserExists.status === "blocked") {
    throw new AppError(400, "User is blocked");
  }
  const isPasswordValid = await bcrypt.compare(
    payload.password,
    isUserExists.password,
  );
  if (!isPasswordValid) {
    throw new AppError(401, "Invalid password");
  }

  const jwtPayload = {
    email: isUserExists.email,
    role: isUserExists.role,
    _id: isUserExists._id,
    name: `${isUserExists.name.firstName} ${isUserExists.name.lastName}`,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "7d",
  });

  return {
    email: isUserExists.email,
    role: isUserExists.role,
    _id: isUserExists._id,
    name: `${isUserExists.name.firstName} ${isUserExists.name.lastName}`,
    accessToken,
  };
};
const logout = () => {
  return {
    message: "User logged out successfully",
  };
};
const checkAuth = (payload: JwtPayload) => {
  const { email, role, name, _id } = payload;

  return { email, role, name, _id };
};
const authServices = {
  login,
  logout,
  checkAuth,
};

export default authServices;
