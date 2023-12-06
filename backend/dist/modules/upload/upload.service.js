"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCloudinary = exports.uploadUserImage = exports.uploadPetImage = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const initCloudinary = () => {
    cloudinary_1.default.v2.config({
        cloud_name: "dmpvdg7al",
        api_key: "645883948685422",
        api_secret: "gI1NiE_POmPq1U9FyKWGi02ggJ0",
    });
};
exports.initCloudinary = initCloudinary;
const uploadPetImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const fileStr = req.body;
    console.log("File ==> ", fileStr);
    try {
        const uploadedResponse = yield cloudinary_1.default.v2.uploader.upload(fileStr.data, {
            folder: "pets_images",
        });
        res.send({ success: true, imageUrl: uploadedResponse.secure_url });
    }
    catch (err) {
        console.log("image upload err", err);
        next({ success: false, error: err });
    }
});
exports.uploadPetImage = uploadPetImage;
const uploadUserImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const fileStr = req.body;
    try {
        const uploadedResponse = yield cloudinary_1.default.v2.uploader.upload(fileStr.data, {
            folder: "users_images",
        });
        res.send({ success: true, imageUrl: uploadedResponse.secure_url });
    }
    catch (err) {
        console.log("image upload err", err);
        next({ success: false, error: err });
    }
});
exports.uploadUserImage = uploadUserImage;
