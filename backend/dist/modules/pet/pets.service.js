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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.petService = void 0;
const pets_model_1 = __importDefault(require("../pet/pets.model"));
const mongoose_1 = require("mongoose");
// const petDB = PetDB.collection;
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // if (filter) {
        //   const getPetByFilter = await PetsDB.find(filter);
        //   if (getPetByFilter.length === 0) {
        //     // { success: false, message: "no pets found by this filter" };
        //     return await PetsDB.find();
        //   }
        //   return { success: true, message: getPetByFilter };
        // }
        const pets = yield pets_model_1.default.find().lean();
        console.log("pets in service", pets);
        return pets;
    }
    catch (err) {
        console.log("get all pets error=>", err);
        return err;
    }
});
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pet = yield pets_model_1.default.findById({
            _id: id,
        }).lean();
        console.log("get pet by id =>", pet);
        return pet;
    }
    catch (err) {
        console.log("get pet by ID Error =>", err);
        return err;
    }
});
const addPet = (petObj) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const newPet = Object.assign(Object.assign({}, petObj), { lcName: (_a = petObj.name) === null || _a === void 0 ? void 0 : _a.toLowerCase() });
    try {
        const pet = yield pets_model_1.default.create(newPet);
        // const newPet = await pet.save();
        return pet;
    }
    catch (err) {
        if (err instanceof mongoose_1.Error) {
            console.log(err.message);
            throw new mongoose_1.Error(err.message);
        }
    }
});
const update = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPet = yield pets_model_1.default.updateOne({ _id: id }, { $set: body });
        return newPet;
    }
    catch (err) {
        console.log("update doc error ==>", err);
        if (err instanceof mongoose_1.Error) {
            throw new mongoose_1.Error(err.message);
        }
    }
});
// const updateCol = async (id: ObjectId, key: string, value: string) => {
//   try {
//     const newKey = { key: value };
//     const newPet = await petDB.updateOne({ _id: id }, { $set: newKey });
//     return newPet;
//   } catch (err) {
//     console.log("update key of pet Error =>", err);
//     return err;
//   }
// };
// const deleteUser = (id: ObjectId) => {
//   console.log("delete user");
//   // users.delete(id);
// };
// const deletePet = (id: ObjectId) => {
//   petDB.deleteOne({ _id: id });
// };
// const findByEmail = async (email: string) => {
//   try {
//     const user = await UserDB.find({ email });
//     return user;
//   } catch (err) {
//     console.log("login DB error ==>", err);
//     return err;
//   }
// };
// const findByFilter = async (query, sorting) => {
//   const test = { petType: { $eq: "dog" } };
//   const sort = { weight: -1 };
//   const getPetByFilter = await PetsDB.find(query).sort(sorting.sorting);
//   if (getPetByFilter.length === 0) {
//     return { success: false, message: "No pets found by this filter" };
//   }
//   return { success: true, message: getPetByFilter };
// };
exports.petService = {
    getAll,
    addPet,
    getById,
    update,
    // updateCol,
    // deleteUser,
    // findByEmail,
    // deletePet,
    // getPetsByUser,
    // findByFilter,
};
