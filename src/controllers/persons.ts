import { Request, Response } from "express";
import { Person, PersonModel } from "../models/Person";
import { getRandomData } from "../utils/getRandomDataMock";

export const personsController = {
  addNewPerson: async ({ body }: Request<{}, {}, Person>, res: Response) => {
    await PersonModel.insertMany([{ ...body, workLoad: 0 }]);
    return res.json({ message: "Person inserted" });
  },
  deletePersons: async (req: Request<{}, {}, Person>, res: Response) => {
    await PersonModel.deleteMany({});
    return res.json({ message: "Persons deleted" });
  },
  addMorePersons: async ({ body }: Request<{}, {}, Person>, res: Response) => {
    let array: Record<string, number | string | string[]>[] = [];
    Array(20)
      .fill(null)
      .forEach(() => {
        array.push({
          name: getRandomData("names"),
          surname: getRandomData("surnames"),
          email: getRandomData("emails"),
          skills: [getRandomData("skills")],
          sector: getRandomData("sector"),
          workLoad: 0,
        });
      });
    await PersonModel.insertMany(array);
    return res.json({ message: "Random persons inserted" });
  },
  getPerson: async ({ query }: Request, res: Response) => {
    const { limit = "10", page = "1", search = "" } = query;
    const filterByString = search
      ? {
          $or: [
            { name: { $regex: new RegExp(search as string, "i") } },
            { surname: { $regex: new RegExp(search as string, "i") } },
            { email: { $regex: new RegExp(search as string, "i") } },
            { sector: { $regex: new RegExp(search as string, "i") } },
          ],
        }
      : {};
    const persons = await PersonModel.paginate(filterByString, {
      limit: +limit,
      page: +page,
    });
    return res.json(persons);
  },
  editPerson: async (
    { body, params: { id } }: Request<{ id: string }, {}, Person>,
    res: Response
  ) => {
    const persons = await PersonModel.updateOne(
      { _id: id },
      {
        $set: {
          ...body,
        },
      }
    );
    return res.json({ message: "ok" });
  },
  deletePerson: async ({ params: { id } }: Request, res: Response) => {
    const { deletedCount } = await PersonModel.deleteOne({ _id: id });
    return deletedCount > 0
      ? res.json({ message: "Successfully removed" })
      : res.status(404).json({ message: "Item not found" });
  },
};
