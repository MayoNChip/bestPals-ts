import { useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  FormErrorMessage,
  Text,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  Heading,
  HStack,
  Select,
  useToast,
  Avatar,
  AvatarBadge,
  IconButton,
  Spinner,
  Checkbox,
} from "@chakra-ui/react";
import { Formik, Form, Field, FieldProps } from "formik";
import { EditIcon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";
import PetContext, { Pet } from "../../context/PetContext";
import usePets from "../../hooks/usePets";
import { DogBreed } from "../../utils/DogAPIConfig";

function FormHelper({
  resetForm,
  petDetails,
}: {
  resetForm: any;
  petDetails: Pet;
}) {
  useEffect(() => {
    resetForm({
      values: {
        image: "",
        type: petDetails.type || "",
        name: petDetails.name || "",
        age: petDetails.age || "",
        status: petDetails?.status || "not-adopted",
        height: petDetails.height || "",
        weight: petDetails.weight || "",
        color: petDetails.color || "",
        bio: petDetails?.bio || "",
        hypoallergenic: petDetails?.hypoallergenic || "",
        diet: petDetails.diet || "",
        breed: petDetails.breed || "",
        breed2: petDetails.breed2 || "",
      },
    });
  }, [petDetails]);
  return <></>;
}

function AddPet() {
  const { petId } = useParams();

  const {
    imageUpload,
    addPet,
    petImage,
    setPetImage,
    // petBreedsList,
    setPetType,
    getPetInfo,
    petType,
    changBreedsList,
    addPetImage,
  } = usePets();
  const toast = useToast();
  const selectImage = useRef<HTMLInputElement>(null);
  const [isMixed, setIsMixed] = useState(false);
  const { petDetails, setPetDetails, petBreedsList } = useContext(PetContext);
  const [isLoading, setIsLoading] = useState(false);

  const initialValues: Pet = {
    _id: petDetails?._id || "",
    image: "",
    name: petDetails.name || "",
    type: petDetails.type || "",
    age: petDetails.age || 0,
    status: petDetails?.status || "not-adopted",
    height: petDetails.height || 0,
    weight: petDetails.weight || 0,
    color: petDetails.color || "",
    bio: petDetails?.bio || "",
    hypoallergenic: petDetails?.hypoallergenic || "",
    diet: petDetails.diet || "",
    breed: petDetails.breed || "",
    breed2: petDetails.breed2 || "",
  };

  useEffect(() => {
    const subscription = { unsubscribe: () => undefined };
    setIsLoading(true);
    if (petId) {
      const getPetDetails = async () => {
        const response = await getPetInfo(petId);

        if (response?.breed2) {
          setIsMixed(true);
        }
      };
      getPetDetails();
    } else {
      setPetDetails(initialValues);
    }
    return () => {
      subscription.unsubscribe();
    };
  }, [setPetDetails, petId]);

  useEffect(() => {
    setIsLoading(true);
    const changeTypeList = async () => {
      await changBreedsList();
    };
    setIsLoading(false);

    changeTypeList();
  }, [petType]);

  const uploadImageClick = () => {
    selectImage.current?.click();
  };

  const handleIsMixed = () => {
    setIsMixed(!isMixed);
  };

  return (
    <Flex w="100%" justifyContent="center" mt="20px">
      <Flex w="600px" boxShadow="md" backgroundColor="white">
        <Flex direction="column" w="100%" p="20px">
          <Heading color="cyan.400" m="20px 0 40px 10px">
            Add a Pet
          </Heading>
          <Flex w="100%" backgroundColor="white" justifyContent="center">
            <Formik
              style={{ width: "500px" }}
              initialValues={initialValues}
              onSubmit={async (values, actions) => {
                if (petImage) {
                  try {
                    const petWithImage = {
                      ...values,
                      image: petImage,
                    };
                    const newPet = await addPet(petWithImage, actions);
                    if (newPet?._id) {
                      const imageUrl = await imageUpload(newPet._id);

                      if (!imageUrl) {
                        throw new Error("Error uploading image");
                      }
                      await addPetImage(imageUrl, newPet);
                    }
                  } catch (error) {
                    if (error instanceof Error) {
                      toast({
                        title: "An error occurred.",
                        description: error.message,
                        status: "error",
                        duration: 2000,
                        isClosable: true,
                      });
                    }
                  }
                } else {
                  toast({
                    title: "An error occurred.",
                    description: "Image is too large, Pick a different image",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                  });
                }
                actions.setSubmitting(false);
                actions.resetForm();
              }}
            >
              {(props) => (
                <Form>
                  <FormHelper
                    resetForm={props.resetForm}
                    petDetails={petDetails}
                  />
                  <Flex direction="column" w="500px">
                    <Field name="image">
                      {({ meta }: FieldProps) => (
                        <FormControl
                          isRequired
                          isInvalid={Boolean(meta.error) && meta.touched}
                        >
                          <Flex w="100%" justifyContent="center" mb="50px">
                            <Avatar
                              size="2xl"
                              src={
                                petDetails.image?.toString() ||
                                petImage?.toString()
                              }
                            >
                              <AvatarBadge
                                as={IconButton}
                                color="white"
                                icon={<EditIcon w="15px" />}
                                size="8"
                                boxSize={8}
                                right="20px"
                                rounded="full"
                                bg="cyan.200"
                                _hover={{ cursor: "pointer", bg: "cyan.100" }}
                                borderColor="cyan.300"
                                borderWidth="0.5px"
                                // _focus={{ outline: "none" }}
                                _active={{ bg: "cyan.100" }}
                                onClick={uploadImageClick}
                              />
                            </Avatar>

                            <Input
                              ref={selectImage}
                              border="none"
                              fontSize="24px"
                              type="file"
                              name="image"
                              id="image"
                              w="50px"
                              style={{ display: "none" }}
                              _focus={{ outline: "none" }}
                              onChange={(e) => {
                                const file = e.currentTarget.files?.[0];
                                if (!file) {
                                  return;
                                }
                                const reader = new FileReader();
                                reader.readAsDataURL(file);
                                reader.onloadend = () => {
                                  if (!reader.result) {
                                    return;
                                  }
                                  setPetImage(reader.result);
                                };
                              }}
                            />
                          </Flex>

                          <FormErrorMessage>
                            {props.errors.image}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <HStack>
                      <Field name="name">
                        {({ field, meta }: FieldProps) => (
                          <FormControl
                            isRequired
                            isInvalid={Boolean(meta.error) && meta.touched}
                          >
                            <FormLabel
                              htmlFor="name"
                              fontWeight="bold"
                              fontSize="18px"
                            >
                              Pet name
                            </FormLabel>

                            <Input
                              defaultValue={props.values.name}
                              variant="flushed"
                              {...field}
                              width="200px"
                              id="name"
                              onInput={() => {
                                props.setStatus(false);
                              }}
                              placeholder="Enter pet name"
                            />
                            <FormErrorMessage mt="2px">
                              {props.errors.name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="age">
                        {({ field, meta }: FieldProps) => (
                          <FormControl
                            isRequired
                            isInvalid={Boolean(meta.error) && meta.touched}
                            mb="10px"
                          >
                            <FormControl id="age" isRequired>
                              <FormLabel
                                fontWeight="bold"
                                fontSize="18px"
                                htmlFor="age"
                                mt="10px"
                              >
                                Age
                              </FormLabel>
                              <Input
                                defaultValue={props.values.age}
                                variant="flushed"
                                {...field}
                                type="text"
                                id="age"
                                onInput={() => {
                                  props.setStatus(false);
                                }}
                                placeholder="Enter pet age"
                              />
                            </FormControl>
                            <FormErrorMessage>
                              {props.errors.age}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </HStack>
                    <HStack>
                      <Field name="type">
                        {({ field, meta }: FieldProps) => {
                          const { onChange, ...rest } = field;
                          return (
                            <FormControl
                              id="type"
                              isRequired
                              isInvalid={Boolean(meta.error) && meta.touched}
                            >
                              <FormControl id="type" isRequired mt="3">
                                <FormLabel
                                  fontWeight="bold"
                                  fontSize="18px"
                                  htmlFor="type"
                                >
                                  Type of Pet
                                </FormLabel>
                                <RadioGroup {...rest} id="type">
                                  <Stack direction="row" align="center">
                                    <Radio
                                      onChange={field.onChange}
                                      value="dog"
                                      id="type"
                                    >
                                      Dog
                                    </Radio>
                                    <Radio
                                      onChange={field.onChange}
                                      value="cat"
                                      id="type"
                                    >
                                      Cat
                                    </Radio>
                                  </Stack>
                                </RadioGroup>
                              </FormControl>
                              <FormErrorMessage>
                                {props.errors.type}
                              </FormErrorMessage>
                            </FormControl>
                          );
                        }}
                      </Field>
                      <Field name="status">
                        {({ field, meta }: FieldProps) => (
                          <FormControl
                            id="status"
                            isRequired
                            isInvalid={Boolean(meta.error) && meta.touched}
                          >
                            <FormLabel
                              fontWeight="bold"
                              fontSize="18px"
                              htmlFor="status"
                            >
                              Pet Status
                            </FormLabel>
                            <Select
                              name="status"
                              id="status"
                              onChange={field.onChange}
                              defaultValue={props.values.status}
                            >
                              <option value="adopted">Adopted</option>
                              <option value="fostered">Fostered</option>
                              <option value="not-adopted">
                                Waiting for a family
                              </option>
                            </Select>
                            <FormErrorMessage>
                              {props.errors.status}
                            </FormErrorMessage>
                          </FormControl>
                          // );
                        )}
                      </Field>
                    </HStack>
                    <Flex w="50%" h="50px">
                      <Checkbox
                        onChange={handleIsMixed}
                        checked={isMixed}
                        defaultChecked={petDetails?.breed2 ? true : false}
                      >
                        Mixed Breed
                      </Checkbox>
                    </Flex>
                    <Flex direction="column">
                      <Field name="breed">
                        {({ field, meta }: FieldProps) => (
                          <FormControl
                            isRequired
                            isInvalid={Boolean(meta.error) && meta.touched}
                            mb="10px"
                          >
                            <FormControl id="breed" isRequired>
                              <FormLabel
                                fontWeight="bold"
                                fontSize="18px"
                                htmlFor="breed"
                                mt="10px"
                              >
                                Pet Breed
                              </FormLabel>

                              <Select
                                name="breed"
                                onChange={field.onChange}
                                onClick={() => {
                                  setPetType(props.values.type);
                                }}
                              >
                                {isLoading ? (
                                  <Flex
                                    w="100%"
                                    h="100%"
                                    alignItems="center"
                                    justifyContent="center"
                                    p="fixed"
                                    top="50%"
                                    left="50%"
                                  >
                                    <Spinner
                                      thickness="4px"
                                      speed="0.65s"
                                      emptyColor="gray.200"
                                      color="blue.500"
                                      size="xl"
                                    />
                                  </Flex>
                                ) : (
                                  petBreedsList &&
                                  petBreedsList.map((breed: DogBreed) => {
                                    return (
                                      <option key={breed.id} value={breed.name}>
                                        {breed.name}
                                      </option>
                                    );
                                  })
                                )}
                              </Select>
                            </FormControl>
                            <FormErrorMessage>
                              {props.errors.breed}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      {isMixed && (
                        <Field name="breed2">
                          {({ field, meta }: FieldProps) => (
                            <FormControl
                              isRequired
                              isInvalid={Boolean(meta.error) && meta.touched}
                              mb="10px"
                            >
                              <FormControl id="breed2" isRequired>
                                <FormLabel
                                  fontWeight="bold"
                                  fontSize="18px"
                                  htmlFor="breed2"
                                  mt="10px"
                                >
                                  Second Pet Breed
                                </FormLabel>

                                <Select
                                  name="breed2"
                                  onChange={field.onChange}
                                  onClick={() => {
                                    setPetType(props.values.type);
                                  }}
                                >
                                  {isLoading ? (
                                    <Flex
                                      w="100%"
                                      h="100%"
                                      alignItems="center"
                                      justifyContent="center"
                                      p="fixed"
                                      top="50%"
                                      left="50%"
                                    >
                                      <Spinner
                                        thickness="4px"
                                        speed="0.65s"
                                        emptyColor="gray.200"
                                        color="blue.500"
                                        size="xl"
                                      />
                                    </Flex>
                                  ) : (
                                    petBreedsList &&
                                    petBreedsList.map((breed: DogBreed) => {
                                      return (
                                        <option
                                          key={breed.id}
                                          value={breed.name}
                                        >
                                          {breed.name}
                                        </option>
                                      );
                                    })
                                  )}
                                </Select>
                              </FormControl>
                              <FormErrorMessage>
                                {props.errors.breed2}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      )}
                    </Flex>
                    <HStack>
                      <Field name="height">
                        {({ field, meta }: FieldProps) => (
                          <FormControl
                            isRequired
                            isInvalid={Boolean(meta.error) && meta.touched}
                          >
                            <FormLabel
                              fontWeight="bold"
                              fontSize="18px"
                              htmlFor="height"
                            >
                              Pet Height
                            </FormLabel>
                            <Input
                              variant="flushed"
                              {...field}
                              type="number"
                              id="height"
                              onInput={() => {
                                props.setStatus(false);
                              }}
                              placeholder="Enter pet height"
                            />
                            <FormErrorMessage>
                              {props.errors.height}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="weight">
                        {({ field, meta }: FieldProps) => (
                          <FormControl
                            isRequired
                            isInvalid={Boolean(meta.error) && meta.touched}
                          >
                            <FormLabel
                              fontWeight="bold"
                              fontSize="18px"
                              htmlFor="weight"
                            >
                              Pet Weight
                            </FormLabel>
                            <Input
                              variant="flushed"
                              {...field}
                              type="number"
                              id="weight"
                              onInput={() => {
                                props.setStatus(false);
                              }}
                              placeholder="Enter pet weight"
                            />
                            <FormErrorMessage>
                              {props.errors.weight}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </HStack>
                    <HStack>
                      <Field name="color">
                        {({ field, meta }: FieldProps) => (
                          <FormControl
                            isRequired
                            isInvalid={Boolean(meta.error) && meta.touched}
                          >
                            <FormControl id="color" isRequired mt="3">
                              <FormLabel
                                fontWeight="bold"
                                fontSize="18px"
                                htmlFor="color"
                              >
                                Pet Color
                              </FormLabel>
                              <Input
                                variant="flushed"
                                {...field}
                                type="text"
                                id="color"
                                onInput={() => {
                                  props.setStatus(false);
                                }}
                                placeholder="Enter pet color"
                              />
                            </FormControl>
                            <FormErrorMessage>
                              {props.errors.color}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="hypoallergenic">
                        {({ field, meta }: FieldProps) => {
                          const { onChange, ...rest } = field;
                          return (
                            <FormControl
                              id="hypoallergenic"
                              isRequired
                              isInvalid={Boolean(meta.error) && meta.touched}
                            >
                              <FormControl
                                id="hypoallergenic"
                                isRequired
                                mt="3"
                              >
                                <FormLabel
                                  fontWeight="bold"
                                  fontSize="18px"
                                  htmlFor="hypoallergenic"
                                >
                                  hypoallergenic?
                                </FormLabel>
                                <RadioGroup {...rest} id="hypoallergenic">
                                  <Stack direction="row" align="center">
                                    <Radio
                                      onChange={field.onChange}
                                      value="1"
                                      id="hypoallergenic"
                                    >
                                      Yes
                                    </Radio>
                                    <Radio
                                      onChange={field.onChange}
                                      value="0"
                                      id="hypoallergenic"
                                    >
                                      No
                                    </Radio>
                                  </Stack>
                                </RadioGroup>
                              </FormControl>
                              <FormErrorMessage>
                                {props.errors.hypoallergenic}
                              </FormErrorMessage>
                            </FormControl>
                          );
                        }}
                      </Field>
                    </HStack>
                    <Field name="diet">
                      {({ field, meta }: FieldProps) => (
                        <FormControl
                          isInvalid={Boolean(meta.error) && meta.touched}
                        >
                          <FormControl id="diet" mt="3">
                            <FormLabel
                              fontWeight="bold"
                              fontSize="18px"
                              htmlFor="diet"
                              mb="10px"
                            >
                              Pet Diet
                            </FormLabel>
                            <Input
                              variant="flushed"
                              {...field}
                              type="text"
                              id="diet"
                              onInput={() => {
                                props.setStatus(false);
                              }}
                              placeholder="Special food/menu"
                            />
                          </FormControl>
                          <FormErrorMessage>
                            {props.errors.diet}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="bio">
                      {({ field, meta }: FieldProps) => (
                        <FormControl
                          isInvalid={Boolean(meta.error) && meta.touched}
                        >
                          <FormLabel
                            fontWeight="bold"
                            fontSize="18px"
                            htmlFor="bio"
                          >
                            Pet Bio
                          </FormLabel>
                          <Textarea
                            {...field}
                            id="bio"
                            onInput={() => {
                              props.setStatus(false);
                            }}
                            placeholder="Enter pet bio..."
                          />
                          <FormErrorMessage>
                            {props.errors.bio}
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
                        Add
                      </Button>
                    </Flex>
                  </Flex>
                </Form>
              )}
            </Formik>
            {/* )} */}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default AddPet;
