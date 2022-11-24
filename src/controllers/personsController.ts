import { Request, Response } from "express";
import { parser } from "..";
import { Person, PersonModel } from "../models/Person";
import { getRandomArbitrary } from "../utils/genericFunctions";
import { getRandomData } from "../utils/getRandomDataMock";
import { populateTeamsGetPersons } from "../utils/populateTeamsGetPersons";

interface QueryGetPersons {
  limit: string;
  page: string;
  search: string;
  sort: string;
  sector: string;
  skills: string[];
  "workload<": string;
  "workload>": string;
}

export const personsController = {
  addNewPerson: async (
    { body }: Request<{}, {}, Person<string, string>>,
    res: Response
  ) => {
    await PersonModel.create({ ...body, workLoad: 0 });
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
          email: `${getRandomArbitrary(0, 100000)}@${getRandomArbitrary(
            0,
            10000000
          )}.com`,
          skills: [],
          positions: [],
          workLoad: 0,
        });
      });
    await PersonModel.insertMany(array);
    return res.json({ message: "Random persons inserted" });
  },
  getPersons: async ({ query, url }: Request, res: Response) => {
    const { sort, filter } = res.locals;
    // console.log("🚀 ~ file: personsController.ts ~ line 53 ~ getPersons: ~ filter", filter?.["$or"] )
    delete filter.search;
    const { limit = "10", page = "1", search = "" } = query;
    // const $or = (skills as string[]).map((id) => ({ skills: id }));
    let options: Record<string, any> = {
      populate: ["businessUnit", "positions", "skills"],
      limit: +limit,
      page: +page,
    };
    let filterByString: Record<string, any> = search
      ? {
          $or: [
            { name: { $regex: new RegExp(search as string, "i") } },
            { surname: { $regex: new RegExp(search as string, "i") } },
            { email: { $regex: new RegExp(search as string, "i") } },
            ...(filter?.["$or"] || []),
          ],
        }
      : {};
      if(filter?.["$or"] && filter?.["$or"]?.length) {
       filterByString = { $or: [
         ...(filter?.["$or"] || []),
        ]
      }
    }
    const persons = await PersonModel.paginate(
      {...filter,  ...filterByString },
      { sort, ...options}
    );
    const populatePersonsWithTeams = await populateTeamsGetPersons(persons);
    return res.json(populatePersonsWithTeams);
  },
  editPerson: async (
    {
      body,
      params: { id },
    }: Request<{ id: string }, {}, Person<string, string>>,
    res: Response
  ) => {
    await PersonModel.updateOne(
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
