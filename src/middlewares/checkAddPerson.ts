import { body } from "express-validator";

export const checkAddPerson = [
  body(["name", "surname"]).notEmpty(),
  body("email").isEmail(),
];
