import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../errors/AppError";
import { TUserRole } from "../modules/user/user.interface";
import catchAsync from "../utils/catchAsync";
import config from "../config";
import UserModel from "../modules/user/user.model";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.cookies.token;


    if (!token) {
      throw new AppError(401, "Unauthorized");
    }
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;
    const { email, role } = decoded;
    const isUserExists = await UserModel.isUserExists(email);
    if (!isUserExists) {
      throw new AppError(404, "User not found");
    }
    if (isUserExists.isDeleted) {
      throw new AppError(404, "User not found");
    }
    if (isUserExists.status === "blocked") {
      throw new AppError(403, "User is blocked");
    }
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(401, "Unauthorized");
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
