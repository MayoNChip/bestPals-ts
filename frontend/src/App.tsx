import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
// import Homepage from "./components/Homepage";
// import Navbar from "./components/Navbar";
// import ProfileSettings from "./components/ProfileSettings";
// import Search from "./components/Search";
// import Mypets from "./components/Mypets";
import "./App.css";
import { Flex, Spinner } from "@chakra-ui/react";
// import SecuredRoutes from "./components/SecuredRoutes";
// import Dashboard from "./components/admin/Dashboard";
import AuthContext from "./context/AuthContext";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import SecuredRoutes from "./hooks/SecuredRoutes";
import Mypets from "./components/Mypets";
import Search from "./components/Search";
// import AddPet from "./components/admin/AddPet";
// import Pet from "./components/Pet";
// import ModalUser from "./components/admin/ModalUser";

function App() {
	const { isLoading } = useContext(AuthContext);

	return (
		// <Flex className="App" w="100vw" h="100vh" direction="column">
		//   {isLoading ? (
		//     <Flex
		//       w="100%"
		//       h="100%"
		//       alignItems="center"
		//       justifyContent="center"
		//       p="fixed"
		//       top="50%"
		//       left="50%"
		//     >
		//       <Spinner
		//         thickness="4px"
		//         speed="0.65s"
		//         emptyColor="gray.200"
		//         color="blue.500"
		//         size="xl"
		//       />
		//     </Flex>
		//   ) : (
		//     <>
		//       <Flex w="100vw" h="100%">
		//         <Flex h="100%" w="20%">
		//           <Sidebar />
		//         </Flex>
		//         <Flex
		//           direction="column"
		//           w="100%"
		//           bgColor="#fcfcfc"
		//           sx={{
		//             "&::-webkit-scrollbar": {
		//               display: "none",
		//             },
		//           }}
		//         >
		//           <Navbar />
		//           <Routes>
		//             <Route path="/" element={<Homepage />} />
		//             <Route path="/home" element={<Homepage />} />
		//             <Route
		//               path="/mypets"
		//               element={
		//                 // <SecuredRoutes>
		//                 <Mypets />
		//                 // </SecuredRoutes>
		//               }
		//             />
		//             {/*
		//             <Route
		//               path="/profilesettings"
		//               element={
		//                 <SecuredRoutes>
		//                   <ProfileSettings />
		//                 </SecuredRoutes>
		//               }
		//             />
		//             <Route path="/search" element={<Search />} />
		//             <Route
		//               path="/dashboard"
		//               element={
		//                 <SecuredRoutes>
		//                   <Dashboard />
		//                 </SecuredRoutes>
		//               }
		//             />
		//             <Route
		//               path="/addPet"
		//               element={
		//                 <SecuredRoutes>
		//                   <AddPet />
		//                 </SecuredRoutes>
		//               }
		//             />
		//             <Route
		//               path="/addPet/:petId"
		//               element={
		//                 <SecuredRoutes>
		//                   <AddPet pet="pet" />
		//                 </SecuredRoutes>
		//               }
		//             />
		//             <Route
		//               path="/user/:userId"
		//               element={
		//                 <SecuredRoutes>

		//                   <ModalUser />
		//                 </SecuredRoutes>
		//               }
		//             />
		//             <Route
		//               path="/pet/:petId"
		//               element={

		//                 <Pet />

		//               }
		//             /> */}
		//           </Routes>
		//         </Flex>
		//       </Flex>
		//       {/* <Footer /> */}
		//     </>
		//   )}
		// </Flex>
		// <Flex>Hello</Flex>
		<Flex>
			<Flex h="100%" w="20%">
				<Sidebar />
			</Flex>
			<Flex direction="column" w="100%">
				<Navbar />
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="/home" element={<Homepage />} />
					<Route
						path="/mypets"
						element={
							// <SecuredRoutes>
							<Mypets />
							// </SecuredRoutes>
						}
					/>
					<Route path="/search" element={<Search />} />
				</Routes>
			</Flex>
		</Flex>
	);
}

export default App;
