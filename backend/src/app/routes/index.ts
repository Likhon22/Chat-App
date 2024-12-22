import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { userRoutes } from "../modules/user/user.routes";
import { messageRoutes } from "../modules/message/message.routes";

const routes = Router();

type TModuleRoutes = {
  path: string;
  route: Router;
};
const moduleRoutes: TModuleRoutes[] = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/messages",
    route: messageRoutes,
  },
];

moduleRoutes.forEach((route) => {
  routes.use(route.path, route.route);
});

export default routes;
