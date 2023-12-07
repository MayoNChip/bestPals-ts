import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { ObjectId } from "mongodb";

const secret = process.env.JWT_SECRET || "jellybeans";
type jwtPayload = {
	userId: ObjectId;
};

const generateJWT = (userId: ObjectId) => {
	const second = Math.floor(Date.now() / 1000);
	const week = second + 60 * 60 * 24 * 7;
	const ACCESS_TOKEN = jwt.sign({ userId, exp: week }, secret);
	console.log("ACCESS_TOKEN", ACCESS_TOKEN);
	return ACCESS_TOKEN;
};

const verifyJWT = (token: string): Promise<jwtPayload> => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, secret, (err, decoded) => {
			if (err) {
				return reject(err);
			}
			return resolve(decoded as jwtPayload);
		});
	});
};

export { generateJWT, verifyJWT };
