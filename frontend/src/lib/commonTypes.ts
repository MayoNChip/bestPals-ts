import { Pet } from "../context/PetContext";

export type PetResponseType =
	| { success: true; data: Pet }
	| { success: false; message: string };
