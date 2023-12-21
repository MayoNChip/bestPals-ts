//Local Backend URL
const CONFIG: { [key: string]: string } = {};

CONFIG.SERVER_BASE_URL = "http://localhost:4000/";

//The dog API base URL
CONFIG.DOG_API_BREEDS_URL = "https://api.thedogapi.com/v1/breeds";
CONFIG.DOG_API_KEY = "cc1b4b04-97c4-4811-b4ca-721a0342abec";
CONFIG.CAT_API_BREEDS_URL = "https://api.thecatapi.com/v1/breeds";
CONFIG.DOG_API_KEY = "0aa7e8f4-9606-4ef1-b2b9-68c722bfdbf1";

type Size = {
	imperial: string;
	metric: string;
};

export type DogBreed = {
	weight: Size;
	height: Size;
	id: number;
	name: string;
	bred_for?: string;
	breed_group?: string;
	life_span: string;
	temperament: string;
	origin?: string;
	country_code?: string;
	reference_image_id: string;
	description?: string;
	history?: string;
};

export type DogBreedsArray = DogBreed[];

export default CONFIG;
