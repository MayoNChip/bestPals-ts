import { NextFunction, Request, RequestHandler, Response } from "express";
import { petService } from "./pets.service";
import { userService } from "../user/user.service";
import { IPet } from "./pets.schema";
import { TypedRequestHandler } from "../../utils/zodValidation";
import { ObjectId } from "mongodb";
import uploadService from "../upload/upload.service";
import { IUser } from "../user/user.schema";

const petFromParams: RequestHandler = async (req, res, next) => {
	const petId = req.params.petId;
	const pet = await petService.getById(new ObjectId(petId));
	if (!pet) {
		next();
	}
	req.pet = pet.toObject();
	next();
};
const getPets: RequestHandler = async (req, res, next) => {
	const petsListRes = await petService.getAll();

	res.send(petsListRes);
};

const getById: RequestHandler = async (req, res, next) => {
	const pet = req.pet;
	if (!pet) {
		throw new Error("No Pet ID provided");
	}

	res.send({ success: true, data: pet });
};

const addPet: TypedRequestHandler<{ body: IPet }> = async (req, res, next) => {
	try {
		if (!req.body.image) {
			next("Please provide an image");
			return;
		}
		const imageUrl = await uploadService.uploadPetImage(req.body.image);
		if (!imageUrl) {
			next("Something went wrong while uploading image");
			return;
		}
		const petWithImageURL = { ...req.body, image: imageUrl?.secure_url };
		const newPetId = await petService.addPet(petWithImageURL);
		res.send({ success: true, data: newPetId });
	} catch (error) {
		if (error instanceof Error) {
			next(error);
		}
	}
};

// const changePetStatus: TypedRequestHandler<{ pet: IPet; user: any }> = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const petId = req.pet._id;
//     const updatePetAdopted = await petService.updateCol(
//       petId,
//       "petStatus",
//       "adopted"
//     );

//     res.send(updatePetAdopted);
//   } catch (error) {
//     console.log("change pet status error", error);
//   }
// };

const updatePet: TypedRequestHandler<{
	body: IPet;
	// user: any;
	params: { petId: IPet["_id"] };
}> = async (req, res, next) => {
	const pet = req.pet;
	// const user = req.user;
	if (!pet?._id) {
		throw new Error("No Pet ID provided");
	}
	try {
		const response = await petService.update(pet._id, req.body);
		res.send({ succes: true, updatedPet: response });
	} catch (err) {
		if (err instanceof Error) {
			next(err);
		}
	}
};

// const updateCol: TypedRequestHandler<{
//   body: { key: string; value: string };
//   pet: IPet;
//   user: any;
// }> = (req, res) => {
//   const data = req.body;
//   const petId = req.pet._id;
//   petService.updateCol(petId, data.key, data.value);
//   res.send(`Pet ${data.key} updated!`);
// };

const updatePetStatus: TypedRequestHandler<{
	pet?: IPet;
	user?: IUser;
	body: { status: "adopted" | "fostered" | "not-adopted" };
}> = async (req, res, next) => {
	const pet = req.pet;
	if (!pet?._id) {
		next("Could not find pet with given ID");
		return;
	}
	const user = req.user;
	const update = req.body;
	// TODO: set pet to user

	// TODO: update pet status to new status

	const response = await petService.update(pet._id, update);

	res.send({ success: true, updatedPet: response });
};

// const deletePet: RequestHandler = (req, res) => {
//   const petId = new ObjectId(req.params.petId);
//   petService.deletePet(petId);
//   res.send(`Pet ${petId} Deleted`);
// };

const getPetsByFilter: TypedRequestHandler<{
	body: { operator: string; key: string; value: string }[];
}> = async (req, res) => {
	const body = req.body;
	const fullQuery: { [key: string]: any } = {};
	let sorting: { weight: -1 | 1; height: -1 | 1 } | {} = {};

	for (let query in body) {
		if (!body[query].value) {
			delete body[query];
		}
	}

	const getSort = (key: string) => {
		return key === "weight" ? { weight: -1 } : { height: -1 };
	};

	body.map((query: { operator: string; key: string; value: string }) => {
		switch (query.operator) {
			case "eq":
				fullQuery[query.key] = { $eq: query.value };
				break;
			case "regex":
				fullQuery[query.key] = { $regex: query.value, $options: "i" };
				break;
			case "sort":
				sorting = { sorting: getSort(query.key) };
				break;
		}
	});

	// const sortedQuery = { ...fullQuery, ...sorting };

	const findRes = await petService.findByFilter(fullQuery, sorting);

	res.send(findRes);
};

export const petsController = {
	getPets,
	getById,
	petFromParams,
	addPet,
	updatePet,
	// changePetStatus,
	// deletePet,
	updatePetStatus,
	// updateCol,
	// getReqPet,
	getPetsByFilter,
};
