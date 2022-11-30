import { Request, Response } from "express";
import { BusinessUnitModel } from "../models/BusinessUnit";
import { HistoryProjectModel } from "../models/historyProject";

export const historyProjectsController = {
  getHistoryProjects: async (req: Request, res: Response) => {
    const { sort, filter } = res.locals;
    const historyProjects = await HistoryProjectModel.find(filter);
    return res.json(historyProjects);
  },
};
