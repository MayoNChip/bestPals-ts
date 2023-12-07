import {
	Button,
	Flex,
	Text,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Icon,
	Avatar,
	Divider,
	Link,
} from "@chakra-ui/react";
import { useContext } from "react";
//   import ModalLogin from "./ModalLogin";
//   import ModalSignup from "./ModalSignup";
import "../css/Navbar.css";
import AuthContext from "../context/AuthContext";
//   import UseAuth from "../Hooks/useAuth";
//   import { BsFillCaretDownFill } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import ModalLogin from "./ui/ModalLogin";
import useAuth from "../hooks/useAuth";

function Navbar() {
	const { userData, isLoggedIn, isAdmin, pageTitle } = useContext(AuthContext);
	const { handleLogout } = useAuth();

	const navigate = useNavigate();
	// const handleLogoutClick = () => {
	//   handleLogout();
	// };

	return (
		<Flex w="100%" bgColor="white" h="69px">
			<Flex
				className="auth-buttons"
				justifyContent="right"
				alignItems="center"
				width="100%"
				h="75px"
				zIndex="2"
				style={{ boxShadow: "0 8px 6px -6px rgba(0, 0, 255, .1)" }}
			>
				{isAdmin ? (
					<Menu isLazy>
						<MenuButton>
							<Flex alignItems="center" mr="10px">
								<Avatar src={userData?.image} mr="10px" />
								<Flex direction="column" alignItems="flex-start">
									<Text fontWeight="bold">
										{userData?.firstname} {userData?.lastname}
									</Text>
									{isAdmin && <Text>Admin</Text>}
								</Flex>
								{/* <Icon as={BsFillCaretDownFill} ml="10px" /> */}
							</Flex>
						</MenuButton>
						<MenuList>
							<Text ml="10px" fontWeight="black">
								Admin Menu
							</Text>
							<Divider />
							{/* {isAdmin && ( */}
							<NavLink to="/dashboard">
								<MenuItem
									w="100%"
									bgColor="white"
									_hover={{
										backgroundColor: "cyan.500",
										color: "white",
									}}
								>
									Dashboard
								</MenuItem>
							</NavLink>
							<NavLink to="/addpet">
								<MenuItem
									w="100%"
									bgColor="white"
									_hover={{
										backgroundColor: "cyan.500",
										color: "white",
									}}
								>
									Add a Pet
								</MenuItem>
							</NavLink>
							<MenuItem
								w="100%"
								bgColor="white"
								_hover={{
									backgroundColor: "cyan.500",
									color: "white",
								}}
								//   onClick={handleLogoutClick}
							>
								Logout
							</MenuItem>
						</MenuList>
					</Menu>
				) : (
					<Flex>
						{isLoggedIn && userData ? (
							<Flex alignItems="center">
								<Flex alignItems="center">
									<Avatar src={userData.image} mr="10px" />
									<Flex direction="column">
										<Flex alignItems="flex-start">
											<Text fontWeight="bold">
												{userData?.firstname} {userData?.lastname}
											</Text>
										</Flex>
										<Link
											onClick={() => {
												navigate(`/profilesettings`);
											}}
										>
											View profile
										</Link>
									</Flex>
									<Button
										m="0 10px"
										bgColor="white"
										_hover={{
											backgroundColor: "red.500",
											color: "white",
										}}
										onClick={handleLogout}
									>
										Logout
									</Button>
								</Flex>
							</Flex>
						) : (
							<Flex w="150px" justifyContent="space-between">
								<ModalLogin />
								{/* <ModalSignup /> */}
							</Flex>
						)}
					</Flex>
				)}
			</Flex>
		</Flex>
	);
}

export default Navbar;
