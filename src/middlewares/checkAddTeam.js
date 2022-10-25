"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAddTeam = void 0;
const express_validator_1 = require("express-validator");
exports.checkAddTeam = [
    (0, express_validator_1.body)("name").notEmpty(),
    (0, express_validator_1.body)("description").exists(),
    (0, express_validator_1.body)(["startDate", "endDate"]).notEmpty().isNumeric(),
    (0, express_validator_1.body)("persons")
        .isArray()
        .custom((value) => {
        if (!value.length ||
            value.every((personObj) => "person" in personObj &&
                personObj.person.length === 24 &&
                "contractType" in personObj &&
                ["F.T", "P.T", "Q.T"].some((contractType) => contractType === personObj.contractType)))
            return true;
        return false;
    }).withMessage("Invalid persons."),
];
