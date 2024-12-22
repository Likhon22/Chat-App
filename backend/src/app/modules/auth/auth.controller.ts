import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import authServices from "./auth.service";

const login = catchAsync(async (req, res) => {
  const result = await authServices.login(req.body);
  const { accessToken } = result;
  res.cookie("token", accessToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    secure: false,
    sameSite: "strict",
  });

  sendResponse(res, {
    message: "User logged in successfully",
    success: true,
    statusCode: 200,
    data: result,
  });
});

const logout = catchAsync(async (req, res) => {
  res.cookie("token", "", { maxAge: 0 });

  sendResponse(res, {
    message: "User logged out successfully",
    success: true,
    statusCode: 200,
    data: null,
  });
});
const checkAuth = catchAsync(async (req, res) => {
  const user = req.user;
  const result = authServices.checkAuth(user);
  sendResponse(res, {
    statusCode: 200,
    message: "User logged in successfully",
    success: true,
    data: result,
  });
});

const authControllers = {
  login,

  logout,
  checkAuth,
};

export default authControllers;
