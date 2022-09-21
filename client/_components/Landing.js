import { Box, Center, Divider, Flex, VStack, Image, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Footer from "./Footer"
import { PrimaryButton, SecondaryButton } from "./styles/index";
import { getUsers } from "../_store/users";

const Landing = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return(
    <div>
      <Center as='h1' p='10'><Text as='b' fontSize='xl'>The #1 app for this cyclist</Text></Center>
      <Flex id='landing'>
        <Box h='full' w='full'>
          <Image src='_img/roadBike.jpg' alt='Cycling' borderRadius="sm"/>
        </Box>
        <VStack mt='20' w='full' spacing='10'>
          <PrimaryButton w='300px'>Sign Up with Google</PrimaryButton>
          <PrimaryButton w='300px'>Sign Up with Apple</PrimaryButton>
          <Divider orientation="horizontal" w='300px'></Divider>
          <SecondaryButton w='300px'>Use my email</SecondaryButton>
        </VStack>
      </Flex>
      <Footer/>
    </div>
  );
};

export default Landing;