// import { createBreakpoints } from "@chakra-ui/theme-tools";
import axios from "axios";
import localforage from "localforage";
import { useContext } from "react";
import PetContext, { Pet } from "../context/PetContext";
import CustomToast from "../utils/CustomToast";
import AuthContext, { User } from "../context/AuthContext";

function useUsers() {
  const {
    setUsers,
    setIsOwnedByUser,
    userData,
    setSelectedUser,
    setAllUserPets,
    setUserData,
    setUserPets,
    isOwnedByUser,
  } = useContext(AuthContext);
  const { setPets } = useContext(PetContext);
  const { successToast, errorToast } = CustomToast();

  const getUsers = async () => {
    const ACCESS_TOKEN = await localforage.getItem("ACCESS_TOKEN");
    const Headers = {
      Authorization: ACCESS_TOKEN,
    } as { Authorization: string | null };
    try {
      const usersList = await axios.get<User[]>(
        "http://localhost:4000/users/",
        {
          headers: Headers,
        }
      );
      if (usersList) {
        setUsers(usersList.data);
        return usersList.data;
      }
    } catch (err) {
      console.log("could not get users with error", err);
    }
  };

  const isOwner = async (petId: string) => {
    const isAdopted = userData?.adoptedPets?.filter(
      (adoptedPetId) => adoptedPetId === petId
    );
    const isFostered = userData?.fosteredPets?.filter(
      (fosteredPetId) => fosteredPetId === petId
    );
    const isSaved = userData?.savedPets?.filter(
      (savedPetId) => savedPetId === petId
    );

    // let userPets = [];
    console.log(isAdopted);
    if (isAdopted?.length !== 0) {
      // const newArray = isAdopted?.filter((petId) => petId);
      // if (newArray?.length !== 0) {
      setIsOwnedByUser((prev) => ({
        ...prev,
        adopted: [...prev.adopted, petId],
      }));
      // } else {
      // 	setIsOwnedByUser((prev) => ({ ...prev, adotped: false }));
      // }
    }
    if (isFostered?.length !== 0) {
      // const newArray = isFostered?.filter((petId: string) => petId);
      // if (newArray.length !== 0) {
      setIsOwnedByUser((cur) => ({
        ...cur,
        fostered: [...cur.fostered, petId],
      }));
      // } else {
      //   await setIsOwnedByUser((cur) => ({ ...cur, fostered: false }));
      // }
    }

    if (isSaved?.length !== 0) {
      // const newArray = isSaved?.filter((petId) => petId);
      // if (newArray?.length !== 0) {
      setIsOwnedByUser((cur) => ({
        ...cur,
        saved: [...cur.saved, petId],
      }));
      // } else {
      // 	setIsOwnedByUser((cur) => ({
      // 		...cur,
      // 		saved: [...cur.saved, petId],
      // 	}));
      // }
    }
  };

  const getUserInfo = async (userId: any) => {
    const ACCESS_TOKEN = await localforage.getItem("ACCESS_TOKEN");
    const Headers = {
      Authorization: ACCESS_TOKEN as string,
    };
    try {
      const userRes = await axios.get(`http://localhost:4000/users/${userId}`, {
        headers: Headers,
      });
      setSelectedUser(userRes.data.data);
      return userRes.data.data;
    } catch (error) {
      console.error("get user by Id useUsers ERROR", error);
    }
  };

  const getMyPets = async (selected: "mypets" | "savedpets") => {
    const ACCESS_TOKEN = await localforage.getItem<string | null>(
      "ACCESS_TOKEN"
    );
    const headers = {
      Authorization: ACCESS_TOKEN,
    };
    console.log(ACCESS_TOKEN);
    try {
      const petsResponse = await axios.get<{
        success: boolean;
        data: Record<string | "adoptedFosteredPets" | "savedPets", Pet[]>;
      }>("http://localhost:4000/users/mypets", { headers });
      if (!petsResponse?.data.success) {
        return { success: false, msg: "No pets found" };
      }
      // selected === "mypets"
      // 	? setPets(petsResponse.data.data.adoptedFosteredPets)
      // 	: setPets(petsResponse.data.data.savedPets);

      switch (selected) {
        case "mypets":
          setPets(petsResponse.data.data.adoptedFosteredPets);
          setAllUserPets(petsResponse.data.data.adoptedFosteredPets);
          return {
            success: true,
            msg: petsResponse.data.data.adoptedFosteredPets,
          };
          break;
        case "savedpets":
          setPets(petsResponse.data.data.savedPets);
          setAllUserPets(petsResponse.data.data.savedPets);
          return { success: true, msg: petsResponse.data.data.savedPets };
          break;
      }

      // setAllUserPets(
      // 	petsResponse.data.data?.adoptedFosteredPets ||
      // 		petsResponse.data.data?.savedPets ||
      // 		[]
      // );
      return { success: true, msg: petsResponse.data.data };
    } catch (error) {
      console.log("get pets of user error", error);
      return { success: false, msg: error };
    }
  };

  const getUserPets = async (userId: string) => {
    try {
      const ACCESS_TOKEN = await localforage.getItem<string | null>(
        "ACCESS_TOKEN"
      );
      const Headers = {
        Authorization: ACCESS_TOKEN,
      };
      const petsRes = await axios.get(
        `http://localhost:4000/users/userPets/${userId}`,
        { headers: Headers }
      );
      setUserPets(petsRes.data.data);
    } catch (error: any) {
      console.log("get user pets error", error);
      errorToast("Error accured", `${error.message}`);
    }
  };

  const updateUser = async (user: User) => {
    const ACCESS_TOKEN = await localforage.getItem<string | null>(
      "ACCESS_TOKEN"
    );
    const Headers = {
      Authorization: ACCESS_TOKEN,
    };
    try {
      const updateRes = await axios.put(
        `http://localhost:4000/users/${user._id}`,
        user,
        { headers: Headers }
      );
      setSelectedUser(updateRes.data);
    } catch (error) {
      console.log("user update error", error);
    }
  };

  const changePassword = async (passwordsOBJ: any, onClose: any) => {
    const ACCESS_TOKEN = await localforage.getItem<string | null>(
      "ACCESS_TOKEN"
    );
    const Headers = {
      Authorization: ACCESS_TOKEN,
    };
    try {
      const newPassword = {
        oldPassword: passwordsOBJ.oldPassword,
        newPassword: passwordsOBJ.newPassword,
      };
      const passChangeRes = await axios.put(
        "http://localhost:4000/users/",
        newPassword,
        { headers: Headers }
      );
      if (passChangeRes.data.error) {
        errorToast("Error", `${passChangeRes.data.message}`);
        return;
      }
      successToast("Awesome", "Password changed successfuly");
      onClose();
    } catch (error) {}
  };

  const updateSavedPets = async (petId: string) => {
    try {
      const ACCESS_TOKEN = await localforage.getItem<string | null>(
        "ACCESS_TOKEN"
      );
      const headers = {
        Authorization: ACCESS_TOKEN,
      };
      const savePetRes = await axios.put(
        `http://localhost:4000/users/savepet/${petId}`,
        {},
        { headers }
      );
      setUserData(savePetRes.data.data);
      setIsOwnedByUser((prev) => ({ ...prev, saved: [...prev.saved, petId] }));
      return savePetRes;
    } catch (error) {
      console.log("save pet error", error);
    }
  };

  const updateOwnedPets = async (
    petId: string,
    status: Pet["status"] | "saved",
    userId: string
  ) => {
    const ACCESS_TOKEN = await localforage.getItem<string | null>(
      "ACCESS_TOKEN"
    );
    const headers = {
      Authorization: ACCESS_TOKEN,
    };
    switch (status) {
      case "adopted":
        setIsOwnedByUser((prev) => ({
          ...prev,
          adoptedPets: [...prev.adopted, petId],
        }));
        break;
      case "fostered":
        setIsOwnedByUser((prev) => ({
          ...prev,
          fosteredPets: [...prev.fostered, petId],
        }));
        break;
      case "not-adopted":
        setIsOwnedByUser((prev) => {
          return {
            ...prev,
            adopted: isOwnedByUser.adopted?.filter((id) => id !== petId),
            fostered: isOwnedByUser.fostered?.filter((id) => id !== petId),
          };
        });

      case "saved":
        if (isOwnedByUser.saved?.includes(petId)) {
          setIsOwnedByUser((prev) => ({
            ...prev,
            saved: isOwnedByUser.saved?.filter((id) => id !== petId),
          }));
        } else {
          setIsOwnedByUser((prev) => ({
            ...prev,
            saved: [...prev.saved, petId],
          }));
        }
        console.log("is owned by user", isOwnedByUser);
        break;
      default:
        break;
    }

    try {
      const savePetRes = await axios.patch(
        `http://localhost:4000/users/${userId}`,
        {
          type: (status === "not-adopted" ? "return" : status) + "Pets",
          petId,
        },
        { headers }
      );
      console.log("saved pet res", savePetRes);
    } catch (error) {
      console.log("update user pets status error", error);
      errorToast("Error", "Could not update user pets status");
    }
  };

  return {
    getUsers,
    isOwner,
    updateUser,
    getUserInfo,
    changePassword,
    updateSavedPets,
    getMyPets,
    getUserPets,
    updateOwnedPets,
  };
}

export default useUsers;
