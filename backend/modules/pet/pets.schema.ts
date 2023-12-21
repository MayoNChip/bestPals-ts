import { z } from "zod";
import { ObjectIdSchema } from "../../utils/zodValidation";
import { ObjectId } from "mongodb";
import userSchema from "../user/user.schema";

const PetSchema = z.object({
	_id: z.custom<ObjectId>().nullable(),
	type: z.string(),
	age: z.string(),
	breed: z.string(),
	status: z.enum(["adopted", "fostered", "not-adopted"]),
	height: z.number(),
	weight: z.number(),
	color: z.string(),
	bio: z.string().nullable(),
	name: z.string(),
	diet: z.string().nullable(),
	image: z.string().nullable(),
	hypoallergenic: z.boolean(),
});

export const updatePetReqSchema = z.object({
	pet: PetSchema,
	user: userSchema,
	body: z.object({
		status: z.string(),
	}),
});

export const PetParamsSchema = z.object({
	petId: ObjectIdSchema,
});

export type IPet = z.infer<typeof PetSchema>;
export default PetSchema;
