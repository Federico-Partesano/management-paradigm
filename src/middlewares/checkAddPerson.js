"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAddPerson = void 0;
const express_validator_1 = require("express-validator");
exports.checkAddPerson = [
    (0, express_validator_1.body)(["name", "surname"]).notEmpty(),
    (0, express_validator_1.body)("email").isEmail(),
    (0, express_validator_1.body)("sector")
        .custom((value) => ["backend", "frontend", "full-stack"].some((sector) => value === sector))
        .withMessage("The sector field can only have the values: frontend, backend, full-stack."),
];
