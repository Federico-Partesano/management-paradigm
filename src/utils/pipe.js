"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pipe = void 0;
const pipe = (...fns) => (arg) => fns.reduce((value, fns) => fns(value), arg);
exports.pipe = pipe;
