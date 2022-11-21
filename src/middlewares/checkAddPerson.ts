import { body } from "express-validator";

export const checkAddPerson = [
  body(["name", "surname"]).notEmpty(),
  body("email").isEmail(),
  body("businessUnit").exists().notEmpty().isMongoId(),
  body("skills").isArray(),
  body("skills.*").isMongoId(),
  
];
