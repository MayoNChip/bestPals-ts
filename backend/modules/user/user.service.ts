import { ObjectId } from "mongodb";
import UserDB from "./user.model";
import { IUser } from "./user.schema";
import { RegisterSchema } from "../auth/auth.schema";
import { authService } from "../auth/auth.service";
import PetDB from "../pet/pets.model";

// const UserDB = mongoose.model("User", userModel);
// const setPetToUser = async (id: ObjectId, type: string, petId: ObjectId) => {
//   try {
//     return await UserDB.updateOne(
//       { _id: id },
//       { $push: { pets: { type, petId } } }
//     );
//   } catch (error) {
//     console.log(error);
//     throw new Error("can't update user");
//   }
// };

const getAll = async () => {
  try {
    const users = await UserDB.find();
    return users;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
};

const getById = async (id: ObjectId) => {
  try {
    const user = await UserDB.findOne({ _id: id });
    return user;
  } catch (err) {
    throw new Error("user not found");
  }
};

const createNewUser = async (userObj: Omit<RegisterSchema, "repassword">) => {
  const newUser = { ...userObj };
  const user = await UserDB.create(newUser);

  //   try {
  //     const permission = new permissionDB({
  //       userId: newUser._id,
  //       permission: ROLES.USER,
  //       _id: uuidv4(),
  //     });
  //     const res = await permission.save();
  //   } catch (err) {
  //     console.log("add user permissions error", err);
  //     return err;
  //   }
  return user;
};

const updateUser = async (id: ObjectId, user: IUser) => {
  try {
    const updatedUser = await UserDB.findByIdAndUpdate(
      { _id: id },
      { $set: user }
    );
    return updatedUser;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

const updateCol = async (id: ObjectId, key: string, value: string) => {
  const updateObj = { key: value };
  try {
    const response = await UserDB.updateOne(
      { _id: id },
      { $set: { key: value } }
    );
  } catch (error) {}
};

const deleteUser = async (id: ObjectId) => {
  await UserDB.findOneAndDelete({ _id: id });
};

const findByEmail = async (email: string) => {
  try {
    const user = await UserDB.findOne({ email });
    return user?.toObject();
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
};

const setPetToUser = async (
  userId: ObjectId,
  type: "fostered" | "adopted" | "not-adopted",
  petId: ObjectId
) => {
  try {
    switch (type) {
      case "fostered":
        const checkFosteredPets = await UserDB.findOne({
          _id: userId,
          fosteredPets: petId,
        });
        if (checkFosteredPets) {
          throw new Error("pet already fostered by this user");
          // const ownerId = checkFosteredPets[0]._id;
          // const removeFoseredPet = await UserDB.updateOne(
          //   { _id: ownerId },
          //   { $pull: { fosteredPets: petId } }
          // );
        }
        const fosteredResponse = await UserDB.findOneAndUpdate(
          { _id: userId },
          { fosteredPets: { $push: petId } }
        );
        return fosteredResponse;
      case "adopted":
        const checkFostered = await UserDB.find({
          fosteredPets: petId,
        });
      // if (checkFostered) {
      //   const ownerId = checkFostered[0]._id;
      //   const removeFoseredPet = await UserDB.updateOne(
      //     { _id: ownerId },
      //     { $pull: { fosteredPets: petId } }
      //   );
      // }
      // const adoptedResponse = await UserDB.findOneAndUpdate(
      //   { _id: userId },
      //   { $push: { adoptedPets: petId } },
      //   { new: true }
      // );
      // return adoptedResponse;
      //   case "not-adopted":
      //     const isFosteredOrAdoptedResponse = await UserDB.find({
      //       $or: [{ fosteredPets: petId }, { adoptedPets: petId }],
      //     });
      //     if (isFosteredOrAdoptedResponse[0].fosteredPets !== 0) {
      //       const ownerId = isFosteredOrAdoptedResponse[0]._id;
      //       if (isFosteredOrAdoptedResponse[0].fosteredPets !== 0) {
      //         const removePetFromUser = await UserDB.updateOne(
      //           { _id: ownerId },
      //           { $pull: { fosteredPets: petId } }
      //         );
      //       }
      //       if (isFosteredOrAdoptedResponse[0].adoptedPets !== 0) {
      //         const removePetFromUser = await UserDB.updateOne(
      //           { _id: ownerId },
      //           { $pull: { adoptedPets: petId } }
      //         );
      //       }
      //     }
      //     return isFosteredOrAdoptedResponse;
    }
  } catch (error) {
    return error;
  }
};

const updateSavedPets = async (userId: ObjectId, petId: ObjectId) => {
  try {
    const user = await UserDB.find({ _id: userId, savedPets: petId });
    if (user.length !== 0) {
      const removeSavedPetRes = await UserDB.findOneAndUpdate(
        { _id: userId, savedPets: petId },
        { $pull: { savedPets: petId } },
        { new: true }
      );
      return { success: true, data: removeSavedPetRes };
    }
    const addSavedPetRes = await UserDB.findOneAndUpdate(
      { _id: userId },
      { $push: { savedPets: petId } },
      { new: true }
    );
    return { success: true, data: addSavedPetRes };
  } catch (error) {
    return { success: false, error };
  }
};

const changePassword = async (
  userId: ObjectId,
  newPassOBJ: { oldPassword: string; newPassword: string }
) => {
  try {
    const user = await UserDB.find({ _id: userId });
    // const hashedOldPassword = authService.generateHash(newPassOBJ.oldPassword);
    const valid = authService.validateLogin(
      newPassOBJ.oldPassword,
      user[0]?.password
    );

    if (!valid) {
      throw new Error("Current password is incorrect");
    }
    const hashedNewPassword = authService.generateHash(newPassOBJ.newPassword);
    const updatePassword = await UserDB.findOneAndUpdate(
      { _id: userId },
      { password: hashedNewPassword },
      { new: true }
    );
    return true;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

const getMyPets = async (userId: ObjectId) => {
  try {
    const userPets = await UserDB.findOne({ _id: userId });
    if (!userPets) {
      throw new Error("User not found");
    }
    const fosteredAndAdoptedPetsArray = [];
    fosteredAndAdoptedPetsArray.push(
      ...userPets.fosteredPets,
      ...userPets.adoptedPets
    );
    const adoptedFosteredPets = await PetDB.find({
      _id: { $in: fosteredAndAdoptedPetsArray },
    });

    const savedPetsArray = [];
    savedPetsArray.push(...userPets.savedPets);

    const savedPetByUser = await PetDB.find({
      _id: { $in: savedPetsArray },
    });

    const allUserPets = {
      adoptedFosteredPets: adoptedFosteredPets,
      savedPets: savedPetByUser,
    };
    return allUserPets;
  } catch (err) {
    return err;
  }
};

export const userService = {
  setPetToUser,
  getAll,
  getById,
  findByEmail,
  createNewUser,
  updateUser,
  updateCol,
  deleteUser,
  updateSavedPets,
  changePassword,
  getMyPets,
};
