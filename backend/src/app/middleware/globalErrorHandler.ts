/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import config from "../config";
import handleZodError from "../errors/handleZodError";
import { TErrorSources } from "../interface/error";
import { ZodError } from "zod";
import AppError from "../errors/AppError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error";
  let errorSources: TErrorSources = [
    {
      path: "",
      message: "something went wrong",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedErrors = handleZodError(err);
    statusCode = simplifiedErrors.statusCode;
    message = simplifiedErrors.message;
    errorSources = simplifiedErrors.errorSources;
  }
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.node_env === "development" ? err.stack : undefined,
  });
};

export default globalErrorHandler;
