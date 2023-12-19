import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Pet } from "./PetContext";
import useAuth from "../hooks/useAuth";
import localforage from "localforage";
import { ROLES } from "../lib/permissions";
// import user from "../../../full-stack-pet-adoption-mayonchip-backend/models/user";
// import PetContext, { Pet } from "./PetContext";

export type User = {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
  savedPets?: Pet[];
  fosteredPets?: Pet[];
  adoptedPets?: Pet[];
  permission?: number;
  phonenumber?: string;
};

export const defaultNewUser = {
  firstName: "",
  lastName: "",
  email: "",
  image: "",
};

type OwnedByUser = { saved: boolean; fostered: boolean; adopted: boolean };

type AuthContextType = {
  isLoggedIn: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
  userData: User | null;
  setUserData: (user: User) => void;
  isAdmin: boolean;
  setIsAdmin: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  newUserDetails: User;
  setNewUserDetails: Dispatch<SetStateAction<User>>;
  userImage: string | undefined;
  setUserImage: Dispatch<SetStateAction<string | undefined>>;
  newImageDisplay: String | ArrayBuffer | null;
  setNewImageDisplay: Dispatch<SetStateAction<String | ArrayBuffer | null>>;
  //   updatePetStatus: string;
  //   setUpdatePetStatus: Dispatch<SetStateAction<string>>;
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
  //   isProfileUpdated: boolean;
  //   setIsProfileUpdated: Dispatch<SetStateAction<boolean>>;
  isOwnedByUser: OwnedByUser;
  setIsOwnedByUser: Dispatch<SetStateAction<OwnedByUser>>;
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  //   openModalButton: MutableRefObject<null>;
  selectedUser: User | undefined;
  setSelectedUser: Dispatch<SetStateAction<User | undefined>>;
  userPets: Pet[] | undefined;
  setUserPets: Dispatch<SetStateAction<Pet[] | undefined>>;
  allUserPets: Pet[] | undefined;
  setAllUserPets: Dispatch<SetStateAction<Pet[] | undefined>>;
  componentLoading: boolean;
  setComponentLoading: Dispatch<SetStateAction<boolean>>;
  pageTitle: string;
  setPageTitle: Dispatch<SetStateAction<string>>;
  petSavedToUser: boolean;
  setPetSavedToUser: Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = React.createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState(false);
  // const [userDetails, setUserDetails] = useState("");
  const [userData, setUserData] = useState<User | null>(null);
  //   const { checkIsLoggedIn } = UseAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [newUserDetails, setNewUserDetails] = useState<User>(defaultNewUser);
  //   const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  const [userImage, setUserImage] = useState<string | undefined>(undefined);
  const [newImageDisplay, setNewImageDisplay] = useState<
    String | ArrayBuffer | null
  >(null);
  //   const [updatePetStatus, setUpdatePetStatus] = useState();
  const [isOwnedByUser, setIsOwnedByUser] = useState<OwnedByUser>({
    saved: false,
    fostered: false,
    adopted: false,
  });
  const [isEdit, setIsEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();
  //   const openModalButton = useRef(null);
  const [userPets, setUserPets] = useState<Pet[] | undefined>();
  const [allUserPets, setAllUserPets] = useState<Pet[] | undefined>();
  const [componentLoading, setComponentLoading] = useState(true);
  const [pageTitle, setPageTitle] = useState("");
  const [petSavedToUser, setPetSavedToUser] = useState(false);
  // const [userPets, setUserFosteredPets] =

  //   const { petDetails } = useContext(PetContext);
  // const { isOwnedByUser } = useUsers();
  const { isUserLoggedIn } = useAuth();
  useEffect(() => {
    const subscription = { unsubscribe: () => undefined };
    const checkLoggedIn = async () => {
      setIsLoading(true);
      const userRes = await isUserLoggedIn();
      // const ACCESS_TOKEN = (await localforage.getItem(
      // 	"ACCESS_TOKEN"
      // )) as string;
      // console.log(ACCESS_TOKEN);
      // if (!ACCESS_TOKEN) {
      // 	setLoggedIn(false);
      // 	setIsLoading(false);
      // 	return;
      // }
      // const userRes = await axios.get<User>("http://localhost:4000/users/me", {
      // 	headers: { Authorization: ACCESS_TOKEN },
      // });

      const userInfo = await localforage.getItem<User>("userInfo");
      // await localforage.setItem("userInfo", userRes.data);
      if (userInfo) {
        setLoggedIn(true);
        setUserData(userInfo);
      } else {
        setLoggedIn(false);
      }
      if (userInfo?.image !== "") {
        setUserImage(userInfo?.image);
      }

      // setLoggedIn(true);
      // setUserData(userRes);
      // setIsLoading(false);

      // setLoggedIn(true);
    };
    checkLoggedIn();

    return () => {
      subscription.unsubscribe();
    };
  }, [
    isLoggedIn,
    // isOwnedByUser,
    // petDetails
  ]);

  useEffect(() => {
    if (userData?.permission === 1) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [userData, isLoggedIn]);

  // useEffect(() => {
  // 	const getUserData = async () => {
  // 		try {
  // 			await isUserLoggedIn();
  // 			const user = (await localforage.getItem("userInfo")) as User;
  // 			setUserData(user);
  // 		} catch (error) {
  // 			console.log("no user info", error);
  // 		}
  // 	};
  // 	getUserData();
  // }, [
  // 	isLoggedIn,
  // 	//  petDetails,
  // 	newUserDetails,
  // ]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setLoggedIn,
        userData,
        setUserData,
        isAdmin,
        setIsAdmin,
        isLoading,
        setIsLoading,
        newUserDetails,
        setNewUserDetails,
        userImage,
        setUserImage,
        newImageDisplay,
        setNewImageDisplay,
        // updatePetStatus,
        // setUpdatePetStatus,
        users,
        setUsers,
        // isProfileUpdated,
        // setIsProfileUpdated,
        isOwnedByUser,
        setIsOwnedByUser,
        isEdit,
        setIsEdit,
        // openModalButton,
        selectedUser,
        setSelectedUser,
        userPets,
        setUserPets,
        allUserPets,
        setAllUserPets,
        componentLoading,
        setComponentLoading,
        pageTitle,
        setPageTitle,
        petSavedToUser,
        setPetSavedToUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
