import { PaginateResult, Types } from "mongoose";
import { InstitutionDocumentPerson, Person } from "../models/Person";
import { Team, TeamsModel } from "../models/Teams";

export const populateTeamsGetPersons = async (
  input: (InstitutionDocumentPerson & {
    _id: Types.ObjectId;
    teams?: Team[];
  })[]
) => {
  const persons: (InstitutionDocumentPerson & {
    _id: Types.ObjectId;
    teams?: Team[];
  })[] = JSON.parse(JSON.stringify(input));

  const promises = persons.map(
    async (person, i) =>
      new Promise(async (resolve) => {
        const $or = [person._id].map((id) => ({ "persons.person": id }));
        const teams = await TeamsModel.find({
          "persons.person": person._id,
        }).populate({
          path: "persons",
          populate: { path: "person" },
        });
        persons[i]["teams"] = teams;
        resolve(undefined);
      })
  );

  await Promise.all(promises);
  return persons;
};
