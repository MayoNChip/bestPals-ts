import express from "express";
import {
  initCloudinary,
  uploadPetImage,
  uploadUserImage,
} from "./upload.service";
import cloudinary from "cloudinary";

const uploadRouter = express.Router();
uploadRouter.use(initCloudinary);
uploadRouter.post("/pet/:petId", uploadPetImage);

uploadRouter.post("/user/:userId", uploadUserImage);

export default uploadRouter;
