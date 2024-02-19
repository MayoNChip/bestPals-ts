import React, { useContext } from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Button,
	Box,
	FormControl,
	FormLabel,
	Input,
	Flex,
	FormErrorMessage,
	Text,
} from "@chakra-ui/react";
import bulletDog from "../img/bulletdog.png";
import { Formik, Form, Field, setNestedObjectValues, FieldProps } from "formik";
import useAuth from "../hooks/useAuth";

function ModalSignup() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const initialRef = React.useRef(null);
	const finalRef = React.useRef(null);
	const { userRegister } = useAuth();

	function validateName(value: string) {
		let error;
		if (!value) {
			error = `Name is required`;
		}
		return error;
	}

	function validateEmail(value: string) {
		let error;
		if (!value) {
			error = "Email is required";
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
			error = "Invalid email address";
		}
		return error;
	}

	function validatePassword(value: string) {
		let error = "";
		if (!value) {
			error = "Password is required";
		}
		return error;
	}

	function validatePassMatch(pass: string, value: string) {
		let error = "";
		if (!value) {
			error = "Confirm password field is required";
		} else if (pass !== value) {
			error = "Password does not match";
		}

		// error = "Password is required";
		return error;
	}

	function validatePhoneNumber(value: string) {
		let error = "";
		if (!/^0\d([\d]{0,1})([-]{0,1})\d{7}$/.test(value)) {
			error = "Not a valid phone number";
		}
		return error;
	}

	return (
		<>
			<Button
				bg="cyan.600"
				color="white"
				_hover={{ bg: "cyan.500", color: "white" }}
				onClick={onOpen}
				w="70px"
				h="35px"
				boxShadow="xs"
			>
				Sign up
			</Button>

			<Modal
				initialFocusRef={initialRef}
				finalFocusRef={finalRef}
				isOpen={isOpen}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalBody pb={6}>
						<Flex
							h="100px"
							direction="column"
							alignItems="center"
							justifyContent="space-evenly"
						>
							<Flex bgImage={bulletDog} w="50px" h="40px" bgSize="100%"></Flex>
							<ModalHeader
								p="0"
								display="flex"
								w="100%"
								justifyContent="center"
							>
								Create your account
							</ModalHeader>
						</Flex>
						<ModalCloseButton />
						<Formik
							initialValues={{
								firstName: "",
								lastName: "",
								email: "",
								password: "",
								repassword: "",
								phoneNumber: "",
							}}
							onSubmit={async (values, actions) => {
								await userRegister(values, actions, onClose);
								actions.setSubmitting(false);
							}}
						>
							{(props) => (
								<Form>
									<Field name="firstName" validate={validateName}>
										{({ field, form, meta }: FieldProps) => (
											<FormControl
												isInvalid={meta.touched && Boolean(meta.error)}
											>
												<FormLabel htmlFor="firstName">First name</FormLabel>
												<Input
													{...field}
													id="firstName"
													onInput={() => {
														props.setStatus(false);
													}}
													onChange={form.handleChange}
													placeholder="Enter your first name"
												/>
												<FormErrorMessage>
													{props.errors.firstName}
												</FormErrorMessage>
											</FormControl>
										)}
									</Field>
									<Field name="lastName">
										{({ field, meta }: FieldProps) => (
											<FormControl
												isInvalid={meta.touched && Boolean(meta.error)}
											>
												<FormLabel htmlFor="lastName">Last Name</FormLabel>
												<Input
													{...field}
													onChange={props.handleChange}
													onInput={() => {
														props.setStatus(false);
													}}
													onBlur={props.handleBlur}
													value={props.values.lastName}
													placeholder="Enter your last name"
												/>
												<FormErrorMessage>
													{props.errors.lastName}
												</FormErrorMessage>
											</FormControl>
										)}
									</Field>
									<Field name="email" validate={validateEmail}>
										{({ field, form, meta }: FieldProps) => (
											<FormControl
												isInvalid={meta.touched && Boolean(meta.error)}
											>
												<FormLabel htmlFor="email">Email Address</FormLabel>
												<Input
													{...field}
													onInput={() => {
														props.setStatus(false);
													}}
													onChange={props.handleChange}
													onBlur={props.handleBlur}
													value={props.values.email}
													placeholder="Enter your Email address"
												/>
												<FormErrorMessage>
													{props.errors.email}
												</FormErrorMessage>
											</FormControl>
										)}
									</Field>
									<Field name="password" validate={validatePassword}>
										{({ field, form, meta }: FieldProps) => (
											<FormControl
												isInvalid={meta.touched && Boolean(meta.error)}
											>
												<FormLabel htmlFor="password">Password</FormLabel>
												<Input
													{...field}
													onInput={() => {
														props.setStatus(false);
													}}
													onChange={props.handleChange}
													onBlur={props.handleBlur}
													value={props.values.password}
													placeholder="Create your password"
												/>
												<FormErrorMessage>
													{props.errors.password}
												</FormErrorMessage>
											</FormControl>
										)}
									</Field>
									<Field
										name="repassword"
										validate={(value: string) =>
											validatePassMatch(props.values.password, value)
										}
									>
										{({ field, form, meta }: FieldProps) => (
											<FormControl
												isRequired
												isInvalid={meta.touched && Boolean(meta.error)}
											>
												<FormLabel htmlFor="repassword">
													Confirm Password
												</FormLabel>
												<Input
													{...field}
													onInput={() => {
														props.setStatus(false);
													}}
													onChange={props.handleChange}
													onBlur={props.handleBlur}
													value={props.values.repassword}
													placeholder="Confirm Password"
												/>
												<FormErrorMessage>
													{props.errors.repassword}
												</FormErrorMessage>
											</FormControl>
										)}
									</Field>
									<Field name="phoneNumber" validate={validatePhoneNumber}>
										{({ field, form, meta }: FieldProps) => (
											<FormControl
												isInvalid={meta.touched && Boolean(meta.error)}
											>
												<FormLabel htmlFor="phoneNumber">
													Phone Number
												</FormLabel>
												<Input
													{...field}
													onInput={() => {
														props.setStatus(false);
													}}
													onChange={props.handleChange}
													// type={"number"}
													onBlur={props.handleBlur}
													value={props.values.phoneNumber}
													placeholder="Enter your phone number"
												/>
												<FormErrorMessage>
													{props.errors.phoneNumber}
												</FormErrorMessage>
											</FormControl>
										)}
									</Field>
									{!!props.status && (
										<Text textAlign="center" color="red">
											{props.status}
										</Text>
									)}
									<Flex
										h="80px"
										w="100%"
										alignItems="center"
										justifyContent="center"
									>
										<Button
											colorScheme="blue"
											isLoading={props.isSubmitting}
											type="submit"
										>
											Sign Up!
										</Button>
									</Flex>
								</Form>
							)}
						</Formik>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}

export default ModalSignup;
