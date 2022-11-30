import { Request, Response, NextFunction } from "express";
import { Person } from "../models/Person";
import { validateEmail } from "../utils/email";
import { getRandomArbitraryInt } from "../utils/getRandomDataMock";

export const simulateLazy = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  setTimeout(() => {
    next();
  }, getRandomArbitraryInt(400, 600));
};
