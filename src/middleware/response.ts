/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";

const handleResponse = (req: Request, res: Response, next: NextFunction) => {
  res.customResponse = ({
    message,
    data,
    code,
    validations,
  }: {
    message: string;
    data?: object;
    code?: number;
    validations?: any[];
  }) => {
    const status = code ? code >= 200 && code < 300 : true;
    return res.status(code || 200).json({
      requestId: res.locals.requestId,
      status,
      message,
      data,
      validations,
    });
  };

  next();
};

const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.customResponse({
    message: "Not Found",
    code: 404,
  });
};

export { handleResponse, notFound };
