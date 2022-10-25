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
exports.teamsController = void 0;
const Teams_1 = require("../models/Teams");
const getRandomDataMock_1 = require("../utils/getRandomDataMock");
const updateWorkLoadPerson_1 = require("../utils/updateWorkLoadPerson");
exports.teamsController = {
    getTeams: ({ query }, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { limit = "10", page = "1", search = "" } = query;
        const filterByString = search
            ? { $or: [{ name: { $regex: new RegExp(search, "i") } }] }
            : {};
        const teams = yield Teams_1.TeamsModel.paginate(filterByString, {
            populate: { path: "persons", populate: "person" },
            limit: +limit,
            page: +page,
        });
        return res.json(teams);
    }),
    addNewTeam: ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield Teams_1.TeamsModel.insertMany([Object.assign({}, body)]);
        (0, updateWorkLoadPerson_1.updateWorkLoadPersons)(body.persons.map(({ person }) => person));
        return res.json({ message: "ok" });
    }),
    deleteTeam: ({ params: { id } }, res) => __awaiter(void 0, void 0, void 0, function* () {
        const team = yield Teams_1.TeamsModel.findById(id);
        const { deletedCount } = yield Teams_1.TeamsModel.deleteOne({ _id: id });
        team &&
            (0, updateWorkLoadPerson_1.updateWorkLoadPersons)(team.persons.map(({ person }) => person.toString()));
        return deletedCount > 0
            ? res.json({ message: "Successfully removed" })
            : res.status(404).json({ message: "Item not found" });
    }),
    editTeam: ({ body, params: { id } }, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { persons } = body;
        // const filters = [
        //   {
        //     $lookup: {
        //       from: "peoples",
        //       localField: "person",
        //       foreignField: "_id",
        //       as: "persons",
        //     },
        //   },
        //   // {
        //   //     '$unwind': {
        //   //       'path': '$person'
        //   //      }
        //   // },
        //   // {
        //   //   $match: {
        //   //     "person._id": { $eq: persons[0].person },
        //   //   },
        //   // },
        // ];
        const currentTeam = yield Teams_1.TeamsModel.findById(id);
        if (!currentTeam)
            return res.status(404).json({ message: "Team not found." });
        const prevIdPersons = currentTeam.persons.map(({ person }) => person.toString());
        yield Teams_1.TeamsModel.updateOne({ _id: id }, {
            $set: Object.assign({}, body),
        });
        (0, updateWorkLoadPerson_1.updateWorkLoadPersons)([
            ...new Set([...persons.map(({ person }) => person), ...prevIdPersons]),
        ]);
        return res.json({ message: "ok" });
    }),
    deleteAllTeams: ({ query }, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield Teams_1.TeamsModel.deleteMany({});
        return res.json({ message: "ok" });
    }),
    addMoreTeams: ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
        let array = [];
        Array(1)
            .fill(null)
            .forEach(() => {
            array.push({
                name: (0, getRandomDataMock_1.getRandomData)("namesTeam"),
                persons: [
                    { person: "63539d909011fdc289c1ecb0", contractType: "F.T" },
                    { person: "63539d909011fdc289c1ecb0", contractType: "F.T" },
                    { person: "63539d909011fdc289c1ecb0", contractType: "F.T" },
                ],
                startDate: (0, getRandomDataMock_1.getRandomDate)(),
                endDate: (0, getRandomDataMock_1.getRandomDate)(),
            });
        });
        yield Teams_1.TeamsModel.insertMany(array);
        return res.json({ message: "Random persons inserted" });
    }),
};
