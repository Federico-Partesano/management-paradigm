import { Request, Response, NextFunction } from "express";
import { BusinessUnitModel } from "../models/BusinessUnit";
import { Person } from "../models/Person";
import { Position, PositionModel } from "../models/Position";

export const isValidSkillsAndPositions = async (
  {
    body: { positions, businessUnit },
  }: Request<{}, {}, Person<string, string>>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const checkedPosition = await Promise.all(
    positions.map((idPosition: string) => {
      return new Promise(async (resolve) => {
        const position = await PositionModel.findById(idPosition);
        return resolve(
          position &&
            (position["businessUnit"] as unknown as string).toString() ===
              businessUnit
        );
      });
    })
  );
  if (checkedPosition.some((position) => !position)) {
    res.status(400).json({ message: "Invalid positions" });
    return;
  }
  next();
};
