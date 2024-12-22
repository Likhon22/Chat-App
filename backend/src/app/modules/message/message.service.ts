import { getReceiverSocketId, io } from "./../../lib/socket";
import { Types } from "mongoose";
import cloudinary from "../../utils/cloudinary";
import UserModel from "../user/user.model";
import { TMessage } from "./message.interface";
import messageModel from "./message.model";

const getUserForSidebarFromDB = async (loggedInUserId: string) => {
  const user = await UserModel.find({
    _id: { $ne: loggedInUserId },
  }).select("-password");
  return user;
};

const getMessagesFromDB = async (
  loggedInUserId: string,
  currentUserToChatUserId: string,
) => {
  const messages = await messageModel.find({
    $or: [
      {
        senderId: loggedInUserId,
        receiverId: currentUserToChatUserId,
      },
      {
        senderId: currentUserToChatUserId,
        receiverId: loggedInUserId,
      },
    ],
  });
  return messages;
};

const sendMessageToDB = async (
  senderId: string,
  receiverId: string,
  payload: Partial<TMessage>,
) => {
  if (
    !Types.ObjectId.isValid(senderId) ||
    !Types.ObjectId.isValid(receiverId)
  ) {
    throw new Error("Invalid sender or receiver ID.");
  }
  if (payload.image) {
    const { secure_url } = await cloudinary.uploader.upload(payload.image);
    payload.image = secure_url;
  }

  const message = await messageModel.create({
    senderId,
    receiverId,
    ...payload,
  });
  const receiverSocketId = getReceiverSocketId(receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", message);
  }
  return message;
};

const messageServices = {
  getUserForSidebarFromDB,
  getMessagesFromDB,
  sendMessageToDB,
};

export default messageServices;
