import { Model, Types } from "mongoose";
import { User_Role } from "./user.constants";

export type TName = {
  firstName: string;
  lastName: string;
};
export type TUser = {
  name: TName;
  email: string;
  password: string;
  role: "user" | "admin";
  profilePic?: string;
  isDeleted: boolean;
  status: "in-progress" | "blocked";
};

export type TUserWithId = TUser & { _id: Types.ObjectId };

export interface UserMethods extends Model<TUser> {
  isUserExists(email: string): Promise<TUserWithId | null>;
}

export type TUserRole = keyof typeof User_Role;
