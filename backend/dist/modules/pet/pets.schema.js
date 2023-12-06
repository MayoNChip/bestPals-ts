"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetParamsSchema = void 0;
const zod_1 = require("zod");
const zodValidation_1 = require("../../utils/zodValidation");
const PetSchema = zod_1.z.object({
    _id: zodValidation_1.ObjectIdSchema,
    petType: zod_1.z.string(),
    breed: zod_1.z.string(),
    petStatus: zod_1.z.string(),
    height: zod_1.z.number(),
    weight: zod_1.z.number(),
    color: zod_1.z.string(),
    petBio: zod_1.z.string(),
    name: zod_1.z.string(),
    diet: zod_1.z.string(),
    hypoallergenic: zod_1.z.boolean(),
});
exports.PetParamsSchema = zod_1.z.object({
    petId: zodValidation_1.ObjectIdSchema,
});
exports.default = PetSchema;
