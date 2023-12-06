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
exports.userService = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const auth_service_1 = require("../auth/auth.service");
const pets_model_1 = __importDefault(require("../pet/pets.model"));
// const UserDB = mongoose.model("User", userModel);
// const setPetToUser = async (id: ObjectId, type: string, petId: ObjectId) => {
//   try {
//     return await UserDB.updateOne(
//       { _id: id },
//       { $push: { pets: { type, petId } } }
//     );
//   } catch (error) {
//     console.log(error);
//     throw new Error("can't update user");
//   }
// };
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.default.find();
        console.log(users);
        return users;
    }
    catch (err) {
        console.log("get all users error", err);
        if (err instanceof Error) {
            throw new Error(err.message);
        }
    }
});
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ _id: id });
        console.log("get by id", user);
        return user;
    }
    catch (err) {
        throw new Error("user not found");
    }
});
const createNewUser = (userObj) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = Object.assign({}, userObj);
    const user = yield user_model_1.default.create(newUser);
    //   try {
    //     const permission = new permissionDB({
    //       userId: newUser._id,
    //       permission: ROLES.USER,
    //       _id: uuidv4(),
    //     });
    //     const res = await permission.save();
    //   } catch (err) {
    //     console.log("add user permissions error", err);
    //     return err;
    //   }
    return user;
});
const updateUser = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield user_model_1.default.findByIdAndUpdate({ _id: id }, { $set: user });
        return updatedUser;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
});
const updateCol = (id, key, value) => __awaiter(void 0, void 0, void 0, function* () {
    const updateObj = { key: value };
    try {
        const response = yield user_model_1.default.updateOne({ _id: id }, { $set: { key: value } });
    }
    catch (error) { }
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.default.findOneAndDelete({ _id: id });
});
const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ email });
        console.log("user from find by email", user);
        return user === null || user === void 0 ? void 0 : user.toObject();
    }
    catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
            throw new Error(err.message);
        }
    }
});
const setPetToUser = (userId, type, petId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        switch (type) {
            case "fostered":
                const checkFosteredPets = yield user_model_1.default.findOne({
                    _id: userId,
                    fosteredPets: petId,
                });
                if (checkFosteredPets) {
                    throw new Error("pet already fostered by this user");
                    // const ownerId = checkFosteredPets[0]._id;
                    // const removeFoseredPet = await UserDB.updateOne(
                    //   { _id: ownerId },
                    //   { $pull: { fosteredPets: petId } }
                    // );
                }
                const fosteredResponse = yield user_model_1.default.findOneAndUpdate({ _id: userId }, { fosteredPets: { $push: petId } });
                return fosteredResponse;
            case "adopted":
                const checkFostered = yield user_model_1.default.find({
                    fosteredPets: petId,
                });
            // if (checkFostered) {
            //   const ownerId = checkFostered[0]._id;
            //   const removeFoseredPet = await UserDB.updateOne(
            //     { _id: ownerId },
            //     { $pull: { fosteredPets: petId } }
            //   );
            // }
            // const adoptedResponse = await UserDB.findOneAndUpdate(
            //   { _id: userId },
            //   { $push: { adoptedPets: petId } },
            //   { new: true }
            // );
            // return adoptedResponse;
            //   case "not-adopted":
            //     const isFosteredOrAdoptedResponse = await UserDB.find({
            //       $or: [{ fosteredPets: petId }, { adoptedPets: petId }],
            //     });
            //     if (isFosteredOrAdoptedResponse[0].fosteredPets !== 0) {
            //       const ownerId = isFosteredOrAdoptedResponse[0]._id;
            //       if (isFosteredOrAdoptedResponse[0].fosteredPets !== 0) {
            //         const removePetFromUser = await UserDB.updateOne(
            //           { _id: ownerId },
            //           { $pull: { fosteredPets: petId } }
            //         );
            //       }
            //       if (isFosteredOrAdoptedResponse[0].adoptedPets !== 0) {
            //         const removePetFromUser = await UserDB.updateOne(
            //           { _id: ownerId },
            //           { $pull: { adoptedPets: petId } }
            //         );
            //       }
            //     }
            //     return isFosteredOrAdoptedResponse;
        }
    }
    catch (error) {
        console.log("set pet to user error", error);
        return error;
    }
});
const updateSavedPets = (userId, petId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.find({ _id: userId, savedPets: petId });
        if (user.length !== 0) {
            const removeSavedPetRes = yield user_model_1.default.findOneAndUpdate({ _id: userId, savedPets: petId }, { $pull: { savedPets: petId } }, { new: true });
            return { success: true, data: removeSavedPetRes };
        }
        const addSavedPetRes = yield user_model_1.default.findOneAndUpdate({ _id: userId }, { $push: { savedPets: petId } }, { new: true });
        return { success: true, data: addSavedPetRes };
    }
    catch (error) {
        console.log("add to saved pets error", error);
        return { success: false, error };
    }
});
const changePassword = (userId, newPassOBJ) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield user_model_1.default.find({ _id: userId });
        // const hashedOldPassword = authService.generateHash(newPassOBJ.oldPassword);
        const valid = auth_service_1.authService.validateLogin(newPassOBJ.oldPassword, (_a = user[0]) === null || _a === void 0 ? void 0 : _a.password);
        if (!valid) {
            throw new Error("Current password is incorrect");
        }
        const hashedNewPassword = auth_service_1.authService.generateHash(newPassOBJ.newPassword);
        const updatePassword = yield user_model_1.default.findOneAndUpdate({ _id: userId }, { password: hashedNewPassword }, { new: true });
        return true;
    }
    catch (error) {
        console.log("change password user service error", error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
});
const getMyPets = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userPets = yield user_model_1.default.findOne({ _id: userId });
        if (!userPets) {
            throw new Error("User not found");
        }
        const fosteredAndAdoptedPetsArray = [];
        fosteredAndAdoptedPetsArray.push(...userPets.fosteredPets, ...userPets.adoptedPets);
        const adoptedFosteredPets = yield pets_model_1.default.find({
            _id: { $in: fosteredAndAdoptedPetsArray },
        });
        const savedPetsArray = [];
        savedPetsArray.push(...userPets.savedPets);
        const savedPetByUser = yield pets_model_1.default.find({
            _id: { $in: savedPetsArray },
        });
        const allUserPets = {
            adoptedFosteredPets: adoptedFosteredPets,
            savedPets: savedPetByUser,
        };
        return allUserPets;
    }
    catch (err) {
        console.log("get all pets error=>", err);
        return err;
    }
});
exports.userService = {
    setPetToUser,
    getAll,
    getById,
    findByEmail,
    createNewUser,
    updateUser,
    updateCol,
    deleteUser,
    updateSavedPets,
    changePassword,
    getMyPets,
};
