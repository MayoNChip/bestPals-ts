import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const permiossionSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    required: true,
  },
  permission: {
    type: Number,
    required: true,
  },
  _id: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Permission", permiossionSchema);
