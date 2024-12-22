import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import routes from "./routes/Routes.jsx";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <RouterProvider router={routes} />
      <Toaster />
    </HelmetProvider>
  </StrictMode>
);
