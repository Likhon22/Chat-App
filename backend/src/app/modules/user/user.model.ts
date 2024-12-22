import { model, Schema } from "mongoose";
import { TName, TUser, UserMethods } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";
const nameSchema = new Schema<TName>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const userSchema = new Schema<TUser, UserMethods>(
  {
    name: { type: nameSchema, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
    },
    profilePic: {
      type: String,
      default: "",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});
userSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});

userSchema.statics.isUserExists = async function (email: string) {
  return this.findOne({ email }).select("+_id ");
};

const UserModel = model<TUser, UserMethods>("User", userSchema);
export default UserModel;
