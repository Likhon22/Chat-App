import AppError from "../../errors/AppError";
import cloudinary from "../../utils/cloudinary";
import { TUser } from "./user.interface";
import UserModel from "./user.model";

const createUserIntoDB = async (payload: TUser) => {
  const isUserExists = await UserModel.isUserExists(payload.email);
  if (isUserExists) {
    throw new AppError(400, "User already exists");
  }
  payload.role = "user";
  const result = await UserModel.create(payload);

  return result;
};

const updateProfileIntoDB = async (payload: Partial<TUser>, email: string) => {
  const { profilePic } = payload;

  const isUserExists = await UserModel.isUserExists(email);
  if (!isUserExists) {
    throw new AppError(404, "User not found");
  }
  if (isUserExists.isDeleted) {
    throw new AppError(404, "User not found");
  }
  if (profilePic) {
    const { secure_url } = await cloudinary.uploader.upload(profilePic);
    payload.profilePic = secure_url;
  }

  const result = await UserModel.findOneAndUpdate({ email }, payload, {
    new: true,
  });

  return result;
};

const getMe = async (id: string) => {
  const user = await UserModel.findById(id).select("-password");
  if (!user) {
    throw new AppError(404, "User not found");
  }
  return user;
};
const userServices = {
  createUserIntoDB,
  updateProfileIntoDB,
  getMe,
};

export default userServices;
