import { Flex, Img, Box, Divider, Text } from "@chakra-ui/react";

type Props = {
  title: string;
  image: string;
  text: string;
};

function Card(props: Props) {
  return (
    <Flex
      direction="column"
      w="450px"
      h="500px"
      alignItems="center"
      boxShadow="xl"
      borderRadius="5px"
    >
      <Box
        bgImage={props.image}
        w="400px"
        h="300px"
        bgSize="130%"
        bgPos="top"
        borderRadius="5px"
        mb="10px"
      ></Box>
      <Flex direction="column" alignItems="center">
        <Img w="250px" src={props.title} alt="Dog Adoption" />
        <Flex alignItems="center" justifyContent="center" h="20px" w="90%">
          <Divider opacity="30%" w="90%" orientation="horizontal" />
        </Flex>
        <Text w="90%" h="100px" mb="20px">
          {props.text}
        </Text>
      </Flex>
    </Flex>
  );
}

export default Card;
