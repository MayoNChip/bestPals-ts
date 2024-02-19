import {
	Box,
	Button,
	Flex,
	Heading,
	Input,
	Text,
	Spinner,
	AvatarBadge,
	Avatar,
	IconButton,
} from "@chakra-ui/react";
import { ChangeEvent, useContext, useRef, useState } from "react";
import { EditIcon } from "@chakra-ui/icons";
import banner from "../img/petBanner.jpg";
import footerImage from "../img/petgang.png";
import AuthContext, { defaultNewUser } from "../context/AuthContext";
import useAuth from "../hooks/useAuth";
import ModalChangePassword from "./ui/ModalChangePassword";

function ProfileSettings() {
	const {
		userData,
		newUserDetails,
		setNewUserDetails,
		isEdit,
		setIsEdit,
		newImageDisplay,
		setNewImageDisplay,
	} = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);
	const { updateUserDetails, imageUpload } = useAuth();
	const newUserImageRef = useRef<HTMLInputElement>(null);
	const [isSaving, setSaving] = useState(false);
	const [imageLocalDisplay, setImageLocalDisplay] = useState<
		string | ArrayBuffer | null
	>(null);

	const uploadImageClick = () => {
		newUserImageRef.current?.click();
	};

	const handleUnlock = () => {
		if (isEdit) {
			setIsEdit(false);
		} else {
			setIsEdit(true);
		}
	};

	const handleCancel = () => {
		setIsEdit(false);
	};

	const onSave = async () => {
		setSaving(true);
		let updatedValues = { ...newUserDetails };
		if (newImageDisplay) {
			setIsLoading(true);
			const profilePicUploadURL = await imageUpload();
			updatedValues = { ...newUserDetails, image: profilePicUploadURL };
		}

		await updateUserDetails(updatedValues);
		setIsLoading(false);
		setNewImageDisplay(null);
		setNewUserDetails(defaultNewUser);
		setSaving(false);
		setIsEdit(false);
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		switch (e.target.id) {
			case "firstName":
				setNewUserDetails((prev) => {
					return {
						...prev,
						firstName: e.target.value,
					};
				});
				break;
			case "lastName":
				setNewUserDetails((prev) => {
					return {
						...prev,
						lastName: e.target.value,
					};
				});
				break;
			case "email":
				setNewUserDetails((prev) => {
					return {
						...prev,
						email: e.target.value,
					};
				});
				break;
			case "phonenumber":
				setNewUserDetails((prev) => {
					return {
						...prev,
						phonenumber: e.target.value,
					};
				});
				break;
		}
	};

	return (
		<Flex
			w="100%"
			alignItems="center"
			direction="column"
			position="relative"
			mt="30px"
		>
			<input
				ref={newUserImageRef}
				id="file-input"
				style={{ display: "none" }}
				type="file"
				name="file-input"
				onChange={(e) => {
					const file = e.currentTarget.files?.[0];
					if (!file) return;
					const reader = new FileReader();
					reader.readAsDataURL(file);
					reader.onloadend = () => {
						setNewImageDisplay(reader.result);
						setImageLocalDisplay(reader.result);
					};
				}}
			/>

			<Flex position="relative">
				<Flex
					justifyContent="center"
					minH="450px"
					w="500px"
					direction="column"
					boxShadow="xl"
					alignItems="center"
					bgColor="white"
					mt="60px"
					borderRadius="20px"
					zIndex="1"
				>
					<Flex
						bgImage={banner}
						bgSize="500px"
						bgPos="right"
						w="100%"
						h="20%"
						position="absolute"
						top="0"
						zIndex="-1"
					></Flex>
					<Flex direction="column" alignItems="center" h="800px">
						<Flex direction="column" alignItems="center" mt="30px">
							<Flex
								w="150px"
								h="150px"
								alignItems="center"
								justifyContent="center"
							>
								{isLoading ? (
									<Spinner size="xl" />
								) : (
									<Avatar
										size="2xl"
										src={imageLocalDisplay?.toString() || userData?.image}
										//   alt="profile_picture"
										m="20px"
									>
										{isEdit && (
											<AvatarBadge
												as={IconButton}
												icon={<EditIcon />}
												rounded="full"
												_hover={{ cursor: "pointer" }}
												border="2px"
												onClick={uploadImageClick}
											/>
										)}
									</Avatar>
								)}
							</Flex>
							<Heading alignSelf="center" mb="10px">
								{userData?.firstName + " " + userData?.lastName}
							</Heading>

							{!isEdit && (
								<Button as="a" w="150px" mb="10px" onClick={handleUnlock}>
									Change Profile Details
								</Button>
							)}

							{isEdit && (
								<>
									<Button
										as="a"
										w="150px"
										colorScheme="red"
										color="cyan.50"
										onClick={handleCancel}
										mb="10px"
									>
										Cancel
									</Button>
									<Button
										as="a"
										w="150px"
										colorScheme="cyan"
										color="cyan.50"
										onClick={onSave}
										mb="10px"
									>
										{isSaving ? <Spinner /> : "Save"}
									</Button>
								</>
							)}
							<ModalChangePassword />
						</Flex>
						<Flex direction="column" w="100%" h="100%">
							<Flex
								mt="10px"
								direction="column"
								className="user_details"
								justifyContent="space-between"
								h="300px"
							>
								<Flex direction="column" alignItems="center">
									<Text fontSize="md">First Name</Text>
									{isEdit ? (
										<>
											<Input
												borderBottom="1px solid"
												borderColor="red.500"
												textAlign="center"
												fontSize="2xl"
												fontWeight="bold"
												id="firstName"
												variant="flushed"
												w="60px"
												h="30px"
												placeholder="First Name"
												defaultValue={userData?.firstName}
												onChange={handleInputChange}
											/>
										</>
									) : (
										<Box>
											<Text fontSize="2xl" fontWeight="bold">
												{userData?.firstName}
											</Text>
											{/* <Button onClick={() => console.log(userData)}>
                        print user data
                      </Button> */}
										</Box>
									)}
								</Flex>
								<Flex direction="column" alignItems="center">
									<Text fontSize="md">Last Name</Text>
									{isEdit ? (
										<Input
											id="lastName"
											borderColor="red.500"
											variant="flushed"
											textAlign="center"
											fontSize="2xl"
											fontWeight="bold"
											w="60px"
											h="30px"
											defaultValue={userData?.lastName}
											onChange={handleInputChange}
										/>
									) : (
										<Box>
											<Text fontSize="2xl" fontWeight="bold">
												{userData?.lastName}
											</Text>
										</Box>
									)}
								</Flex>

								<Flex direction="column" alignItems="center">
									<Text fontSize="md">Email</Text>
									{isEdit ? (
										<Input
											id="email"
											borderColor="red.500"
											variant="flushed"
											textAlign="center"
											fontSize="2xl"
											fontWeight="bold"
											w="160px"
											h="30px"
											defaultValue={userData?.email}
											onChange={handleInputChange}
										/>
									) : (
										<Box>
											<Text fontSize="2xl" fontWeight="bold">
												{userData?.email}
											</Text>
										</Box>
									)}
								</Flex>
								<Flex direction="column" alignItems="center">
									<Text fontSize="md">Phone Number</Text>
									{isEdit ? (
										<Input
											id="phonenumber"
											borderColor="red.500"
											variant="flushed"
											textAlign="center"
											fontSize="2xl"
											fontWeight="bold"
											w="120px"
											h="30px"
											defaultValue={userData?.phonenumber}
											onChange={handleInputChange}
										/>
									) : (
										<Box>
											<Text fontSize="2xl" fontWeight="bold">
												{userData?.phonenumber}
											</Text>
										</Box>
									)}
								</Flex>
							</Flex>
						</Flex>
						<Flex
							opacity="50%"
							ml="10px"
							bgImage={footerImage}
							bgSize="220px"
							bgRepeat="no-repeat"
							bgPos="left"
							w="100%"
							h="20%"
							position="absolute"
							bottom="0"
							left="0"
							zIndex="-1"
						></Flex>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
}

export default ProfileSettings;
