import express from "express";
import { skillsController } from "../controllers/skills";
import { checkAddSkill } from "../middlewares/checkAddSkill";
import { checkErrorValidation } from "../middlewares/checkErrorValidation";
import { simulateLazy } from "../middlewares/simulateLazy";
const router = express.Router();
const { getSkills, addNewSkill } = skillsController;

router.get("/", simulateLazy, getSkills);
router.post(
  "/",
  simulateLazy,
  checkAddSkill,
  checkErrorValidation,
  addNewSkill
);

export default router;
