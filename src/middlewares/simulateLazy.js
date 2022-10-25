"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simulateLazy = void 0;
const getRandomDataMock_1 = require("../utils/getRandomDataMock");
const simulateLazy = (req, res, next) => {
    setTimeout(() => {
        next();
    }, (0, getRandomDataMock_1.getRandomArbitraryInt)(300, 600));
};
exports.simulateLazy = simulateLazy;
