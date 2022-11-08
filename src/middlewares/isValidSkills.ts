import { Request, Response, NextFunction } from "express";
import { Person } from "../models/Person";
import { SectorModel } from "../models/Sector";
import { validateEmail } from "../utils/email";

export const isValidSkills = async (
  { body: { skills } }: Request<{}, {}, { skills: string[] }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!skills.length) {
    next();
  } else {
    if (skills.some((skill) => skill.length !== 24)) {
      res.status(404).json({ message: "Invalid skills id" });
      return;
    }
    next();
  }
};
