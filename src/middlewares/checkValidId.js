"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkInvalidId = void 0;
const checkInvalidId = ({ params: { id } }, res, next) => {
    if (!id || id.length !== 24) {
        res.status(404).json({ message: "invalid id" });
        return;
    }
    next();
};
exports.checkInvalidId = checkInvalidId;
