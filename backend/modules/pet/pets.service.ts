import { ObjectId } from "mongodb";
import { IPet } from "./pets.schema";
import PetDB from "../pet/pets.model";
import UserDB from "../user/user.model";
import { nextTick } from "process";
import { Error } from "mongoose";
import { v4 as uuidv4 } from "uuid";

// const petDB = PetDB.collection;

const getAll = async () => {
	try {
		// if (filter) {
		//   const getPetByFilter = await PetsDB.find(filter);
		//   if (getPetByFilter.length === 0) {
		//     // { success: false, message: "no pets found by this filter" };
		//     return await PetsDB.find();
		//   }
		//   return { success: true, message: getPetByFilter };
		// }
		const pets = await PetDB.find().lean();
		return pets;
	} catch (err) {
		return err;
	}
};

const getById = async (id: ObjectId) => {
	try {
		const pet = await PetDB.findById({
			_id: id,
		});
		if (!pet) {
			throw new Error("Pet not found");
		}
		return pet;
	} catch (err) {
		throw new Error("Pet not found");
	}
};

const addPet = async (petObj: IPet) => {
	const newPet = {
		...petObj,
		lcName: petObj.name?.toLowerCase(),
	};
	try {
		const pet = await PetDB.create(newPet);

		// const newPet = await pet.save();
		return pet;
	} catch (err) {
		if (err instanceof Error) {
			throw new Error(err.message);
		}
	}
};

const update = async (id: ObjectId, update: { status: IPet["status"] }) => {
	try {
		const updatedPet = await PetDB.findByIdAndUpdate(id, update, { new: true });
		return updatedPet;
	} catch (err) {
		if (err instanceof Error) {
			throw new Error(err.message);
		}
	}
};

// const updateCol = async (id: ObjectId, key: string, value: string) => {
//   try {
//     const newKey = { key: value };
//     const newPet = await petDB.updateOne({ _id: id }, { $set: newKey });
//     return newPet;
//   } catch (err) {
//     console.log("update key of pet Error =>", err);
//     return err;
//   }
// };

// const deleteUser = (id: ObjectId) => {
//   console.log("delete user");
//   // users.delete(id);
// };
// const deletePet = (id: ObjectId) => {
//   petDB.deleteOne({ _id: id });
// };

// const findByEmail = async (email: string) => {
//   try {
//     const user = await UserDB.find({ email });
//     return user;
//   } catch (err) {
//     console.log("login DB error ==>", err);
//     return err;
//   }
// };

const findByFilter = async (
	query: any,
	sorting: { weight: -1 | 1; height: -1 | 1 } | {}
) => {
	const test = { type: { $eq: "dog" } };
	const sort = { weight: -1 };
	const getPetByFilter = await PetDB.find(query).sort({
		weight: -1,
	});
	console.log(" getPetByFilter", getPetByFilter);
	if (getPetByFilter.length === 0) {
		return { success: false, message: "No pets found by this filter" };
	}
	return { success: true, message: getPetByFilter };
};

export const petService = {
	getAll,
	addPet,
	getById,
	update,
	// updateCol,
	// deleteUser,
	// findByEmail,
	// deletePet,
	// getPetsByUser,
	findByFilter,
};
