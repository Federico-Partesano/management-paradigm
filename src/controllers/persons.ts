import { Request, Response } from "express";
import { Person, PersonModel } from "../models/Person";
import { getRandomData } from "../utils/getRandomDataMock";
import { populateTeamsGetPersons } from "../utils/populateTeamsGetPersons";

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
  getPersons: async ({ query }: Request, res: Response) => {
    const { limit = "10", page = "1", search = "", workLoad, skills = [] } = query;
    // const $or = (skills as string[]).map((id) => ({"skills": id}));

    let filterByString: Record<string, any> = search
      ? {
          $or: [
            { name: { $regex: new RegExp(search as string, "i") } },
            { surname: { $regex: new RegExp(search as string, "i") } },
            { email: { $regex: new RegExp(search as string, "i") } },
            { sector: { $regex: new RegExp(search as string, "i") } },
          ],
        }
      : {};

    if (workLoad !== undefined)
      filterByString["workLoad"] = { $lt: (+workLoad) + 1 };
    const persons = await PersonModel.paginate(filterByString, {
      populate: "skills",
      limit: +limit,
      page: +page,
    });
    const populatePersonsWithTeams = await populateTeamsGetPersons(persons);
    return res.json(populatePersonsWithTeams);
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
