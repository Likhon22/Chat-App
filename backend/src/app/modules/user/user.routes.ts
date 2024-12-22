import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import userValidations from "./user.validation";
import userControllers from "./user.controller";
import auth from "../../middleware/auth";
import { User_Role } from "./user.constants";

const routes = Router();

routes.post(
  "/create-user",
  validateRequest(userValidations.createUserValidation),
  userControllers.createUser,
);
routes.patch(
  "/update-profile",
  auth(User_Role.user),
  validateRequest(userValidations.updateUserValidation),
  userControllers.updateProfile,
);
routes.get("/me", auth(User_Role.user), userControllers.getMe);

export const userRoutes = routes;
