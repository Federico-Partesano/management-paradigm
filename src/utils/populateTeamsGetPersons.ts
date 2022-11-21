import { PaginateResult, Types } from "mongoose";
import { Person } from "../models/Person";
import { Team, TeamsModel } from "../models/Teams";

export const populateTeamsGetPersons = async (
  input: PaginateResult<Person & { teams?: Team[] }>
) => {
  const persons: PaginateResult<Person & { teams?: Team[] }> = JSON.parse(
    JSON.stringify(input)
  );

  const promises = persons.docs.map(
    async (person, i) => new Promise(async (resolve) => {
      const $or = [person._id].map((id) => ({ "persons.person": id }));
      const teams = await TeamsModel.find({
        "persons.person": person._id,
      }).populate({
        path: "persons",
        populate: { path: "person" },
      });
      persons.docs[i]["teams"] = teams;
      resolve(undefined);
    })
  );

  await Promise.all(promises);
  return persons;
};
