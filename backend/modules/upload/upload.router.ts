import express from "express";
import { uploadPetImage, uploadUserImage } from "./upload.controller";

const uploadRouter = express.Router();
uploadRouter.post("/pet/:petId", uploadPetImage);

uploadRouter.post("/user/:userId", uploadUserImage);

export default uploadRouter;
