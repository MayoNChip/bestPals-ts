import {
  Flex,
  Text,
  Badge,
  Divider,
  Avatar,
  Tooltip,
  Link,
} from "@chakra-ui/react";

import { NavLink } from "react-router-dom";
import { Pet } from "../context/PetContext";

type Props = Pet;

function PetCard({ _id, name, age, breed, image, type, breed2 }: Props) {
  return (
    <Flex
      w="300px"
      h="350px"
      direction="column"
      alignItems="center"
      boxShadow="lg"
      m="20px 30px 20px 30px"
      bgColor="white"
      borderRadius="8px"
      pos="relative"
    >
      <Avatar mt="20px" size="2xl" src={image?.toString()} />

      <Divider m="20px 0" w="90%" />
      <Flex w="90%" alignItems="center" textAlign="left">
        <Flex
          w="100%"
          alignItems="center"
          fontSize="xl"
          justifyContent="flex-start"
        >
          <Text>
            Name: <b>{name}</b>
          </Text>
        </Flex>

        <Flex w="100%" justifyContent="flex-end">
          <Text fontSize="xl">
            <Badge
              borderRadius="3px"
              colorScheme={type === "cat" ? "red" : "cyan"}
              variant="subtle"
              fontSize="md"
            >
              {type}
            </Badge>
          </Text>
        </Flex>
      </Flex>
      <Flex
        justifyContent="space-between"
        w="90%"
        alignItems="center"
        mt="10px"
      >
        <Flex
          w="100%"
          alignItems="center"
          fontSize="xl"
          justifyContent="flex-start"
        >
          <Text fontSize="xl">
            Breed:
            {breed2 ? (
              <b>
                <Tooltip
                  hasArrow
                  bgColor="cyan.200"
                  color="black"
                  fontSize="18px"
                  label={breed + " & " + breed2}
                  aria-label="A tooltip"
                >
                  Mixed
                </Tooltip>
              </b>
            ) : (
              <b> {breed}</b>
            )}
          </Text>
        </Flex>
        <Flex w="100%" justifyContent="flex-end">
          <Text fontSize="xl">
            Age: <b>{age || "15"}</b>
          </Text>
        </Flex>
      </Flex>
      <Link
        borderRadius="0"
        pos="absolute"
        bottom="10px"
        variant="outline"
        colorScheme="cyan"
      >
        <NavLink to={`/pet/${_id}`}>More Info</NavLink>
      </Link>
    </Flex>
  );
}

export default PetCard;
