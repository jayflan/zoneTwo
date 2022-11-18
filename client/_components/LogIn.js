import { Box, Center, Divider, Flex, FormControl, VStack, Image, Text, Button, Input, FormErrorMessage } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PrimaryButton, SecondaryButton } from "./styles/index";
import { authenticate } from "../_store/auth";

const LogIn = () => {
  
//<------------------------------ hooks ------------------------------>//

  //create local state hook for email & password input & error handling
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [isEmailError, setEmailError] = useState(false);
const [isPasswordError, setPasswordError] = useState(false);
const [errorMsg, setErrorMsg] = useState('');
  //prep store-state
const dispatch = useDispatch();
const isLoggedIn = useSelector((state) => state.auth) || [];

//<------------------------------ componentDidMount ------------------------------>//

useEffect(() => {
  logInError = axiosError.response;
}, []);

//<------------------------------ event & error handling ------------------------------>//

//pull auth errors to eval & display user errors 
let axiosError = {};
if(isLoggedIn.error) {axiosError = isLoggedIn.error}
let logInError = {};


const handleEmailChange = (event) => {
  setEmail(event);
}

const handlePasswordChange = (event) => {
  setPassword(event);
}

const handleSubmit = () => {
  setErrorMsg("");
  if(email) setEmailError(false);
  if(password) setPasswordError(false);

  if(!email){
    setEmailError(true);
  } else if(!password) {
    setPasswordError(true);
  } else {    
    dispatch(authenticate(email, password, "login"));
    if(logInError) setErrorMsg("Invalid Email/Password")
  }
}

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

              <Center>
                <FormControl isInvalid={isEmailError}>
                  <Input type='email' value={email} w="300px" color="white" placeholder="Email" _placeholder={{color: "white.100"}}
                    onChange={(e)=>handleEmailChange(e.target.value)}
                  ></Input>
                  {isEmailError ? (
                    <FormErrorMessage>Email is required.</FormErrorMessage>
                  ) : ('')}
                </FormControl>
              </Center>

              <Center>
                <FormControl isInvalid={isPasswordError}>
                  <Input type='password' value={password} w="300px" color="white" placeholder="Password" _placeholder={{color: "white.100"}}
                    onChange={(e)=>handlePasswordChange(e.target.value)}
                  ></Input>
                  {isPasswordError ? (
                    <FormErrorMessage>Password is required.</FormErrorMessage>
                  ) : ('')}
                </FormControl>
              </Center>
              
              <Center>
                <FormControl isInvalid={errorMsg}>
                  <Center>
                    {errorMsg ? (
                      <FormErrorMessage mb='6'>{errorMsg}</FormErrorMessage>
                    ) : ('')}
                  </Center>
                  <SecondaryButton w='300px' onClick={()=>{handleSubmit()}}>Login</SecondaryButton>
                </FormControl>
              </Center>

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