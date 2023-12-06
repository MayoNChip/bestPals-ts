"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.generateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET || "jellybeans";
const generateJWT = (userId) => {
    const second = Math.floor(Date.now() / 1000);
    const week = second + 60 * 60 * 24 * 7;
    const ACCESS_TOKEN = jsonwebtoken_1.default.sign({ userId, exp: week }, secret);
    return ACCESS_TOKEN;
};
exports.generateJWT = generateJWT;
const verifyJWT = (token) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
            if (err) {
                return reject(err);
            }
            return resolve(decoded);
        });
    });
};
exports.verifyJWT = verifyJWT;
