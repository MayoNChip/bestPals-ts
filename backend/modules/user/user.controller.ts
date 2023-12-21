import { RequestHandler } from "express";
import { userService } from "./user.service";
import { ObjectId } from "mongodb";
import { TypedRequestHandler } from "../../utils/zodValidation";
import { petService } from "../pet/pets.service";

const getUsers: RequestHandler = async (req, res, next) => {
	try {
		const users = await userService.getAll();
		res.send(users);
	} catch (error) {
		if (error instanceof Error) {
			next(error.message);
		}
	}
};

const getById: RequestHandler = async (req, res) => {
	const user = await userService.getById(new ObjectId(req.params.userId));
	res.send({ success: true, data: user });
};

const getMe: RequestHandler = (req, res) => {
	const user = req.user;
	console.log("permission", user?.permission);
	delete user?.password;
	res.send(user);
};

const addNew: RequestHandler = async (req, res) => {
	const newUser = await userService.createNewUser(req.body);
	res.send(`New User Created': ${newUser._id}`);
};

const update: RequestHandler = async (req, res, next) => {
	const userId = new ObjectId(req.params.userId);
	try {
		const updateUserRes = await userService.updateUser(userId, req.body);
		if (!updateUserRes) {
			next("user not found");
		}
		res.send({ success: true, message: "user updated" });
	} catch (error) {
		if (error instanceof Error) {
			next({ success: false, error: error.message });
		}
	}
};

const updateCol: TypedRequestHandler<{
	body: { key: string; value: string };
}> = (req, res) => {
	const { key, value } = req.body;
	const userId = new ObjectId(req.params.userId);
	userService.updateCol(userId, key, value);
	res.send(`User ${key} updated!`);
};

const deleteUser: RequestHandler = (req, res) => {
	const userId = new ObjectId(req.params.userId);
	userService.deleteUser(userId);
	res.send(`User ${userId.toString()} Deleted`);
};

const updatePassword: TypedRequestHandler<{
	body: { newPassword: string; oldPassword: string };
}> = async (req, res, next) => {
	if (!req.user) {
		next("Please Login First");
		return;
	}
	const { newPassword, oldPassword } = req.body;
	try {
		const changePasswordRes = await userService.changePassword(
			req.user?._id,
			req.body
		);
		if (!changePasswordRes) {
			return next("Something went wrong");
		}
		res.send({
			success: true,
			message: "Password Updated",
		});
	} catch (error) {
		if (error instanceof Error) {
			next(error.message);
		}
	}
};

const addSavedPet: RequestHandler = async (req, res, next) => {
	const petId = new ObjectId(req.params.petId);
	const userId = new ObjectId(req.user?._id);
	console.log("userId", userId, "petId", petId);
	const addSavedPetRes = await userService.updateSavedPets(userId, petId);
	res.send(addSavedPetRes);
};

const getMyPets: RequestHandler = async (req, res) => {
	const userId = new ObjectId(req.user?._id);

	const petsResponse = await userService.getMyPets(userId);
	res.send({ success: true, data: petsResponse });
};

const getPetsByUser: RequestHandler = async (req, res, next) => {
	const userId = new ObjectId(req.params.userId);

	const user = await userService.getById(userId);

	if (!user) {
		return next("User not found");
	}
	//   const petArray = [
	//     ...user.adoptedPets,
	//     ...user.fosteredPets,
	//     ...user.savedPets,
	//   ];
	//   const fullPetArray = petArray.map(async (id) => {
	//     const pet = await petService.getById(new ObjectId(id));
	//     return pet;
	//   });
	let userPets = {};
	const fosteredPetsArray = user.fosteredPets.map(async (id) => {
		const pet = await petService.getById(new ObjectId(id));
		return pet;
	});

	const fosteredResult = await Promise.all(fosteredPetsArray);

	const adoptedPetsArray = user.adoptedPets.map(async (id) => {
		const pet = await petService.getById(new ObjectId(id));
		return pet;
	});

	const adoptedResult = await Promise.all(adoptedPetsArray);

	const savedPetsArray = user.savedPets.map(async (id) => {
		const pet = await petService.getById(new ObjectId(id));
		return pet;
	});

	const savedResult = await Promise.all(savedPetsArray);

	userPets = {
		fosteredPets: fosteredResult,
		adoptedPets: adoptedResult,
		savedPets: savedResult,
	};
	res.send({ success: true, data: userPets });
};

export const userController = {
	getUsers,
	getById,
	getMe,
	addNew,
	update,
	updateCol,
	deleteUser,
	updatePassword,
	addSavedPet,
	getMyPets,
	getPetsByUser,
};
