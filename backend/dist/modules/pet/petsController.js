"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.petsController = void 0;
const pets_service_1 = require("./pets.service");
const mongodb_1 = require("mongodb");
const petFromParams = (req, res, next) => {
    const petId = req.params.petId;
    req.pet = new mongodb_1.ObjectId(petId);
    console.log("from params route", req.pet);
    next();
};
const getPets = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const petsListRes = yield pets_service_1.petService.getAll();
    console.log(petsListRes);
    res.send(petsListRes);
});
const getById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const petId = req.pet;
    if (!petId) {
        throw new Error("No Pet ID provided");
    }
    const pet = yield pets_service_1.petService.getById(petId);
    res.send({ status: "Success", data: pet });
});
const addPet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPetId = yield pets_service_1.petService.addPet(req.body);
        res.send({ success: true, petId: newPetId });
    }
    catch (err) {
        next(err);
    }
});
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
const updatePet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const petId = req.pet;
    // const user = req.user;
    if (!petId) {
        throw new Error("No Pet ID provided");
    }
    console.log("from update pet", req.pet);
    try {
        const response = yield pets_service_1.petService.update(petId, req.body);
        res.send({ succes: true, updatedPet: response });
    }
    catch (err) {
        if (err instanceof Error) {
            next(err);
        }
    }
});
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
// // const getPetsByFilter:Handler = async (req, res) => {
// // 	const body = req.body;
// // 	const fullQuery = {};
// // 	let sorting = {};
// // 	for (var query in body) {
// // 		if (!body[query].value) {
// // 			delete body[query];
// // 		}
// // 	}
// // 	const getSort = (key: string) => {
// // 		return key === "weight" ? { weight: -1 } : { height: -1 };
// // 	};
// // 	body.map((query : any) => {
// // 		switch (query.operator) {
// // 			case "eq":
// // 				fullQuery[query.key] = { $eq: query.value };
// // 				break;
// // 			case "regex":
// // 				fullQuery[query.key] = { $regex: query.value, $options: "i" };
// // 				break;
// // 			case "sort":
// // 				sorting = { sorting: getSort(query.key) };
// // 				break;
// // 		}
// // 	});
// // 	// const sortedQuery = { ...fullQuery, ...sorting };
// // 	const findRes = await petService.findByFilter(fullQuery, sorting);
// // 	res.send(findRes);
// // };
exports.petsController = {
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
    // getPetsByFilter,
};
