"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamsModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const Person_1 = require("./Person");
const personTeam = new mongoose_1.Schema({
    person: { type: mongoose_1.Schema.Types.ObjectId, ref: Person_1.PersonModel },
    contractType: String,
}, { _id: false });
const teamSchema = new mongoose_1.Schema({
    name: String,
    description: String,
    persons: [personTeam],
    startDate: Number,
    endDate: Number,
}, {
    versionKey: false,
});
teamSchema.plugin(mongoose_paginate_v2_1.default);
exports.TeamsModel = (0, mongoose_1.model)("projects", teamSchema);
