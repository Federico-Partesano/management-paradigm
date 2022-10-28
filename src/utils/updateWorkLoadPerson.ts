import { ContractType } from "../models/ContractType";
import { Person, PersonModel } from "../models/Person";
import { Team, TeamsModel } from "../models/Teams";

const getPercentual = (contractType: ContractType) =>
  ({
    "F.T": 100,
    "P.T": 50,
    "Q.T": 30,
  }[contractType]);

export const updateWorkLoadPersons = async (idPersonsTeam: string[]) => {
    const $or = idPersonsTeam.map((id) => ({"persons.person": id}));
  const teams = await TeamsModel.find({
    $or
  }).populate({
    path: "persons",
    // Get friends of friends - populate the 'friends' array for every friend
    populate: { path: "person" },
  });
  for (const idPerson of idPersonsTeam) {
    let workLoad = 0;
    teams.forEach(({ persons }) => {
      persons.forEach(({ person: { _id }, contractType }) => {
        if (_id?.toString() === idPerson) {
          workLoad = workLoad + getPercentual(contractType as ContractType);
        }
      });
    });
    await PersonModel.findByIdAndUpdate(idPerson, { workLoad });
  }
};
