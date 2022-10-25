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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const Person_1 = require("./models/Person");
const cors_1 = __importDefault(require("cors"));
const persons_1 = __importDefault(require("./routes/persons"));
const teams_1 = __importDefault(require("./routes/teams"));
const body_parser_1 = __importDefault(require("body-parser"));
const Teams_1 = require("./models/Teams");
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.options("*", (0, cors_1.default)());
mongoose_1.default.connect("mongodb://localhost:27017/paradigma", (err) => {
    console.log(!err ? "Succefully connection" : "Db error");
});
app.use("/persons", persons_1.default);
app.use("/teams", teams_1.default);
app.get("/s", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const t = yield Teams_1.TeamsModel.find({}).populate("persons");
    res.json({ message: t });
}));
// const result = PersonModel.insertMany([{name: "ciao", surname: "prova", email: "email", skills: ["prova"], sector: "Frontend"}]);
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const t = yield Person_1.PersonModel.find({ name: "ciao" });
    res.json({ message: t });
}));
app.listen(3005, () => console.log("Server is running"));
