import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { EmployeeErrorsEnum } from "../enum/employeeErrors.enum";

export const validateRequest = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: true });

    if (error) {
      res.status(400).json(EmployeeErrorsEnum.InvalidParameters);
      return;
    }

    next();
  };
};
