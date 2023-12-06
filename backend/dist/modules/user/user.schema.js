"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const zodValidation_1 = require("../../utils/zodValidation");
const userSchema = zod_1.z.object({
    _id: zodValidation_1.ObjectIdSchema,
    firstName: zod_1.z.string().min(1),
    lastName: zod_1.z.string().min(1),
    email: zod_1.z.string().min(1),
    password: zod_1.z.string().nullish(),
    phoneNumber: zod_1.z.string(),
    userAdded: zod_1.z.date(),
    image: zod_1.z.string(),
    savedPets: zod_1.z.array(zod_1.z.string()),
    fosteredPets: zod_1.z.array(zod_1.z.string()),
    adoptedPets: zod_1.z.array(zod_1.z.string()),
});
exports.default = userSchema;
