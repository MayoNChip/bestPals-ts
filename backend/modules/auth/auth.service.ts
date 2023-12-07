import { ObjectId } from "mongodb";
import { checkHash, hash } from "../../utils/bcrypt";
import { generateJWT } from "../../utils/jwt";

const validateLogin = (password: string, hashed: string) => {
	return checkHash(password, hashed);
};

const generateHash = (password: string) => {
	const hashedPassword = hash(password);
	return hashedPassword;
};

const generateAccessToken = (userId: ObjectId) => {
	return generateJWT(userId);
};

export const authService = { validateLogin, generateHash, generateAccessToken };
