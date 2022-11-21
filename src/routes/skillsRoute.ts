import express from "express";
import { body, param } from "express-validator";
import { skillsController } from "../controllers/skillsController";
import { checkAddSkill } from "../middlewares/checkAddSkill";
import { checkDuplicateBody } from "../middlewares/checkDuplicateBody";
import { checkErrorValidation } from "../middlewares/checkErrorValidation";
import { simulateLazy } from "../middlewares/simulateLazy";
import { SkillModel } from "../models/Skills";
import { mongoIdValidator } from "../utils/validMongoId";
const router = express.Router();
const { getSkills, addNewSkill, deleteSkill, editSkill } = skillsController;

router.get(
  "/",
  param("search").optional().isString(),
  checkErrorValidation,
  getSkills
);
router.put(
  "/",
  checkAddSkill,
  checkDuplicateBody(SkillModel, "name", "name", false),
  checkErrorValidation,
  addNewSkill
);
router.delete(
  "/:id",
  mongoIdValidator("id"),
  checkErrorValidation,
  deleteSkill
);
router.post(
  "/:id",
  body("name").exists().notEmpty().isString(),
  checkDuplicateBody(SkillModel, "name", "name", false, true),
  checkErrorValidation,
  editSkill
);

export default router;
