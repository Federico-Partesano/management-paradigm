import { Request, Response } from "express";
import { Person, PersonModel } from "../models/Person";
import { SkillModel } from "../models/Skills";
import { getRandomData } from "../utils/getRandomDataMock";
import { populateTeamsGetPersons } from "../utils/populateTeamsGetPersons";

export const skillsController = {
  getSkills: async ({ query }: Request, res: Response) => {
    // const { limit = "10", page = "1", search = "", workLoad } = query;
    const skills = await SkillModel.find();
    return res.json([...skills]);
  },
  addNewSkill: async (
    { body: { value } }: Request<{}, {}, { value: string }>,
    res: Response
  ) => {
    const { length } = await SkillModel.find({ value });
    if (length)
      return res.status(404).json({ message: "Error skill already exist" });
    const skill = await SkillModel.create({ value });
    return res.json({ _id: skill._id, value: skill.value });
  },
};
