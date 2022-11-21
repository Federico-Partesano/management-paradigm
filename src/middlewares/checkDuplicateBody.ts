import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

type ExtractFirstGeneric<P> = P extends mongoose.PaginateModel<infer T>
  ? T
  : never;

export const checkDuplicateBody =
  <T extends mongoose.PaginateModel<any>>(
    model: T,
    keyBody: string,
    keyFind: keyof ExtractFirstGeneric<T>,
    caseSensitive = true,
    editCase = false
  ) =>
  async (
    { body: { [keyBody]: key }, params: {id} }: Request<{id: string}>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    if (!key) {
      res.status(400).json({ message: `${keyBody} is required` });
      return;
    }
    const query = {
      [keyFind]: caseSensitive ? key : { $regex: `^${key}$`, $options: "i" },
    };
    const data = await model.findOne(query);
    if (data && (editCase ? data?._id !== id :  true)) {
      res.status(400).json({ message: `${keyBody} already exist` });
      return;
    }
    next();
  };
