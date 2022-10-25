"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoIdValidator = void 0;
const express_validator_1 = require("express-validator");
const mongoIdValidator = (parameterName) => (0, express_validator_1.param)(parameterName).isMongoId().withMessage('Invalid ID');
exports.mongoIdValidator = mongoIdValidator;
