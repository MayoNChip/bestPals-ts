import { ObjectId } from "mongodb";
import UserDB from "./user.model";
import { IUser } from "./user.schema";
import { RegisterSchema } from "../auth/auth.schema";
import { authService } from "../auth/auth.service";
import PetDB from "../pet/pets.model";
import mongoose from "mongoose";
import PermissionDB from "../permission/permission.model";

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

	const { _id } = user;

	try {
		await PermissionDB.create({
			userId: _id,
			permission: 0,
		});
	} catch (error) {
		console.log("add user permissions error", error);
	}
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
	const updateObj = { [key]: value };
	try {
		const doc = await UserDB.findOne({ _id: id });

		let res;
		if (doc?.adoptedPets.includes(value)) {
			res = await UserDB.findByIdAndUpdate(
				id,
				{ $pull: { adoptedPets: value } },
				{ new: true }
			);
		} else if (doc?.fosteredPets.includes(value)) {
			res = await UserDB.findByIdAndUpdate(
				id,
				{ $pull: { fosteredPets: value } },
				{ new: true }
			);
		}
		if (doc?.savedPets.includes(value)) {
			res = await UserDB.findByIdAndUpdate(
				id,
				{ $pull: { savedPets: value } },
				{ new: true }
			);
		}

		res = await UserDB.findByIdAndUpdate(
			{ _id: id },
			{ [key]: value },
			{ upsert: true, new: true }
		);
		return res;
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
	type: "fosteredPets" | "adoptedPets" | "returnPets",
	petId: string
) => {
	try {
		const user = await UserDB.findById(userId);
		if (!user?._id) {
			throw new Error("user not found");
		}

		if (type === "returnPets") {
			const user = UserDB.findOneAndUpdate(
				{ _id: userId },
				{
					$pull: { fosteredPets: petId },
				},
				{ new: true }
			);

			return user;
		}

		const arrayField = user[type] as mongoose.Types.Array<string>;
		console.log("arrayField", arrayField, user[type]);

		if (arrayField.includes(petId)) {
			arrayField.pull(petId);
		} else {
			arrayField.push(petId);
		}
		const newUser = await user.save();
		console.log(newUser, "newUser");
		return newUser;
	} catch (err) {
		if (err instanceof Error) {
			throw new Error(err.message);
		}
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
