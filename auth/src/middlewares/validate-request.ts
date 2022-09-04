import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const erros = validationResult(req);

    if (!erros.isEmpty()) {
      throw new RequestValidationError(erros.array());
    }

    next();
}