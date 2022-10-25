"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const teams_1 = require("../controllers/teams");
const checkAddTeam_1 = require("../middlewares/checkAddTeam");
const checkErrorValidation_1 = require("../middlewares/checkErrorValidation");
const simulateLazy_1 = require("../middlewares/simulateLazy");
const router = express_1.default.Router();
const { getTeams, addMoreTeams, deleteAllTeams, addNewTeam, editTeam, deleteTeam, } = teams_1.teamsController;
router.get("/", simulateLazy_1.simulateLazy, getTeams);
router.post("/", simulateLazy_1.simulateLazy, checkAddTeam_1.checkAddTeam, checkErrorValidation_1.checkErrorValidation, addNewTeam);
router.post("/:id", simulateLazy_1.simulateLazy, checkAddTeam_1.checkAddTeam, checkErrorValidation_1.checkErrorValidation, editTeam);
router.delete("/:id", simulateLazy_1.simulateLazy, deleteTeam);
router.get("/add", simulateLazy_1.simulateLazy, addMoreTeams);
router.get("/delete", simulateLazy_1.simulateLazy, deleteAllTeams);
exports.default = router;
