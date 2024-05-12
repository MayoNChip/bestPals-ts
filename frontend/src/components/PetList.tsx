import { Flex, Link, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import PetContext from "../context/PetContext";
import PetCard from "./PetCard";

function PetList() {
  const { pets } = useContext(PetContext);
  const navigate = useNavigate();

  return (
    <Flex wrap="wrap">
      {pets ? (
        pets.map((pet) => {
          return <PetCard key={pet?._id} {...pet} />;
        })
      ) : (
        <Flex
          w="100%"
          direction="column"
          alignSelf="center"
          textAlign="center"
          justifyContent="center"
        >
          <Text fontSize="xl" m=" 0 auto" fontWeight="black">
            You don't own any pets, maybe its time to adopt a new friend for
            life? :)
            <Text>
              Browse available pets{" "}
              {
                <Link color="cyan.500" onClick={() => navigate("/search")}>
                  here
                </Link>
              }
            </Text>
          </Text>
        </Flex>
      )}
    </Flex>
  );
}

export default PetList;
