import { Router } from "express";
import auth from "../../middleware/auth";
import { User_Role } from "../user/user.constants";
import messageController from "./message.controller";

const routes = Router();

routes.get("/users", auth(User_Role.user), messageController.getUserForSidebar);
routes.get("/:userId", auth(User_Role.user), messageController.getMessages);
routes.post(
  "/send/:userId",
  auth(User_Role.user),
  messageController.sendMessage,
);
export const messageRoutes = routes;
