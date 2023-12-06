import { Flex, Heading, Box, Divider, Text } from "@chakra-ui/react";
import articleImage from "../img/articleImage.jpg";

import Banner from "./Banner";
import Card from "./Card";
import dogAdoptText from "../img/dogadoption.png";
import dogAdoptImage from "../img/dogadopt.jpg";
import catAdoptTitle from "../img/catadoption.png";
import petFosteringTitle from "../img/fosteringtitle.png";
import catAdoptImage from "../img/catadopt.jpg";
import petFosteringImage from "../img/foster.jpg";

function NotLoggedInHomepage() {
  const adoptDogCardText =
    " A dog will not care if you’ve had a bad day, he just wants to give you a big welcoming tail wag when you walk in the door. Our dogs are sitting waiting for us at the door every single time we leave the house.";
  const adoptCatCardText =
    "Cats can help children learn about caring for animals, social skills, and routines – especially if they help out at kitty's feeding time. Studies show that younger cats, in particular, become affectionate with the children in the family.";
  const petFosterText =
    "Some animals can handle a shelter environment better than others. Many get overly excited or too anxious to let their true personality shine when they’re in a kennel. In a foster home, pets can relax, so that potential adopters can get a good sense of how they’d be in a home.";
  return (
    <Flex
      flexDirection="column"
      justifyContent="space-around"
      w="100%"
      // justifySelf="flex-end"
    >
      <Banner />
      <Flex justifyContent="center" mt="50px" w="100%" alignItems="center">
        <Box
          bgImage={articleImage}
          bgPosition="center"
          bgRepeat="no-repeat"
          bgSize="120%"
          height="400px"
          width="600px"
        ></Box>
        <Flex
          direction="column"
          height="400px"
          width="600px"
          color="blue.900"
          m="20px 0 0 60px"
        >
          <Heading size="xl" mb="20px">
            Adopt or foster a pet
          </Heading>
          <Text fontSize="25px" lineHeight="28px">
            You can give a homeless animal a second chance through adoption
            instead of purchasing from a pet shop. Animal welfare groups usually
            have a wide variety of pets for adoption. These pets have been
            sterilised, and screened for good behaviour before matching them
            with potential pet owners. If there are adoption fees, they go
            towards paying for medical needs, such as sterilisation, deworming
            and vaccination, and the administrative cost of the adoption.
          </Text>
        </Flex>
      </Flex>
      <Flex justifyContent="center" alignItems="center" h="100px">
        <Divider w="90%"></Divider>
      </Flex>
      <Flex
        m="0"
        width="100%"
        justifyContent="center"
        gap="20px"
        textAlign="center"
      >
        <Card
          title={dogAdoptText}
          image={dogAdoptImage}
          text={adoptDogCardText}
        />
        <Card
          title={catAdoptTitle}
          image={catAdoptImage}
          text={adoptCatCardText}
        />
        <Card
          title={petFosteringTitle}
          image={petFosteringImage}
          text={petFosterText}
        />
      </Flex>
    </Flex>
  );
}

export default NotLoggedInHomepage;
