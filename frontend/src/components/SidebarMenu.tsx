import { Button, Flex } from "@chakra-ui/react";
// import React, { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";

function SidebarMenu() {
	// const { isLoggedIn } = useContext(userContext);

	const location = useLocation();
	const { pathname } = location;

	const splitLocation = pathname.split("/");

	return (
		<Flex
			direction="column"
			className="buttons-flex"
			w="100%"
			h="95%"
			// border="red 1px solid"
			// position="relative"
		>
			<Flex
				direction="column"
				w="100%"
				alignItems="center"
				mt="15px"
				h="300px"
				justifyContent="space-around"
				// position="-webkit-sticky"
				// position="sticky"
				// top="0"
				// top="30%"
			>
				<NavLink to="/home" style={{ borderRadius: "10px" }}>
					<Button
						isActive={splitLocation[1] === "home" ? true : false}
						bgColor="white"
						_hover={{
							bgColor: "cyan.500",
							color: "white",
							transition: "background-color 300ms ease",
						}}
						_active={{
							background: "cyan.500",
							color: "white",
						}}
						minH="50px"
						minW="200px"
						// _focus="none"
					>
						Home
					</Button>
				</NavLink>
				{/* {isLoggedIn && ( */}
				<NavLink to="/mypets" style={{ borderRadius: "10px" }}>
					<Button
						bgColor="white"
						_hover={{
							bgColor: "cyan.500",
							color: "white",
							transition: "background-color 300ms ease",
						}}
						_active={{
							background: "cyan.500",
							color: "white",
						}}
						minH="50px"
						minW="200px"
						isActive={splitLocation[1] === "mypets" ? true : false}
					>
						My Pets
					</Button>
				</NavLink>
				{/* )} */}
				{/* {isLoggedIn && ( */}
				<NavLink to="/profilesettings" style={{ borderRadius: "10px" }}>
					<Button
						//   onClick={checkUserInfo}
						isActive={splitLocation[1] === "profilesettings" ? true : false}
						bgColor="white"
						_hover={{
							bgColor: "cyan.500",
							color: "white",
							transition: "background-color 300ms ease",
						}}
						_active={{
							background: "cyan.500",
							color: "white",
						}}
						minH="50px"
						minW="200px"
						// _focus="none"
					>
						Profile Settings
					</Button>
				</NavLink>
				{/* )} */}
				<NavLink to="/search" style={{ borderRadius: "10px" }}>
					<Button
						// display="inline-block"

						isActive={splitLocation[1] === "search" ? true : false}
						minH="50px"
						minW="200px"
						// _focus="none"
						bgColor="white"
						textAlign="left"
						_hover={{
							_before: { height: "100%" },
							bgColor: "cyan.500",
							color: "white",
							transition: "all 300ms ease",
						}}
						_active={{
							background: "cyan.500",
							color: "white",
						}}
					>
						Search
					</Button>
				</NavLink>
			</Flex>
		</Flex>
	);
}

export default SidebarMenu;
