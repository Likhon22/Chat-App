import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import messageServices from "./message.service";

const getUserForSidebar = catchAsync(async (req, res) => {
  const user = await messageServices.getUserForSidebarFromDB(req.user._id);
  sendResponse(res, {
    statusCode: 200,
    message: "User fetched successfully",
    success: true,
    data: user,
  });
});

const getMessages = catchAsync(async (req, res) => {
  const user = await messageServices.getMessagesFromDB(
    req.user._id,
    req.params.userId,
  );
  sendResponse(res, {
    statusCode: 200,
    message: "Messages fetched successfully",
    success: true,
    data: user,
  });
});

const sendMessage = catchAsync(async (req, res) => {
  const result = await messageServices.sendMessageToDB(
    req.user._id,
    req.params.userId,
    req.body,
  );
  sendResponse(res, {
    statusCode: 200,
    message: "Message sent successfully",
    success: true,
    data: result,
  });
});

const messageController = {
  getUserForSidebar,
  getMessages,
  sendMessage,
};

export default messageController;
