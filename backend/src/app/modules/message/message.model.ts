import { model, Schema } from "mongoose";
import { TMessage } from "./message.interface";

const messageSchema = new Schema<TMessage>(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const messageModel = model("Message", messageSchema);

export default messageModel;
