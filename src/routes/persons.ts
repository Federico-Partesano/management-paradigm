import express from "express";
import { personsController } from "../controllers/persons";
import { checkAddPerson } from "../middlewares/checkAddPerson";
import { checkErrorValidation } from "../middlewares/checkErrorValidation";
import { isDuplicateEmail } from "../middlewares/isDuplicateEmail";
import { isValidSkills } from "../middlewares/isValidSkills";
import { simulateLazy } from "../middlewares/simulateLazy";
import { isValidSector } from "../middlewares/validSector";
import { mongoIdValidator } from "../utils/validMongoId";
const router = express.Router();
const {
  addNewPerson,
  getPersons,
  deletePerson,
  editPerson,
  addMorePersons,
  deletePersons,
} = personsController;

router.post(
  "/",

  checkAddPerson,
  isValidSector,
  isValidSkills,
  isDuplicateEmail,
  checkErrorValidation,
  addNewPerson
);
router.patch(
  "/:id",

  checkAddPerson,
  isValidSector,
  isValidSkills,
  checkErrorValidation,
  editPerson
);
router.get("/", getPersons);
router.get("/add", addMorePersons);
router.get("/delete", deletePersons);
router.delete(
  "/:id",

  mongoIdValidator("id"),
  checkErrorValidation,
  deletePerson
);

export default router;
