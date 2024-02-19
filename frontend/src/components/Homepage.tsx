import { Flex } from "@chakra-ui/react";
import { useContext } from "react";
import LoggedInHomepage from "./LoggedInHomepage";
import NotLoggedInHomepage from "./NotLoggedInHomepage";
import AuthContext from "../context/AuthContext";

function Homepage() {
	const { isLoggedIn } = useContext(AuthContext);

	return (
		<Flex flexDirection="column" justifyContent="space-around">
			{isLoggedIn ? <LoggedInHomepage /> : <NotLoggedInHomepage />}
		</Flex>
	);
}

export default Homepage;
