"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWorkLoadPersons = void 0;
const Person_1 = require("../models/Person");
const Teams_1 = require("../models/Teams");
const getPercentual = (contractType) => ({
    "F.T": 100,
    "P.T": 50,
    "Q.T": 30,
}[contractType]);
const updateWorkLoadPersons = (idPersonsTeam) => __awaiter(void 0, void 0, void 0, function* () {
    const teams = yield Teams_1.TeamsModel.find().populate({
        path: "persons",
        // Get friends of friends - populate the 'friends' array for every friend
        populate: { path: "person" },
    });
    for (const idPerson of idPersonsTeam) {
        let workLoad = 0;
        teams.forEach(({ persons }) => {
            persons.forEach(({ person: { _id }, contractType }) => {
                if ((_id === null || _id === void 0 ? void 0 : _id.toString()) === idPerson) {
                    workLoad = workLoad + getPercentual(contractType);
                }
            });
        });
        yield Person_1.PersonModel.findByIdAndUpdate(idPerson, { workLoad });
    }
});
exports.updateWorkLoadPersons = updateWorkLoadPersons;
