import { Request, Response } from "express";
import { Person, PersonModel } from "../models/Person";
import { SkillModel } from "../models/Skills";
import { getRandomData } from "../utils/getRandomDataMock";
import { populateTeamsGetPersons } from "../utils/populateTeamsGetPersons";

export const skillsController = {
  getSkills: async ({ query }: Request, res: Response) => {
    const isPaginate = query?.page !== undefined && query?.limit !== undefined;
    if (isPaginate) {
      const { limit = "10", page = "1" } = query;
      const skills = await SkillModel.paginate(undefined, {
        limit: +limit,
        page: +page,
      });
      return res.json(skills);
    }
    const skills = await SkillModel.find();
    return res.json(skills);
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
  deleteSkill: async ({ params: { id: _id } }: Request, res: Response) => {
    const { deletedCount } = await SkillModel.deleteOne({ _id });
    return deletedCount > 0
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
