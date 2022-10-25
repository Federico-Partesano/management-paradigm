import { body } from "express-validator";

export const checkAddPerson = [
  body(["name", "surname"]).notEmpty(),
  body("email").isEmail(),
  body("sector")
    .custom((value) =>
      ["backend", "frontend", "full-stack"].some((sector) => value === sector)
    )
    .withMessage(
      "The sector field can only have the values: frontend, backend, full-stack."
    ),
];
