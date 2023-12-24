// import express
import express from "express";
import { userController } from "./user.controller";
import { authValidate } from "../auth/auth.middleware";
import { validateReq } from "../../utils/zodValidation";
import { z } from "zod";
//create userRouter
const userRouter = express.Router();

userRouter.use(authValidate);

userRouter.param("userId", userController.userFromParams);

userRouter.get("/", userController.getUsers);

userRouter.get("/me", userController.getMe);

userRouter.get("/mypets/", userController.getMyPets);

userRouter.get("/:userId", userController.getById);

userRouter.get("/userPets/:userId", userController.getPetsByUser);

userRouter.post(
  "/",
  // validateReq(authRegisterSchema),
  userController.addNew
);

userRouter.put("/", userController.updatePassword);

userRouter.put("/:userId", userController.update);

userRouter.put("/savepet/:petId", userController.addSavedPet);

userRouter.patch("/:userId", userController.setPetToUser);

// userRouter.patch(
//   "/:userId",
//   validateReq(z.object({ key: z.string(), value: z.string() })),
//   userController.updateCol
// );

userRouter.delete("/:userId", userController.deleteUser);

export { userRouter };
