import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import userServices from "./user.service";

const createUser = catchAsync(async (req, res) => {
  const result = await userServices.createUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: 201,
    message: "User created successfully",
    success: true,
    data: result,
  });
});
const updateProfile = catchAsync(async (req, res) => {
  const result = await userServices.updateProfileIntoDB(
    req.body,
    req.user.email,
  );
  sendResponse(res, {
    statusCode: 200,
    message: "Profile updated successfully",
    success: true,
    data: result,
  });
});
const getMe = catchAsync(async (req, res) => {
  const result = await userServices.getMe(req.user._id);
  sendResponse(res, {
    statusCode: 200,
    message: "User details",
    success: true,
    data: result,
  });
});

const userControllers = {
  createUser,
  updateProfile,
  getMe,
};

export default userControllers;
