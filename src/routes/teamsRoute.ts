import express from "express";
import { teamsController } from "../controllers/teamsController";
import { checkAddTeam } from "../middlewares/checkAddTeam";
import { checkErrorValidation } from "../middlewares/checkErrorValidation";
import { queryParser } from "../middlewares/queryParser";
import { simulateLazy } from "../middlewares/simulateLazy";
const router = express.Router();
const {
  getTeams,
  addMoreTeams,
  deleteAllTeams,
  addNewTeam,
  editTeam,
  deleteTeam,
} = teamsController;

router.get("/", queryParser ,getTeams);
router.put("/", checkAddTeam, checkErrorValidation, addNewTeam);
router.post("/:id", checkAddTeam, checkErrorValidation, editTeam);
router.delete("/:id", deleteTeam);
router.get("/add", addMoreTeams);
router.get("/delete", deleteAllTeams);

export default router;
