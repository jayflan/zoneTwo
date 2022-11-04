// import { Box, Center, Divider, Flex, VStack, Image, Text, Button, Input } from "@chakra-ui/react";
import { Box, Center, Divider, Flex, FormControl, VStack, Image, Text, Button, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { PrimaryButton, SecondaryButton } from "./styles/index";
import { authenticate, me } from "../_store/auth";

const LogIn = () => {
  
//<------------------------------ hooks ------------------------------>//

  //create local state hook for email & password input handling
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();
  //prep store-state
const dispatch = useDispatch();
const authUser = useSelector((state) => state.auth) || [];

//<------------------------------ componentDidMount ------------------------------>//

useEffect(() => {
  dispatch(me());
}, [!authUser]);

//<------------------------------ event & error handling ------------------------------>//

// const [errorMsg, setErrorMsg] = useState("");

const handleEmailChange = (event) => {
  setEmail(event);
};

const handlePasswordChange = (event) => {
  setPassword(event);
};

const handleSubmit = (event) => {
  dispatch(authenticate(email, password, event));
  if(authUser) navigate("/Dashboard");
};

//<------------------------------ React render ------------------------------>//

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
                Please Login
              </Text>
            </Center>
            <VStack spacing='5' p='4' mt="4" mb="4">
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
            </VStack>
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
  
  

export default LogIn;