import { param } from "express-validator";

export const mongoIdValidator = (parameterName: string) =>
  param(parameterName).isMongoId().withMessage('Invalid ID');