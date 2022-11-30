import express from "express";
import { businessUnitController } from "../controllers/businessUnitController";
import { checkErrorValidation } from "../middlewares/checkErrorValidation";
import { mongoIdValidator } from "../utils/validMongoId";
import { body } from "express-validator";
import { checkDuplicateBody } from "../middlewares/checkDuplicateBody";
import { BusinessUnitModel } from "../models/BusinessUnit";
import { historyProjectsController } from "../controllers/historyProjectController";
import { queryParser } from "../middlewares/queryParser";

const router = express.Router();
const {
getHistoryProjects
} = historyProjectsController;

router.get("/", queryParser , getHistoryProjects);

export default router;
