import express from "express";
import { body } from "express-validator";
import { sectorsController } from "../controllers/sectors";
import { skillsController } from "../controllers/skills";
import { checkAddSkill } from "../middlewares/checkAddSkill";
import { checkErrorValidation } from "../middlewares/checkErrorValidation";
import { simulateLazy } from "../middlewares/simulateLazy";
const router = express.Router();
const { getSectors, addNewSector, deleteSector, editSector } =
  sectorsController;

router.get("/", getSectors);
router.post("/", checkAddSkill, checkErrorValidation, addNewSector);
router.delete("/:id", deleteSector);
router.post(
  "/:id",
  body("value").exists().notEmpty().isString(),
  checkErrorValidation,
  editSector
);

export default router;
