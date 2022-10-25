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
exports.personsController = void 0;
const Person_1 = require("../models/Person");
const getRandomDataMock_1 = require("../utils/getRandomDataMock");
exports.personsController = {
    addNewPerson: ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield Person_1.PersonModel.insertMany([Object.assign(Object.assign({}, body), { workLoad: 0 })]);
        return res.json({ message: "Person inserted" });
    }),
    deletePersons: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield Person_1.PersonModel.deleteMany({});
        return res.json({ message: "Persons deleted" });
    }),
    addMorePersons: ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
        let array = [];
        Array(20)
            .fill(null)
            .forEach(() => {
            array.push({
                name: (0, getRandomDataMock_1.getRandomData)("names"),
                surname: (0, getRandomDataMock_1.getRandomData)("surnames"),
                email: (0, getRandomDataMock_1.getRandomData)("emails"),
                skills: [(0, getRandomDataMock_1.getRandomData)("skills")],
                sector: (0, getRandomDataMock_1.getRandomData)("sector"),
                workLoad: 0,
            });
        });
        yield Person_1.PersonModel.insertMany(array);
        return res.json({ message: "Random persons inserted" });
    }),
    getPerson: ({ query }, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { limit = "10", page = "1", search = "" } = query;
        const filterByString = search
            ? {
                $or: [
                    { name: { $regex: new RegExp(search, "i") } },
                    { surname: { $regex: new RegExp(search, "i") } },
                    { email: { $regex: new RegExp(search, "i") } },
                    { sector: { $regex: new RegExp(search, "i") } },
                ],
            }
            : {};
        const persons = yield Person_1.PersonModel.paginate(filterByString, {
            limit: +limit,
            page: +page,
        });
        return res.json(persons);
    }),
    editPerson: ({ body, params: { id } }, res) => __awaiter(void 0, void 0, void 0, function* () {
        const persons = yield Person_1.PersonModel.updateOne({ _id: id }, {
            $set: Object.assign({}, body),
        });
        return res.json({ message: "ok" });
    }),
    deletePerson: ({ params: { id } }, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { deletedCount } = yield Person_1.PersonModel.deleteOne({ _id: id });
        return deletedCount > 0
            ? res.json({ message: "Successfully removed" })
            : res.status(404).json({ message: "Item not found" });
    }),
};
