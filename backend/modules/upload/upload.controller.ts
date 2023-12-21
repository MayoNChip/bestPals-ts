import { RequestHandler } from "express";
import cloudinary from "cloudinary";
import { TypedRequestHandler } from "../../utils/zodValidation";
import uploadService from "./upload.service";

const uploadPetImage: TypedRequestHandler<{ body: { data: string } }> = async (
	req,
	res,
	next
) => {
	console.log("File ==> ", req.body);
	const fileStr = req.body;
	try {
		const response = await uploadService.uploadPetImage(fileStr.data);
		res.send({ success: true, imageUrl: response?.secure_url });
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

export { uploadPetImage, uploadUserImage };
