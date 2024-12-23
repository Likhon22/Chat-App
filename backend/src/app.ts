import express, { Application, Request, Response } from "express";

import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./app/routes";
import path from "path";

import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import config from "./app/config";

const app: Application = express();
const dirname = path.resolve();

// middlewares
app.use(express.json({ limit: "1mb" }));
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);

app.use(cookieParser());
console.log(path.join(__dirname, "../../frontend/dist"));

// routes

app.use("/api/v1", routes);
if (config.node_env === "production") {
  const frontendDistPath = path.join(__dirname, "../../frontend/dist");
  app.use(express.static(frontendDistPath));
  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
}
const test = (req: Request, res: Response) => {
  res.send("Hello World!");
};
app.get("/", test);

app.use(globalErrorHandler);

app.use(notFound);

export default app;
