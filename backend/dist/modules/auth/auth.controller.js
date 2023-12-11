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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const user_service_1 = require("../user/user.service");
const auth_service_1 = require("./auth.service");
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const userRes = yield user_service_1.userService.findByEmail(email);
        if (!userRes) {
            return next("User not found");
        }
        const valid = auth_service_1.authService.validateLogin(password, userRes === null || userRes === void 0 ? void 0 : userRes.password);
        if (!valid) {
            return next("Password is not correct");
        }
        const ACCESS_TOKEN = auth_service_1.authService.generateAccessToken(userRes._id);
        res.send(ACCESS_TOKEN);
    }
    catch (error) {
        if (error instanceof Error) {
            next(error.message);
        }
    }
    //   const user = userRes[0];
});
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const usersList = yield user_service_1.userService.getAll();
    const hashedPassword = auth_service_1.authService.generateHash(req.body.password);
    const user = Object.assign(Object.assign({}, req.body), { password: hashedPassword });
    const { repassword } = user, userWithoutRepassword = __rest(user, ["repassword"]);
    //   delete user.repassword;
    if (!usersList) {
        return next("failed to get users list");
    }
    if (usersList.find((i) => i.email === user.email)) {
        return next("User with this email already exists");
    }
    user;
    const newUser = yield user_service_1.userService.createNewUser(userWithoutRepassword);
    const ACCESS_TOKEN = auth_service_1.authService.generateAccessToken(newUser._id);
    res.send({
        success: true,
        userId: newUser._id,
        ACCESS_TOKEN,
    });
});
exports.authController = { login, register };
