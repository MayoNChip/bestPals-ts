"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const zodValidation_1 = require("../../utils/zodValidation");
const auth_schema_1 = require("./auth.schema");
const authRouter = express_1.default.Router();
authRouter.post("/register", (0, zodValidation_1.validateReq)(auth_schema_1.registerSchema), 
// validateUser(authRegisterSchema),
auth_controller_1.authController.register);
authRouter.post("/login", (0, zodValidation_1.validateReq)(auth_schema_1.loginSchema), auth_controller_1.authController.login);
exports.default = authRouter;
