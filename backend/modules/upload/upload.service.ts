import { RequestHandler } from "express";
import cloudinary from "cloudinary";

const initCloudinary = () => {
  cloudinary.v2.config({
    cloud_name: "dmpvdg7al",
    api_key: "645883948685422",
    api_secret: "gI1NiE_POmPq1U9FyKWGi02ggJ0",
  });
};
const uploadPetImage: RequestHandler = async (req, res, next) => {
  const fileStr = req.body;
  console.log("File ==> ", fileStr);
  try {
    const uploadedResponse = await cloudinary.v2.uploader.upload(fileStr.data, {
      folder: "pets_images",
    });
    res.send({ success: true, imageUrl: uploadedResponse.secure_url });
  } catch (err) {
    console.log("image upload err", err);
    next({ success: false, error: err });
  }
};

const uploadUserImage: RequestHandler = async (req, res, next) => {
  const fileStr = req.body;
  try {
    const uploadedResponse = await cloudinary.v2.uploader.upload(fileStr.data, {
      folder: "users_images",
    });
    res.send({ success: true, imageUrl: uploadedResponse.secure_url });
  } catch (err) {
    console.log("image upload err", err);
    next({ success: false, error: err });
  }
};

export { uploadPetImage, uploadUserImage, initCloudinary };
