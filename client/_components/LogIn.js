import { Box, Center, Divider, Flex, VStack, Image, Text, Button } from "@chakra-ui/react";
import React from "react";


const LogIn = () => {
  return(
    <div>
      
      <Flex
        alignItems='center'
        justifyContent='center'
        bg="red"
      >Test Box</Flex>

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