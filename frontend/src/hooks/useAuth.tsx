import axios from "axios";
import { useContext } from "react";
import localforage from "localforage";
import CustomToast from "../utils/CustomToast";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
// import { NavigateFunction, useNavigate } from "react-router-dom";

export default function useAuth() {
	// navigate: NavigateFunction
	const navigate = useNavigate();
	const {
		setLoggedIn,
		setIsOwnedByUser,
		setNewUserDetails,
		newImageDisplay,
		newUserDetails,
		userData,
	} = useContext(AuthContext);
	const { errorToast, successToast } = CustomToast();

	const handleLogout = async () => {
		await localforage.clear();
		setLoggedIn(false);
		setIsOwnedByUser({
			saved: false,
			fostered: false,
			adopted: false,
		});
		navigate("/home");
	};

	const userRegister = async (values: any, actions: any, onClose: any) => {
		try {
			const response = await axios.post(
				"http://localhost:4000/auth/register",
				values
			);
			if (response.data.success)
				successToast(
					"Registered Successfuly!",
					"You can set your profile picture on your profile settings!"
				);
			setLoggedIn(true);
			await localforage.setItem("ACCESS_TOKEN", response.data.ACCESS_TOKEN);

			navigate("/");
			onClose();
		} catch (err: any) {
			console.log("user register error ==> ", err.response.data.message);
			const errorMessage = err.response.data.message;
			actions.setStatus(errorMessage);
		}
	};

	const userLogin = async (userObj: any, actions: any, onClose: any) => {
		try {
			console.log("userObj ==> ", userObj);
			const resp = await axios.post(
				"http://localhost:4000/auth/login",
				userObj
			);
			console.log("resp ==> ", resp);
			if (resp.status === 200)
				await localforage.setItem("ACCESS_TOKEN", resp.data);
			successToast("Success.", "Logged in successfully.");
			setLoggedIn(true);
			onClose();
			navigate("/home");
		} catch (err: any) {
			console.log("ERROR ==> ", err.response.data.message);
			const errorMessage = err.response.data.message;

			errorToast("Oops, something went wrong :O", errorMessage);
		}
	};

	const isUserLoggedIn = async () => {
		const ACCESS_TOKEN: string | null = await localforage.getItem(
			"ACCESS_TOKEN"
		);
		if (!ACCESS_TOKEN) {
			throw new Error("No Access Token");
		}
		try {
			const user = await axios.get("http://localhost:4000/users/me", {
				headers: { Authorization: ACCESS_TOKEN },
			});
			const userInfo = user?.data;
			await localforage.setItem("userInfo", userInfo);
			return userInfo;
		} catch (err) {
			console.log("check logged in error", err);
			return null;
		}
	};
	const checkIsLoggedIn = async () => {
		const ACCESS_TOKEN: string | null = await localforage.getItem(
			"ACCESS_TOKEN"
		);
		if (!ACCESS_TOKEN) {
			throw new Error("No Access Token");
		}
		try {
			const user = await axios.get("http://localhost:4000/users/me", {
				headers: { Authorization: ACCESS_TOKEN },
			});
			const userInfo = user?.data;
			console.log("userInfo", userInfo);
			await localforage.setItem("userInfo", userInfo);
			return userInfo;
		} catch (err) {
			console.log("check logged in error", err);
			return false;
		}
	};

	const updateUserDetails = async (updatedValues: any) => {
		try {
			// setIsLoading(true);
			const ACCESS_TOKEN: string | null = await localforage.getItem(
				"ACCESS_TOKEN"
			);
			if (!ACCESS_TOKEN) {
				throw new Error("No Access Token");
			}
			const response = await axios.put(
				`http://localhost:4000/users/${userData?._id}`,
				updatedValues,
				{ headers: { Authorization: ACCESS_TOKEN } }
			);
			if (response.status === 200) {
				setNewUserDetails(updatedValues);
			}

			return response.data;
		} catch (error) {
			console.log("updatig user details error", error);
		}
	};

	// const imageUpload = async () => {
	// 	const ACCESS_TOKEN: string | null = await localforage.getItem(
	// 		"ACCESS_TOKEN"
	// 	);
	// 	const userData: any = await localforage.getItem("userInfo");
	// 	if (!ACCESS_TOKEN || !userData) {
	// 		throw new Error("No Access Token");
	// 	}
	// 	const userId = userData?._id;
	// 	const Headers = {
	// 		Authorization: ACCESS_TOKEN,
	// 		"Content-type": "application/json",
	// 	};
	// 	const jsonImage = JSON.stringify({
	// 		data: newImageDisplay,
	// 	});
	// 	try {
	// 		const response = await axios({
	// 			url: `http://localhost:4000/upload/user/${userId}`,
	// 			method: "POST",
	// 			headers: Headers,
	// 			data: jsonImage,
	// 		});
	// 		if (response.data.imageUrl) {
	// 			// {
	// 			//   ...newUserDetails,
	// 			//   image: response.data.imageUrl,
	// 			// }
	// 			setNewUserDetails({ ...newUserDetails, image: response.data.imageUrl });
	// 		}
	// 		return response.data.imageUrl;
	// 	} catch (error: any) {
	// 		console.log("send image to backend error", error.message);
	// 		return error;
	// 	}
	// };

	return {
		userRegister,
		checkIsLoggedIn,
		userLogin,
		handleLogout,
		updateUserDetails,
		// imageUpload,
		isUserLoggedIn,
	};
}
