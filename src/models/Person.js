"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonModel = exports.personSchema = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
exports.personSchema = new mongoose_1.Schema({
    name: String,
    surname: String,
    email: String,
    skills: [String],
    sector: String,
    workLoad: Number,
}, {
    versionKey: false,
});
exports.personSchema.plugin(mongoose_paginate_v2_1.default);
exports.PersonModel = (0, mongoose_1.model)("peoples", exports.personSchema);
