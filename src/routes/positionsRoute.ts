import express from "express";
import { body, param } from "express-validator";
import { positionsController } from "../controllers/positionsController";
import { checkDuplicateBody } from "../middlewares/checkDuplicateBody";
import { checkErrorValidation } from "../middlewares/checkErrorValidation";
import { PositionModel } from "../models/Position";
import { mongoIdValidator } from "../utils/validMongoId";

const router = express.Router();
const {
  getPositions,
  getPosition,
  addNewPosition,
  deletePosition,
  editPosition,
} = positionsController;

router.get(
  "/",
  param("businessUnit").optional().isMongoId(),
  param("search").optional().isString(),
  checkErrorValidation,
  getPositions
);
router.get("/:id", mongoIdValidator("id"), checkErrorValidation, getPosition);
router.delete(
  "/:id",
  mongoIdValidator("id"),
  checkErrorValidation,
  deletePosition
);
router.put(
  "/",
  body("businessUnit").isMongoId(),
  body("name").exists().notEmpty().isString(),
  checkErrorValidation,
  checkDuplicateBody(PositionModel, "name", "name"),
  addNewPosition
);
router.post(
  "/:id",
  body("businessUnit").isMongoId(),
  body("name").exists().notEmpty().isString(),
  mongoIdValidator("id"),
  checkErrorValidation,
  checkDuplicateBody(PositionModel, "name", "name", false, true),
  editPosition
);

export default router;
