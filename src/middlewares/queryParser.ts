import { NextFunction, Request, Response } from "express";
import { MongooseQueryParser } from "mongoose-query-parser";
import { parser } from "..";



export const queryParser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { url } = req;
    const [, queries = ""] = url.split("?");
    const { select, filter, sort } = parser.parse(queries);
    res.locals = {
      ...res.locals,
      sort: { createdAt: -1, ...sort },
      filter,
      select,
    };
    next();
  } catch (e: any) {
    res.status(500).json({ message: "Error" });
  }
};
