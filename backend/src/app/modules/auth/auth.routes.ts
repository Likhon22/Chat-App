import { Router } from "express";
import authControllers from "./auth.controller";
import auth from "../../middleware/auth";
import { User_Role } from "../user/user.constants";

const routes = Router();

routes.post("/login", authControllers.login);

routes.post("/logout", authControllers.logout);
routes.get("/check-auth", auth(User_Role.user), authControllers.checkAuth);

export const authRoutes = routes;
