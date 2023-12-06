import { z } from "zod";
import { ObjectIdSchema } from "../../utils/zodValidation";

const PetSchema = z.object({
  _id: ObjectIdSchema,
  petType: z.string(),
  breed: z.string(),
  petStatus: z.string(),
  height: z.number(),
  weight: z.number(),
  color: z.string(),
  petBio: z.string(),
  name: z.string(),
  diet: z.string(),
  hypoallergenic: z.boolean(),
});

export const PetParamsSchema = z.object({
  petId: ObjectIdSchema,
});
export type IPet = z.infer<typeof PetSchema>;
export default PetSchema;
