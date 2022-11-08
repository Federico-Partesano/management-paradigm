import { Request, Response, NextFunction } from "express";
import { Person } from "../models/Person";
import { SectorModel } from "../models/Sector";
import { validateEmail } from "../utils/email";

export const isValidSector = async (
  { body: { sector } }: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!sector) {
    res.status(404).json({ message: "Sector is required value" });
    return;
  } else {
    if (sector.length !== 24) {
      res.status(404).json({ message: "Invalid sector id" });
      return;
    }
    const findSector = await SectorModel.findById(sector);
    if (!findSector) {
      res.status(404).json({ message: "Invalid sector id" });
      return;
    }
    next();
  }
};
