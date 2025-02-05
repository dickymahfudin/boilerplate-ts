import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";

const handleRequest = (req: Request, res: Response, next: NextFunction) => {
  res.locals.requestId = req.headers["x-request-id"] || uuidv4();
  next();
};

export default handleRequest;
