import { Box, Center, Divider, Flex, VStack, Image, Text, Button } from "@chakra-ui/react";
import React from "react";
import Footer from "./Footer"


const Landing = () => {
  return(
    <div>
      <Center as='h1' p='10'><Text as='b' fontSize='xl'>The #1 app for this cyclist</Text></Center>
      <Flex id='landing'>
        <Box bg='gray.100' h='full' w='full'>
          <Image src='_img/roadBike.jpg' alt='Cycling'/>
        </Box>
        <VStack mt='20' w='full' spacing='10'>
          <Button w='300px' borderRadius='0'>Sign Up with Google</Button>
          <Button w='300px' borderRadius='0'>Sign Up with Apple</Button>
          <Divider orientation="horizontal" w='300px'></Divider>
          <Button w='300px' borderRadius='0'>Use my email</Button>
        </VStack>
        {/* <Box bg='gray.100' w='full'>
          <Box m='10' bg='gray.500'></Box>
        </Box> */}
      </Flex>
      <Footer/>
    </div>
  );
};

export default Landing;