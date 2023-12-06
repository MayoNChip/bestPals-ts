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
exports.authValidate = void 0;
const user_service_1 = require("../user/user.service");
const mongodb_1 = require("mongodb");
const jwt_1 = require("../../utils/jwt");
const authValidate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers["authorization"];
    console.log("token", token);
    if (!token) {
        return next("Please Login");
    }
    try {
        const verifiedPayload = yield (0, jwt_1.verifyJWT)(token);
        const user = yield user_service_1.userService.getById(new mongodb_1.ObjectId(verifiedPayload.userId));
        (user === null || user === void 0 ? void 0 : user.email)
            ? (req.user = user === null || user === void 0 ? void 0 : user.toObject())
            : next("Please Login");
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            next(error.message);
        }
    }
});
exports.authValidate = authValidate;
