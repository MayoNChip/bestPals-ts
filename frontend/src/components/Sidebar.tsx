import { Flex, Img } from "@chakra-ui/react";
import smallLogo from "../img/newlogo.png";
import "../css/Navbar.css";
import SidebarMenu from "./SidebarMenu";

function Sidebar() {
	//   const { handleLogout } = UseAuth();
	//   const handleLogoutClick = () => {
	//     handleLogout();
	//   };

	return (
		<Flex className="sidebar-master" minH="100%" w="100%" direction="column">
			<Flex
				className="Logo-flex"
				w="100%"
				maxH="75px"
				justifyContent="center"
				alignItems="center"
				style={{ boxShadow: "0 8px 6px -6px rgba(0, 0, 255, .1)" }}
			>
				<Img src={smallLogo} alt="Logo" w="60px" my="15px" />
			</Flex>
			<SidebarMenu />
		</Flex>
	);
}

export default Sidebar;
