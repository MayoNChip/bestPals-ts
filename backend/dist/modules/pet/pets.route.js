"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const petsController_1 = require("./petsController");
const zodValidation_1 = require("../../utils/zodValidation");
const pets_schema_1 = __importDefault(require("./pets.schema"));
// const authValidate = require("../middlewares/authValidate");
const petsRouter = express_1.default.Router();
petsRouter.param("petId", petsController_1.petsController.petFromParams);
petsRouter.get("/", petsController_1.petsController.getPets);
petsRouter.get("/:petId", petsController_1.petsController.getById);
petsRouter.post("/", (0, zodValidation_1.validateReq)(pets_schema_1.default), petsController_1.petsController.addPet);
// petsRouter.post(
//   "/status/:petId",
//   // authValidate.authValidate,
//   petsController.updatePetStatus
// );
petsRouter.put("/:petId", (0, zodValidation_1.validateReq)(pets_schema_1.default), 
//  authValidate.authValidate,
petsController_1.petsController.updatePet);
// petsRouter.delete(
//   "/:petId",
//   // authValidate.authValidate,
//   petsController.deletePet
// );
// petsRouter.post("/search", petsController.getPetsByFilter);
// petsRouter.patch("/:petId", authValidate.authValidate, (req, res) => {
//   const data = req.body;
//   const petId = new ObjectId(req.params.petId);
//   const newPet = petsController.updatePet(petId, data);
//   // pets.updateOne({ _id: petId }, { $set: data });
//   // pets.updateCol(petId, data.key, data.value);
//   res.send(`User ${data.key} updated!`);
// });
exports.default = petsRouter;
