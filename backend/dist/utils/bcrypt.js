"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkHash = exports.hash = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const SaltRounds = process.env.SALT_ROUNDS;
const saltRounds = Number(SaltRounds);
const hash = (value) => {
    return bcrypt_1.default.hashSync(value, saltRounds);
};
exports.hash = hash;
const checkHash = (value, hashed) => {
    return bcrypt_1.default.compareSync(value, hashed);
};
exports.checkHash = checkHash;
