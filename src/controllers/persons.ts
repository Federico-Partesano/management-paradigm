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
  getPersons: async (
    {
      query,
    }: Request<
      {},
      {},
      {},
      {
        limit: string;
        page: string;
        search: string;
        sort: string;
        sector: string;
        skills: string[];
        "workload<": string;
        "workload>": string;
      }
    >,
    res: Response
  ) => {
    const {
      limit = "10",
      page = "1",
      search = "",
      skills = [],
      sector = "",
      sort = "",
    } = query;
    const $or = (skills as string[]).map((id) => ({ skills: id }));
    let options: Record<string, any> = {
      populate: ["skills", "sector"],
      limit: +limit,
      page: +page,
    };
    let filterByString: Record<string, any> = search
      ? {
          $or: [
            { name: { $regex: new RegExp(search as string, "i") } },
            { surname: { $regex: new RegExp(search as string, "i") } },
            { email: { $regex: new RegExp(search as string, "i") } },
          ],
        }
      : {};
    if (skills.length) {
      filterByString["$or"] = [...(filterByString?.["$or"] || []), ...$or];
    }
    if (sector) {
      filterByString["$or"] = [{ sector }, ...$or];
    }
    if (sort && (sort.at(-1) === "<" || sort.at(-1) === ">")) {
      const order = sort.at(-1) === "<" ? -1 : 1;
      const keySort = sort.slice(0, -1);
      options["sort"] = {
        [keySort]: order,
      };
    }
    if (query["workload<"] !== undefined && query["workload>"] !== undefined) {
      // if (workLoad !== undefined)
      //   filterByString["workLoad"] = { $lt: +workLoad + 1 };
      filterByString["workLoad"] = {
        $gt: +query["workload>"] - 1,
        $lt: +query["workload<"] + 1,
      };
    } else {
      if (query["workload>"] !== undefined) {
        filterByString["workLoad"] = {
          $gt: +query["workload>"] - 1,
        };
      }
      if (query["workload<"] !== undefined) {
        filterByString["workLoad"] = {
          $lt: +query["workload<"] + 1,
        };
      }
    }

    const persons = await PersonModel.paginate(filterByString, options);
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
