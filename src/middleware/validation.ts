import { NextFunction, Request, Response } from "express";
import { ZodError, z } from "zod";

const validate = (schema: z.ZodObject<any, any, any, any>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const validations = error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        res.customResponse({ code: 400, message: "Validation error", validations });
      } else {
        next(error);
      }
    }
  };
};

export default validate;
