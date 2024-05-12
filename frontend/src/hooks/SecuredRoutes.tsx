import { ReactNode, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Text } from "@chakra-ui/react";

function SecuredRoutes({ children }: { children: ReactNode }) {
  const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn === true ? (
    children
  ) : (
    <Text fontSize="2xl" my="auto" mx="auto">
      Please login or create an account first!
    </Text>
  );
}

export default SecuredRoutes;
