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
        maxH="75px"
        justifyContent="center"
        // shadow="base"
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
