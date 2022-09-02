import { Box, Center, Flex, HStack, Image, Text } from "@chakra-ui/react";
import React from "react";


const Landing = () => {
  return(
    <div>
      <Center as='h1' p='4'><Text as='b' fontSize='xl'>The #1 app for this cyclist</Text></Center>
      <Flex id='landing'>
        <Box bg='gray.100' h='full' w='full'>
          <Image src='_img/roadBike.jpg' alt='Cycling'/>
        </Box>
        <Box bg='gray.100' w='full'></Box>
      </Flex>
    </div>
  );
};

export default Landing;