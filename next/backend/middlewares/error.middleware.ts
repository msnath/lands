import HttpStatusCodes from "http-status-codes";
import { Exception, Codes } from "$/types/error.type";
import { ErrorHandler } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import Logger from "#/configs/logger.config";

const onError: ErrorHandler<NextApiRequest, NextApiResponse> = (
  err,
  req,
  res,
) => {
  if (err instanceof Exception) {
    Logger.failure.warn(
      req,
      `${err.code} ${err.message}`,
      `\n- INTERNAL: ${err.internal}`,
      `\n- DETAILS : ${err.details}`
    );
    Logger.failure.warn(req, err.stack, "\n");
    return res.status(err.code).json({
      message: err.message || "",
      details: err.details || err.message || "",
    });
  } else if (err instanceof Error) {
    Logger.failure.error(req, err.message);
    Logger.failure.error(req, err.stack, "\n");
    return res.status(Codes.INTERNAL_SERVER_ERROR).json({
      message: HttpStatusCodes.getStatusText(Codes.INTERNAL_SERVER_ERROR) || "",
      details: HttpStatusCodes.getStatusText(Codes.INTERNAL_SERVER_ERROR) || "",
    });
  }

  Logger.failure.error(req, err);
  return res.status(Codes.INTERNAL_SERVER_ERROR).json({
    message: HttpStatusCodes.getStatusText(Codes.INTERNAL_SERVER_ERROR) || "",
    details: HttpStatusCodes.getStatusText(Codes.INTERNAL_SERVER_ERROR) || "",
  });
};

const ErrorMiddleware = { onError };

export default ErrorMiddleware;
