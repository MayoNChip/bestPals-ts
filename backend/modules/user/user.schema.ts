import { z } from "zod";
import { ObjectIdSchema } from "../../utils/zodValidation";

const userSchema = z.object({
  _id: ObjectIdSchema,
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().min(1),
  password: z.string().nullish(),
  phoneNumber: z.string(),
  userAdded: z.date(),
  image: z.string(),
  savedPets: z.array(z.string()),
  fosteredPets: z.array(z.string()),
  adoptedPets: z.array(z.string()),
});

export default userSchema;

export type IUser = z.infer<typeof userSchema>;
