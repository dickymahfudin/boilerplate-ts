/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import logger from "@util/logger";

const errorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error({ message: err.message || err, stack: err.stack });
  res.customResponse({ code: 500, message: "internal server error" });
};

export default errorHandler;
