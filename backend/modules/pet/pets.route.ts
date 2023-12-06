import express from "express";
import { petsController } from "./petsController";
import { validateReq } from "../../utils/zodValidation";
import PetSchema, { PetParamsSchema } from "./pets.schema";
import { z } from "zod";
// const authValidate = require("../middlewares/authValidate");

const petsRouter = express.Router();

petsRouter.param("petId", petsController.petFromParams);
petsRouter.get("/", petsController.getPets);
petsRouter.get("/:petId", petsController.getById);

petsRouter.post("/", validateReq(PetSchema), petsController.addPet);

// petsRouter.post(
//   "/status/:petId",
//   // authValidate.authValidate,
//   petsController.updatePetStatus
// );

petsRouter.put(
  "/:petId",
  validateReq(PetSchema),
  //  authValidate.authValidate,
  petsController.updatePet
);
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

export default petsRouter;
