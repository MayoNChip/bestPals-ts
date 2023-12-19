import { RequestHandler } from "express";
import { userService } from "../user/user.service";
import { ObjectId } from "mongodb";
import { verifyJWT } from "../../utils/jwt";
import PermissionsDB from "../permission/permission.model";

const authValidate: RequestHandler = async (req, res, next) => {
  const token = req.headers["authorization"];
  console.log("token", token);
  if (!token) {
    return next("Please Login");
  }
  try {
    const verifiedPayload = await verifyJWT(token);

    const user = await userService.getById(
      new ObjectId(verifiedPayload.userId)
    );

    const userPermission = await PermissionsDB.findOne({
      userId: verifiedPayload.userId,
    });

    console.log("user permissions", userPermission?.permission, user);

    if (userPermission && user) {
      req.user = {
        ...user?.toObject(),
        permission: userPermission.permission,
      };
    }

    (user === null || user === void 0 ? void 0 : user.email)
      ? (req.user = user?.toObject())
      : next("Please Login");
    next();
  } catch (error) {
    if (error instanceof Error) {
      next(error.message);
    }
  }
};

export { authValidate };
