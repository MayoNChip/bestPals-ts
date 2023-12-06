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
const userService = require("../services/users.service");
const getPets = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const petsListRes = yield pets_service_1.petService.getAll(req.query);
    console.log(petsListRes);
    res.send(petsListRes);
});
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const petId = new mongodb_1.ObjectId(req.params.petId);
    const pet = yield pets_service_1.petService.getById(petId);
    res.send({ status: "Success", data: pet });
});
const addNew = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPetId = yield pets_service_1.petService.add(req.body);
        res.send({ success: true, petId: newPetId });
    }
    catch (err) {
        next({ success: false, Error: err });
    }
});
const changePetStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const petId = req.pet._id;
        const updatePetAdopted = yield pets_service_1.petService.updateCol(petId, "petStatus", "adopted");
        res.send(updatePetAdopted);
    }
    catch (error) {
        console.log("change pet status error", error);
    }
});
const updatePet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const petId = new mongodb_1.ObjectId(req.pet._id);
    const user = req.user;
    try {
        const response = yield pets_service_1.petService.update(petId, req.body);
        res.send({ succes: true, updatedPet: response });
    }
    catch (err) {
        console.log("update pet failed ", err);
    }
});
const updateCol = (req, res) => {
    const data = req.body;
    const petId = req.pet._id;
    pets_service_1.petService.updateCol(petId, data.key, data.value);
    res.send(`Pet ${data.key} updated!`);
};
const updatePetStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const petId = req.pet._id;
    const user = req.user;
    const type = req.body.petStatus;
    if (type) {
        const setPetToUserRes = yield userService.setPetToUser(user._id, type, petId);
        if (setPetToUserRes.success === false) {
            next({ status: 201, msg: setPetToUserRes.msg });
            return;
        }
        /// update pet status to new status
        const response = yield pets_service_1.petService.update(petId, req.body);
        res.send({ success: true, updatedPet: response });
    }
});
const deletePet = (req, res) => {
    const petId = new mongodb_1.ObjectId(req.params.petId);
    pets_service_1.petService.deletePet(petId);
    res.send(`Pet ${petId} Deleted`);
};
// const getPetsByFilter:Handler = async (req, res) => {
// 	const body = req.body;
// 	const fullQuery = {};
// 	let sorting = {};
// 	for (var query in body) {
// 		if (!body[query].value) {
// 			delete body[query];
// 		}
// 	}
// 	const getSort = (key: string) => {
// 		return key === "weight" ? { weight: -1 } : { height: -1 };
// 	};
// 	body.map((query : any) => {
// 		switch (query.operator) {
// 			case "eq":
// 				fullQuery[query.key] = { $eq: query.value };
// 				break;
// 			case "regex":
// 				fullQuery[query.key] = { $regex: query.value, $options: "i" };
// 				break;
// 			case "sort":
// 				sorting = { sorting: getSort(query.key) };
// 				break;
// 		}
// 	});
// 	// const sortedQuery = { ...fullQuery, ...sorting };
// 	const findRes = await petService.findByFilter(fullQuery, sorting);
// 	res.send(findRes);
// };
exports.petsController = {
    getPets,
    getById,
    addNew,
    updatePet,
    updateCol,
    deletePet,
    updatePetStatus,
    // getReqPet,
    changePetStatus,
    // getPetsByFilter,
};
