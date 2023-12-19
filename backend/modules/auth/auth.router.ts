import express from "express";
import { authController } from "./auth.controller";
import { validateReq } from "../../utils/zodValidation";
import { loginSchema, registerSchema } from "./auth.schema";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateReq(registerSchema),
  authController.register
);
authRouter.post("/login", validateReq(loginSchema), authController.login);

export default authRouter;
