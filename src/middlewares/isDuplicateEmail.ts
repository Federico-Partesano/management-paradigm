import { Request, Response, NextFunction } from "express";
import { Person, PersonModel } from "../models/Person";

export const isDuplicateEmail = async (
  { body: { email } }: Request<{}, {}, { email: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const personWithEqualEmail = await PersonModel.findOne({ email: email });
  if (personWithEqualEmail) {
    res.status(404).json({ message: "This email already exist" });
    return;
  }
  next();
};
