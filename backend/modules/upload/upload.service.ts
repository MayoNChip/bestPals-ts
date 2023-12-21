import { RequestHandler } from "express";
import cloudinary from "cloudinary";
import { TypedRequestHandler } from "../../utils/zodValidation";

const uploadService = {
	uploadPetImage: async (imageData: string) => {
		try {
			return await cloudinary.v2.uploader.upload(imageData, {
				folder: "pets_images",
			});
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(error.message);
			}
		}
	},
	uploadUserImage: async (imageData: string, userId: string) => {
		try {
			return await cloudinary.v2.uploader.upload(imageData, {
				folder: "users_images",
			});
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(error.message);
			}
		}
	},
};

export default uploadService;
