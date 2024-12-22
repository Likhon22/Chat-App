import { ZodError, ZodIssue } from "zod";
import { TGenericErrorResponse } from "../interface/error";

const handleZodError = (error: ZodError): TGenericErrorResponse => {
  const statusCode = 400;
  const message = "Validation Error";
  const errorSources = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  return {
    statusCode,
    message,
    success: false,
    errorSources,
  };
};

export default handleZodError;
