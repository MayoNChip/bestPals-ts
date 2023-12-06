import { useContext } from "react";
import { Flex, Img, Heading, Box, Text } from "@chakra-ui/react";
import coverImage from "../img/cover5.jpg";
import logo from "../img/biglogo.png";
import AuthContext from "../context/AuthContext";

export default function Banner() {
  const { userData, isLoggedIn } = useContext(AuthContext);
  return (
    <Flex
      alignItems="center"
      w="100%"
      justifyContent="space-evenly"
      h="700px"
      boxShadow="lg"
    >
      <Flex
        // bgImg={coverImage}
        alignItems="center"
        bgPosition="right"
        bgRepeat="no-repeat"
        bgSize="100%"
        bgImage={coverImage}
        height="100%"
        w="100%"
        // border="1px"
        //   bgColor="gray.100"
      >
        <Flex w="40%" h="100%" direction="column">
          {isLoggedIn && (
            <Flex direction="column" w="200px" m="60px 0  0 60px">
              <Text
                lineHeight="0.5"
                fontSize="36px"
                fontWeight="black"
                color="red.500"
              >
                Welcome Back,
              </Text>
              <Text
                fontFamily="heading"
                lineHeight="0.5"
                fontSize="42px"
                fontWeight="black"
                alignSelf="end"
                color="cyan.500"
              >
                {userData?.firstname}
              </Text>
            </Flex>
          )}
          <Flex direction="column" alignItems="center" mt="100px">
            <Img src={logo} alt="logo" width="400px" />
            <Box width="450px" height="100px" textAlign="center">
              <Heading fontSize="48">A Pal For Life</Heading>

              <Text fontSize="32" fontWeight="bold" lineHeight="9">
                So you want to add a family member? There is no better way than
                to adopt a shelter pet and give him or her a second chance.
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
