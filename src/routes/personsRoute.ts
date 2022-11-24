import { Router } from "express";
import { personsController } from "../controllers/personsController";
import { checkAddPerson } from "../middlewares/checkAddPerson";
import { checkDuplicateBody } from "../middlewares/checkDuplicateBody";
import { checkErrorValidation } from "../middlewares/checkErrorValidation";
import { isValidSkillsAndPositions } from "../middlewares/isValidSkillsAndPositions";
import { queryParser } from "../middlewares/queryParser";
import { PersonModel } from "../models/Person";
import { mongoIdValidator } from "../utils/validMongoId";
const router = Router();
const {
  addNewPerson,
  getPersons,
  deletePerson,
  editPerson,
  addMorePersons,
  deletePersons,
} = personsController;

router.put(
  "/",
  checkAddPerson,
  checkErrorValidation,
  isValidSkillsAndPositions,
  checkDuplicateBody(PersonModel, "email", "email", true),
  addNewPerson
);
router.post(
  "/:id",
  checkAddPerson,
  isValidSkillsAndPositions,
  checkErrorValidation,
  editPerson
);
router.get("/", queryParser, getPersons);
router.get("/add", addMorePersons);
router.get("/delete", deletePersons);
router.delete(
  "/:id",
  mongoIdValidator("id"),
  checkErrorValidation,
  deletePerson
);

export default router;
