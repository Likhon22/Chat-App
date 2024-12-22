import express, { Application, Request, Response } from "express";

import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./app/routes";

import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
const app: Application = express();

// middlewares
app.use(express.json({ limit: "1mb" }));
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);

app.use(cookieParser());

// routes

app.use("/api/v1", routes);

const test = (req: Request, res: Response) => {
  res.send("Hello World!");
};
app.get("/", test);

app.use(globalErrorHandler);

app.use(notFound);

export default app;
