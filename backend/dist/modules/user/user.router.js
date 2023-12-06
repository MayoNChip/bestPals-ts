"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
// import express
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_middleware_1 = require("../auth/auth.middleware");
//create userRouter
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
userRouter.use(auth_middleware_1.authValidate);
userRouter.get("/", user_controller_1.userController.getUsers);
userRouter.get("/me", user_controller_1.userController.getMe);
userRouter.get("/mypets/", user_controller_1.userController.getMyPets);
userRouter.get("/:userId", user_controller_1.userController.getById);
userRouter.get("/userPets/:userId", user_controller_1.userController.getPetsByUser);
userRouter.post("/", 
// validateReq(authRegisterSchema),
user_controller_1.userController.addNew);
userRouter.put("/", user_controller_1.userController.updatePassword);
userRouter.put("/:userId", user_controller_1.userController.update);
userRouter.put("/savepet/:petId", user_controller_1.userController.addSavedPet);
userRouter.patch("/:userId", user_controller_1.userController.updateCol);
userRouter.delete("/:userId", user_controller_1.userController.deleteUser);
