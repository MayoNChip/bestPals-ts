"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcrypt_1 = require("../../utils/bcrypt");
const jwt_1 = require("../../utils/jwt");
const validateLogin = (password, hashed) => {
    return (0, bcrypt_1.checkHash)(password, hashed);
};
const generateHash = (password) => {
    const hashedPassword = (0, bcrypt_1.hash)(password);
    return hashedPassword;
};
const generateAccessToken = (userId) => {
    return (0, jwt_1.generateJWT)(userId);
};
exports.authService = { validateLogin, generateHash, generateAccessToken };
