import {
	Button,
	Divider,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	Input,
	Select,
	Text,
} from "@chakra-ui/react";
// import { Cursor } from "mongoose";
import { useEffect, useRef, useState } from "react";
import PetList from "./PetList";
//   import { BiPlusCircle } from "react-icons/bi";
import { Field, FieldProps, Form, Formik } from "formik";
import usePets from "../hooks/usePets";

function Search() {
	// const { isSelected, setIsSelected, isLoading, setPets } =
	//   useContext(PetContext);
	const selection = useRef(null);
	const { getPets } = usePets();
	const [basicSearch, setBasicSearch] = useState(true);
	const { searchPet } = usePets();

	useEffect(() => {
		const getPetsList = async () => {
			await getPets();
		};
		getPetsList();
	}, [basicSearch]);

	const setActive = (e: any) => {
		if (e.target.id === "basic") {
			setBasicSearch(true);
		} else {
			setBasicSearch(false);
		}
	};

	return (
		<Flex direction="column" minW="800px" alignItems="center">
			<Flex direction="column" w="600px" alignItems="center">
				<Flex direction="column" alignItems="center">
					<Flex m="30px" shadow="base" borderRadius="7px">
						<Button
							fontSize="18px"
							w="150px"
							id="basic"
							ref={selection}
							bgColor={basicSearch ? "cyan.400" : "transparent"}
							color={basicSearch ? "white" : "cyan.400"}
							borderRadius="7px 0 0 7px"
							_hover={{
								color: "white",
								bgColor: "cyan.300",
							}}
							_focus={{ outline: "none" }}
							onClick={setActive}
						>
							Basic
						</Button>
						<Button
							fontSize="18px"
							w="150px"
							id="advanced"
							ref={selection}
							bgColor={!basicSearch ? "cyan.400" : "transparent"}
							color={!basicSearch ? "white" : "cyan.400"}
							borderRadius="0 7px 7px 0"
							_hover={{ color: "white", bgColor: "cyan.300" }}
							_focus={{ outline: "none" }}
							onClick={setActive}
							_active={{ backgroundColor: "#dbf4ff" }}
						>
							Advanced
						</Button>
					</Flex>
					<Flex direction="row" w="100%" textAlign="center">
						<>
							<Formik<{
								name: string;
								type: string;
								status: string;
								weight: boolean;
								height: boolean;
								[key: string]: string | boolean;
							}>
								initialValues={{
									name: "",
									type: "",
									status: "",
									weight: false,
									height: false,
								}}
								onSubmit={async (values, actions) => {
									if (basicSearch) {
										const searchQuery = [
											{
												key: "type",
												operator: "eq",
												value: values["type"],
											},
										];
										await searchPet(searchQuery);
									} else {
										const keys = Object.keys(values);
										const getOperator = (key: string) => {
											switch (key) {
												case "weight":
													return "sort";
													break;
												case "height":
													return "sort";
													break;
												case "name":
													return "regex";
												default:
													return "eq";
													break;
											}
										};
										const searchObj = keys.map((key) => {
											return {
												key,
												operator: getOperator(key),
												value: values[key],
											};
										});
										await searchPet(searchObj);
									}
									actions.setSubmitting(false);
								}}
							>
								{(props) => (
									<Form>
										{basicSearch ? (
											<Field name="type" mt="20px">
												{({ field, meta }: FieldProps) => (
													<FormControl
														isInvalid={Boolean(meta.error) && meta.touched}
													>
														<Flex
															alignItems="center"
															minW="350px"
															justifyContent="center"
														>
															<FormLabel
																htmlFor="type"
																fontSize="lg"
																fontWeight="black"
															>
																Pet type
															</FormLabel>
															<Select
																variant="flushed"
																{...field}
																id="type"
																placeholder="Select type"
																w="150px"
															>
																<option value="dog">Dog</option>
																<option value="cat">Cat</option>
															</Select>
														</Flex>
														<FormErrorMessage>
															{props.errors.type}
														</FormErrorMessage>
													</FormControl>
												)}
											</Field>
										) : (
											<>
												<Field name="name" mt="20px">
													{({ field, meta }: FieldProps) => (
														<FormControl
															isInvalid={Boolean(meta.error) && meta.touched}
														>
															<FormLabel
																htmlFor="name"
																fontSize="lg"
																fontWeight="black"
															>
																Pet name
															</FormLabel>
															<Input
																{...field}
																id="name"
																placeholder="Enter pet name"
															/>
															<FormErrorMessage>
																{props.errors.name}
															</FormErrorMessage>
														</FormControl>
													)}
												</Field>
												<HStack>
													<Field name="type" mt="20px">
														{({ field, meta }: FieldProps) => (
															<FormControl
																isInvalid={Boolean(meta.error) && meta.touched}
															>
																<FormLabel
																	mt="20px"
																	htmlFor="type"
																	fontSize="lg"
																	fontWeight="black"
																>
																	Pet type
																</FormLabel>
																<Select
																	{...field}
																	id="type"
																	placeholder="Select type"
																>
																	<option value="dog">Dog</option>
																	<option value="cat">Cat</option>
																</Select>
																<FormErrorMessage>
																	{props.errors.type}
																</FormErrorMessage>
															</FormControl>
														)}
													</Field>

													<Field name="status">
														{({ field, meta }: FieldProps) => (
															<FormControl
																isInvalid={Boolean(meta.error) && meta.touched}
															>
																<FormLabel
																	mt="20px"
																	htmlFor="status"
																	fontSize="lg"
																	fontWeight="black"
																>
																	Pet status
																</FormLabel>
																<Select
																	{...field}
																	name="status"
																	id="status"
																	placeholder="Select pet status"
																>
																	<option value="not-adopted">
																		Looking for a friend
																	</option>
																	<option value="adopted">Adopted</option>
																	<option value="fostered">fostered</option>
																</Select>

																<FormErrorMessage>
																	{props.errors.status}
																</FormErrorMessage>
															</FormControl>
														)}
													</Field>
												</HStack>
												<Flex direction="column" textAlign="left" mt="20px">
													<Text fontSize="lg" fontWeight="black">
														Sort by
													</Text>
													<Flex justifyContent="space-around">
														<Field name="weight">
															{({ field, form }: FieldProps) => (
																<Flex
																	alignItems="center"
																	minW="250px"
																	justifyContent="space-evenly"
																>
																	<FormLabel maxW="150px">Pet Weight</FormLabel>
																	<Select
																		maxW="150px"
																		isDisabled={form.values.height}
																		placeholder="Select sorting"
																		{...field}
																	>
																		<option value="ASC">Ascending</option>
																		<option value="DESC">Descending</option>
																	</Select>
																</Flex>
															)}
														</Field>

														<Field name="height">
															{({ field, form }: FieldProps) => (
																<Flex
																	alignItems="center"
																	w="250px"
																	justifyContent="space-evenly"
																>
																	<FormLabel>Pet Height</FormLabel>
																	<Select
																		maxW="150px"
																		isDisabled={form.values.weight}
																		placeholder="Select sorting"
																		{...field}
																	>
																		<option value="ASC">Ascending</option>
																		<option value="DESC">Descending</option>
																	</Select>
																</Flex>
															)}
														</Field>
													</Flex>
												</Flex>
											</>
										)}
										<Flex justifyContent="space-around">
											<Button
												mt={4}
												colorScheme="cyan"
												variant="outline"
												w="120px"
												_focus={{ outline: "none" }}
												onClick={() => {
													props.handleReset();
												}}
											>
												Reset
											</Button>
											<Button
												mt={4}
												isLoading={props.isSubmitting}
												type="submit"
												// bgColor="red.600"
												colorScheme="cyan"
												color="white"
												// _hover={{ bgColor: "red.400" }}
												// _focus={{ outline: "none" }}
												// _active={{ bgColor: "red.700" }}
												w="120px"
											>
												Search
											</Button>
										</Flex>
									</Form>
								)}
							</Formik>
						</>
					</Flex>
				</Flex>
			</Flex>
			<Divider
				backgroundColor="#dbf4ff"
				m="10px 0"
				w="95%"
				alignSelf="center"
			/>
			<PetList />
		</Flex>
	);
}

export default Search;
