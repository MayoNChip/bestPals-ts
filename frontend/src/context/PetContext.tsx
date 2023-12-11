import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";

export type Pet = {
	_id: string;
	image: string;
	name: string;
	age: number;
	breed: string;
	breed2: string;
	color: string;
	height: number;
	weight: number;
	type: string;
	status: string;
	bio: string;
	hypoallergenic: string;
	diet: string;
};

// id={pet._id}
// image={pet.image}
// name={pet.name}
// age={pet.age}
// breed={pet.breed}
// breed2={pet.breed2}
// color={pet.color}
// height={pet.height}
// weight={pet.weight}
// type={pet.petType}
// status={pet.petStatus}
// bio={pet.petBio}
// hypoallergenic={pet.hypoallergenic}
// diet={pet.diet}

type PetContextProps = {
	pets: Pet[];
	setPets: Dispatch<SetStateAction<Pet[]>>;
	isSelected: string;
	setIsSelected: (isSelected: string) => void;
	petDetails: Pet | null;
	setPetDetails: (pet: Pet) => void;
	isUpdated: boolean;
	setIsUpdated: (isUpdated: boolean) => void;
	petBreedsList: any;
	setPetBreedsList: (petBreedsList: any) => void;
	isLoading: boolean;
	setIsLoading: (isLoading: boolean) => void;
	// userData: User;
};

export const PetContext = React.createContext<PetContextProps>(
	{} as PetContextProps
);

// const PetProvider = PetContext.Provider;

export const PetProvider = ({ children }: { children: ReactNode }) => {
	const [pets, setPets] = useState<Pet[]>([]);
	const [isSelected, setIsSelected] = useState("mypets");
	const [isLoading, setIsLoading] = useState(false);
	const [petDetails, setPetDetails] = useState<Pet | null>(null);
	// const { isLoggedIn, setIsLoggedIn, userData } = useContext(userContext);
	const [petBreedsList, setPetBreedsList] = useState();
	const [isUpdated, setIsUpdated] = useState(false);
	// const [petType, setPetType] = useState();
	const [petsList, setPetsList] = useState();
	// const { getPets } = usePets();

	// useEffect(() => {
	//   const getAllPets = async () => {
	//     try {
	//       const allPets = await getPets();
	//       setPetsList(allPets);
	//     } catch (error) {
	//       console.log("cant get all pets ==>", error);
	//     }
	//   };
	//   getAllPets();
	// }, [isLoggedIn]);
	// useEffect(() => {
	//   const getAllPets = async () => {
	//     try {
	//       const allPets = await getPets();
	//       setPetsList(allPets);
	//     } catch (error) {
	//       console.log("cant get all pets ==>", error);
	//     }
	//   };
	//   getAllPets();
	// }, []);

	return (
		<PetContext.Provider
			value={{
				pets,
				setPets,
				isSelected,
				setIsSelected,
				petDetails,
				setPetDetails,
				isUpdated,
				setIsUpdated,
				petBreedsList,
				setPetBreedsList,
				isLoading,
				setIsLoading,
				// userData,
			}}
		>
			{children}
		</PetContext.Provider>
	);
};

export default PetContext;
