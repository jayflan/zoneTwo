import { Box, Center, Divider, Flex, VStack, Image, Text, Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";


const LogIn = () => {
  return(
    <div>
      <Flex
        bgImage="url('_img/roadBike.jpg')"
        direction='column'
      >
        <Center mt="20" mb="80">
          <Box bg="blackAlpha.600">
            <Center as="h1" bg="blackAlpha.500" p="4">
              <Text /*noOfLines={[1,2]}*/ fontSize="4xl" color="white">
                Log In
              </Text>
            </Center>
            <VStack spacing='10' p='4'>
              <Button w='300px' borderRadius='0'>Log In using Google</Button>
              <Button w='300px' borderRadius='0'>Log In using Apple</Button>
              <Text /*noOfLines={[1,2]}*/ fontSize="xl" color="white">
                Or log in with email
              </Text>
              <Button w='300px' borderRadius='0'>Use my email</Button>
            </VStack>
            <Center bg="blackAlpha.500" p="4">
              <Text fontSize="m" color="white">
                <Link to="/landing">Forget your password?</Link>
              </Text>
            </Center>
          </Box>
        </Center>
      </Flex>

      {/* <Box
        w="100px"
        h="100px"
        bg="red"
        pos="absolute"
        top="0"
        bottom="0"
        left="0"
        right="0"
        margin="auto"
      >Test Box</Box> */}


{/* <Box pos="absolute">Cover</Box>
<Box pos="absolute" top="50%" left="50%">
  Absolute with top and left
</Box>
<Box pos="fixed" w="100%" zIndex={2}>
  Fixed with zIndex
</Box> */}
      
      
      {/* <Box backgroundImage="url('/_img/roadBike.jpg')">
        <Center>
          <Box bg="gray.300" h="500px">
            <Box bg="black" h="500px" w="100px" >
              <VStack mt='20' spacing='10'>
                <Button w='300px' borderRadius='0'>Sign Up with Google</Button>
                <Button w='300px' borderRadius='0'>Sign Up with Apple</Button>
                <Divider orientation="horizontal" w='300px'></Divider>
                <Button w='300px' borderRadius='0'>Use my email</Button>
              </VStack>
            </Box>
          </Box>
        </Center>
      </Box> */}
      
      
      {/* <div style={{backgroundimage: url('_img/roadBike.jpg')}}> */}
        {/* <Box bg='gray.100' h='full' w='full'>
            <Image src='_img/roadBike.jpg' alt='Cycling'/>
          </Box> */}

        {/* <Center as='h1' p='10'><Text as='b' fontSize='xl'>The #1 app for this cyclist</Text></Center>
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
        </Flex> */}
    </div>
  );
};

export default LogIn;