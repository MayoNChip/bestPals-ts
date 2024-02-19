import { RequestHandler } from "express";
import { userService } from "../user/user.service";
import { ObjectId } from "mongodb";
import { verifyJWT } from "../../utils/jwt";
import PermissionsDB from "../permission/permission.model";

const authValidate: RequestHandler = async (req, res, next) => {
	const token = req.headers["authorization"];
	console.log("token from auth validate", token);
	if (!token) {
		return next("Please Login");
	}
	try {
		const verifiedPayload = await verifyJWT(token);

		const user = await userService.getById(
			new ObjectId(verifiedPayload.userId)
		);

		console.log("user from auth validate", user?._id);

		const userPermission = await PermissionsDB.findOne({
			userId: verifiedPayload.userId.toString(),
		});

		console.log("permission from auth validate", userPermission);
		if (userPermission && user) {
			req.user = {
				...user?.toObject(),
				permission: userPermission.permission,
			};
		}

		(user === null || user === undefined) &&
			// ? (req.user = user?.toObject())
			next("Please Login");
		next();
	} catch (error) {
		if (error instanceof Error) {
			next(error.message);
		}
	}
};

export { authValidate };
