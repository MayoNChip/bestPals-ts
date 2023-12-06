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
const addPet_schema_1 = __importDefault(require("../../Controllers/dto/pets/addPet.schema"));
const validator_1 = require("../../Controllers/dto/validator");
const petsController_1 = require("./petsController");
const authValidate = require("../middlewares/authValidate");
const petService = require("../services/pets.service");
const petSchema = require("../models/pet");
const petsRouter = express_1.default.Router();
petsRouter.param("petId", (req, res, next, petId) => __awaiter(void 0, void 0, void 0, function* () {
    const pet = yield petSchema.findById(petId).lean();
    // req.pet = pet;
    next();
}));
petsRouter.get("/", petsController_1.petsController.getPets);
// petsRouter.post("/search", petsController.getPetsByFilter);
petsRouter.get("/:petId", petsController_1.petsController.getById);
petsRouter.post("/", (0, validator_1.validateReq)(addPet_schema_1.default), petsController_1.petsController.addNew);
petsRouter.post("/status/:petId", authValidate.authValidate, petsController_1.petsController.updatePetStatus);
petsRouter.put("/:petId", authValidate.authValidate, petsController_1.petsController.updatePet);
// petsRouter.patch("/:petId", authValidate.authValidate, (req, res) => {
//   const data = req.body;
//   const petId = new ObjectId(req.params.petId);
//   const newPet = petsController.updatePet(petId, data);
//   // pets.updateOne({ _id: petId }, { $set: data });
//   // pets.updateCol(petId, data.key, data.value);
//   res.send(`User ${data.key} updated!`);
// });
petsRouter.delete("/:petId", authValidate.authValidate, petsController_1.petsController.deletePet);
exports.default = petsRouter;
