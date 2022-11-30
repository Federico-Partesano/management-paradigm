import { Request, Response } from "express";
import { Person, PersonModel } from "../models/Person";
import { SkillModel } from "../models/Skills";
import { objRemoveUndefinedKeys } from "../utils/genericFunctions";
import { getRandomData } from "../utils/getRandomDataMock";
import { populateTeamsGetPersons } from "../utils/populateTeamsGetPersons";

export const skillsController = {
  getSkills: async ({ query }: Request, res: Response) => {
    const { sort, filter } = res.locals;
    const skills = await SkillModel.find(objRemoveUndefinedKeys(filter));
    return res.json(skills);
  },
  addNewSkill: async (
    { body: { name } }: Request<{}, {}, { name: string }>,
    res: Response
  ) => {
    const skill = await SkillModel.create({ name });
    return res.json({ _id: skill._id, value: skill.name });
  },
  deleteSkill: async ({ params: { id: _id } }: Request, res: Response) => {
    const { deletedCount } = await SkillModel.deleteOne({ _id });
    return deletedCount
      ? res.json({ message: "Successfully removed" })
      : res.status(404).json({ message: "Item not found" });
  },
  editSkill: async ({ params: { id: _id }, body }: Request, res: Response) => {
    await SkillModel.updateOne(
      { _id },
      {
        $set: {
          ...body,
        },
      }
    );
    return res.json({ message: "ok" });
  },
};
