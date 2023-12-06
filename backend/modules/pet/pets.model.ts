import mongoose from "mongoose";

const petMongooseSchema = new mongoose.Schema({
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

const PetMongooseSchema = mongoose.model("Pet", petMongooseSchema);
export default PetMongooseSchema;
