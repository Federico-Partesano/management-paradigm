import express from "express";
import { businessUnitController } from "../controllers/businessUnitController";
import { checkErrorValidation } from "../middlewares/checkErrorValidation";
import { mongoIdValidator } from "../utils/validMongoId";
import { body } from "express-validator";
import { checkDuplicateBody } from "../middlewares/checkDuplicateBody";
import { BusinessUnitModel } from "../models/BusinessUnit";

const router = express.Router();
const {
  getBusinessUnits,
  deleteBusinessUnit,
  getBusinessUnit,
  editBusinessUnit,
  AddNewBusinessUnit,
} = businessUnitController;

router.get("/", getBusinessUnits);
router.delete(
  "/:id",
  mongoIdValidator("id"),
  checkErrorValidation,
  deleteBusinessUnit
);
router.get(
  "/:id",
  mongoIdValidator("id"),
  checkErrorValidation,
  getBusinessUnit
);

router.post(
  "/:id",
  body("name").exists().notEmpty().isString(),
  checkErrorValidation,
  editBusinessUnit
);
router.put(
  "/",
  body("name").exists().notEmpty().isString(),
  checkDuplicateBody(BusinessUnitModel, "name", "name"),
  checkErrorValidation,
  AddNewBusinessUnit
);

export default router;
