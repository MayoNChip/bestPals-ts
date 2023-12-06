import { Flex, Button, Img } from "@chakra-ui/react";
import React, { useContext } from "react";
import smallLogo from "../img/newlogo.png";
import "../css/Navbar.css";
import AuthContext from "../context/AuthContext";
import SidebarMenu from "./SidebarMenu";
// import UseAuth from "../Hooks/useAuth";

// import SidebarMenu from "./SidebarMenu";

function Sidebar() {
  const { isLoggedIn } = useContext(AuthContext);
  //   const { handleLogout } = UseAuth();
  //   const handleLogoutClick = () => {
  //     handleLogout();
  //   };

  return (
    <Flex
      className="sidebar-master"
      minH="100%"
      // border="blue 1px solid"
      w="100%"
      direction="column"
    >
      <Flex
        className="Logo-flex"
        w="100%"
        h="75px"
        justifyContent="center"
        shadow="md"
        alignItems="center"
      >
        <Img src={smallLogo} alt="Logo" w="50px" mb="10px" />
      </Flex>
      <SidebarMenu />
    </Flex>
  );
}

export default Sidebar;
