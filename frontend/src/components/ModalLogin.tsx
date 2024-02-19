import React from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Button,
	FormLabel,
	Input,
	Flex,
	FormErrorMessage,
	Text,
	FormControl,
} from "@chakra-ui/react";
import bulletDog from "../img/bulletdog.png";
import { Formik, Form, Field, FieldProps } from "formik";
import useAuth from "../hooks/useAuth";
import { ZodError, z } from "zod";

function ModalLogin() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const initialRef = React.useRef();
	const finalRef = React.useRef();
	const { userLogin } = useAuth();

	const loginSchema = z.object({
		email: z
			.string()
			.email({ message: "Invalid email address" })
			.min(1, { message: "Email is required" }),
		password: z
			.string()
			.min(6, { message: "Password must be at least 6 characters" })
			.min(1, { message: "Password is required" }),
	});

	const validateLogin = (values: z.infer<typeof loginSchema>) => {
		try {
			loginSchema.parse(values);
		} catch (error) {
			if (error instanceof ZodError) {
				let errors: Record<string, string> = {
					email: "",
					password: "",
				};
				error.errors.forEach(({ path, message }) => {
					console.log(path, message);
					errors[path[0]] = message;
				});
				return errors;
			}
		}
	};

	return (
		<>
			<Button
				w="70px"
				h="35px"
				bg="cyan.600"
				color="white"
				_hover={{ bg: "cyan.500", color: "white" }}
				onClick={onOpen}
				boxShadow="xs"
			>
				Login
			</Button>

			<Modal
				initialFocusRef={initialRef.current}
				finalFocusRef={finalRef.current}
				isOpen={isOpen}
				onClose={onClose}
			>
				<ModalOverlay />

				<ModalContent>
					<Flex direction="column" alignItems="center" pt="10px">
						<Flex bgImage={bulletDog} w="50px" h="40px" bgSize="100%"></Flex>
						<ModalHeader display="flex" w="100%" justifyContent="center">
							<Text>Login to your account</Text>
						</ModalHeader>
					</Flex>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<Formik
							initialValues={{
								email: "",
								password: "",
							}}
							validate={validateLogin}
							onSubmit={(values, actions) => {
								userLogin(values, actions, onClose);
							}}
						>
							{(props) => {
								return (
									<Form>
										<Field name="email">
											{({ field, form, meta }: FieldProps) => (
												<FormControl
													// isInvalid={form.errors.email && form.touched.email}
													isInvalid={meta.touched && Boolean(meta.error)}
												>
													<FormLabel htmlFor="email">Email Address</FormLabel>
													<Input
														{...field}
														onInput={() => {
															form.setStatus(false);
														}}
														onChange={form.handleChange}
														onBlur={form.handleBlur}
														value={form.values.email}
														placeholder="Enter your Email address"
													/>
													<FormErrorMessage>
														{props.errors.email}
													</FormErrorMessage>
												</FormControl>
											)}
										</Field>
										<Field name="password">
											{({ field, form, meta }: FieldProps) => (
												<FormControl
													isInvalid={Boolean(meta.error) && meta.touched}
												>
													<FormLabel htmlFor="password">Password</FormLabel>
													<Input
														{...field}
														type="password"
														onInput={() => {
															form.setStatus(false);
														}}
														onChange={form.handleChange}
														onBlur={form.handleBlur}
														value={form.values.password}
														placeholder="Create your password"
													/>
													<FormErrorMessage>
														{props.errors.password}
													</FormErrorMessage>
												</FormControl>
											)}
										</Field>

										{!!props.status && (
											<Text textAlign="center" color="red">
												{props.status}
											</Text>
										)}
										<div>
											<Flex
												id="formButtons"
												h="50px"
												w="100%"
												mt="20px"
												alignItems="center"
												justifyContent="space-around"
											>
												<Button
													colorScheme="blue"
													isLoading={props.isSubmitting}
													type="submit"
												>
													Login
												</Button>
												<Button onClick={onClose}>Cancel</Button>
											</Flex>
										</div>
									</Form>
								);
							}}
						</Formik>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
export default ModalLogin;
