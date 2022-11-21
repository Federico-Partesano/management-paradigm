import { body } from "express-validator";
import { validateEmail } from "../utils/email";

export const checkAddTeam = [
  body("name").notEmpty(),
  body("description").exists(),
  body("startDate").notEmpty().isNumeric(),
  body("endDate").exists().isNumeric().optional({nullable: true}),
  body("persons")
    .isArray()
    .custom((value) => {
      if (
        !value.length ||
        value.every(
          (personObj: any) =>
            "person" in personObj &&
            personObj.person.length === 24 &&
            "contractType" in personObj &&
            ["F.T", "P.T", "Q.T"].some(
              (contractType) => contractType === personObj.contractType
            )
        )
      )
        return true;
      return false;
    }).withMessage("Invalid persons."),
];
