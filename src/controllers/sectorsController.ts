import { Request, Response } from "express";
import { SectorModel } from "../models/Sector";


export const sectorsController = {
  getSectors: async ({ query }: Request, res: Response) => {
    const isPaginate = query?.page !== undefined && query?.limit !== undefined;
    if (isPaginate) {
      const { limit = "10", page = "1" } = query;
      const skills = await SectorModel.paginate(undefined, {
        limit: +limit,
        page: +page,
      });
      return res.json(skills);
    }
    const skills = await SectorModel.find();
    return res.json(skills);
  },
  addNewSector: async (
    { body: { value } }: Request<{}, {}, { value: string }>,
    res: Response
  ) => {
    const { length } = await SectorModel.find({ value });
    if (length)
      return res.status(404).json({ message: "Error sector already exist" });
    const { _id, name: valueSector } = await SectorModel.create({ value });
    return res.json({ _id, value: valueSector });
  },
  deleteSector: async ({ params: { id: _id } }: Request, res: Response) => {
    const { deletedCount } = await SectorModel.deleteOne({ _id });
    return deletedCount
      ? res.json({ message: "Successfully removed" })
      : res.status(404).json({ message: "Item not found" });
  },
  editSector: async ({ params: { id: _id }, body }: Request, res: Response) => {
    await SectorModel.updateOne(
      { _id },
      {
        $set: {
          ...body,
        },
      }
    );
    return res.json({ message: "ok" });
  },
};
