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
exports.userController = void 0;
const user_service_1 = require("./user.service");
const mongodb_1 = require("mongodb");
const pets_service_1 = require("../pet/pets.service");
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_service_1.userService.getAll();
        console.log(users);
        res.send(users);
    }
    catch (error) {
        if (error instanceof Error) {
            next(error.message);
        }
    }
});
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_service_1.userService.getById(new mongodb_1.ObjectId(req.params.userId));
    res.send({ success: true, data: user });
});
const getMe = (req, res) => {
    const user = req.user;
    user === null || user === void 0 ? true : delete user.password;
    console.log(user, "this is user");
    res.send(user);
};
const addNew = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield user_service_1.userService.createNewUser(req.body);
    res.send(`New User Created': ${newUser._id}`);
});
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = new mongodb_1.ObjectId(req.params.userId);
    try {
        const updateUserRes = yield user_service_1.userService.updateUser(userId, req.body);
        if (!updateUserRes) {
            next("user not found");
        }
        res.send({ success: true, message: "user updated" });
    }
    catch (error) {
        if (error instanceof Error) {
            next({ success: false, error: error.message });
        }
    }
});
const updateCol = (req, res) => {
    const { key, value } = req.body;
    const userId = new mongodb_1.ObjectId(req.params.userId);
    user_service_1.userService.updateCol(userId, key, value);
    res.send(`User ${key} updated!`);
};
const deleteUser = (req, res) => {
    const userId = new mongodb_1.ObjectId(req.params.userId);
    user_service_1.userService.deleteUser(userId);
    res.send(`User ${userId.toString()} Deleted`);
};
const updatePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!req.user) {
        next("Please Login First");
        return;
    }
    const { newPassword, oldPassword } = req.body;
    try {
        const changePasswordRes = yield user_service_1.userService.changePassword((_a = req.user) === null || _a === void 0 ? void 0 : _a._id, req.body);
        if (!changePasswordRes) {
            return next("Something went wrong");
        }
        res.send({
            success: true,
            message: "Password Updated",
        });
    }
    catch (error) {
        if (error instanceof Error) {
            next(error.message);
        }
    }
});
const addSavedPet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const petId = new mongodb_1.ObjectId(req.params.petId);
    const userId = new mongodb_1.ObjectId((_b = req.user) === null || _b === void 0 ? void 0 : _b._id);
    const addSavedPetRes = yield user_service_1.userService.updateSavedPets(userId, petId);
    res.send(addSavedPetRes);
});
const getMyPets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const userId = new mongodb_1.ObjectId((_c = req.user) === null || _c === void 0 ? void 0 : _c._id);
    const petsResponse = yield user_service_1.userService.getMyPets(userId);
    res.send({ success: true, data: petsResponse });
});
const getPetsByUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = new mongodb_1.ObjectId(req.params.userId);
    const user = yield user_service_1.userService.getById(userId);
    if (!user) {
        return next("User not found");
    }
    //   const petArray = [
    //     ...user.adoptedPets,
    //     ...user.fosteredPets,
    //     ...user.savedPets,
    //   ];
    //   const fullPetArray = petArray.map(async (id) => {
    //     const pet = await petService.getById(new ObjectId(id));
    //     return pet;
    //   });
    let userPets = {};
    const fosteredPetsArray = user.fosteredPets.map((id) => __awaiter(void 0, void 0, void 0, function* () {
        const pet = yield pets_service_1.petService.getById(new mongodb_1.ObjectId(id));
        return pet;
    }));
    const fosteredResult = yield Promise.all(fosteredPetsArray);
    const adoptedPetsArray = user.adoptedPets.map((id) => __awaiter(void 0, void 0, void 0, function* () {
        const pet = yield pets_service_1.petService.getById(new mongodb_1.ObjectId(id));
        return pet;
    }));
    const adoptedResult = yield Promise.all(adoptedPetsArray);
    const savedPetsArray = user.savedPets.map((id) => __awaiter(void 0, void 0, void 0, function* () {
        const pet = yield pets_service_1.petService.getById(new mongodb_1.ObjectId(id));
        return pet;
    }));
    const savedResult = yield Promise.all(savedPetsArray);
    userPets = {
        fosteredPets: fosteredResult,
        adoptedPets: adoptedResult,
        savedPets: savedResult,
    };
    res.send({ success: true, data: userPets });
});
exports.userController = {
    getUsers,
    getById,
    getMe,
    addNew,
    update,
    updateCol,
    deleteUser,
    updatePassword,
    addSavedPet,
    getMyPets,
    getPetsByUser,
};
