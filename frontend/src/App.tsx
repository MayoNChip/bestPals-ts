import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Flex } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Mypets from "./components/Mypets";
import Search from "./components/Search";
import ProfileSettings from "./components/ProfileSettings";
import Pet from "./components/PetDetails";
import AddPet from "./components/admin/AddPet";
import SecuredRoutes from "./hooks/SecuredRoutes";

function App() {
	return (
		<Flex w="100%">
			<Flex w="20%">
				<Sidebar />
			</Flex>
			<Flex w="80%" direction="column">
				<Navbar />
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="/home" element={<Homepage />} />

					<Route
						path="/mypets"
						element={
							<SecuredRoutes>
								<Mypets />
							</SecuredRoutes>
						}
					/>

					<Route path="/search" element={<Search />} />
					<Route
						path="/profilesettings"
						element={
							<SecuredRoutes>
								<ProfileSettings />
							</SecuredRoutes>
						}
					/>
					<Route path="/pet/:petId" element={<Pet />} />
					<Route
						path="/addPet"
						element={
							<SecuredRoutes>
								<AddPet />
							</SecuredRoutes>
						}
					/>
				</Routes>
			</Flex>
		</Flex>
	);
}

export default App;
