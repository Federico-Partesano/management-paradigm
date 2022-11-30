import { Request, Response } from "express";
import { ContractType } from "../models/ContractType";
import { Person, PersonModel } from "../models/Person";
import { PostTeam, Team, TeamsModel } from "../models/Teams";
import { getRandomData, getRandomDate } from "../utils/getRandomDataMock";
import { updateWorkLoadPersons } from "../utils/updateWorkLoadPerson";

export const teamsController = {
  getTeams: async ({ query }: Request, res: Response) => {
    const { limit = "10", page = "1", name = "" } = query;
    const { sort, filter } = res.locals;

    const filterByString = name
      ? { ...filter, name: { $regex: new RegExp(name as string, "i") } }
      : { ...filter };
    const teams = await TeamsModel.paginate(filterByString, {
      populate: [
        {
          path: "persons.person",
          model: "peoples",
          populate: ["skills", "positions"],
        },
        {
          path: "PO",
        },
        { path: "SM" },
      ],
      limit: +limit,
      page: +page,
      collation: { locale: "en" },
      sort: { createdAt: 1, ...sort },
    });
    return res.json(teams);
  },
  addNewTeam: async (
    { body }: Request<{}, {}, Team<PostTeam>>,
    res: Response
  ) => {
    await TeamsModel.create({ ...body });
    updateWorkLoadPersons(body.persons.map(({ person }) => person));
    return res.json({ message: "ok" });
  },
  deleteTeam: async ({ params: { id } }: Request, res: Response) => {
    const team = await TeamsModel.findById(id);
    const { deletedCount } = await TeamsModel.deleteOne({ _id: id });
    team &&
      updateWorkLoadPersons(
        team.persons.map(({ person }) => person.toString())
      );
    return deletedCount > 0
      ? res.json({ message: "Successfully removed" })
      : res.status(404).json({ message: "Item not found" });
  },
  editTeam: async (
    { body, params: { id } }: Request<{ id: string }, {}, Team<PostTeam>>,
    res: Response
  ) => {
    const { persons } = body;
    const currentTeam: Team<PostTeam> | null = await TeamsModel.findById(id);
    if (!currentTeam)
      return res.status(404).json({ message: "Team not found." });
    const prevIdPersons = currentTeam.persons.map(({ person }) =>
      person.toString()
    );
    await TeamsModel.updateOne(
      { _id: id },
      {
        $set: {
          ...body,
        },
      }
    );
    await updateWorkLoadPersons([
      ...new Set([...persons.map(({ person }) => person), ...prevIdPersons]),
    ]);
    return res.json({ message: "ok" });
  },
  deleteAllTeams: async ({ query }: Request, res: Response) => {
    await TeamsModel.deleteMany({});
    return res.json({ message: "ok" });
  },
  addMoreTeams: async ({ body }: Request<{}, {}, Team>, res: Response) => {
    let array: Record<string, string | any | string[]>[] = [];
    Array(1)
      .fill(null)
      .forEach(() => {
        array.push({
          name: getRandomData("namesTeam"),
          persons: [
            { person: "63539d909011fdc289c1ecb0", contractType: "F.T" },
            { person: "63539d909011fdc289c1ecb0", contractType: "F.T" },
            { person: "63539d909011fdc289c1ecb0", contractType: "F.T" },
          ],
          startDate: getRandomDate(),
          endDate: getRandomDate(),
        });
      });
    await TeamsModel.insertMany(array);
    return res.json({ message: "Random persons inserted" });
  },
};
