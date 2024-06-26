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

export type User = {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
  savedPets: string[];
  fosteredPets: string[];
  adoptedPets: string[];
  permission: number;
  phoneNumber?: string;
};

export const defaultNewUser = {
  firstName: "",
  lastName: "",
  email: "",
  image: "",
  permission: 2,
  savedPets: [],
  fosteredPets: [],
  adoptedPets: [],
};

export type emptyUser =
  | {
      firstName?: string;
      lastName?: string;
      email?: string;
      phonenumber?: string;
      permission?: number;
      savedPets?: string[];
      fosteredPets?: string[];
      adoptedPets?: string[];
    }
  | undefined;

type OwnedByUser = {
  saved: string[];
  fostered: string[];
  adopted: string[];
};

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
    adopted: [],
    fostered: [],
    saved: [],
  });
  const [isEdit, setIsEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();
  //   const openModalButton = useRef(null);
  const [userPets, setUserPets] = useState<Pet[] | undefined>();
  const [allUserPets, setAllUserPets] = useState<Pet[] | undefined>();
  const [componentLoading, setComponentLoading] = useState(true);
  const [pageTitle, setPageTitle] = useState("");
  const [petSavedToUser, setPetSavedToUser] = useState(false);

  //   const { petDetails } = useContext(PetContext);
  // const { isOwnedByUser } = useUsers();
  const { isUserLoggedIn } = useAuth();

  useEffect(() => {
    const subscription = { unsubscribe: () => undefined };
    const checkLoggedIn = async () => {
      setIsLoading(true);
      await isUserLoggedIn();

      const userInfo = await localforage.getItem<User>("userInfo");
      if (userInfo) {
        setLoggedIn(true);
        setUserData(userInfo);

        setIsOwnedByUser({
          adopted: userInfo.adoptedPets || [],
          fostered: userInfo.fosteredPets || [],
          saved: userInfo.savedPets || [],
        });
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
    isEdit,
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
