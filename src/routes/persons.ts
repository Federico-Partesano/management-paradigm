import express from "express";
import { personsController } from "../controllers/persons";
import { checkAddPerson } from "../middlewares/checkAddPerson";
import { checkErrorValidation } from "../middlewares/checkErrorValidation";
import { simulateLazy } from "../middlewares/simulateLazy";
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
  simulateLazy,
  checkAddPerson,
  checkErrorValidation,
  addNewPerson
);
router.patch(
  "/:id",
  simulateLazy,
  checkAddPerson,
  checkErrorValidation,
  editPerson
);
router.get("/", simulateLazy, getPersons);
router.get("/add", simulateLazy, addMorePersons);
router.get("/delete", simulateLazy, deletePersons);
router.delete(
  "/:id",
  simulateLazy,
  mongoIdValidator("id"),
  checkErrorValidation,
  deletePerson
);

export default router;
