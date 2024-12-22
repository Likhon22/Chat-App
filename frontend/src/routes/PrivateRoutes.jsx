/* eslint-disable react/prop-types */

import { useAuthStore } from "../store/useAuthStore";
import { Loader } from "lucide-react";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { authUser, isCheckingAuth } = useAuthStore();

  console.log(isCheckingAuth);

  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin size-10" />
      </div>
    );
  }

  if (authUser) {
    return children;
  }
  return <Navigate to={"/login"} />;
};

export default PrivateRoutes;
