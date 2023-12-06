"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const petMongooseSchema = new mongoose_1.default.Schema({
    petType: String,
    breed: String,
    petStatus: String,
    height: Number,
    weight: Number,
    color: String,
    petBio: String,
    name: String,
    hypoallergenic: Boolean,
});
const PetMongooseSchema = mongoose_1.default.model("Pet", petMongooseSchema);
exports.default = PetMongooseSchema;
