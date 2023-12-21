import mongoose from "mongoose";

const petMongooseSchema = new mongoose.Schema({
	type: String,
	age: String,
	breed: String,
	status: String,
	height: Number,
	weight: Number,
	color: String,
	bio: String,
	name: String,
	diet: String,
	image: String,
	hypoallergenic: Boolean,
});

const PetMongooseSchema = mongoose.model("Pet", petMongooseSchema);
export default PetMongooseSchema;
