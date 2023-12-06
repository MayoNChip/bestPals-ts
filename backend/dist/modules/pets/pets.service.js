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
exports.petService = void 0;
const mongoDBConnect_1 = require("../../Controllers/dto/mongoDBConnect");
const PetsDB = mongoDBConnect_1.db.collection("pets");
const UserDB = mongoDBConnect_1.db.collection("users");
const getAll = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // if (filter) {
        //   const getPetByFilter = await PetsDB.find(filter);
        //   if (getPetByFilter.length === 0) {
        //     // { success: false, message: "no pets found by this filter" };
        //     return await PetsDB.find();
        //   }
        //   return { success: true, message: getPetByFilter };
        // }
        const pets = yield PetsDB.find();
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
        const pet = yield PetsDB.findOne({ _id: id });
        // .lean();
        return pet;
    }
    catch (err) {
        console.log("get pet by ID Error =>", err);
        return err;
    }
});
const add = (petObj) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const updatedPet = Object.assign(Object.assign({}, petObj), { lcName: (_a = petObj.name) === null || _a === void 0 ? void 0 : _a.toLowerCase() });
    try {
        const pet = yield PetsDB.updateOne({ _id: petObj._id }, { $set: updatedPet });
        // const newPet = await pet.save();
        return pet.upsertedId;
    }
    catch (err) {
        console.log("add new pet DB error", err);
        return { success: false, message: err };
    }
});
const update = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPet = yield PetsDB.updateOne({ _id: id }, { $set: body });
        return newPet;
    }
    catch (err) {
        console.log("update doc error ==>", err);
        return err;
    }
});
const updateCol = (id, key, value) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newKey = { key: value };
        const newPet = yield PetsDB.updateOne({ _id: id }, { $set: newKey });
        return newPet;
    }
    catch (err) {
        console.log("update key of pet Error =>", err);
        return err;
    }
});
const deleteUser = (id) => {
    console.log("delete user");
    // users.delete(id);
};
const deletePet = (id) => {
    PetsDB.deleteOne({ _id: id });
};
const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserDB.find({ email });
        return user;
    }
    catch (err) {
        console.log("login DB error ==>", err);
        return err;
    }
});
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
    add,
    getById,
    update,
    updateCol,
    deleteUser,
    findByEmail,
    deletePet,
    // getPetsByUser,
    // findByFilter,
};
