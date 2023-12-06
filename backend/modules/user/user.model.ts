import mongoose, { ObjectId } from "mongoose";
import PetDB from "../pet/pets.model";
import { z } from "zod";

const userModel = new mongoose.Schema({
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

userModel.methods.fosterPet = async function (petId: ObjectId) {
  this.fosteredPets.push(petId);

  await PetDB.findOneAndUpdate({ _id: petId }, { petStatus: "fostered" });

  await this.save();
};

userModel.methods.forsterPet = async function (petId: ObjectId) {
  if (this.fosteredPets.includs(petId)) {
    this.fosteredPets = this.fosteredPets.filter(
      (pet: ObjectId) => pet !== petId
    );
  }

  this.adoptedPets.push(petId);

  await PetDB.findOneAndUpdate({ _id: petId }, { petStatus: "adopted" });

  await this.save();
};

userModel.methods.adoptPet = async function (petId: ObjectId) {
  const petLocation = (() => {
    if (this.fosteredPets.includs(petId)) return "fosteredPets";
    if (this.adoptedPets.includs(petId)) return "adoptedPets";
    throw new Error("Pet is not saved by the user in any way");
  })();

  this[petLocation] = this[petLocation].filter((f: ObjectId) => f !== petId);

  await PetDB.findOneAndUpdate({ _id: petId }, { status: "not-adopted" });

  await this.save();
};

export default mongoose.model("User", userModel);
