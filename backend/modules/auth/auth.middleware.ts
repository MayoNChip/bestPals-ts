import { RequestHandler } from "express";
import { verify } from "jsonwebtoken";
import { userService } from "../user/user.service";
import { ObjectId } from "mongodb";
import { verifyJWT } from "../../utils/jwt";

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
