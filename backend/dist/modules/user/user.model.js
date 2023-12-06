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
const mongoose_1 = __importDefault(require("mongoose"));
const pets_model_1 = __importDefault(require("../pet/pets.model"));
const userModel = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
    },
    userAdded: {
        type: Date,
        require: true,
        default: Date.now(),
    },
    image: {
        type: String,
        default: "",
    },
    savedPets: [{ type: String, ref: "Pet" }],
    fosteredPets: [{ type: String, ref: "Pet" }],
    adoptedPets: [{ type: String, ref: "Pet" }],
});
userModel.methods.fosterPet = function (petId) {
    return __awaiter(this, void 0, void 0, function* () {
        this.fosteredPets.push(petId);
        yield pets_model_1.default.findOneAndUpdate({ _id: petId }, { petStatus: "fostered" });
        yield this.save();
    });
};
userModel.methods.forsterPet = function (petId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.fosteredPets.includs(petId)) {
            this.fosteredPets = this.fosteredPets.filter((pet) => pet !== petId);
        }
        this.adoptedPets.push(petId);
        yield pets_model_1.default.findOneAndUpdate({ _id: petId }, { petStatus: "adopted" });
        yield this.save();
    });
};
userModel.methods.adoptPet = function (petId) {
    return __awaiter(this, void 0, void 0, function* () {
        const petLocation = (() => {
            if (this.fosteredPets.includs(petId))
                return "fosteredPets";
            if (this.adoptedPets.includs(petId))
                return "adoptedPets";
            throw new Error("Pet is not saved by the user in any way");
        })();
        this[petLocation] = this[petLocation].filter((f) => f !== petId);
        yield pets_model_1.default.findOneAndUpdate({ _id: petId }, { status: "not-adopted" });
        yield this.save();
    });
};
exports.default = mongoose_1.default.model("User", userModel);
