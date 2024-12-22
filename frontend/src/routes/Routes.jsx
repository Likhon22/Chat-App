import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Main from "../layout/Main";
import SettingPage from "../pages/SettingPage";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProfilePage from "../pages/ProfilePage";
import PrivateRoutes from "./PrivateRoutes";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <div>Not Found</div>,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoutes>
            <Home />
          </PrivateRoutes>
        ),
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/setting",
        element: <SettingPage />,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoutes>
            <ProfilePage />
          </PrivateRoutes>
        ),
      },
    ],
  },
]);

export default routes;
