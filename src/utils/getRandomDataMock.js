"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomDate = exports.getRandomData = exports.getRandomArbitraryInt = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const mocks = {
    names: [
        "Filippo",
        "Simone",
        "Matteo",
        "Federica",
        "Nora",
        "Francesco",
        "Michele",
        "Mastro Don Gesualdo",
        "Giuseppe",
        "Francesca",
        "Jonny",
        "Gaetano",
        "Luca",
        "Federico",
        "Carlo",
    ],
    surnames: [
        "Partesano",
        "Spartà",
        "Vinci",
        "Annaro",
        "Rossi",
        "Verdi",
        "Spanò",
        "Tedesco",
        "Crisafulli",
        "Conigli",
        "Castelli",
        "Grasso",
        "Leonardi",
    ],
    emails: [
        "federico.partesano@paradimga.me",
        "simone.spartà@paradigma.me",
        "matteo.vinci@paradigma.me",
        "matteo.annaro@paradigma.me",
        "mario.rossi@paradigma.me",
        "filippo.verdi@paradigma.me",
        "carlo.leonardi@paradigma.me",
        "francesca.tedesco@paradigma.me",
        "gaetano.crisafulli@paradigma.me",
        "ettore.conigli@paradigma.me",
        "sebastiano.castelli@paradigma.me",
        "giuseppe.grasso@paradigma.me",
        "achille.peleo@paradigma.me",
    ],
    sector: ["frontend", "backend", "full-stack"],
    skills: ["Angular js", "React js", "Vue js"],
    namesTeam: [
        "Nutribees",
        "Kleos",
        "Conad",
        "Rai",
        "Manitese",
        "Poket",
        "Beintoo",
        "Tanaza",
        "Telepass",
        "Leonardo",
    ],
};
const getRandomArbitraryInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};
exports.getRandomArbitraryInt = getRandomArbitraryInt;
const getRandomData = (type) => mocks[type][(0, exports.getRandomArbitraryInt)(0, mocks[type].length - 1)];
exports.getRandomData = getRandomData;
const getRandomDate = () => (0, dayjs_1.default)()
    .add(-(0, exports.getRandomArbitraryInt)(0, 40), "years")
    .add(-(0, exports.getRandomArbitraryInt)(0, 12), "months")
    .add(-(0, exports.getRandomArbitraryInt)(0, 28), "days")
    .toDate().getTime();
exports.getRandomDate = getRandomDate;
