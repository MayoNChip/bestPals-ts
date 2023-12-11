import { NextFunction, Request, RequestHandler, Response } from "express";
import { petService } from "./pets.service";
import { userService } from "../user/user.service";
import { IPet } from "./pets.schema";
import { TypedRequestHandler } from "../../utils/zodValidation";
import { ObjectId } from "mongodb";

const petFromParams: RequestHandler = (req, res, next) => {
	const petId = req.params.petId;
	req.pet = new ObjectId(petId);
	console.log("from params route", req.pet);
	next();
};
const getPets: RequestHandler = async (req, res, next) => {
	const petsListRes = await petService.getAll();

	console.log(petsListRes);
	res.send(petsListRes);
};

const getById: RequestHandler = async (req, res, next) => {
	const petId = req.pet;
	if (!petId) {
		throw new Error("No Pet ID provided");
	}
	const pet = await petService.getById(petId);

	res.send({ status: "Success", data: pet });
};

const addPet: TypedRequestHandler<{ body: IPet }> = async (req, res, next) => {
	try {
		const newPetId = await petService.addPet(req.body);
		res.send({ success: true, petId: newPetId });
	} catch (err) {
		next(err);
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
	const petId = req.pet;
	// const user = req.user;
	if (!petId) {
		throw new Error("No Pet ID provided");
	}
	console.log("from update pet", req.pet);
	try {
		const response = await petService.update(petId, req.body);
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

// const updatePetStatus: TypedRequestHandler<{
//   pet: IPet;
//   user: any;
//   body: { petStatus: string };
// }> = async (req, res, next) => {
//   const petId = req.pet._id;
//   const user = req.user;
//   const type = req.body?.petStatus;

//   if (type) {
//     try {
//       await userService.setPetToUser(user._id, type, petId);
//     } catch (error) {
//       next({ status: 201, msg: error });
//     }

//     // if (setPetToUserRes.success === false) {
//     //
//     //   return;
//     // }

//     /// update pet status to new status

//     const response = await petService.update(petId, req.body);

//     res.send({ success: true, updatedPet: response });
//   }
// };

// const deletePet: RequestHandler = (req, res) => {
//   const petId = new ObjectId(req.params.petId);
//   petService.deletePet(petId);
//   res.send(`Pet ${petId} Deleted`);
// };

const getPetsByFilter: TypedRequestHandler<{
	body: { operator: string; key: string; value: string }[];
}> = async (req, res) => {
	const body = req.body;
	console.log(body);
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

	body.map((query) => {
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
	// updatePetStatus,
	// updateCol,
	// getReqPet,
	getPetsByFilter,
};
