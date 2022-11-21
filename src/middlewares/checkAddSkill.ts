import { body } from "express-validator";

export const checkAddSkill = [body("name").exists().notEmpty().isString()];
