import { Request, Response, NextFunction } from "express";
import { Person } from "../models/Person";
import { validateEmail } from "../utils/email";

export const checkInvalidId = (
  { params: { id } }: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!id || id.length !== 24) {
    res.status(404).json({ message: "invalid id" });
    return;
  }
  next();
};
