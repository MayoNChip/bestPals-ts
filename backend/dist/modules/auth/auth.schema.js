"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().min(1).email("Please enter a valid email address"),
    password: zod_1.z.string().min(6),
});
exports.loginSchema = loginSchema;
const registerSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1),
    lastName: zod_1.z.string().min(1),
    email: zod_1.z.string().min(1).email("Please enter a valid email address"),
    password: zod_1.z.string().min(6),
    repassword: zod_1.z.string().nullish(),
    phoneNumber: zod_1.z.string(),
});
exports.registerSchema = registerSchema;
