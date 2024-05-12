import {
  Text,
  Flex,
  Box,
  Divider,
  Container,
  Heading,
  Tag,
  TagLabel,
  Icon,
  Button,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PetContext, { Pet } from "../context/PetContext";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { BiHomeHeart } from "react-icons/bi";
import { GoHome } from "react-icons/go";
import { RiHeartAddFill } from "react-icons/ri";
import { IoReturnDownBack } from "react-icons/io5";
import { IoIosHeartDislike } from "react-icons/io";
import CustomToast from "../utils/CustomToast";
import usePets from "../hooks/usePets";
import useUsers from "../hooks/useUsers";
import AuthContext from "../context/AuthContext";

function PetDetails() {
  const { petId } = useParams();
  const { getPetInfo, updatePet } = usePets();
  const { petDetails } = useContext(PetContext);
  const { isOwnedByUser, userData, petSavedToUser, isLoggedIn } =
    useContext(AuthContext);
  const { successToast } = CustomToast();
  const [isLoaded, setIsLoaded] = useState(false);
  const { isOwner, updateOwnedPets } = useUsers();
  // const [isDone, setIsDone] = useState<Boolean | undefined>(undefined);

  if (!petId) {
    return (
      <>
        <h1>No Pet Found</h1>
      </>
    );
  }

  useEffect(() => {
    setIsLoaded(false);
    const getPetDetails = async () => {
      await getPetInfo(petId);
    };
    const getIsOwner = async () => {
      await isOwner(petId);
    };
    setIsLoaded(true);
    getPetDetails();
    getIsOwner();
  }, [userData, petSavedToUser]);

  const getTagColor = (status: string) => {
    switch (status) {
      case "adopted":
        return "green";
      case "fostered":
        return "orange";
      case "not-adopted":
        return "red";
        break;
    }
  };

  const handlePetStatus = async (newStatus: Pet["status"]) => {
    if (!petDetails?._id) return;
    //// Create the object of the change and run the function to update the pet status on the back end /////
    const newPet = {
      ...petDetails,
      status: newStatus,
    };
    const res = await updatePet(newPet);
    await updateOwnedPets(petDetails?._id, newStatus, userData?._id!);

    //// display message based on the action /////
    let userAction: string = newStatus;
    switch (newStatus) {
      case "not-adopted":
        userAction = "returned";
        break;
    }
    res &&
      successToast(
        "Success!",
        `You ${userAction} ${petDetails?.name} successfully`
      );
  };

  const handleSavePet = async () => {
    // setIsDone(false);
    if (!petDetails._id) return;
    // await updateSavedPets(petDetails?._id);
    await updateOwnedPets(petDetails?._id, "saved", userData?._id!);
    // setIsDone(true);
  };

  return (
    <Flex justifyContent="center">
      {isLoaded && (
        <Flex
          p="10px"
          w="550px"
          direction="column"
          alignItems="center"
          position="relative"
          boxShadow="md"
          // mt="20px"
        >
          <Box
            h="350px"
            w="100%"
            backgroundImage={petDetails?.image?.toString()}
            bgSize="cover"
            backgroundRepeat="no-repeat"
            bgPosition="left"
            // position="absolute"
          />
          <Flex
            // mt="300px"
            className="dog-image"
            borderRadius="50%"
            border="solid #8FCBFF 2px"
            overflow="hidden"
          ></Flex>
          <Heading size="2xl" fontWeight="bold" py="20px">
            {petDetails?.name}
          </Heading>
          <Tag
            py="10px"
            my="10px"
            size="lg"
            colorScheme={getTagColor(petDetails.status)}
          >
            <TagLabel fontSize="lg">
              {petDetails.status === "adopted" && "Adopted"}
              {petDetails.status === "not-adopted" && "Waiting for a family"}
              {petDetails.status === "fostered" && "Fostered"}
            </TagLabel>
          </Tag>
          <Divider
            size="l"
            bgColor="#4BBAED"
            w="90%"
            boxShadow="xl"
            my="10px"
          ></Divider>
          <Flex alignItems="flex-start" direction="column" w="90%" gap="10px">
            <Flex justifyContent="space-between" w="100%" alignItems="center">
              <Flex alignItems="center">
                {petDetails?.breed2 ? (
                  <Flex>
                    <Text fontSize="2xl" mr="5px">
                      Breed:
                    </Text>
                    <Text fontSize="2xl" fontWeight="bold">
                      {petDetails?.breed + " " + petDetails.breed2} Mix
                    </Text>
                  </Flex>
                ) : (
                  <Flex>
                    <Text fontSize="2xl" mr="5px">
                      Breed:
                    </Text>
                    <Text fontSize="2xl" fontWeight="bold">
                      {petDetails?.breed}
                    </Text>
                  </Flex>
                )}
              </Flex>
              <Flex>
                <Text fontSize="2xl">Age:</Text>
                <Text fontSize="2xl" fontWeight="bold">
                  {petDetails?.age} yo
                </Text>
              </Flex>
            </Flex>
            <Flex w="100%" justifyContent="space-between">
              <Flex>
                <Text fontSize="2xl">Color:</Text>
                <Text fontSize="2xl" fontWeight="bold">
                  {petDetails?.color}
                </Text>
              </Flex>

              <Flex alignItems="center">
                <Text fontSize="2xl" pr="10px">
                  Hypoallergenic
                </Text>
                {petDetails?.hypoallergenic ? (
                  <CheckIcon w={3} h={3} color="green.500" />
                ) : (
                  <CloseIcon w={3} h={3} color="red.500" />
                )}
              </Flex>
            </Flex>
            <Flex w="100%" justifyContent="space-between">
              <Flex>
                <Text fontSize="2xl">Weight: </Text>
                <Text fontSize="2xl" fontWeight="bold">
                  {petDetails?.weight} cm
                </Text>
              </Flex>

              <Flex alignItems="center">
                <Text fontSize="2xl" mr="10px">
                  Height:
                </Text>
                <Text fontSize="2xl" fontWeight="bold">
                  {petDetails?.height} cm
                </Text>
              </Flex>
            </Flex>

            <Heading size="lg" padding="10px 20px">
              {petDetails?.name}'s Bio:
            </Heading>
            <Container
              w="90%"
              minH="70px"
              size="md"
              bgColor="#d6ecff"
              padding="10px"
              borderRadius="5px"
            >
              <Text fontWeight="normal" fontSize="xl">
                {petDetails.bio}
              </Text>
            </Container>
            {isLoggedIn && (
              <Flex
                // mt="20px"
                p="10px"
                w="100%"
                justifyContent="space-around"
                // mb="20px"
              >
                {petDetails.status !== "adopted" && (
                  <Button
                    bgColor="#EE7162"
                    color="white"
                    leftIcon={<BiHomeHeart />}
                    _hover={{
                      cursor: "pointer",
                      bgColor: "red.500",
                      color: "white",
                    }}
                    _active={{ bgColor: "#8e2115" }}
                    _focus={{ outline: "none" }}
                    shadow="base"
                    onClick={() => {
                      handlePetStatus("adopted");
                    }}
                    isDisabled={
                      petDetails.status !== "not-adopted" &&
                      petDetails.status !== "fostered"
                        ? true
                        : false
                    }
                  >
                    <Text fontSize="18px">Adopt {petDetails?.name}</Text>
                  </Button>
                )}

                {isLoaded &&
                  petDetails?.status !== "adopted" &&
                  petDetails.status !== "fostered" &&
                  !isOwnedByUser.fostered.includes(petId) && (
                    <>
                      <Divider orientation="vertical" />
                      <Button
                        leftIcon={<GoHome />}
                        bgColor="#EE7162"
                        color="white"
                        _hover={{
                          cursor: "pointer",
                          bgColor: "red.500",
                          color: "white",
                        }}
                        _active={{ bgColor: "#8e2115" }}
                        _focus={{ outline: "none" }}
                        shadow="base"
                        onClick={() => {
                          handlePetStatus("fostered");
                        }}
                        isDisabled={userData?._id ? false : true}
                        // isDisabled={
                        //   petDetails?.status !== "not-adopted" ? true : false
                        // }
                      >
                        <Text fontSize="18px" colorScheme="red">
                          Foster {petDetails?.name}
                        </Text>
                      </Button>
                    </>
                  )}

                {isLoaded &&
                  petDetails?.status !== "adopted" &&
                  isOwnedByUser.fostered.includes(petId) && (
                    <>
                      <Divider orientation="vertical" />
                      <Button
                        leftIcon={<IoReturnDownBack />}
                        bgColor="#b7b7b7"
                        color="white"
                        _hover={{
                          cursor: "pointer",
                          bgColor: "gray.500",
                          color: "white",
                        }}
                        _active={{ bgColor: "gray.800" }}
                        _focus={{ outline: "none" }}
                        shadow="base"
                        onClick={() => {
                          handlePetStatus("not-adopted");
                        }}
                        isDisabled={!isOwnedByUser?.fostered?.includes(petId)}
                      >
                        <Text fontSize="18px">Return {petDetails?.name}</Text>
                      </Button>
                      <Divider orientation="vertical" />
                    </>
                  )}

                {isLoaded && isOwnedByUser?.saved.includes(petId) ? (
                  <Button
                    bgColor="white"
                    color="#ff5947"
                    _hover={{
                      cursor: "pointer",
                      bgColor: "white",
                      color: "#ff5947",
                    }}
                    _focus={{ outline: "none" }}
                    shadow="md"
                    onClick={handleSavePet}
                    isDisabled={userData?._id ? false : true}
                  >
                    <Icon as={IoIosHeartDislike} />
                  </Button>
                ) : (
                  <Button
                    bgColor="red.500"
                    color="white"
                    _hover={{
                      cursor: "pointer",
                      bgColor: "#ff5947",
                      color: "white ",
                    }}
                    _focus={{ outline: "none" }}
                    shadow="md"
                    onClick={handleSavePet}
                    isDisabled={userData?._id ? false : true}
                  >
                    <Icon as={RiHeartAddFill} />
                  </Button>
                )}
              </Flex>
            )}
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}

export default PetDetails;
