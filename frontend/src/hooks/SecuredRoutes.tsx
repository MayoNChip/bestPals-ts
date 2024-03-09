import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ModalLogin from "../components/ModalLogin";
import { Text } from "@chakra-ui/react";

function SecuredRoutes({ children }: { children: ReactNode }) {
	const { isLoggedIn, isLoading } = useContext(AuthContext);
	console.log(isLoggedIn);
	// if (isLoggedIn === false || isLoading === true) {
	// 	return <></>;
	// }

	return isLoggedIn === true ? (
		children
	) : (
		<Text fontSize="2xl" my="auto" mx="auto">
			Please login or create an account first!
		</Text>
	);
}

export default SecuredRoutes;
