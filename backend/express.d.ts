import { ObjectId } from "mongodb";
import { IPet } from "./modules/pet/pets.schema";
import { IUser } from "./modules/user/user.schema";

declare global {
	namespace Express {
		export interface Request {
			user?: IUser;
			pet?: IPet;
		}
	}
}
