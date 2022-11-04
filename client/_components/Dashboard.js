// import { Box, Center, Divider, Flex, VStack, Image, Text, Button, Input } from "@chakra-ui/react";
import { Box, Center, Divider, Flex, FormControl, VStack, Image, Text, Button, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PrimaryButton, SecondaryButton } from "./styles/index";
import { auth, authenticate, me } from "../_store/auth";


const Dashboard = () => {
  
  //<------------------------------ hooks ------------------------------>//

  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth) || [];
  console.log(authUser)

//<------------------------------ event & error handling ------------------------------>//

useEffect(() => {
  dispatch(me())
}, [!authUser]);


  return(
    <div>
      <Flex
        bgImage="url('_img/roadBike.jpg')"
        direction='column'
      >
        <Center mt="20" mb="80">
          <Box bg="blackAlpha.600" borderRadius="sm">
            <Center as="h1" bg="blackAlpha.500" p="4" borderRadius="sm">
              <Text fontSize="4xl" color="white">
                Dashboard Page (Testing)
              </Text>
            </Center>
            <Center as="h1" bg="blackAlpha.500" p="4" borderRadius="sm">
              {!authUser.email 
                ? <Text fontSize="3xl"color="white">
                    Please Log In
                  </Text> 
                : <Text fontSize="3xl"color="white">
                    Welcome, {authUser.email}
                  </Text>
              }
            </Center>
            {/* <VStack spacing='5' p='4' mt="4" mb="4">
              <PrimaryButton w='300px'>Login with Google</PrimaryButton>
              <PrimaryButton w='300px'>Login with Apple</PrimaryButton>
              <Text color="gray.400">or login with your email address</Text>

              <FormControl>
                <Center>
                  <Input w="300px" color="white" placeholder="Email" _placeholder={{color: "white.100"}}
                    onChange={(e)=>handleEmailChange(e.target.value)}
                  ></Input>
                </Center>
              </FormControl>

              <FormControl>
                <Center>
                  <Input w="300px" color="white" placeholder="Password" _placeholder={{color: "white.100"}}
                    onChange={(e)=>handlePasswordChange(e.target.value)}
                  ></Input>
                </Center>
              </FormControl>

              <SecondaryButton w='300px' onClick={()=>{handleSubmit("login")}}>Login</SecondaryButton>
            </VStack> */}
            <Center bg="blackAlpha.500" p="4">
              <Text fontSize="m" color="white">
                Not a member? <Link to="/signup">   Sign Up</Link>
              </Text>
            </Center>
          </Box>
        </Center>
      </Flex>
      </div>
  );
};
  
  

export default Dashboard;