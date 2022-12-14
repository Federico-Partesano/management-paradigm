import express from "express";
import { body } from "express-validator";
import { skillsController } from "../controllers/skills";
import { checkAddSkill } from "../middlewares/checkAddSkill";
import { checkErrorValidation } from "../middlewares/checkErrorValidation";
import { simulateLazy } from "../middlewares/simulateLazy";
const router = express.Router();
const { getSkills, addNewSkill, deleteSkill, editSkill } = skillsController;

router.get("/", getSkills);
router.post("/", checkAddSkill, checkErrorValidation, addNewSkill);
router.delete("/:id", deleteSkill);
router.post(
  "/:id",
  body("value").exists().notEmpty().isString(),
  checkErrorValidation,
  editSkill
);

export default router;
