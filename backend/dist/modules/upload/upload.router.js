"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upload_service_1 = require("./upload.service");
const uploadRouter = express_1.default.Router();
uploadRouter.use(upload_service_1.initCloudinary);
uploadRouter.post("/pet/:petId", upload_service_1.uploadPetImage);
uploadRouter.post("/user/:userId", upload_service_1.uploadUserImage);
exports.default = uploadRouter;
