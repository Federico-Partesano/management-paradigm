import { body } from "express-validator";

export const checkAddSkill = [body("value").exists().notEmpty()];
