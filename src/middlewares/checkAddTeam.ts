import { body } from "express-validator";
import { validateEmail } from "../utils/email";

export const checkAddTeam = [
  body("name").notEmpty(),
  body("description").exists().isString(),
  body("startDate").notEmpty().isNumeric(),
  body(["PO", "SM"]).optional({nullable: true}).isMongoId(),
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
