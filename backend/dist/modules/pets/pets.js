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
const express_1 = __importDefault(require("express"));
const petsRouter = express_1.default.Router();
const addPet_schema_1 = __importDefault(require("../Controllers/dto/pets/addPet.schema"));
const validator_1 = require("../Controllers/dto/validator");
const mongoDBConnect_1 = require("../Controllers/dto/mongoDBConnect");
const mongodb_1 = require("mongodb");
const petsContoller = require("../Controllers/petsController");
const authValidate = require("../middlewares/authValidate");
const petService = require("../services/pets.service");
const petSchema = require("../models/pet");
const pets = mongoDBConnect_1.db.collection("pets");
petsRouter.param("petId", (req, res, next, petId) => __awaiter(void 0, void 0, void 0, function* () {
    const pet = yield petSchema.findById(petId).lean();
    // req.pet = pet;
    next();
}));
petsRouter.get("/", petsContoller.getPets);
petsRouter.post("/search", petsContoller.getPetsByFilter);
petsRouter.get("/:petId", petsContoller.getById);
petsRouter.post("/", (0, validator_1.validateReq)(addPet_schema_1.default), petsContoller.addNew);
petsRouter.post("/status/:petId", authValidate.authValidate, petsContoller.updatePetStatus);
petsRouter.put("/:petId", authValidate.authValidate, petsContoller.update);
petsRouter.patch("/:petId", authValidate.authValidate, (req, res) => {
    const data = req.body;
    const petId = new mongodb_1.ObjectId(req.params.petId);
    pets.updateOne({ _id: petId }, { $set: data });
    // pets.updateCol(petId, data.key, data.value);
    res.send(`User ${data.key} updated!`);
});
petsRouter.delete("/:petId", authValidate.authValidate, (req, res) => {
    const petId = new mongodb_1.ObjectId(req.params.petId);
    pets.deleteOne({ _id: petId });
    res.send(`User ${petId} Deleted`);
});
exports.default = petsRouter;
