import express from "express";
import { teamsController } from "../controllers/teams";
import { checkAddTeam } from "../middlewares/checkAddTeam";
import { checkErrorValidation } from "../middlewares/checkErrorValidation";
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

router.get("/", simulateLazy, getTeams);
router.post("/", simulateLazy, checkAddTeam, checkErrorValidation, addNewTeam);
router.post("/:id", simulateLazy, checkAddTeam, checkErrorValidation, editTeam);
router.delete("/:id", simulateLazy, deleteTeam);
router.get("/add", simulateLazy, addMoreTeams);
router.get("/delete", simulateLazy, deleteAllTeams);

export default router;
