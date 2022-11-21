import { Request, Response } from "express";
import { PaginateResult } from "mongoose";
import { PositionModel } from "../models/Position";
import { objRemoveUndefinedKeys } from "../utils/genericFunctions";

export const positionsController = {
  getPositions: async ({ query }: Request, res: Response) => {
    const { search, businessUnit } = query;
    const positions = await PositionModel.find(
      objRemoveUndefinedKeys({
        name: search
          ? { $regex: new RegExp(search as string, "i") }
          : undefined,
        businessUnit,
      })
    ).populate("businessUnit");
    return res.json(positions);
  },
  getPosition: async ({ params: { id } }: Request, res: Response) => {
    const position = await PositionModel.findById(id).populate("businessUnit");
    return position
      ? res.json(position)
      : res.status(404).json({ message: "Position not found" });
  },
  deletePosition: async ({ params: { id: _id } }: Request, res: Response) => {
    const { deletedCount } = await PositionModel.deleteOne({ _id });
    return deletedCount
      ? res.json({ message: "Successfully removed" })
      : res.status(404).json({ message: "Position not found" });
  },
  editPosition: async (
    { body, params: { id: _id } }: Request,
    res: Response
  ) => {
    const newPosition = await PositionModel.updateOne(
      { _id },
      {
        $set: {
          ...body,
        },
      }
    );
    return res.json({ ...newPosition });
  },
  addNewPosition: async ({ body }: Request, res: Response) => {
    const { _id, name, businessUnit } = await PositionModel.create({
      ...body,
    });
    return res.json({ _id, businessUnit, name });
  },
};
