import { Outlet } from "react-router-dom";

import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import Navbar from "../components/Navbar";
import { useThemeStore } from "../store/useThemeStore";
const Main = () => {
  const { checkAuth, authUser, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();
  useEffect(() => {
    console.log("checking auth");
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin size-10" />
      </div>
    );
  }
  return (
    <div data-theme={theme} className="min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Main;
