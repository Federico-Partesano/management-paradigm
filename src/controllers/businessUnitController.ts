import { Request, Response } from "express";
import { BusinessUnitModel } from "../models/BusinessUnit";

export const businessUnitController = {
  getBusinessUnits: async (req: Request, res: Response) => {
    const businessUnits = await BusinessUnitModel.find();
    return res.json(businessUnits);
  },
  getBusinessUnit: async ({ params: { id } }: Request, res: Response) => {
    const businessUnit = await BusinessUnitModel.findById(id);
    return businessUnit
      ? res.json(businessUnit)
      : res.status(404).json({ message: "Business Unit not found" });
  },
  deleteBusinessUnit: async (
    { params: { id: _id } }: Request,
    res: Response
  ) => {
    const { deletedCount } = await BusinessUnitModel.deleteOne({ _id });
    return deletedCount > 0
      ? res.json({ message: "Successfully removed" })
      : res.status(404).json({ message: "Position not found" });
  },
  editBusinessUnit: async (
    { body, params: { id: _id } }: Request,
    res: Response
  ) => {
    const newBusinessUnit = await BusinessUnitModel.updateOne(
      { _id },
      {
        $set: {
          ...body,
        },
      }
    );
    return res.json({ ...newBusinessUnit });
  },
  AddNewBusinessUnit: async ({ body }: Request, res: Response) => {
    try {
      const { _id, name } = await BusinessUnitModel.create({
        ...body,
      });
      return res.json({ _id, name });
    } catch (error) {
      console.error("error", error);
      return res.json({ message: "error" });
    }
  },
};
