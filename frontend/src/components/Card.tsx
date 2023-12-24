import { Flex, Img, Box, Divider, Text, Image } from "@chakra-ui/react";

type Props = {
  title: string;
  image: string;
  text: string;
};

function Card(props: Props) {
  return (
    <Flex
      direction="column"
      w="25%"
      alignItems="center"
      boxShadow="xl"
      borderRadius="5px"
    >
      {/* <Box
        bgImage={props.image}
        w="400px"
        h="300px"
        bgSize="130%"
        bgPos="top"
        borderRadius="5px"
        mb="10px"
      ></Box> */}
      <Flex>
        <Image
          src={props.image}
          height="180px"
          my="10px"
          roundedTop="5px"
          objectFit="cover"
        ></Image>
      </Flex>
      <Flex direction="column" alignItems="center">
        <Image
          src={props.title}
          alt="Dog Adoption"
          w="70%"
          p="10px 20px 0 20px"
        />
        <Divider opacity="30%" w="90%" orientation="horizontal" my="20px" />
        <Text w="90%" mb="20px">
          {props.text}
        </Text>
      </Flex>
    </Flex>
  );
}

export default Card;
