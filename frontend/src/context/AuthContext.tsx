// import localforage from "localforage";
import React, {
  Dispatch,
  //   MutableRefObject,
  ReactNode,
  SetStateAction,
  //   useContext,
  //   useEffect,
  //   useRef,
  useState,
} from "react";
import { Pet } from "./PetContext";
// import user from "../../../full-stack-pet-adoption-mayonchip-backend/models/user";
// import UseAuth from "../Hooks/useAuth";
// import PetContext, { Pet } from "./PetContext";

export type User = {
  _id?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  image?: string;
  savedPets: Pet[];
  fosteredPets: Pet[];
  adoptedPets: Pet[];
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
  newUserDetails: User | null;
  setNewUserDetails: Dispatch<SetStateAction<User | null>>;
  userImage: string | null;
  setUserImage: Dispatch<SetStateAction<string | null>>;
  newImageDisplay: File | null;
  setNewImageDisplay: Dispatch<SetStateAction<File | null>>;
  //   updatePetStatus: string;
  //   setUpdatePetStatus: Dispatch<SetStateAction<string>>;
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
  //   isProfileUpdated: boolean;
  //   setIsProfileUpdated: Dispatch<SetStateAction<boolean>>;
  isOwnedByUser: OwnedByUser | undefined;
  setIsOwnedByUser: Dispatch<SetStateAction<OwnedByUser | undefined>>;
  //   isEdit: boolean;
  //   setIsEdit: Dispatch<SetStateAction<boolean>>;
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
  const [newUserDetails, setNewUserDetails] = useState<User | null>(null);
  //   const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [newImageDisplay, setNewImageDisplay] = useState<File | null>(null);
  //   const [updatePetStatus, setUpdatePetStatus] = useState();
  const [isOwnedByUser, setIsOwnedByUser] = useState<OwnedByUser>();
  //   const [isEdit, setIsEdit] = useState(false);
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

  //   useEffect(() => {
  //     const subscription = { unsubscribe: () => undefined };
  //     const checkLoggedIn = async () => {
  //       setIsLoading(true);
  //       const userRes = await checkIsLoggedIn();
  //       const userInfo = await localforage.getItem("userInfo");
  //       if (userRes?.image !== "") {
  //         setUserImage(userRes?.image);
  //       }

  //       if (userRes) {
  //         setLoggedIn(true);
  //       } else {
  //         setLoggedIn(false);
  //       }
  //       // setLoggedIn(true);
  //       // setUserData(userRes);
  //       // setIsLoading(false);

  //       userRes?.permission === 1 ? setIsAdmin(true) : setIsAdmin(false);
  //       // setLoggedIn(true);
  //     };
  //     checkLoggedIn();
  //     return () => {
  //       subscription.unsubscribe();
  //     };
  //   }, [
  //     isLoggedIn,
  //     // isOwnedByUser,
  //     // petDetails
  //   ]);

  //   useEffect(() => {
  //     const getUserData = async () => {
  //       try {
  //         await checkIsLoggedIn();
  //         const user = (await localforage.getItem("userInfo")) as User;
  //         setUserData(user);
  //       } catch (error) {
  //         console.log("no user info", error);
  //       }
  //     };
  //     getUserData();
  //   }, [
  //     isLoggedIn,
  //     //  petDetails,
  //     newUserDetails,
  //   ]);

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
        // isEdit,
        // setIsEdit,
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
