import axios, { AxiosError } from "axios";
import localforage from "localforage";
import { useContext, useState } from "react";
import PetContext, { Pet } from "../context/PetContext";
import CustomToast from "../utils/CustomToast";
import { v4 as uuidv4 } from "uuid";
import CONFIG from "../utils/DogAPIConfig";

const baseURL =
  import.meta.env.REACT_APP_BACKEND_PROD_BASE_URL || "http://localhost:4000";

export default function usePets() {
  const {
    pets,
    setPets,
    setPetDetails,
    petDetails,
    setIsUpdated,
    petBreedsList,
    setPetBreedsList,
  } = useContext(PetContext);
  const [petImage, setPetImage] = useState();
  const [newPetId, setNewPetId] = useState();
  const [setPetsList] = useState();
  const [petType, setPetType] = useState();
  const { errorToast, successToast } = CustomToast();

  const imageUpload = async () => {
    const ACCESS_TOKEN = (await localforage.getItem("ACCESS_TOKEN")) as string;
    // const Headers  =  {
    // 	Authorization: ACCESS_TOKEN,
    // };
    const jsonImage = JSON.stringify({ data: petImage });
    try {
      // const response = await axios({
      // 	url: `${baseURL}/upload/pet/${newPetId}`,
      // 	method: "POST",
      // 	headers: {
      // 		"Content-Type": "application/json",
      // 		Authorization: ACCESS_TOKEN,
      // 	},
      // 	data: jsonImage,
      // });
      const response = await axios.post(
        `${baseURL}/upload/pet/${newPetId}`,
        jsonImage,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: ACCESS_TOKEN,
          },
        }
      );
      return response.data.imageUrl;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  const changBreedsList = async () => {
    const breedListRes = await getBreeds(petType);
    setPetBreedsList(breedListRes);
  };

  const addPet = async (values: any) => {
    values.hypoallergenic === "true"
      ? (values.hypoallergenic = true)
      : (values.hypoallergenic = false);
    const newPet = { _id: uuidv4(), ...values };
    const ACCESS_TOKEN = (await localforage.getItem("ACCESS_TOKEN")) as string;
    const Headers = {
      Authorization: ACCESS_TOKEN,
    };
    try {
      const response = await axios.post(`${baseURL}/pets/`, newPet, {
        headers: Headers,
      });
      console.log(response.data);
      setNewPetId(response.data);
      successToast(
        "Pet Added Succesfully!",
        "You can find the new pet in the search page!"
      );
      return response;
    } catch (err) {
      console.log("pet was not added with error", err);
    }
  };

  const getPets = async () => {
    const ACCESS_TOKEN = (await localforage.getItem("ACCESS_TOKEN")) as string;
    const headers = {
      Authorization: ACCESS_TOKEN,
    };
    try {
      const petList = await axios.get(`${baseURL}/pets/`, {
        headers,
      });
      if (petList.data.length > 0) {
        setPets(petList.data);
        return petList.data;
      }
      return petList.data.message;
    } catch (err) {
      console.log("could not get pets with error", err);
    }
  };

  const getBreeds = async (petType: any) => {
    try {
      const breedsList = await axios.get(
        `${
          petType === "dog"
            ? CONFIG.DOG_API_BREEDS_URL
            : CONFIG.CAT_API_BREEDS_URL
        }`,
        {
          headers: {
            "x-api-key": `${
              petType === "dog" ? CONFIG.DOG_API_KEY : CONFIG.CAT_API_KEY
            }`,
          },
        }
      );
      setPetBreedsList(breedsList.data);
      return breedsList.data;
    } catch (error) {
      console.log("pet breeds error", error);
    }
  };

  const getPetInfo = async (petId: any) => {
    try {
      const response = await axios.get<{ success: boolean; data: Pet }>(
        `${baseURL}/pets/${petId}`
      );
      console.log(response);
      if (response.status === 200) {
        setPetDetails(response.data.data);
        return response.data.data._id;
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        const error = err.response?.data.message;
        console.log("ERROR ==> ", error);

        errorToast("Oops, something went wrong", error);
      }
    }
  };

  const updatePet = async (newPet: any) => {
    const ACCESS_TOKEN = (await localforage.getItem("ACCESS_TOKEN")) as string;
    const headers = {
      Authorization: ACCESS_TOKEN,
    };
    if (!ACCESS_TOKEN) {
      errorToast("Error", "Please login first");
      return false;
    }
    const petId = petDetails?._id;

    try {
      const updateResponse = await axios.post(
        `${baseURL}/pets/status/${petId}`,
        newPet,
        { headers }
      );
      if (updateResponse.data.error) {
        errorToast("Error", updateResponse.data.message);
        return;
      }
      setPetDetails({ ...petDetails, ...newPet });
      setIsUpdated(true);
      return updateResponse.data;
    } catch (error) {
      console.log("updating pet error", error);
    }
  };

  const searchPet = async (filter: any) => {
    try {
      const searchRes = await axios.post(`${baseURL}/pets/search/`, filter);
      if (searchRes.data.success) {
        setPets(searchRes.data.message);

        successToast(
          "Success!",
          `search returned ${searchRes.data.message.length} results`
        );
      } else {
        successToast("Success!", `${searchRes.data.message}`);
        setPets([]);
      }
      return searchRes;
    } catch (error) {
      console.log("search pet error", error);
      errorToast("Error", "could not complete the search");
    }
  };

  return {
    pets,
    imageUpload,
    addPet,
    getPets,
    petImage,
    setPetImage,
    setPetsList,
    getPetInfo,
    getBreeds,
    setPetBreedsList,
    petBreedsList,
    petType,
    setPetType,
    updatePet,
    changBreedsList,
    searchPet,
  };
}
